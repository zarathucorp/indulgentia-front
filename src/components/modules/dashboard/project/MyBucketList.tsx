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
				<CardTitle className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
					<div className="col-span-1">내 버킷</div>
					<Link href={`/dashboard/project/${projectId}/setting`} className="col-start-2 md:col-start-3 xl:col-start-5">
						<Button className="w-full righ">프로젝트 설정</Button>
					</Link>
					<Link href={`/dashboard/bucket/create?project=${projectId}`} className="col-start-3 md:col-start-4 xl:col-start-6">
						<Button className="w-full righ">새 버킷</Button>
					</Link>
				</CardTitle>
				<CardDescription>버킷 목록입니다.</CardDescription>
			</CardHeader>
			<CardContent>
				{/* 나중에 서버에서 데이터 받아서 map으로 */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>내 버킷</TableHead>
							<TableHead className="hidden md:table-cell">상태</TableHead>
							<TableHead className="hidden md:table-cell">버킷 매니저</TableHead>
							<TableHead className="hidden xl:table-cell">GitHub 연결</TableHead>
							{/* <TableHead className="hidden xl:table-cell"></TableHead> */}
							{/* <TableHead className="hidden md:table-cell">수행 기간</TableHead> */}
							<TableHead>
								<span className="sr-only">관리 버튼</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bucketList.map((bucket: BucketType) => {
							return (
								<TableRow key={bucket.id}>
									<TableCell className="font-medium">{bucket.title}</TableCell>
									<TableCell className="hidden md:table-cell">
										<Badge variant="outline">{bucket.bucket_status}</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell">{bucket.bucket_owner}</TableCell>
									<TableCell className="hidden xl:table-cell">{bucket.has_github ? <Link href={bucket.has_github && "https://www.zarathu.com"}>예</Link> : "아니오"}</TableCell>
									{/* <TableCell className="hidden xl:table-cell">dd</TableCell> */}
									<TableCell>
										<Link href={`/dashboard/bucket/${bucket.id}`}>
											<Button className="w-full">보기/관리</Button>
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
