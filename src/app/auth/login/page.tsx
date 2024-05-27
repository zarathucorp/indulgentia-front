import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
export default function SigninPage({ searchParams }: { searchParams: { message: string } }) {
	const signIn = async (formData: FormData) => {
		"use server";

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const supabase = createClient();

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return redirect("/auth/login?message=Could not authenticate user");
		}

		return redirect("/dashboard");
	};

	const signUp = async (formData: FormData) => {
		"use server";

		const origin = headers().get("origin");
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const supabase = createClient();
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			console.log(error);
			return redirect("/auth/login?message=Could not authenticate user");
		}

		return redirect("/auth/login?message=Check email to continue sign in process");
	};
	return (
		<>
			<div className="pt-10">
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

								<SubmitButton formAction={signIn} className="w-full outline" pendingText="Signing In...">
									로그인
								</SubmitButton>
								<Link href="/auth/join">
									<SubmitButton className="w-full outline" pendingText="Signing Up...">
										회원가입
									</SubmitButton>
								</Link>
							</form>
							<Separator />
							<CardDescription>외부 계정으로 로그인하기</CardDescription>
							<GoogleLoginButton />
							<KakaoLoginButton />
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
