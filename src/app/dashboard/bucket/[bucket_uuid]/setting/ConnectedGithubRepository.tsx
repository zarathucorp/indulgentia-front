"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UUID } from "crypto";
import { useVariable } from "@/hooks/useVariable";
import { KeyedMutator } from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type GithubRepoType = {
	id: UUID;
	bucket_id: UUID;
	git_repository: string;
	git_username: string;
	repo_url: string;
	user_id: UUID;
};

export default function ConnectedGithubRepository({ connectedGithubRepos }: { connectedGithubRepos: GithubRepoType[] }) {
	return (
		<>
			<div onClick={() => {}} className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">연결된 GitHub Repository</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{connectedGithubRepos.map((repo: GithubRepoType, index: number) => {
					return (
						<>
							<div className="bg-white rounded-lg shadow-md p-4" key={index}>
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-lg font-bold">{repo.git_repository}</h3>
										<p className="text-gray-500">{repo.user_id}</p>
									</div>
									<Button className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" size="icon" variant="ghost">
										<TrashIcon className="w-5 h-5" />
									</Button>
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
