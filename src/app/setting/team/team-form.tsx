"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CreateTeamModal } from "./CreateTeamModal";
import { useTeamInfo, useTeamMemberList, inviteUser, getInvitationReceiveList, getInvitationSendList } from "@/hooks/fetch/useTeam";
import { TeamMemberType, InvitationReceiveType, InvitationSendType } from "@/hooks/fetch/useTeam";
import { useVariable } from "@/hooks/useVariable";
import { TeamMemberLoading } from "@/components/global/Loading/TeamMember";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { UUID } from "crypto";

export function TeamForm() {
	const { toast } = useToast();
	const { teamInfo, hasTeam, isLoading: teamLoading, mutate: teamMutate, isLeader } = useTeamInfo();
	const { memberList, isLoading: teamMemberLoading, mutate: teamMemberMutate } = useTeamMemberList();
	const [inviteUserEmail, setInviteUserEmail, handleInviteUserEmail] = useVariable<string>("");
	const { invitationList, isLoading: invitationLoading, mutate: invitationMutate } = getInvitationReceiveList();
	const { invitationSendList, isLoading: invitationSendListLoading, mutate: invitationSendListMutate } = getInvitationSendList();
	const supabase = createClient();
	const onSettingUpdate = () => {};
	const onLeaveButtonClick = async () => {
		try {
			let axiosResult;
			if (isLeader) {
				const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/team/${teamInfo?.id}`);
				axiosResult = response.data;
			} else if (!isLeader) {
				const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/team/${teamInfo?.id}/exit`);
				axiosResult = response.data;
			}
			if (axiosResult.status === "succeed") {
				toast({
					title: "팀 탈퇴 완료",
					description: "팀에서 탈퇴되었습니다.",
				});
				// Force revalidation
				await teamMutate();
			} else {
				throw new Error("팀 탈퇴 실패");
			}
		} catch (error: any) {
			console.error("Error during team leave:", error.response.data.detail);
			toast({
				title: "팀 탈퇴 실패",
				description: "팀에서 탈퇴되지 않았습니다.",
			});
		}
	};

	const handleInviteUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Implement user invite logic
		// Once done, update the team info to reflect the changes
		try {
			await inviteUser(inviteUserEmail);

			toast({
				title: "유저 초대 완료",
				description: "유저가 초대되었습니다.",
			});
		} catch (error: any) {
			console.error(error);
			console.error(error.response.data.detail);
			let errorMessage = "";
			switch (error.response.data.detail) {
				case "400: Email not found":
					errorMessage = "해당 이메일을 가진 유저가 없습니다.";
					break;
				case "400: User already in team":
					errorMessage = "이미 팀에 속한 유저입니다.";
					break;
				case "403: Not a team leader":
					errorMessage = "팀장만 유저를 초대할 수 있습니다.";
					break;
			}
			toast({
				title: "유저 초대 실패",
				description: `유저가 초대되지 않았습니다. ${error.response.data.detail}`,
			});
		}
		teamMutate();
		invitationSendListMutate();
	};

	const onTransferButtonClick = async (newLeaderId: UUID) => {
		try {
			const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/team/${teamInfo?.id}/leader`, {
				next_leader_id: newLeaderId,
			});
			if (data.status === "succeed") {
				toast({
					title: "팀장 권한 이전 완료",
					description: "팀장 권한이 이전되었습니다.",
				});
				// Force revalidation
				await teamMutate();
			} else {
				throw new Error("팀장 권한 이전 실패");
			}
		} catch (error: any) {
			console.error("Error during team leader transfer:", error);
			toast({
				title: "팀장 권한 이전 실패",
				description: "팀장 권한이 이전되지 않았습니다.",
			});
		}
	};

	const onAcceptInvitation = async (invitationId: UUID, teamId: UUID) => {
		try {
			const { data } = await axios.patch(
				process.env.NEXT_PUBLIC_API_URL + `/user/team/${teamId}/accept`,
				{
					invite_id: invitationId,
				},
				{
					withCredentials: true,
				}
			);
			if (data.status !== "succeed") throw new Error("Failed to accept invitation");
			toast({
				title: "초대 수락 성공",
				description: "초대를 수락하였습니다.",
			});
			teamMutate();
			teamMemberMutate();
		} catch (error: any) {
			toast({
				title: "초대 수락 실패",
				description: "초대를 수락하지 못했습니다.",
			});
		}
	};

	const onDeclineInvitation = async (invitationId: UUID, teamId: UUID) => {
		try {
			const { data } = await axios.patch(
				process.env.NEXT_PUBLIC_API_URL + `/user/team/${teamId}/reject`,
				{
					invite_id: invitationId,
				},
				{
					withCredentials: true,
				}
			);
			if (data.status !== "succeed") throw new Error("Failed to accept invitation");
			toast({
				title: "초대 거절 성공",
				description: "초대를 거절하였습니다.",
			});
			invitationMutate();
		} catch (error: any) {
			toast({
				title: "초대 거절 실패",
				description: "초대를 거절하지 못했습니다.",
			});
		}
	};

	const onCancelInvite = async (invitationId: UUID) => {
		try {
			const { data } = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/user/team/invite/cancel`, {
				data: {
					invite_id: invitationId,
				},
				withCredentials: true,
			});
			if (data.status !== "succeed") throw new Error("Failed to accept invitation");
			toast({
				title: "초대 취소 성공",
				description: "초대를 취소하였습니다.",
			});
		} catch (error: any) {
			toast({
				title: "초대 취소 실패",
				description: "초대를 취소하지 못했습니다.",
			});
		} finally {
			invitationMutate();
			invitationSendListMutate();
		}
	};

	return (
		<>
			<div className="grid gap-4">
				<CreateTeamModal />
				<div className="grid items-center gap-4">
					<Label htmlFor="team-name">팀 이름</Label>
					<Input type="text" disabled defaultValue={"팀 이름"} id="team-name" value={teamLoading ? "정보를 불러오는 중입니다." : teamInfo?.name || "소속된 팀이 없습니다."} />
				</div>
				<div className="grid items-center gap-4">
					<Label htmlFor="team-uuid">팀 ID</Label>
					<div className="flex items-center gap-2">
						<Input type="text" disabled className="rounded-md  px-2 py-1 font-mono text-sm" value={teamLoading ? "정보를 불러오는 중입니다." : teamInfo?.id || "소속된 팀이 없습니다."} />
					</div>
				</div>
				<div className="grid items-center gap-4">
					<Label htmlFor="team-uuid">내 권한</Label>
					<div className="flex items-center gap-2">
						<Label className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
							{teamLoading ? "정보를 불러오는 중입니다." : !hasTeam ? "소속된 팀이 없습니다." : isLeader ? "팀 리더" : "팀원"}
						</Label>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-medium">팀 멤버 초대</h3>
					<form onSubmit={handleInviteUser}>
						<div className="mt-2 flex items-center gap-2">
							<Input
								placeholder="초대할 유저의 이메일 주소를 입력하세요."
								disabled={!isLeader}
								type="email"
								value={teamLoading ? "정보를 불러오는 중입니다." : isLeader ? inviteUserEmail : "팀 리더만 새로운 유저를 초대할 수 있습니다."}
								onChange={handleInviteUserEmail}
							/>
							<Button onClick={() => {}}>초대하기</Button>
						</div>
					</form>
				</div>
				{hasTeam && (
					<div>
						{isLeader && (
							<>
								<h3 className="text-lg font-medium">보낸 초대 목록</h3>
								<div className="mt-2 space-y-2">
									{teamMemberLoading && <TeamMemberLoading />}
									{invitationSendList &&
										invitationSendList.map((invitation: InvitationSendType) => (
											<div key={invitation.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 p-3 dark:border-gray-800 dark:bg-gray-800">
												<div className="flex items-center gap-3">
													<Avatar>
														<AvatarImage src="/avatars/01.png" />
														<AvatarFallback>dd</AvatarFallback>
													</Avatar>
													<div>
														<p className="text-sm font-medium">dd</p>
														<p className="text-sm text-gray-500 dark:text-gray-400">이메일</p>
													</div>
												</div>
												<Button size="sm" variant="ghost" onClick={() => onCancelInvite(invitation.id)}>
													초대 취소
												</Button>
											</div>
										))}
									{invitationSendList && invitationSendList.length === 0 && <Label className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">보낸 초대가 없습니다.</Label>}
								</div>
							</>
						)}

						<h3 className="text-lg font-medium">{isLeader ? "팀장 권한 이전" : "팀원"}</h3>
						<div className="mt-2 space-y-2">
							{teamMemberLoading && <TeamMemberLoading />}
							{memberList &&
								memberList.map((member: TeamMemberType) => (
									<div key={member.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 p-3 dark:border-gray-800 dark:bg-gray-800">
										<div className="flex items-center gap-3">
											<Avatar>
												<AvatarImage src="/avatars/01.png" />
												<AvatarFallback>{Array.from(member.last_name)[0]}</AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium">
													{member.last_name + " " + member.first_name} {member.id === teamInfo?.team_leader_id && "(팀 리더)"}
												</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
											</div>
										</div>
										{isLeader && member.id !== teamInfo?.team_leader_id && (
											<Button size="sm" variant="ghost" onClick={() => onTransferButtonClick(member.id)}>
												이전
											</Button>
										)}
									</div>
								))}
						</div>
					</div>
				)}
				{!hasTeam && (
					<div>
						<h3 className="text-lg font-medium">받은 초대 목록</h3>
						<div className="mt-2 space-y-2">
							{invitationLoading && <TeamMemberLoading />}
							{invitationList &&
								invitationList.map((invitation: InvitationReceiveType) => {
									return (
										<>
											<div key={invitation.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 p-3 dark:border-gray-800 dark:bg-gray-800">
												<div className="flex items-center gap-3">
													{/* <Avatar>
												<AvatarImage src="/avatars/01.png" />
												<AvatarFallback>{Array.from(member.last_name)[0]}</AvatarFallback>
											</Avatar> */}
													<div>
														<p className="text-sm font-medium">
															{invitation.team_name} (팀 리더:{" "}
															{invitation.team_leader?.first_name || invitation.team_leader?.last_name
																? invitation.team_leader?.first_name ?? "" + invitation.team_leader?.last_name ?? ""
																: "팀 리더 이름 정보 없음"}
															)
														</p>
														{/* <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p> */}
													</div>
												</div>
												<div>
													<Button
														size="sm"
														variant="ghost"
														onClick={() => {
															onAcceptInvitation(invitation.id, invitation.team_id);
														}}
													>
														수락
													</Button>
													<Button
														size="sm"
														variant="ghost"
														onClick={() => {
															onDeclineInvitation(invitation.id, invitation.team_id);
														}}
													>
														거절
													</Button>
												</div>
											</div>
										</>
									);
								})}
						</div>
					</div>
				)}
				{/* <Button className="" onClick={onSettingUpdate}>
					팀 설정 업데이트
				</Button> */}
				<Button disabled={!hasTeam} className="bg-red-500 hover:bg-red-700" onClick={onLeaveButtonClick}>
					팀 탈퇴
				</Button>
			</div>
		</>
	);
}
