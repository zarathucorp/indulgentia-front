import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import ProjectType from "@/types/ProjectType";

export default function MyProjectList({ projectList }: { projectList: ProjectType[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="grid grid-cols-6">
					<div className="col-span-2">내 프로젝트</div>
					<Link href="/dashboard/project/create" className="col-start-6">
						<Button>새 프로젝트</Button>
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
							<TableHead className="hidden md:table-cell">수행 시작일</TableHead>
							<TableHead className="hidden md:table-cell">수행 종료일</TableHead>
							<TableHead>
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{projectList.map((project: ProjectType, index: number) => (
							<TableRow key={index}>
								<TableCell className="font-medium">{project.title}</TableCell>
								<TableCell className="hidden md:table-cell">{project.project_leader}</TableCell>
								<TableCell className="hidden md:table-cell">{project.grant_number}</TableCell>
								<TableCell className="hidden md:table-cell">{typeof project.start_date === "string" ? project.start_date : null}</TableCell>
								<TableCell className="hidden md:table-cell">{typeof project.end_date === "string" ? project.end_date : null}</TableCell>
								<TableCell>
									<Link href={`/dashboard/project/${project.id}`}>
										<Button>관리</Button>
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					전체 <strong>{projectList.length}</strong>개 항목
				</div>
			</CardFooter>
		</Card>
	);
}
