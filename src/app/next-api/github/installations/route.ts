import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("token");
	const headers = {
		Authorization: `token ${token}`,
		Accept: "application/vnd.github.v3+json",
	};
	const installationsUrl = "https://api.github.com/user/installations";

	try {
		const response = await axios.get(installationsUrl, { headers });
		return new NextResponse(JSON.stringify(response.data), { status: 200 });
	} catch (error: any) {
		console.log(error);
		return new NextResponse(JSON.stringify({ error: `Failed to fetch installations: ${error}` }), { status: 500 });
	}
}
