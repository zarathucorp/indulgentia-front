"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams, redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVariable } from "@/hooks/useVariable";
import { AuthSessionMissingError, AuthWeakPasswordError, AuthApiError } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
export default function ResetPassword() {
	const supabase = createClient();
	const router = useRouter();
	const { toast } = useToast();

	const [password1, , handlePassword1] = useVariable<string>("");
	const [password2, , handlePassword2] = useVariable<string>("");
	const [errorMessage, setErrorMessage] = useVariable<string>("");

	return (
		<Card className="mx-auto max-w-md">
			<CardHeader className="space-y-2">
				<CardTitle className="text-2xl font-bold">비밀번호 초기화</CardTitle>
				<CardDescription>변경할 비밀번호를 입력해주세요.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="password">새 비밀번호</Label>
					<Input id="password" placeholder="새 비밀번호" type="password" value={password1} onChange={handlePassword1} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="confirmPassword">비밀번호 확인</Label>
					<Input id="confirmPassword" placeholder="비밀번호 확인" type="password" value={password2} onChange={handlePassword2} />
				</div>
				<div>{<p className="text-red-500">{errorMessage}</p>}</div>
			</CardContent>
			<CardFooter>
				<Button
					onClick={async () => {
						setErrorMessage("");
						if (password1 === password2) {
							try {
								const { data, error } = await supabase.auth.updateUser({ password: password1 });
								console.log(data, error);
								if (error) throw error;

								toast({
									title: "비밀번호가 변경되었습니다.",
									description: "자동으로 로그인 되었습니다.",
								});
								router.push("/");
							} catch (error: any) {
								if (error.name === AuthSessionMissingError.name) {
									setErrorMessage("에러: 메일 발송 후 5분이 지났거나, 다른 브라우저에서 초기화를 시도하셨습니다. 초기화 링크를 다시 요청해주세요.");
								} else if (error.name === AuthWeakPasswordError.name) {
									setErrorMessage("에러: 비밀번호는 최소 6자리 이상이어야 합니다.");
								} else if (error.name === AuthApiError.name) {
									if (error.message === "Invalid JWT") {
										setErrorMessage("에러: 비밀번호 초기화 링크가 만료되었습니다. 비밀번호 초기화를 다시 시도해주세요.");
									} else if (error.message === "New password should be different from the old password.") {
										setErrorMessage(`에러: 비밀번호가 이전 비밀번호와 동일합니다. 다른 비밀번호를 입력해주세요.`);
									}
								} else {
									setErrorMessage("알 수 없는 에러: " + error);
									console.error(error);
								}
							}
						} else {
							setErrorMessage("비밀번호가 일치하지 않습니다.");
						}
					}}
				>
					비밀번호 재설정
				</Button>
			</CardFooter>
		</Card>
	);
}
