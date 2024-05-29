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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
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
const InstallationRepoSelector = ({ setGitUsername, setGitRepository }: { setGitUsername: Dispatch<SetStateAction<string>>; setGitRepository: Dispatch<SetStateAction<string>> }) => {
	const token = "ghu_1pubJW2q7XqVdaM11nPJJAgR2FaBHc4YhEXc";
	const [selectedInstallation, setSelectedInstallation] = useState<number | null>(null);
	const [repos, setRepos] = useState<Repo[]>([]);
	const [isGetRepoLoading, setIsGetRepoLoading] = useState<boolean>(false);
	// const token = searchParams.get("token");
	const [installations, setInstallations] = useState<Installation[]>([]);

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

	useEffect(() => {
		console.log(token, selectedInstallation);
		if (selectedInstallation) {
			setIsGetRepoLoading(true);
			axios
				.get(`/next-api/github/repos?token=${token}&installation_id=${selectedInstallation?.toString()}`)
				.then((response) => {
					setRepos(response.data.repositories);
					setIsGetRepoLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching repositories:", error);
				});
		}
	}, [selectedInstallation]);

	function getGitHubUsernameById(targetId: number) {
		for (let installation of installations) {
			if (installation.id === targetId) {
				return installation.account.login;
			}
		}
		return ""; // Return null if no matching id is found
	}
	function getGitHubRepoById(targetId: number) {
		for (let repo of repos) {
			if (repo.id === targetId) {
				return repo.name;
			}
		}
		return ""; // Return null if no matching id is found
	}

	return (
		<>
			<Select
				onValueChange={(value) => {
					setSelectedInstallation(parseInt(value));
					setGitUsername(getGitHubUsernameById(parseInt(value)));
				}}
			>
				<SelectTrigger className="">
					<SelectValue placeholder="GitHub 계정(Organization을 선택하세요)" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{installations.map((installation: Installation) => (
							<SelectItem value={installation.id.toString()} key={installation.account.login}>
								{installation.account.login}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select
				disabled={isGetRepoLoading || selectedInstallation === null}
				onValueChange={(value) => {
					setGitRepository(getGitHubRepoById(parseInt(value)));
				}}
			>
				<SelectTrigger className="">
					<SelectValue placeholder={isGetRepoLoading ? "Repository를 불러오는 중입니다." : "Repository를 선택하세요."} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{repos.map((repo) => (
							<SelectItem value={repo.id.toString()}>{repo.name}</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
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
	} = useSWRImmutable<CreateBucketFormValues & { id: UUID }>(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${params.bucket_uuid}`, async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		console.log("버켓 정보", data);
		return data.data;
	});

	const {
		data: connectedGithubRepos,
		isLoading: isLoadingConnectedGithubRepos,
		mutate: mutateConnectedGithubRepos,
	} = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${params.bucket_uuid}/github_repo`, async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		console.log("깃허브 연결정보", data.data);
		return data.data;
	});

	return (
		<>
			{/* 깃허브 연동부분 */}
			<div>
				<p>깃허브 연동</p>
				<p>일단 원시적으로 id/repo 입력하도록</p>
				{isLoadingBucketInfo ? <p>Loading...</p> : bucketInfo && <EditBucketForm bucketInfo={bucketInfo} mutate={mutateBucketInfo} />}
				<div className="max-w-6xl w-full mx-auto grid gap-2">
					<h1 className="font-semibold text-3xl">GitHub Repository 연결</h1>
				</div>
				<div className="grid gap-6 max-w-6xl w-full mx-auto">
					<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
						<InstallationRepoSelector setGitUsername={setGitUsername} setGitRepository={setGitRepository} />
						<Button
							onClick={async () => {
								if (!git_username || !git_repository) {
									toast({
										title: "GitHub Repository 연결 실패",
										description: "GitHub Repository를 선택해주세요.",
									});
									return;
								}

								console.log(git_username, git_repository);
								const createNewRepo = {
									bucket_id: params.bucket_uuid,
									repo_url: `https://github.com/${git_username}/${git_repository}`,
									git_username: git_username,
									git_repository: git_repository,
								};

								console.log(createNewRepo);
								try {
									const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${params.bucket_uuid}/github_repo`, createNewRepo, { withCredentials: true });
									toast({
										title: "GitHub Repository 연결 성공",
										description: "GitHub Repository 연결에 성공하였습니다.",
									});
								} catch (error: any) {
									console.error(error);
									toast({
										title: "GitHub Repository 연결 실패",
										description: error.message,
									});
								}

								mutateConnectedGithubRepos();
							}}
						>
							Repository 연결
						</Button>
					</div>
					<div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100" />
				</div>
				{!isLoadingConnectedGithubRepos && connectedGithubRepos && <ConnectedGithubRepository connectedGithubRepos={connectedGithubRepos} />}
			</div>
		</>
	);
}
