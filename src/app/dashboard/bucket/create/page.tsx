"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import useSWR from "swr";
import { redirect, useSearchParams } from "next/navigation";
import { TeamUserType } from "@/types/TeamUserType";
export default function NewBucketForm() {
	const searchParams = useSearchParams();

	const projectUUID: string = searchParams.get("project") as string;
	const BucketSchema = z.object({
		title: z
			.string()
			.min(1, {
				message: "Bucket 이름은 1자보다 길어야 합니다.",
			})
			.max(1000, {
				message: "Bucket 이름은 1,000자보다 짧아야 합니다.",
			}),
		manager_id: z.string().min(1, { message: "Bucket 매니저 이름은 1자보다 길어야 합니다." }).max(1000, { message: "Bucket 매니저 이름은 1,000자보다 짧아야 합니다." }).optional(),
		project_id: z.string().uuid(),
	});

	type CreateBucketFormValues = z.infer<typeof BucketSchema>;

	// This can come from your database or API. 여기서는 사용하지 않고 나중에 수정창에서 사용하면 됨.
	const defaultValues: Partial<CreateBucketFormValues> = {
		project_id: projectUUID,
	};

	if (projectUUID === "" || projectUUID === null) redirect("/dashboard");
	const form = useForm<CreateBucketFormValues>({
		resolver: zodResolver(BucketSchema),
		defaultValues,
	});

	async function onSubmit(data: CreateBucketFormValues) {
		try {
			await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dashboard/bucket/", { ...data }, { withCredentials: true });
		} catch (error) {
			console.error(error);
		}
	}

	const { data: teamUserList, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + "/user/team/list", async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		console.log(result.data.data);
		return result.data.data as TeamUserType[];
	});

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bucket 이름</FormLabel>
								<FormControl>
									<Input placeholder="Bucket 이름" {...field} />
								</FormControl>
								<FormDescription>Bucket 이름을 입력합니다.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="manager_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bucket 매니저</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Bucket 매니저를 선택하세요." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isLoading
											? null
											: teamUserList &&
											  teamUserList.map((user: TeamUserType, index: number) => (
													<SelectItem key={index} value={user.id}>
														{user.id}
													</SelectItem>
											  ))}
									</SelectContent>
								</Select>
								<FormDescription>버킷 관리자를 선택하세요.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="project_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>프로젝트 UUID</FormLabel>
								<FormControl>
									<Input disabled {...field} />
								</FormControl>
								<FormDescription>Project UUID입니다.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">새 프로젝트 생성</Button>
				</form>
			</Form>
		</>
	);
}
