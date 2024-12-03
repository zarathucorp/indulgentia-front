"use client";
import { useEffect, useState } from "react";
import { useTeamInfo } from "@/hooks/fetch/useTeam";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BucketType from "@/types/BucketType";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BucketdownloadForm from "@/components/modules/dashboard/project/BucketdownloadForm";
import { Wrench } from 'lucide-react';

export default function MyBucketList({ bucketList, projectId }: { bucketList: BucketType[]; projectId: string }) {
  const [toggleDownload, setToggleDownload] = useState(false);
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]);
  const { isLeader } = useTeamInfo();

  // 버킷 클릭 핸들러
  const handleBucketClick = (bucketId: string) => {
    setSelectedBuckets((prevSelectedBuckets) => {
      const newSelectedBuckets = prevSelectedBuckets.includes(bucketId)
        ? prevSelectedBuckets.filter((id) => id !== bucketId)
        : [...prevSelectedBuckets, bucketId];
      return newSelectedBuckets;
    });
  };

  // toggleDownload 상태 변경 핸들러
  const handleToggleDownload = () => {
    setToggleDownload((prevToggleDownload) => {
      if (prevToggleDownload) {
        setSelectedBuckets([]);
      }
      return !prevToggleDownload;
    });
  };

  // 전체 선택 함수
  const handleSelectAll = () => {
    if (bucketList) {
      if (selectedBuckets.length === bucketList.length) {
        setSelectedBuckets([]);
      } else {
        const allBucketIds = bucketList.map(bucket => bucket.id);
        setSelectedBuckets(allBucketIds);
      }
    }
  };

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
						<div className="col-span-1">내 버킷</div>
						{isLeader ? (<Link href={`/dashboard/project/${projectId}/setting`} className="col-start-2 md:col-start-3 xl:col-start-5">
							<Button variant={"outline"} className="w-full pr-[40px]"><Wrench/>&nbsp;프로젝트 설정</Button>
						</Link>) : (
							null
						)}
						<Link href={`/dashboard/bucket/create?project=${projectId}`} className="col-start-3 md:col-start-4 xl:col-start-6">
							<Button className="w-full ">새 버킷</Button>
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
								<TableHead className="hidden xl:table-cell">GitHub 연동</TableHead>
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
									<TableRow
										key={bucket.id}
										className={cn(
											`${selectedBuckets.includes(bucket.id) ? "bg-blue-100" : ""}`,
											`${toggleDownload ? "cursor-pointer" : ""}`,
											`${toggleDownload && selectedBuckets.includes(bucket.id) ? "hover:bg-blue-100" : ""}`
										)}
										onClick={() => toggleDownload && handleBucketClick(bucket.id)}
									>
										<TableCell className="font-medium relative">
											{toggleDownload && selectedBuckets.includes(bucket.id) && (
												<Badge className="absolute top-0 left-0">{selectedBuckets.indexOf(bucket.id) + 1}</Badge>
											)}
											{bucket.title}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											<Badge variant="outline">활성</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{!bucket.manager_first_name && !bucket.manager_last_name ? "이름 미설정" : (bucket.manager_last_name ?? "") + (bucket.manager_first_name ?? "")}
										</TableCell>
										<TableCell className="hidden xl:table-cell">{bucket.gitrepos === null ? "아니오" : "예"}</TableCell>
										<TableCell>
											{toggleDownload ? (
												<Button disabled className="w-full">보기/관리</Button>
											) : (
												<Link href={`/dashboard/bucket/${bucket.id}`}>
													<Button className="w-full">보기/관리</Button>
												</Link>
											)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
					<div className="text-xs text-muted-foreground col-span-1">
						전체 <strong>{bucketList.length}</strong>개 항목
					</div>
					<Button onClick={handleToggleDownload} className="col-span-2 col-start-3 md:col-start-4 xl:col-start-6">버킷 다운로드</Button>
				</CardFooter>
			</Card>
				{toggleDownload ? (
					<div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/75 text-gray-50">
						<div className="flex items-center justify-between">
							<div className="flex-1">선택된 노트: <strong>{selectedBuckets.length}</strong> 개</div>
							<div className="flex space-x-2">
								<Button onClick={handleSelectAll}>
									{selectedBuckets.length === bucketList?.length ? "전체 선택 해제" : "전체 선택"}
								</Button>
								<Dialog>
									<DialogTrigger asChild disabled={selectedBuckets.length === 0}>
										<Button disabled={selectedBuckets.length === 0}>다운로드</Button>
									</DialogTrigger>
									<DialogContent className="max-w-[300px]">
										<DialogHeader>
											<DialogTitle>다운로드 설정</DialogTitle>
											<DialogDescription></DialogDescription>
										</DialogHeader>
										<BucketdownloadForm selectedBuckets={selectedBuckets} />
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
