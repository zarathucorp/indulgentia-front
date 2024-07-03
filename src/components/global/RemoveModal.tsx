"use client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { KeyedMutator } from "swr";
import { createClient } from "@/utils/supabase/client";
type removeType = "Project" | "Bucket" | "Note";
const removeTypeDescription = {
	Project: "프로젝트",
	Bucket: "버킷",
	Note: "노트",
};
// ErrorMessage component
function ErrorMessage({ message }: { message: string }) {
	return <p className="text-red-600">{message}</p>;
}

// ConfirmationInput component
function ConfirmationInput({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
	return <Input value={value} onChange={onChange} />;
}

// RemoveModalContent component
function RemoveModalContent({
	targetEntity,
	removeType,
	confirmEntityName,
	setConfirmEntityName,
	errorMessage,
	setErrorMessage,
	onRemoveConfirmed,
	parentUUID,
}: {
	targetEntity: string;
	removeType: removeType;
	confirmEntityName: string;
	setConfirmEntityName: (value: string) => void;
	errorMessage: string;
	setErrorMessage: (message: string) => void;
	onRemoveConfirmed: () => Promise<void>;
	parentUUID?: string;
}) {
	const { toast } = useToast();
	const router = useRouter();
	let redirectTo: string;

	// Remove Type에 따른 Redirect URL 설정
	switch (removeType) {
		case "Project":
			redirectTo = "/dashboard";
			break;
		case "Bucket":
			redirectTo = `/dashboard/project/${parentUUID}`;
			break;
		case "Note":
			redirectTo = `/dashboard/bucket/${parentUUID}`;
			break;
	}

	return (
		<>
			<DialogHeader>
				<p>
					<b className="text-red-600">삭제</b> - 이 작업은 되돌릴 수 없습니다.
				</p>
				<DialogDescription>
					<p>
						이 작업은 {removeTypeDescription[removeType]} &quot;{targetEntity}&quot;를 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없거나, 복구에 많은 비용이 발생합니다.
					</p>
					<p>
						삭제하려면 &quot;<b>{targetEntity}</b>&quot;라고 입력하십시오.
					</p>
				</DialogDescription>
			</DialogHeader>
			<div className="flex items-center space-x-2">
				<div className="grid flex-1 gap-2">
					<ConfirmationInput value={confirmEntityName} onChange={(e) => setConfirmEntityName(e.target.value)} />
					<ErrorMessage message={errorMessage} />
				</div>
			</div>
			<DialogFooter className="sm:justify-start">
				<Button
					type="button"
					variant="outline"
					onClick={async () => {
						try {
							if (confirmEntityName !== targetEntity) {
								throw new Error("입력한 값이 삭제할 대상과 일치하지 않습니다.");
							}
							await onRemoveConfirmed();
							toast({
								title: "삭제 완료",
								description: `${removeTypeDescription[removeType]} "${targetEntity}"의 삭제가 완료되었습니다.`,
							});
							router.push(redirectTo);
						} catch (e: any) {
							// setErrorMessage(e.message);
							toast({
								title: "삭제 실패",
								description: `${removeTypeDescription[removeType]} "${targetEntity}"의 삭제에 실패하였습니다. ${e.message}`,
							});
						}
					}}
				>
					삭제하기
				</Button>
			</DialogFooter>
		</>
	);
}

// Main RemoveModal component
export default function RemoveModal({
	targetEntity,
	removeType,
	onRemoveConfirmed,
	parentUUID,
}: {
	targetEntity: string;
	removeType: removeType;
	onRemoveConfirmed: () => Promise<void>;
	parentUUID?: string;
}) {
	const [confirmEntityName, setConfirmEntityName] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-red-500 hover:bg-red-700">{removeTypeDescription[removeType]} 삭제</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<RemoveModalContent
					targetEntity={targetEntity}
					removeType={removeType}
					confirmEntityName={confirmEntityName}
					setConfirmEntityName={setConfirmEntityName}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
					onRemoveConfirmed={onRemoveConfirmed}
					parentUUID={parentUUID}
				/>
			</DialogContent>
		</Dialog>
	);
}
import { TeamInfoType } from "@/hooks/fetch/useTeam";
export function LeaderTeamExitModal({ isOpen, setIsOpen, teamInfo, teamMutate }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>; teamInfo: TeamInfoType; teamMutate: KeyedMutator<any> }) {
	const [confirmEntityName, setConfirmEntityName] = useState<string>("");
	const { toast } = useToast();
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			{/* <DialogTrigger>
				<Button className="bg-red-500 hover:bg-red-700">{removeTypeDescription[removeType]} 삭제</Button>
			</DialogTrigger> */}
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>팀 삭제</DialogTitle>
					<DialogDescription>
						<p>팀을 삭제합니다. 팀과 팀에서 생성한 모든 데이터를 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없거나, 복구에 많은 비용이 발생합니다.</p>
						<p>
							삭제하려면 &quot;<b>{teamInfo.name}</b>&quot;라고 입력하십시오.
						</p>
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Input type="text" value={confirmEntityName} onChange={(e) => setConfirmEntityName(e.target.value)} />
				</div>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={async () => {
							try {
								if (teamInfo.name !== confirmEntityName) {
									throw new Error("입력한 값이 삭제할 대상과 일치하지 않습니다.");
								}
								const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/team/${teamInfo?.id}`);
								toast({
									title: "삭제 완료",
									description: `팀 ${teamInfo.name}의 삭제가 완료되었습니다.`,
								});
								teamMutate();
								setIsOpen(false);
							} catch (e: any) {
								toast({
									title: "삭제 실패",
									description: `팀 ${teamInfo.name}의 삭제가 실패하였습니다. ${e.message}`,
								});
							}
						}}
					>
						삭제하기
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
import { UserInfoType } from "@/hooks/fetch/useUser";
export function AccountRemoveModal({ isOpen, setIsOpen, userInfo, userMutate }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>; userInfo: UserInfoType; userMutate: KeyedMutator<any>  }) {
	const [confirmEntityName, setConfirmEntityName] = useState<string>("");
	const { toast } = useToast();
	const router = useRouter();
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			{/* <DialogTrigger>
				<Button className="bg-red-500 hover:bg-red-700">{removeTypeDescription[removeType]} 삭제</Button>
			</DialogTrigger> */}
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>계정 삭제</DialogTitle>
					<DialogDescription>
						<p>계정을 삭제합니다. 계정과 계정에서 생성한 모든 데이터를 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없거나, 복구에 많은 비용이 발생합니다.</p>
						<p>
							삭제하려면 &quot;<b>{userInfo.email}</b>&quot;라고 입력하십시오.
						</p>
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Input type="text" value={confirmEntityName} onChange={(e) => setConfirmEntityName(e.target.value)} />
				</div>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={async () => {
							try {
								const supabase = createClient();
								const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/remove`, { withCredentials: true });							

								const { error: signoutError } = await supabase.auth.signOut();
								// 로그아웃 후 계정 삭제; 필요 없을 수 있음
								if (response.status !== 200) {
									toast({
										title: "회원 탈퇴에 실패하였습니다.",
										description: `회원 탈퇴에 실패하였습니다: ${response.data.message}`,
									});
									throw new Error("계정 삭제에 실패하였습니다.");
								} else if (signoutError) {
									toast({
										title: "로그아웃에 실패하였습니다. 계정 삭제는 완료되었습니다.",
										description: `회원 탈퇴 후 로그아웃에 실패하였습니다: ${signoutError.message}`,
									});
								} else {
									toast({
										title: "회원 탈퇴에 성공하였습니다.",
										description: `회원 탈퇴에 성공하였습니다.`,
									});
								}
								console.log("Account remove successfully");
								userMutate();
								setIsOpen(false);
								router.push("/");
								return
							} catch (error) {
								console.error(error);
								toast({
									title: "회원 탈퇴에 실패하였습니다.",
									description: `회원 탈퇴에 실패하였습니다: ${error}`,
								});
							}
						}}
					>
						삭제하기
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}