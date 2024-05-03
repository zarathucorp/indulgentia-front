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
				<CardTitle>내 프로젝트</CardTitle>
				<CardDescription>Manage your products and view their sales performance.</CardDescription>
			</CardHeader>
			<CardContent>
				{/* 나중에 서버에서 데이터 받아서 map으로 */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>프로젝트 이름</TableHead>
							<TableHead>상태</TableHead>
							<TableHead className="hidden md:table-cell">연구책임자</TableHead>
							<TableHead className="hidden md:table-cell">참여 연구원 수</TableHead>
							<TableHead className="hidden md:table-cell">수행 시작일</TableHead>
							<TableHead className="hidden md:table-cell">수행 종료일</TableHead>
							<TableHead>
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							{projectList.map((project: ProjectType) => {
								return (
									<>
										<TableCell className="font-medium">{project.project_name}</TableCell>
										<TableCell>
											<Badge variant="outline">{project.project_status}</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell">{project.project_leader}</TableCell>
										<TableCell className="hidden md:table-cell">{project.project_members}</TableCell>
										<TableCell className="hidden md:table-cell">{project.project_peroid_start.toDateString()}</TableCell>
										<TableCell className="hidden md:table-cell">{project.project_peroid_end.toDateString()}</TableCell>
										<TableCell>
											<Button>
												<Link href={`/dashboard/project/${project.project_uuid}`}>관리</Link>
											</Button>
										</TableCell>
									</>
								);
							})}
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing&nbsp;
					{/* <strong>1-10</strong> of */}
					<strong>{projectList.length}</strong> product{projectList.length > 1 ? "s" : ""}
				</div>
			</CardFooter>
		</Card>
	);
}
