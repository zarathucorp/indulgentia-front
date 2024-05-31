import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { createClient } from "@/utils/supabase/server";
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const code = searchParams.get("code");
	const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, REDIRECT_URI } = process.env;

	const supabase = createClient();

	const { data: user, error } = await supabase.auth.getUser();
	if (error) return NextResponse.redirect("/auth/login");

	const tokenUrl = "https://github.com/login/oauth/access_token";
	const headers = { Accept: "application/json" };
	const data = {
		client_id: GITHUB_CLIENT_ID,
		client_secret: GITHUB_CLIENT_SECRET,
		code,
		redirect_uri: REDIRECT_URI,
	};

	try {
		console.log("Requesting access token with code:", code);
		const response = await axios.post(tokenUrl, data, { headers });
		console.log("Response from GitHub:", response.data);
		const { access_token } = response.data;

		if (!access_token) {
			throw new Error("No access token received");
		}

		const cookies = req.headers.get("cookie");
		const patchResult = await axios.patch(
			process.env.NEXT_PUBLIC_API_URL + "/user/settings/github/token",
			{
				token: access_token,
			},
			{
				headers: {
					Cookie: cookies || "", // Ensure cookies are included, even if empty
				},
			}
		);

		return NextResponse.redirect(`https://dev.rndsillog.com/github/select-repo?token=${access_token}`);
	} catch (error: any) {
		console.error("Error exchanging code for access token:", error.response?.data || error.message);
		return new NextResponse(JSON.stringify({ error: "Failed to exchange code for access token" }), { status: 500 });
	}
}
