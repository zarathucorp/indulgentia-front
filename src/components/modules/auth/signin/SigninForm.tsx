import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
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
					<Button variant="outline" className="w-full">
						Login with Google
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
