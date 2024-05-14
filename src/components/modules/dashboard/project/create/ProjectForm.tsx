"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/global/DatePicker";
import useSWRImmutable from "swr/immutable";

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
		project_leader: z.string().min(1, { message: "연구책임자 이름은 1자보다 길어야 합니다." }).max(1000, { message: "연구책임자 이름은 1,000자보다 짧아야 합니다." }).nullable().optional(),
		grant_number: z.string().min(1, { message: "과제 번호는 1자보다 길어야 합니다." }).max(1000, { message: "과제 번호는 1,000자보다 짧아야 합니다." }).nullable().optional(),
		start_date: z.date({}).nullable().optional(),
		end_date: z.date({}).nullable().optional(),
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

const defaultValues: Partial<CreateProjectFormValues> = {
	// name: "Your name",
	// dob: new Date("2023-01-23"),
};

function preprocessValues(values: CreateProjectFormValues & { id: string }): CreateProjectFormValues & { id: string } {
	const processedValues = { ...values };

	if (typeof processedValues.title === "undefined") {
		processedValues.title = "";
	}

	if (processedValues.start_date && typeof processedValues.start_date === "string") {
		processedValues.start_date = new Date(processedValues.start_date);
	}

	if (processedValues.end_date && typeof processedValues.end_date === "string") {
		processedValues.end_date = new Date(processedValues.end_date);
	}

	return processedValues;
}

type CreateProjectFormValues = z.infer<typeof ProjectSchema>;
export default function ProjectForm({ isNew = true, values }: { isNew?: boolean; values?: CreateProjectFormValues & { id: string } }) {
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(ProjectSchema),
		defaultValues,
		values: isNew ? undefined : values && preprocessValues(values),
	});
	const { data: teamId } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/", async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		console.log(result.data.data);
		return result.data.data as string;
	});
	async function onSubmit(data: CreateProjectFormValues) {
		if (isNew) {
			try {
				await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/", { team_id: teamId, ...data }, { withCredentials: true });
			} catch (error) {
				console.error(error);
			}
		} else if (isNew === false && values) {
			try {
				console.log(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${values.id}`);
				console.log({ team_id: teamId, id: values.id, ...data });
				await axios.put(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${values.id}`, { team_id: teamId, id: values.id, ...data }, { withCredentials: true });
			} catch (error) {
				console.error(error);
			}
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
