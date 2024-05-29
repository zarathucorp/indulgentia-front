"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

interface Installation {
	id: number;
	account: {
		login: string;
	};
}

interface Repo {
	id: number;
	name: string;
}

const SelectRepo = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [installations, setInstallations] = useState<Installation[]>([]);
	const [repos, setRepos] = useState<Repo[]>([]);

	useEffect(() => {
		if (token) {
			axios
				.get(`/next-api/github/installations?token=${token}`)
				.then((response) => {
					setInstallations(response.data.installations);
				})
				.catch((error) => {
					console.error("Error fetching installations:", error);
				});
		}
	}, [token]);

	const fetchRepos = (installationId: number) => {
		axios
			.get(`/next-api/github/repos?token=${token}&installation_id=${installationId}`)
			.then((response) => {
				setRepos(response.data.repositories);
			})
			.catch((error) => {
				console.error("Error fetching repositories:", error);
			});
	};

	return (
		<div>
			<h1>Select a Repository</h1>
			<h2>Installations</h2>
			<ul>
				{installations.map((installation) => (
					<li key={installation.id} onClick={() => fetchRepos(installation.id)}>
						{installation.account.login}
					</li>
				))}
			</ul>
			<h2>Repositories</h2>
			<ul>
				{repos.map((repo) => (
					<li key={repo.id}>{repo.name}</li>
				))}
			</ul>
		</div>
	);
};

export default SelectRepo;
