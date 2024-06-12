import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
	const supabase = createClient();

	// Assuming you have a way to get the user ID from the request (e.g., from cookies or headers)
	const {
		data: { user },
		error: sessionError,
	} = await supabase.auth.getUser();
	if (sessionError || !user) {
		return NextResponse.redirect(process.env.NEXT_PUBLIC_FRONTEND_URL + "/auth/login");
	}

	// Retrieve the GitHub token from your database
	const cookies = req.headers.get("cookie");
	const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/settings/github/token", {
		headers: {
			Cookie: cookies || "", // Ensure cookies are included, even if empty
		},
	});

	if (!data.data.github_token) {
		return new NextResponse(JSON.stringify({ error: "GitHub token not found" }), { status: 403 });
	}

	try {
		// Use the token to get user info from GitHub
		const githubUserInfo = await axios.get("https://api.github.com/user", {
			headers: {
				Authorization: `token ${data.data.github_token}`,
				Accept: "application/vnd.github.v3+json",
			},
		});
		// console.log(githubUserInfo.data);
		return new NextResponse(JSON.stringify(githubUserInfo.data), { status: 200 });
	} catch (error: any) {
		console.error("Error fetching GitHub user info:", error.response?.data || error.message);
		return new NextResponse(JSON.stringify({ error: "Failed to fetch GitHub user info" }), { status: 500 });
	}
}
