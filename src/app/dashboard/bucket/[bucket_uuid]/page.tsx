"use client";
import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, Fragment } from "react";
import { MoreHorizontal } from "lucide-react";
import { DateRange } from "react-day-picker";
import FileUploader from "@/components/global/FileUploader";
import NoteType from "@/types/NoteType";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
import { ErrorPage } from "@/components/global/Error/Error";
import NoteThumbnail from "./NoteThumbnail";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import convertKST from "@/utils/time/convertKST";
import { Label } from "@/components/ui/label";
import RemoveModal from "@/components/global/RemoveModal";
import { handleNoteRemove } from "../../note/[note_uuid]/handleNoteRemove";
const noteListFetcher = async (url: string) => {
	const result = await axios.get(url, { withCredentials: true });
	console.log(result.data.data);
	if (result.status !== 200) {
		const error = new Error("An error occurred while fetching the data.");
		throw error;
	}
	return result.data.data;
};

export default function Note() {
	const params = useParams<{ bucket_uuid: string }>();
	const { data, isValidating, error, mutate, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + `/dashboard/note/list/${params.bucket_uuid}`, noteListFetcher);
	const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${params.bucket_uuid}/breadcrumb`, async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		if (result.status !== 200) {
			const error = new Error("An error occurred while fetching the data.");
			throw error;
		}
		return result.data.data;
	});
	const defaultSelected: DateRange = {
		from: new Date(2024, 5, 1),
		to: new Date(),
	};
	const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultSelected);
	if (error)
		return (
			<>
				<ErrorPage error={error} reset={() => mutate()} />
			</>
		);
	return (
		<>
			<div className="py-3 pl-4">
				{isBreadcrumbLoading ? <DashboardBreadCrumbLoading type="Bucket" /> : <DashboardBreadCrumb breadcrumbData={{ level: "Bucket", bucket_id: params.bucket_uuid, ...breadcrumbData }} />}
			</div>
			<div className="grid xs:grid-cols-1 sm:grid-cols-[3fr_1fr] gap-6 p-6 sm:p-10 ">
				{/* <div>
				{data ??
					data.map((note: any, index: number) => {
						<p key={index}>{note}</p>;
					})}
			</div> */}
				<div className="space-y-4">
					<div className="grid gap-2">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							{data &&
								data.map((note: NoteType, index: number) => (
									<div key={note.id}>
										<Card className="">
											<CardHeader>
												<CardTitle>{note.title}</CardTitle>
												<CardDescription>노트 ID: {note.id}</CardDescription>
											</CardHeader>
											<CardContent>
												<form>
													<div className="grid w-full items-center gap-4">
														<div className="flex flex-col space-y-1.5">
															<Label htmlFor="name">생성일시 {convertKST(note.created_at)}</Label>
														</div>
														<div className="flex flex-col space-y-1.5">
															<Label htmlFor="name">작성자 {note.user_id}</Label>
														</div>
													</div>
												</form>
											</CardContent>
											<CardFooter className="flex justify-between">
												<RemoveModal targetEntity={note.title} removeType="Note" onRemoveConfirmed={() => handleNoteRemove(note.id)} parentUUID={params.bucket_uuid} />
												{/* <Button variant="outline">삭제</Button> */}
												<Link href={`/dashboard/note/${note.id}`}>
													<Button>노트 보기</Button>
												</Link>
											</CardFooter>
										</Card>
									</div>
								))}
							{data.length === 0 && <p>노트가 없습니다.</p>}
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<div>
						{/* <FileUploader /> */}
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
								조회할 날짜 범위를 선택하세요
							</Button>
						</PopoverTrigger>
						<PopoverContent align="center" className="w-auto p-0">
							<Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</>
	);
}

function CalendarDaysIcon(props: any) {
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
