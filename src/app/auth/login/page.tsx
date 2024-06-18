"use client";

import { createClient } from "@/utils/supabase/client";

import SubmitButton from "./submit-button";
import GoogleLoginButton from "./google-login";
import KakaoLoginButton from "./kakao-login";
import Link from "next/link";
import SigninForm from "@/components/modules/auth/signin/SigninForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/global/Spinner";
import { FaGoogle } from "react-icons/fa";
import { SendPasswordResetMailModal } from "./SendPasswordResetMailModal";
import { useEffect } from "react";
import signIn from "./signin";
import { useToast } from "@/components/ui/use-toast";
export default function SigninPage({ searchParams }: { searchParams: { message: string } }) {
	const { toast } = useToast();
	useEffect(() => {
		setTimeout(() => {
			console.log(searchParams.message);
			if (searchParams.message === "Check email to continue sign in process") {
				toast({
					title: "이메일을 인증해주세요",
					description: "메일로 전송된 링크를 클릭하여 이메일을 인증해주세요. 반드시 이 브라우저에서 링크를 클릭해주세요.",
				});
			} else if (searchParams.message === "Could not authenticate user") {
				toast({
					title: "로그인에 실패하였습니다.",
					description: "이메일과 비밀번호를 정확히 확인해주세요",
				});
			} else if (searchParams.message === undefined) {
				return;
			} else {
				toast({
					title: "알 수 없는 상황입니다.",
					description: decodeURI(searchParams.message),
				});}
		}, 0);
	}, [searchParams.message]);

	return (
		<>
			<div className="pt-10">
				{/* <ShowToast message={searchParams.message} /> */}
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">로그인</CardTitle>

						<CardDescription>이메일과 비밀번호를 통해 로그인하기</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<form>
								<div className="grid gap-2">
									<Label htmlFor="email">이메일</Label>
									<Input id="email" type="email" placeholder="user@example.com" required name="email" />
								</div>
								<div className="grid gap-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="password">비밀번호</Label>
										<SendPasswordResetMailModal />
									</div>
									<Input name="password" id="password" type="password" required />
								</div>

								<SubmitButton formAction={signIn} className="w-full outline mt-2" pendingText="Signing In...">
									로그인
								</SubmitButton>
								<Link href="/auth/join">
									<SubmitButton className="w-full outline mt-2" pendingText="Signing Up...">
										회원가입
									</SubmitButton>
								</Link>
							</form>
							<Separator />
							<CardDescription>외부 계정으로 로그인하기</CardDescription>
							<GoogleLoginButton />
							{/* <KakaoLoginButton /> */}
						</div>
						<div className="mt-4 text-center text-sm">
							계졍이 없으신가요?{" "}
							<Link href="/auth/join" className="underline">
								회원가입
							</Link>
							하기
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
