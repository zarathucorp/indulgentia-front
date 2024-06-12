"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UUID } from "crypto";
import { useVariable } from "@/hooks/useVariable";
import { KeyedMutator } from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ActionButton } from "@/components/ui/actionbutton";
type GithubRepoType = {
	id: UUID;
	bucket_id: UUID;
	git_repository: string;
	git_username: string;
	repo_url: string;
	user_id: UUID;
};

export function RemoveRepositoryModal({ repo, mutateConnectedGithubRepos }: { repo: GithubRepoType; mutateConnectedGithubRepos: KeyedMutator<any> }) {
	const { toast } = useToast();
	const [isOpen, setIsOpen] = useState(false); // State to manage modal open/close
	const disconnectRepository = async () => {
		try {
			const { data } = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${repo.bucket_id}/github_repo/${repo.id}`, { withCredentials: true });
			toast({
				title: "Repository 연결 해제",
				description: "Repository의 연결이 해제되었습니다.",
			});
			mutateConnectedGithubRepos();
			setIsOpen(false);
		} catch (e) {
			console.error(e);
			toast({
				title: "Repository 연결 해제 실패",
				description: "Repository의 연결 해제에 실패하였습니다.",
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" size="icon" variant="ghost">
					<TrashIcon className="w-5 h-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Repository 연결 해제</DialogTitle>
					<DialogDescription>Repository의 연결을 해제합니다. 이미 생성된 노트는 삭제되지 않습니다. 언제든지 이 페이지에서 다시 연결할 수 있습니다.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							삭제 대상
						</Label>
						<Label className="col-span-3">{repo.git_username + "/" + repo.git_repository} </Label>
					</div>
				</div>
				<DialogFooter>
					<ActionButton onClick={disconnectRepository}>삭제</ActionButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default function ConnectedGithubRepository({ connectedGithubRepos, mutateConnectedGithubRepos }: { connectedGithubRepos: GithubRepoType[]; mutateConnectedGithubRepos: KeyedMutator<any> }) {
	return (
		<>
			<div onClick={() => {}} className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">연결된 GitHub Repository</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
				{connectedGithubRepos.map((repo: GithubRepoType, index: number) => {
					return (
						<>
							<div className="bg-white rounded-lg shadow-md p-4" key={index}>
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-lg font-bold">{repo.git_repository}</h3>
										<p className="text-gray-500">{repo.git_username}</p>
									</div>
									<RemoveRepositoryModal repo={repo} mutateConnectedGithubRepos={mutateConnectedGithubRepos} />
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}

function TrashIcon(props: any) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 6h18" />
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
		</svg>
	);
}

export type { GithubRepoType };
