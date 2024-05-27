"use client";
import { EditBucketForm, CreateBucketFormValues } from "@/components/modules/dashboard/bucket/BucketForm";
import axios from "axios";
import { UUID } from "crypto";
import ConnectGithubRepository from "./ConnectGithubRepository";
import { useParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVariable } from "@/hooks/useVariable";
export default function BucketSetting() {
	const params = useParams<{ bucket_uuid: UUID }>();
	const [newRepo, setNewRepo, handleNewRepo] = useVariable<string>("");

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
						<Input className="bg-white md:flex-1 dark:bg-gray-950" placeholder="username/repository의 형태로 입력" type="text" value={newRepo} onChange={handleNewRepo} />
						<Button
							onClick={async () => {
								const [git_username, git_repository] = newRepo.split("/");
								const createNewRepo = {
									bucket_id: params.bucket_uuid,
									repo_url: `https://github.com/${git_username}/${git_repository}`,
									git_username: git_username,
									git_repository: git_repository,
								};

								console.log(createNewRepo);
								try {
									const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${params.bucket_uuid}/github_repo`, createNewRepo, { withCredentials: true });
								} catch (error) {
									console.error(error);
								}

								mutateConnectedGithubRepos();
							}}
						>
							Repository 연결
						</Button>
					</div>
					<div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100" />
				</div>
				{!isLoadingConnectedGithubRepos && connectedGithubRepos && <ConnectGithubRepository connectedGithubRepos={connectedGithubRepos} />}
			</div>
		</>
	);
}
