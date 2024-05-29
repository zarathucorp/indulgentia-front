import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";

// Define the structure of the repository data
interface Repository {
	id: number;
	name: string;
	full_name: string;
	private: boolean;
	// Add other relevant fields as needed
}

interface RepositoriesResponse {
	repositories: Repository[];
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const installation_id = searchParams.get("installation_id");
	const { GITHUB_APP_ID, GITHUB_PRIVATE_KEY } = process.env;

	const generateJWT = (): string => {
		const payload = {
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + 600,
			iss: GITHUB_APP_ID,
		};
		return jwt.sign(payload, GITHUB_PRIVATE_KEY!.replace(/\\n/g, "\n"), { algorithm: "RS256" });
	};

	const jwtToken = generateJWT();
	console.log(jwtToken);
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
		let allRepositories: Repository[] = [];
		let page = 1;
		let reposResponse: { data: RepositoriesResponse };

		do {
			reposResponse = await axios.get(reposUrl, { headers: repoHeaders, params: { page, per_page: 100 } });
			allRepositories = allRepositories.concat(reposResponse.data.repositories);
			page++;
		} while (reposResponse.data.repositories.length === 100);

		// Sort allRepositories by the 'name' property
		allRepositories.sort((a, b) => a.name.localeCompare(b.name));

		allRepositories.forEach((repo: Repository) => console.log(repo.name));
		return new NextResponse(JSON.stringify({ repositories: allRepositories }), { status: 200 });
	} catch (error) {
		console.error("Error fetching repositories:", error);
		return new NextResponse(JSON.stringify({ error: "Failed to fetch repositories" }), { status: 500 });
	}
}
