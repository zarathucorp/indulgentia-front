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
export function SendPasswordResetMailModal() {
	const { toast } = useToast();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [isSending, setIsSending] = useState<boolean>(false);
	const [resetPasswordEmail, setHandleResetPasswordEmail, handleResetPasswordEmail] = useVariable<string>("");

	const sendResetEmail = async () => {
		const supabase = createClient();
		const { data, error } = await supabase.auth.resetPasswordForEmail(resetPasswordEmail, {
			redirectTo: process.env.NEXT_PUBLIC_FRONTEND_URL + "/auth/resetpassword",
		});
		if (!error) {
			toast({
				title: "메일이 발송되었습니다.",
				description: "입력하신 이메일에서 비밀번호 초기화 링크를 확인해주세요.",
			});

			setOpenModal(false);
		} else {
			toast({
				title: "메일 발송에 실패하였습니다.",
				description: `에러가 발생했습니다. ${error.message}`,
			});
		}

		setIsSending(false);
	};

	return (
		<>
			<Dialog open={openModal} onOpenChange={setOpenModal}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>비밀번호 초기화</DialogTitle>
						<DialogDescription>비밀번호를 초기화할 이메일을 입력한 후, 아래 비밀번호 초기화를 클릭하세요. 메일을 발송한 브라우저에서 링크를 클릭해야 합니다.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								이메일
							</Label>
							<Input type="email" id="email" placeholder="user@example.com" className="col-span-3" value={resetPasswordEmail} onChange={handleResetPasswordEmail} />
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={() => {
								setIsSending(true);
								sendResetEmail();
							}}
							type="button"
						>
							{isSending && (
								<>
									<Spinner />
									&nbsp;
								</>
							)}
							비밀번호 초기화
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Button
				onClick={(e) => {
					e.preventDefault();
					setHandleResetPasswordEmail("");
					setOpenModal(true);
				}}
				className="text-black hover:text-black bg-transparent hover:bg-transparent outline-none p-0"
				type="button"
			>
				비밀번호 초기화
			</Button>
		</>
	);
}
