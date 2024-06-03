"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

import { CreateTeamModal } from "./CreateTeamModal";
import { useTeamInfo, useTeamMemberList } from "@/hooks/fetch/useTeam";
import { TeamMemberType } from "@/hooks/fetch/useTeam";
import { useVariable } from "@/hooks/useVariable";
import { TeamMemberLoading } from "@/components/global/Loading/TeamMember";

export function TeamForm() {
	const onLeaveButtonClick = () => {};
	// const { toast } = useToast();
	const { teamInfo, hasTeam, isLoading: teamLoading } = useTeamInfo();
	const { memberList, isLoading: teamMemberLoading } = useTeamMemberList();
	const [inviteUserEmail, setInviteUserEmail, handleInviteUserEmail] = useVariable<string>("");
	const handleInviteUser = () => {};

	return (
		// 최초 가입시 팀 없음 -> 팀 생성 또는 기존 팀에 소속되기를 기다림
		// 팀 생성시 -> 팀 이름/기관명(옵션) 등. 팀장은 만든사람 고정
		// 팀 관리 -> 유저 초대 -> 팀에 소속되지 않았으면서 초대 받으면 다음 로그인시 수락여부 체크. 거절시 취소/수락시 팀 소속, 그 후부터 대시보드 등 볼 수 있음.
		// 팀장: 다른 유저가 있으면 탈퇴 불가. 다른 유저에게 팀장 넘기고 팀 탈퇴 가능. 다른 팀원 없으면 탈퇴가능.
		// 유저: 팀 탈퇴 가능.
		<>
			<div className="grid gap-4">
				<CreateTeamModal />
				{/* <div className="relative w-max">
					<select className={cn(buttonVariants({ variant: "outline" }), "w-[200px] appearance-none font-normal")}>
						<option value="inter">Inter</option>
						<option value="manrope">Manrope</option>
						<option value="system">System</option>
					</select>
					<ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
				</div> */}
				<div className="grid items-center gap-4">
					<Label htmlFor="team-name">팀 이름</Label>
					<Input defaultValue={"팀 이름"} id="team-name" value={teamLoading ? "정보를 불러오는 중입니다." : teamInfo?.name || "소속된 팀이 없습니다."} />
				</div>

				<div className="grid items-center gap-4">
					<Label htmlFor="team-uuid">팀 ID</Label>
					<div className="flex items-center gap-2">
						<Input
							type="text"
							disabled
							className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800"
							value={teamLoading ? "정보를 불러오는 중입니다." : teamInfo?.id || "소속된 팀이 없습니다."}
						/>
						{/* <Button size="sm" variant="ghost">
							Copy
						</Button> */}
					</div>
				</div>
				<div>
					<h3 className="text-lg font-medium">팀 멤버 초대</h3>
					<div className="mt-2 flex items-center gap-2">
						<Input placeholder="초대할 유저의 이메일 주소를 입력하세요." value={inviteUserEmail} onChange={handleInviteUser} />
						<Button onClick={handleInviteUser}>초대하기</Button>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-medium">팀장 권한 이전</h3>
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
											<p className="text-sm font-medium">{member.last_name + " " + member.first_name}</p>
											<p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
										</div>
									</div>
									<Button size="sm" variant="ghost">
										이전
									</Button>
								</div>
							))}
					</div>
				</div>
				<Button className="bg-red-500 hover:bg-red-700" onClick={onLeaveButtonClick}>
					팀 탈퇴
				</Button>
			</div>
		</>
	);
}
