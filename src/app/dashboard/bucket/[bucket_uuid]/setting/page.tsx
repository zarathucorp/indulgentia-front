"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { UUID } from "crypto";
import { useParams } from "next/navigation";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useToast } from "@/components/ui/use-toast";
import { EditBucketForm, CreateBucketFormValues } from "@/components/modules/dashboard/bucket/BucketForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RemoveRepositoryModal, GithubRepoType } from "./ConnectedGithubRepository";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";

// 타입 정의
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

// API 요청을 위한 fetcher 함수
const fetcher = (url: string) => axios.get(url).then((res) => res.data.data.github_token);

// GitHub 설치 및 Repository 선택 컴포넌트
const InstallationRepoSelector: React.FC<{
	setGitUsername: React.Dispatch<React.SetStateAction<string>>;
	setGitRepository: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setGitUsername, setGitRepository }) => {
	const { data: token, error: tokenError, isLoading: isTokenLoading } = useSWRImmutable<string>(`${process.env.NEXT_PUBLIC_API_URL}/user/settings/github/token`, fetcher);
	const [selectedInstallation, setSelectedInstallation] = useState<number | null>(null);
	const [repos, setRepos] = useState<Repo[]>([]);
	const [installations, setInstallations] = useState<Installation[]>([]);
	const [isGetRepoLoading, setIsGetRepoLoading] = useState<boolean>(false);

	useEffect(() => {
		if (token) {
			axios
				.get(`/next-api/github/installations?token=${token}`)
				.then((response) => setInstallations(response.data.installations))
				.catch((error) => console.error("Error fetching installations:", error));
		}
	}, [token]);

	useEffect(() => {
		if (selectedInstallation && token) {
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

	if (isTokenLoading) return <p>Loading token...</p>;
	if (tokenError) return <p>No github account is connected to this account</p>;

	return (
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
	);
};

// 메인 BucketSetting 컴포넌트
const BucketSetting: React.FC = () => {
	const params = useParams<{ bucket_uuid: UUID }>();
	const [gitUsername, setGitUsername] = useState<string>("");
	const [gitRepository, setGitRepository] = useState<string>("");
	const { toast } = useToast();

	// 버킷 정보 fetch
	const {
		data: bucketInfo,
		isLoading: isLoadingBucketInfo,
		mutate: mutateBucketInfo,
	} = useSWRImmutable<CreateBucketFormValues & { id: UUID }>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}`, async (url: string) => {
		const { data } = await axios.get(url);
		return data.data;
	});

	// breadcrumb 정보 fetch
	const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}/breadcrumb`, async (url: string) => axios.get(url).then((res) => res.data.data));

	// 연결된 GitHub 저장소 fetch
	const {
		data: connectedGithubRepos,
		isLoading: isLoadingConnectedGithubRepos,
		mutate: mutateConnectedGithubRepos,
	} = useSWRImmutable(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}/github_repo`, async (url: string) => {
		const { data } = await axios.get(url);
		return data.data;
	});

	// GitHub 저장소 연결 함수
	const handleConnectRepository = async () => {
		if (!gitUsername || !gitRepository) {
			toast({
				title: "GitHub Repository 연동 실패",
				description: "GitHub Repository를 선택해주세요.",
			});
			return;
		}

		const createNewRepo = {
			bucket_id: params.bucket_uuid,
			repo_url: `https://github.com/${gitUsername}/${gitRepository}`,
			git_username: gitUsername,
			git_repository: gitRepository,
		};

		// 이미 연결된 저장소인지 확인
		const hasMatchingRepo = (repos: GithubRepoType[], username: string, repository: string) =>
			repos.some((repo) => repo.git_username.toLowerCase() === username.toLowerCase() && repo.git_repository.toLowerCase() === repository.toLowerCase());

		try {
			if (connectedGithubRepos && hasMatchingRepo(connectedGithubRepos, gitUsername, gitRepository)) {
				throw new Error("이미 해당 GitHub Repository가 연동되어 있습니다.");
			}

			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}/github_repo`, createNewRepo);
			toast({
				title: "GitHub Repository 연동 성공",
				description: "GitHub Repository 연동에 성공하였습니다.",
			});
			mutateConnectedGithubRepos();
		} catch (error: any) {
			console.error(error);
			toast({
				title: "GitHub Repository 연동 실패",
				description: `GitHub Repository 연동에 실패하였습니다. ${error?.response?.data?.detail ?? error.message}`,
			});
		}
	};

	return (
		<div>
			<div className="py-3 pl-4">
				{isBreadcrumbLoading ? <DashboardBreadCrumbLoading type="Bucket" /> : <DashboardBreadCrumb breadcrumbData={{ level: "Bucket", bucket_id: params.bucket_uuid, ...breadcrumbData }} />}
			</div>
			{isLoadingBucketInfo ? <p>Loading...</p> : bucketInfo && <EditBucketForm bucketInfo={bucketInfo} mutate={mutateBucketInfo} />}
			<div className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">GitHub Repository 연동</h1>
			</div>
			<div className="grid gap-6 max-w-6xl w-full mx-auto">
				<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
					<InstallationRepoSelector setGitUsername={setGitUsername} setGitRepository={setGitRepository} />
					<Button onClick={handleConnectRepository}>Repository 연동</Button>
				</div>
			</div>
			<div className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">연동된 GitHub Repository</h1>
			</div>
			{!isLoadingConnectedGithubRepos && connectedGithubRepos && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-6xl">
					{connectedGithubRepos.map((repo: GithubRepoType) => (
						<div className="bg-white rounded-lg shadow-md p-4" key={repo.id}>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-bold">{repo.git_repository}</h3>
									<p className="text-gray-500">{repo.git_username}</p>
								</div>
								<RemoveRepositoryModal repo={repo} mutateConnectedGithubRepos={mutateConnectedGithubRepos} />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default BucketSetting;
