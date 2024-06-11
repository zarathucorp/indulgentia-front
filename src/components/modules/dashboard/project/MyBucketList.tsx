import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BucketType from "@/types/BucketType";
import Link from "next/link";

export default function MyBucketList({ bucketList, projectId }: { bucketList: BucketType[]; projectId: string }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="grid grid-cols-6">
					<div className="col-start-1 col-span-2">내 버킷</div>
					<div className="col-start-5 col-span-1">
						<Link href={`/dashboard/bucket/create?project=${projectId}`}>
							<Button>새 버킷</Button>
						</Link>
					</div>
					<div className="col-start-6 col-span-1">
						<Link href={`/dashboard/project/${projectId}/setting`}>
							<Button>프로젝트 설정</Button>
						</Link>
					</div>
				</CardTitle>
				<CardDescription>Manage your products and view their sales performance.</CardDescription>
			</CardHeader>
			<CardContent>
				{/* 나중에 서버에서 데이터 받아서 map으로 */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>내 버킷</TableHead>
							<TableHead>상태</TableHead>
							<TableHead className="hidden md:table-cell">버킷 매니저</TableHead>
							<TableHead className="hidden md:table-cell">GitHub 연결</TableHead>
							{/* <TableHead className="hidden md:table-cell">수행 기간</TableHead> */}
							<TableHead>
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bucketList.map((bucket: BucketType, index: number) => {
							return (
								<TableRow key={index}>
									<TableCell className="font-medium">{bucket.title}</TableCell>
									<TableCell>
										<Badge variant="outline">{bucket.bucket_status}</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell">{bucket.bucket_owner}</TableCell>
									<TableCell className="hidden md:table-cell">{bucket.has_github ? <Link href={bucket.has_github && "https://www.zarathu.com"}>예</Link> : "아니오"}</TableCell>
									<TableCell>
										<Link href={`/dashboard/bucket/${bucket.id}`}>
											<Button>관리</Button>
										</Link>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					전체 <strong>{bucketList.length}</strong>개 항목
				</div>
			</CardFooter>
		</Card>
	);
}
