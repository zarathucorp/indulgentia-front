"use client";
import { EditBucketForm, CreateBucketFormValues } from "@/components/modules/dashboard/bucket/BucketForm";
import axios from "axios";
import { UUID } from "crypto";
import ConnectedGithubRepository from "./ConnectedGithubRepository";
import { useParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVariable } from "@/hooks/useVariable";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useToast } from "@/components/ui/use-toast";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data.github_token);

const InstallationRepoSelector = ({ setGitUsername, setGitRepository }: { setGitUsername: Dispatch<SetStateAction<string>>; setGitRepository: Dispatch<SetStateAction<string>> }) => {
	const { data: token, error: tokenError, isLoading: isTokenLoading } = useSWRImmutable<string>(`${process.env.NEXT_PUBLIC_API_URL}/user/settings/github/token`, fetcher);
	const [selectedInstallation, setSelectedInstallation] = useState<number | null>(null);
	const [repos, setRepos] = useState<Repo[]>([]);
	const [isGetRepoLoading, setIsGetRepoLoading] = useState<boolean>(false);
	const [installations, setInstallations] = useState<Installation[]>([]);

	useEffect(() => {
		console.log(token);
		if (token) {
			axios
				.get(`/next-api/github/installations?token=${token}`)
				.then((response) => setInstallations(response.data.installations))
				.catch((error) => console.error("Error fetching installations:", error));
		}
	}, [token]);

	useEffect(() => {
		if (selectedInstallation) {
			setIsGetRepoLoading(true);
			axios
				.get(`/next-api/github/repos?token=${token}&installation_id=${selectedInstallation}`)
				.then((response) => setRepos(response.data.repositories))
				.catch((error) => console.error("Error fetching repositories:", error))
				.finally(() => setIsGetRepoLoading(false));
		}
	}, [selectedInstallation, token]);

	const getGitHubUsernameById = (targetId: number) => installations.find((installation) => installation.id === targetId)?.account.login || "";

	const getGitHubRepoById = (targetId: number) => repos.find((repo) => repo.id === targetId)?.name || "";

	return (
		<>
			{isTokenLoading ? (
				<p>Loading token...</p>
			) : tokenError ? (
				<p>No github account is connected to this account</p>
			) : (
				<>
					<Select
						onValueChange={(value) => {
							const id = parseInt(value);
							setSelectedInstallation(id);
							setGitUsername(getGitHubUsernameById(id));
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="GitHub 계정(Organization을 선택하세요)" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{installations.map((installation) => (
									<SelectItem value={installation.id.toString()} key={installation.account.login}>
										{installation.account.login}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Select disabled={isGetRepoLoading || selectedInstallation === null} onValueChange={(value) => setGitRepository(getGitHubRepoById(parseInt(value)))}>
						<SelectTrigger>
							<SelectValue placeholder={isGetRepoLoading ? "Repository를 불러오는 중입니다." : "Repository를 선택하세요."} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{repos.map((repo) => (
									<SelectItem value={repo.id.toString()} key={repo.id}>
										{repo.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</>
			)}
		</>
	);
};

export default function BucketSetting() {
	const params = useParams<{ bucket_uuid: UUID }>();
	const [git_username, setGitUsername] = useVariable<string>("");
	const [git_repository, setGitRepository] = useVariable<string>("");
	const { toast } = useToast();

	const {
		data: bucketInfo,
		isLoading: isLoadingBucketInfo,
		mutate: mutateBucketInfo,
	} = useSWRImmutable<CreateBucketFormValues & { id: UUID }>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}`, async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		return data.data;
	});

	const {
		data: connectedGithubRepos,
		isLoading: isLoadingConnectedGithubRepos,
		mutate: mutateConnectedGithubRepos,
	} = useSWRImmutable(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}/github_repo`, async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		return data.data;
	});

	const handleConnectRepository = async () => {
		if (!git_username || !git_repository) {
			toast({
				title: "GitHub Repository 연결 실패",
				description: "GitHub Repository를 선택해주세요.",
			});
			return;
		}

		const createNewRepo = {
			bucket_id: params.bucket_uuid,
			repo_url: `https://github.com/${git_username}/${git_repository}`,
			git_username,
			git_repository,
		};

		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}/github_repo`, createNewRepo, { withCredentials: true });
			toast({
				title: "GitHub Repository 연결 성공",
				description: "GitHub Repository 연결에 성공하였습니다.",
			});
			mutateConnectedGithubRepos();
		} catch (error: any) {
			console.error(error);
			toast({
				title: "GitHub Repository 연결 실패",
				description: error.message,
			});
		}
	};

	return (
		<div>
			{isLoadingBucketInfo ? <p>Loading...</p> : bucketInfo && <EditBucketForm bucketInfo={bucketInfo} mutate={mutateBucketInfo} />}
			<div className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">GitHub Repository 연결</h1>
			</div>
			<div className="grid gap-6 max-w-6xl w-full mx-auto">
				<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
					<InstallationRepoSelector setGitUsername={setGitUsername} setGitRepository={setGitRepository} />
					<Button onClick={handleConnectRepository}>Repository 연결</Button>
				</div>
				<div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100" />
			</div>
			{!isLoadingConnectedGithubRepos && connectedGithubRepos && <ConnectedGithubRepository connectedGithubRepos={connectedGithubRepos} mutateConnectedGithubRepos={mutateConnectedGithubRepos} />}
		</div>
	);
}
