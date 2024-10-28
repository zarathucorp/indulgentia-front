"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 로케일 추가
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
import { ErrorPage } from "@/components/global/Error/Error";
import RemoveModal from "@/components/global/RemoveModal";
import { NoNote } from "@/components/global/NoContent";

import { handleNoteRemove } from "../../note/[note_uuid]/handleNoteRemove";
import convertKST from "@/utils/time/convertKST";
import NoteType from "@/types/NoteType";
import { maskUUID } from "@/lib/utils";

// API fetcher 함수
const fetcher = async (url: string) => {
	const result = await axios.get(url);
	if (result.status !== 200) {
		throw new Error("An error occurred while fetching the data.");
	}
	return result.data.data;
};

export default function Note() {
	const params = useParams<{ bucket_uuid: string }>();
	const [dateRange, setDateRange] = useState<DateRange | undefined>();

	// SWR을 사용한 데이터 fetching
	const { data: notes, error: noteError, mutate: mutateNoteList } = useSWR<NoteType[]>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/note/list/${params.bucket_uuid}`, fetcher);

	const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/bucket/${params.bucket_uuid}/breadcrumb`, fetcher);

	// 날짜 범위 선택 핸들러
	const handleDateRangeSelect = useCallback((range: DateRange | undefined) => {
		setDateRange(range);
	}, []);

	// 날짜 범위에 따른 노트 필터링
	const filteredNotes =
		dateRange?.from && dateRange?.to
			? notes?.filter((note) => {
					const noteDate = new Date(note.created_at);
					return noteDate >= dateRange.from! && noteDate <= dateRange.to!;
				})
			: notes;

	// 선택된 날짜 범위를 한국어로 표시하는 함수
	const formatDateRange = (range: DateRange | undefined) => {
		if (!range?.from) return "조회할 날짜 범위를 선택하세요";
		if (!range.to) return format(range.from, "yyyy년 MM월 dd일", { locale: ko });
		return `${format(range.from, "yyyy년 MM월 dd일", { locale: ko })} - ${format(range.to, "yyyy년 MM월 dd일", { locale: ko })}`;
	};

	if (noteError) return <ErrorPage error={noteError} reset={() => mutateNoteList()} />;

	return (
		<>
			<div className="py-3 pl-4">
				{isBreadcrumbLoading ? <DashboardBreadCrumbLoading type="Bucket" /> : <DashboardBreadCrumb breadcrumbData={{ level: "Bucket", bucket_id: params.bucket_uuid, ...breadcrumbData }} />}
			</div>
			<div className="grid xs:grid-cols-1 sm:grid-cols-[3fr_1fr] gap-6 p-6 sm:p-10 ">
				<div className="space-y-4">
					<div className="grid gap-2">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{filteredNotes?.map((note: NoteType) => (
								<Card key={note.id}>
									<CardHeader>
										<CardTitle>{note.title}</CardTitle>
										<CardDescription>노트 ID: {maskUUID(note.id)}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid w-full items-center gap-4">
											<div className="flex flex-col space-y-1.5">
												<Label>생성일시: {convertKST(note.created_at)}</Label>
											</div>
											<div className="flex flex-col space-y-1.5">
												<Label>작성자: {note.user_id}</Label>
											</div>
										</div>
									</CardContent>
									<CardFooter className="flex justify-between">
										<RemoveModal
											targetEntity={note.title}
											removeType="Note"
											onRemoveConfirmed={async () => {
												await handleNoteRemove(note.id);
												await mutateNoteList();
											}}
											parentUUID={params.bucket_uuid}
										/>
										<Link href={`/dashboard/note/${note.id}`}>
											<Button>노트 보기</Button>
										</Link>
									</CardFooter>
								</Card>
							))}
						</div>
						{filteredNotes?.length === 0 && <NoNote />}
					</div>
				</div>
				<div className="space-y-4">
					<div>
						<Link href={`/dashboard/note/create?bucket=${params.bucket_uuid}`}>
							<Button className="w-full">노트 생성</Button>
						</Link>
						<Link href={`/dashboard/bucket/${params.bucket_uuid}/setting`}>
							<Button className="w-full">버킷 설정</Button>
						</Link>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button className="w-full justify-start text-left font-normal" variant="outline">
								<CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
								{formatDateRange(dateRange)}
							</Button>
						</PopoverTrigger>
						<PopoverContent align="center" className="w-auto p-0">
							<Calendar
								mode="range"
								selected={dateRange}
								onSelect={handleDateRangeSelect}
								initialFocus
								locale={ko} // 캘린더에 한국어 로케일 적용
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</>
	);
}

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M8 2v4" />
			<path d="M16 2v4" />
			<rect width="18" height="18" x="3" y="4" rx="2" />
			<path d="M3 10h18" />
			<path d="M8 14h.01" />
			<path d="M12 14h.01" />
			<path d="M16 14h.01" />
			<path d="M8 18h.01" />
			<path d="M12 18h.01" />
			<path d="M16 18h.01" />
		</svg>
	);
}
