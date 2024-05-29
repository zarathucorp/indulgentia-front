import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("token");
	const installation_id = searchParams.get("installation_id");
	const { GITHUB_APP_ID, GITHUB_PRIVATE_KEY } = process.env;

	const generateJWT = () => {
		const payload = {
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + 600,
			iss: GITHUB_APP_ID,
		};
		return jwt.sign(payload, GITHUB_PRIVATE_KEY!.replace(/\\n/g, "\n"), { algorithm: "RS256" });
	};

	const jwtToken = generateJWT();
	const headers = {
		Authorization: `Bearer ${jwtToken}`,
		Accept: "application/vnd.github.v3+json",
	};
	const accessTokenUrl = `https://api.github.com/app/installations/${installation_id}/access_tokens`;

	try {
		const response = await axios.post(accessTokenUrl, {}, { headers });
		const installationToken = response.data.token;

		const repoHeaders = {
			Authorization: `token ${installationToken}`,
			Accept: "application/vnd.github.v3+json",
		};
		const reposUrl = "https://api.github.com/installation/repositories";
		const reposResponse = await axios.get(reposUrl, { headers: repoHeaders });

		return new NextResponse(JSON.stringify(reposResponse.data), { status: 200 });
	} catch (error) {
		return new NextResponse(JSON.stringify({ error: "Failed to fetch repositories" }), { status: 500 });
	}
}
