import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BucketType from "@/types/BucketType";
import Link from "next/link";

export default function MyBucketList({ bucketList }: { bucketList: BucketType[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>내 Bucket</CardTitle>
				<CardDescription>Manage your products and view their sales performance.</CardDescription>
			</CardHeader>
			<CardContent>
				{/* 나중에 서버에서 데이터 받아서 map으로 */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>내 Bucket</TableHead>
							<TableHead>상태</TableHead>
							<TableHead className="hidden md:table-cell">Bucket 매니저</TableHead>
							<TableHead className="hidden md:table-cell">GitHub 연결</TableHead>
							{/* <TableHead className="hidden md:table-cell">수행 기간</TableHead> */}
							<TableHead>
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bucketList.map((bucket: BucketType) => {
							return (
								<>
									<TableRow>
										<TableCell className="font-medium">{bucket.bucket_name}</TableCell>
										<TableCell>
											<Badge variant="outline">{bucket.bucket_status}</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell">{bucket.bucket_owner}</TableCell>
										<TableCell className="hidden md:table-cell">{bucket.has_github ? <Link href={bucket.github_link}>예</Link> : "아니오"}</TableCell>
										<TableCell>
											<Button>
												<Link href={`/dashboard/bucket/${bucket.bucket_uuid}`}>관리</Link>
											</Button>
										</TableCell>
									</TableRow>
								</>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing <strong>1-10</strong> of <strong>32</strong> products
				</div>
			</CardFooter>
		</Card>
	);
}
