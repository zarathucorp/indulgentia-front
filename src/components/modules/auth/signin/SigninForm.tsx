import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
export default function LoginForm() {
	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">로그인</CardTitle>
				<CardDescription>이메일과 비밀번호를 통해 로그인하기</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="ml-auto inline-block text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<Separator />
					<CardDescription>외부 계정으로 로그인하기</CardDescription>
					<Button variant="outline" className="w-full">
						<FaGoogle />
						&nbsp; Login with Google
					</Button>
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
	);
}
