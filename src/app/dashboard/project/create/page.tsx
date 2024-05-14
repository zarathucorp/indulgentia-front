"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import DatePickerDemo from "@/components/global/DatePicker";
import DatePicker from "@/components/global/DatePicker";

const ProjectSchema = z
	.object({
		title: z
			.string()
			.min(1, {
				message: "프로젝트 이름은 1자보다 길어야 합니다.",
			})
			.max(1000, {
				message: "프로젝트 이름은 1,000자보다 짧아야 합니다.",
			}),
		project_leader: z.string().min(1, { message: "연구책임자 이름은 1자보다 길어야 합니다." }).max(1000, { message: "연구책임자 이름은 1,000자보다 짧아야 합니다." }).optional(),
		grant_number: z.string().min(1, { message: "과제 번호는 1자보다 길어야 합니다." }).max(1000, { message: "과제 번호는 1,000자보다 짧아야 합니다." }).optional(),
		start_date: z.date({}).optional(),
		end_date: z.date({}).optional(),
	})
	.refine(
		(data) => {
			if (data.start_date && data.end_date) {
				return data.start_date <= data.end_date;
			}
			return true;
		},
		{
			message: "연구 종료일은 연구 시작일보다 나중이어야 합니다.",
			path: ["end_date"],
		}
	);

type CreateProjectFormValues = z.infer<typeof ProjectSchema>;

// This can come from your database or API. 여기서는 사용하지 않고 나중에 수정창에서 사용하면 됨.
const defaultValues: Partial<CreateProjectFormValues> = {
	// name: "Your name",
	// dob: new Date("2023-01-23"),
};

export default function NewProjectForm() {
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(ProjectSchema),
		defaultValues,
	});

	async function onSubmit(data: CreateProjectFormValues) {
		console.log({ team_id: "33b361f3-a030-4624-afdd-d3b40e3f43dd", ...data });
		try {
			await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/", { team_id: "33b361f3-a030-4624-afdd-d3b40e3f43dd", ...data }, { withCredentials: true });
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div className="w-3/4 justify-items-center">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>프로젝트 이름</FormLabel>
									<FormControl>
										<Input placeholder="프로젝트 이름" {...field} />
									</FormControl>
									<FormDescription>프로젝트 이름을 입력합니다.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="project_leader"
							render={({ field }) => (
								<FormItem>
									<FormLabel>연구책임자</FormLabel>
									<FormControl>
										<Input placeholder="연구책임자" {...field} />
									</FormControl>
									<FormDescription>연구책임자의 이름을 입력합니다.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="grant_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>과제 번호</FormLabel>
									<FormControl>
										<Input placeholder="과제 번호" {...field} />
									</FormControl>
									<FormDescription>과제 번호를 입력합니다.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="start_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>연구 시작일</FormLabel>
									<DatePicker field={field} />
									<FormDescription>연구 시작일을 선택하세요.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="end_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>연구 종료일</FormLabel>
									<DatePicker field={field} />
									<FormDescription>연구 종료일을 선택하세요.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">새 프로젝트 생성</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
