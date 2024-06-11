import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserBadge() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		"use server";

		const supabase = createClient();
		await supabase.auth.signOut();
		return redirect("/auth/login");
	};
	return user ? (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" size="icon" className="rounded-full">
						<CircleUser className="h-5 w-5" />
						<span className="sr-only">유저 메뉴 열기</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>내 계정</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href="/setting">
						<DropdownMenuItem className="cursor-pointer">설정</DropdownMenuItem>
					</Link>
					<DropdownMenuItem className="cursor-pointer">고객지원</DropdownMenuItem>
					<DropdownMenuSeparator />
					<form action={signOut}>
						<button type="submit">
							<DropdownMenuItem className="cursor-pointer">로그아웃</DropdownMenuItem>
						</button>
					</form>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	) : (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" className="rounded-full">
					<CircleUser className="h-5 w-5" />
					<span className="sr-only">유저 메뉴 열기</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href="/auth/login" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
					<DropdownMenuItem className="cursor-pointer">로그인</DropdownMenuItem>
				</Link>
				{/* <DropdownMenuItem
				onClick={async () => {
					"use server";
					const supabase = createClient();
					await supabase.auth.signOut();
					return redirect("/auth/login/supabase");
				}}
			>
				로그아웃
			</DropdownMenuItem> */}
				{/* </form> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
