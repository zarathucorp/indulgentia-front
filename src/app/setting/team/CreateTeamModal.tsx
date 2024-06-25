"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useVariable } from "@/hooks/useVariable";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/global/Spinner";
import { createTeam, useTeamInfo } from "@/hooks/fetch/useTeam";
import { ActionButton } from "@/components/ui/actionbutton";
import useSWRImmutable from "swr/immutable";
export function CreateTeamModal() {
	const { toast } = useToast();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [teamName, setTeamName, handleTeamName] = useVariable<string>("");
	const [orgName, setOrgName, handleOrgName] = useVariable<string>("");
	const { hasTeam, mutate } = useTeamInfo();
	return (
		<>
			<Dialog open={openModal} onOpenChange={setOpenModal}>
				<DialogTrigger asChild>
					<Button variant="outline" disabled={hasTeam}>
						팀 생성
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>팀 생성</DialogTitle>
						<DialogDescription>
							팀을 생성합니다. 팀 생성자는 팀장이 되며, 다른 팀원을 초대할 수 있습니다. 팀원이 있는 경우 팀을 탈퇴할 수 없습니다(단, 다른 팀원에게 팀장 권한을 이전하는 경우 가능).
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="text" className="text-right">
								팀 이름
							</Label>
							<Input type="text" id="team_name" placeholder="개발팀" className="col-span-3" value={teamName} onChange={handleTeamName} />
						</div>
						{/* <div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="text" className="text-right">
								조직
							</Label>
							<Input type="text" id="org_name" placeholder="연구실록" className="col-span-3" value={orgName} onChange={handleOrgName} />
						</div> */}
					</div>
					<DialogFooter>
						<ActionButton
							onClick={async () => {
								try {
									await createTeam(teamName);

									toast({
										title: "팀 생성 성공",
										description: `팀 ${teamName}이 생성되었습니다.`,
									});

									mutate();
									setOpenModal(false);
								} catch (e: any) {
									toast({
										title: "팀 생성 실패",
										description: `팀 생성에 실패하였습니다: ${e.message}`,
									});
								}
							}}
						>
							팀 생성
						</ActionButton>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
