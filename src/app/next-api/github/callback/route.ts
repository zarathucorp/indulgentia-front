import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const code = searchParams.get("code");
	const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, REDIRECT_URI } = process.env;

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

		return NextResponse.redirect(`https://dev.rndsillog.com/github/select-repo?token=${access_token}`);
	} catch (error: any) {
		console.error("Error exchanging code for access token:", error.response?.data || error.message);
		return new NextResponse(JSON.stringify({ error: "Failed to exchange code for access token" }), { status: 500 });
	}
}
