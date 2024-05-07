"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
const googleSignIn = async () => {
	// "use server";
	const supabase = createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
			redirectTo: `${location.origin}/auth/callback`,
		},
	});
	console.log("data: \n", data, "error: \n", error);
};

export default function GoogleLoginButton() {
	return (
		<Button onClick={googleSignIn} className="w-full">
			<FaGoogle />
			&nbsp; Login with Google
		</Button>
	);
}
