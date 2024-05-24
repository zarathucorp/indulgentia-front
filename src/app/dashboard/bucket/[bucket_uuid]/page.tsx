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
const noteListFetcher = async (url: string) => {
	const result = await axios.get(url, { withCredentials: true });
	console.log(result.data.data);
	if (result.status !== 200) {
		const error = new Error("An error occurred while fetching the data.");
		throw error;
	}
	return result.data.data;
};
const convertKST = (date: Date) => {
	const utcDate = date;

	const kstDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

	const year = kstDate.getFullYear();
	const month = String(kstDate.getMonth() + 1).padStart(2, "0");
	const day = String(kstDate.getDate()).padStart(2, "0");
	const hours = String(kstDate.getHours()).padStart(2, "0");
	const minutes = String(kstDate.getMinutes()).padStart(2, "0");
	const seconds = String(kstDate.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
						<div className="flex items-center justify-between">
							<div className="font-medium">노트 이름</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">작성자</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">작성 날짜</div>
							<div className="text-sm text-gray-500 dark:text-gray-400"></div>
						</div>
						<div className="grid gap-2">
							{data &&
								data.map((note: NoteType, index: number) => (
									<div key={index} className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
										<div>{note.title}</div>
										<div>{note.user_id}</div>
										<div>{convertKST(note.created_at)}</div>
										<div>{note.is_github ? note.github_type : null}</div>
										<div>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button aria-haspopup="true" size="icon" variant="ghost">
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">메뉴 열기</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<Link href={`/dashboard/note/${note.id}`}>
														<DropdownMenuItem>파일 보기</DropdownMenuItem>
													</Link>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
								))}
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
