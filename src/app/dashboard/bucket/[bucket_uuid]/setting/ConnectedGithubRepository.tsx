"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ActionButton } from "@/components/ui/actionbutton";
import axios from "axios";
import { KeyedMutator } from "swr";
import { UUID } from "crypto";

// GitHub 저장소 타입 정의
export interface GithubRepoType {
	id: UUID;
	bucket_id: UUID;
	git_repository: string;
	git_username: string;
	repo_url: string;
	user_id: UUID;
}

// 저장소 제거 모달 컴포넌트
interface RemoveRepositoryModalProps {
	repo: GithubRepoType;
	mutateConnectedGithubRepos: KeyedMutator<any>;
}

export const RemoveRepositoryModal: React.FC<RemoveRepositoryModalProps> = ({ repo, mutateConnectedGithubRepos }) => {
	const { toast } = useToast();
	const [isOpen, setIsOpen] = useState(false);

	// 저장소 연결 해제 함수
	const disconnectRepository = async () => {
		try {
			await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${repo.bucket_id}/github_repo/${repo.id}`);
			toast({
				title: "Repository 연결 해제",
				description: "Repository의 연결이 해제되었습니다.",
			});
			mutateConnectedGithubRepos();
			setIsOpen(false);
		} catch (e: any) {
			console.error(e);
			toast({
				title: "Repository 연결 해제 실패",
				description: `Repository의 연결 해제에 실패하였습니다. ${e.response?.data?.detail ?? e.message}`,
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
						<Label className="col-span-3">{`${repo.git_username}/${repo.git_repository}`}</Label>
					</div>
				</div>
				<DialogFooter>
					<ActionButton onClick={disconnectRepository}>삭제</ActionButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// 연결된 GitHub 저장소 컴포넌트
interface ConnectedGithubRepositoryProps {
	connectedGithubRepos: GithubRepoType[];
	mutateConnectedGithubRepos: KeyedMutator<any>;
}

const ConnectedGithubRepository: React.FC<ConnectedGithubRepositoryProps> = ({ connectedGithubRepos, mutateConnectedGithubRepos }) => {
	return (
		<>
			<div className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">연결된 GitHub Repository</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
				{connectedGithubRepos.map((repo: GithubRepoType) => (
					<div className="bg-white rounded-lg shadow-md p-4" key={repo.id.toString()}>
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
		</>
	);
};

// 휴지통 아이콘 컴포넌트
interface TrashIconProps extends React.SVGProps<SVGSVGElement> {}

const TrashIcon: React.FC<TrashIconProps> = (props) => {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 6h18" />
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
		</svg>
	);
};

export default ConnectedGithubRepository;
