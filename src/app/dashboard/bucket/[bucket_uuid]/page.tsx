"use client";
import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { DateRange } from "react-day-picker";
export default function Component() {
	const defaultSelected: DateRange = {
		from: new Date(2024, 5, 1),
		to: new Date(),
	};
	const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultSelected);
	return (
		<div className="grid xs:grid-cols-1 sm:grid-cols-[3fr_1fr] gap-6 p-6 sm:p-10 ">
			<div className="space-y-4">
				<div className="grid gap-2">
					<div className="flex items-center justify-between">
						<div className="font-medium">Commit / Log name</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">Author</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">Commit Hash</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">Date</div>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
							<div>Refactor codebase</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Changwoo Lim</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">123456</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								날짜
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup="true" size="icon" variant="ghost">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">메뉴 열기</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem>파일 보기</DropdownMenuItem>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<div className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
							<div>Add new feature</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">April 10, 2023</div>
						</div>
						<div className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
							<div>Fix bug in login flow</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">April 8, 2023</div>
						</div>
						<div className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
							<div>Optimize performance</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">April 5, 2023</div>
						</div>
						<div className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
							<div>Update documentation</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">April 2, 2023</div>
						</div>
						<div className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
							<div>Implement new design</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">March 28, 2023</div>
						</div>
					</div>
				</div>
			</div>
			<div className="space-y-4">
				<Button className="w-full">Manual Upload</Button>
				<Popover>
					<PopoverTrigger asChild>
						<Button className="w-full justify-start text-left font-normal" variant="outline">
							<CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
							Pick a date
						</Button>
					</PopoverTrigger>
					<PopoverContent align="center" className="w-auto p-0">
						<Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
					</PopoverContent>
				</Popover>
			</div>
		</div>
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
