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
import { UUID } from "crypto";
import { useParams } from "next/navigation";
import { KeyedMutator } from "swr";
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

export default function NewBucketForm() {
	const searchParams = useSearchParams();
	const projectUUID: string = searchParams.get("project") as string;

	if (projectUUID === "" || projectUUID === null) redirect("/dashboard");

	const defaultValues: Partial<CreateBucketFormValues> = {
		project_id: projectUUID,
	};

	const form = useForm<CreateBucketFormValues>({
		resolver: zodResolver(BucketSchema),
		defaultValues,
	});

	const { data: teamUserList, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + "/user/team/list", async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		console.log(result.data.data);
		return result.data.data as TeamUserType[];
	});

	async function onSubmit(data: CreateBucketFormValues) {
		try {
			await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dashboard/bucket/", { ...data }, { withCredentials: true });
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<BucketTitleField form={form} />
				<BucketManagerField form={form} teamUserList={teamUserList || []} isLoading={isLoading} />
				<ProjectUUIDField form={form} />
				<Button type="submit">새 Bucket 생성</Button>
			</form>
		</Form>
	);
}

export function EditBucketForm({ bucketInfo, mutate }: { bucketInfo: CreateBucketFormValues & { id: UUID }; mutate: KeyedMutator<any> }) {
	const params = useParams<{ bucket_uuid: UUID }>();
	// if (projectUUID === null || projectUUID === undefined) redirect("/dashboard");
	if (bucketInfo.id === null || bucketInfo.id === undefined) console.log(bucketInfo.id);

	const defaultValues: Partial<CreateBucketFormValues> = {
		project_id: bucketInfo.id,
	};

	const form = useForm<CreateBucketFormValues>({
		resolver: zodResolver(BucketSchema),
		defaultValues: bucketInfo,
		// defaultValues
	});

	const { data: teamUserList, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + "/user/team/list", async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		console.log(result.data.data);
		return result.data.data as TeamUserType[];
	});

	async function onSubmit(data: CreateBucketFormValues) {
		try {
			await axios.put(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${bucketInfo.id}`, { id: bucketInfo.id, ...data }, { withCredentials: true });
		} catch (error) {
			console.error(error);
		}
		mutate();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<BucketTitleField form={form} />
				<BucketManagerField form={form} teamUserList={teamUserList || []} isLoading={isLoading} />
				<ProjectUUIDField form={form} />
				<Button type="submit">Bucket 수정</Button>
			</form>
		</Form>
	);
}

function BucketTitleField({ form }: { form: any }) {
	return (
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
	);
}

function BucketManagerField({ form, teamUserList, isLoading }: { form: any; teamUserList: TeamUserType[]; isLoading: boolean }) {
	return (
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
								: teamUserList.map((user: TeamUserType, index: number) => (
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
	);
}

function ProjectUUIDField({ form }: { form: any }) {
	return (
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
	);
}
