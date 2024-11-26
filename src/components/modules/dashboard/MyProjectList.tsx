"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import ProjectType from "@/types/ProjectType";
import ProjectdownloadForm from "./ProjectdownloadForm";
import { cn } from "@/lib/utils";

export default function MyProjectList({ projectList }: { projectList: ProjectType[] }) {
  const [toggleDownload, setToggleDownload] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // 버킷 클릭 핸들러
  const handleProjectClick = (projectId: string) => {
    setSelectedProjects((prevselectedProjects) => {
      const newselectedProjects = prevselectedProjects.includes(projectId)
        ? prevselectedProjects.filter((id) => id !== projectId)
        : [...prevselectedProjects, projectId];
      return newselectedProjects;
    });
  };

  // toggleDownload 상태 변경 핸들러
  const handleToggleDownload = () => {
    setToggleDownload((prevToggleDownload) => {
      if (prevToggleDownload) {
        setSelectedProjects([]);
      }
      return !prevToggleDownload;
    });
  };

  // 전체 선택 함수
  const handleSelectAll = () => {
    if (projectList) {
      if (selectedProjects.length === projectList.length) {
        setSelectedProjects([]);
      } else {
        const allprojectIds = projectList.map(project => project.id);
        setSelectedProjects(allprojectIds);
      }
    }
  };
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
						<div className="col-span-1">내 프로젝트</div>
						<Link href="/dashboard/project/create" className="col-start-3 md:col-start-4 xl:col-start-6">
							<Button className="w-full righ">새 프로젝트</Button>
						</Link>
					</CardTitle>
					<CardDescription>프로젝트 목록입니다.</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>프로젝트 이름</TableHead>
								<TableHead className="hidden md:table-cell">연구책임자</TableHead>
								<TableHead className="hidden md:table-cell">과제번호</TableHead>
								<TableHead className="hidden xl:table-cell">연구 시작일</TableHead>
								<TableHead className="hidden xl:table-cell">연구 종료일</TableHead>
								<TableHead>
									<span className="sr-only">관리 버튼</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projectList.map((project: ProjectType) => (
								<TableRow
									key={project.id}
									className={cn(
										`${selectedProjects.includes(project.id) ? "bg-blue-100" : ""}`,
										`${toggleDownload ? "cursor-pointer" : ""}`,
										`${toggleDownload && selectedProjects.includes(project.id) ? "hover:bg-blue-100" : ""}`
									)}
									onClick={() => toggleDownload && handleProjectClick(project.id)}
								>
									<TableCell className="font-medium relative">
										{toggleDownload && selectedProjects.includes(project.id) && (
											<Badge className="absolute top-0 left-0">{selectedProjects.indexOf(project.id) + 1}</Badge>
										)}
										{project.title}
									</TableCell>
									<TableCell className="hidden md:table-cell">{project.project_leader}</TableCell>
									<TableCell className="hidden md:table-cell">{project.grant_number}</TableCell>
									<TableCell className="hidden xl:table-cell">{typeof project.start_date === "string" ? project.start_date : null}</TableCell>
									<TableCell className="hidden xl:table-cell">{typeof project.end_date === "string" ? project.end_date : null}</TableCell>
									<TableCell>
										{toggleDownload ? (
											<Button disabled className="w-full">보기/관리</Button>
										) : (
											<Link href={`/dashboard/project/${project.id}`}>
												<Button className="w-full">보기/관리</Button>
											</Link>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
					<div className="text-xs text-muted-foreground col-span-1">
						전체 <strong>{projectList.length}</strong>개 항목
					</div>
					<Button onClick={handleToggleDownload} className="col-span-2 col-start-3 md:col-start-4 xl:col-start-6">프로젝트 다운로드</Button>
				</CardFooter>
			</Card>
				{toggleDownload ? (
					<div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/75 text-gray-50">
						<div className="flex items-center justify-between">
							<div className="flex-1">선택된 노트: <strong>{selectedProjects.length}</strong> 개</div>
							<div className="flex space-x-2">
								<Button onClick={handleSelectAll}>
									{selectedProjects.length === projectList?.length ? "전체 선택 해제" : "전체 선택"}
								</Button>
								<Dialog>
									<DialogTrigger asChild disabled={selectedProjects.length === 0}>
										<Button disabled={selectedProjects.length === 0}>다운로드</Button>
									</DialogTrigger>
									<DialogContent className="max-w-[300px]">
										<DialogHeader>
											<DialogTitle>다운로드 설정</DialogTitle>
											<DialogDescription></DialogDescription>
										</DialogHeader>
										<ProjectdownloadForm selectedProjects={selectedProjects} />
									</DialogContent>
								</Dialog>
								<Button variant={"destructive"} onClick={handleToggleDownload}>취소</Button>
							</div>
						</div>
					</div>
				) : null}
		</>
	);
}
