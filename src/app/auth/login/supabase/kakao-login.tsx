"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
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
		<Button onClick={kakaoSignIn} className="w-full">
			&nbsp; Login with Kakao
		</Button>
	);
}
