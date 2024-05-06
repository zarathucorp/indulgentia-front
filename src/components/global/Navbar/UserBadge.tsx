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
		return redirect("/auth/login/supabase");
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
					<DropdownMenuItem>
						<Link href="/setting">설정</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>고객지원</DropdownMenuItem>
					<DropdownMenuSeparator />
					{/* <form action={signOut}> */}
					<form action={signOut}>
						<button>Logout</button>
					</form>
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
		</>
	) : (
		<Link href="/auth/login/supabase" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
			Login
		</Link>
	);
}