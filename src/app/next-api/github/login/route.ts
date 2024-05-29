import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { GITHUB_CLIENT_ID, REDIRECT_URI } = process.env;
	const githubAuthorizeUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user,repo`;
	return NextResponse.redirect(githubAuthorizeUrl);
}
