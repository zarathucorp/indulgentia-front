import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../login/submit-button";

export default function JoinForm() {
	const signUp = async (formData: FormData) => {
		// 유저가 이미 가입되어있는지 체크 필요함.
		"use server";

		const origin = headers().get("origin");
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		// console.log(email, password);
		const supabase = createClient();
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});
		console.log(data, error);
		if (error) {
			console.log(error);
			return redirect("/auth/login?message=Could not authenticate user");
		}

		return redirect("/auth/login?message=Check email to continue sign in process");
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">회원가입</CardTitle>
				<CardDescription>간편하게 회원가입하세요</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<form>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="last-name">성</Label>
								<Input id="last-name" name="last-name" placeholder="홍" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="first-name">이름</Label>
								<Input id="first-name" name="first-name" placeholder="길동" required />
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">이메일</Label>
							<Input id="email" name="email" type="email" placeholder="user@example.com" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">비밀번호</Label>
							<Input id="password" name="password" type="password" required />
						</div>
						<SubmitButton formAction={signUp} className="w-full outline" pendingText="Signing Up...">
							회원가입
						</SubmitButton>
					</form>
				</div>
				<div className="mt-4 text-center text-sm">
					이미 계정이 있으신가요?{" "}
					<Link href="/auth/login" className="underline">
						로그인
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
