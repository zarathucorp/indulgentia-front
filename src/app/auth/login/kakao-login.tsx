"use client";
import { Button } from "@/components/ui/button";
import { RiKakaoTalkFill } from "react-icons/ri";
import { createClient } from "@/utils/supabase/client";
const kakaoSignIn = async () => {
	// "use server";
	const supabase = createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "kakao",
		options: {
			// queryParams: {
			// 	access_type: "offline",
			// 	prompt: "consent",
			// },
			redirectTo: `${location.origin}/auth/callback`,
		},
	});
	console.log("data: \n", data, "error: \n", error);
};

export default function KakaoLoginButton() {
	return (
		<Button variant="outline" className="w-full">
			<RiKakaoTalkFill />
			&nbsp; Login with Kakao
		</Button>
	);
}
