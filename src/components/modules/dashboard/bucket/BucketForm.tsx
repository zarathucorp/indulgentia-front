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
import RemoveModal from "@/components/global/RemoveModal";
import { KeyedMutator } from "swr";
import { Spinner } from "@/components/global/Spinner";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useTeamMemberList } from "@/hooks/fetch/useTeam";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
const BucketSchema = z.object({
	title: z
		.string()
		.min(1, {
			message: "버킷 이름은 1자보다 길어야 합니다.",
		})
		.max(1000, {
			message: "버킷 이름은 1,000자보다 짧아야 합니다.",
		}),
	manager_id: z.string().min(1, { message: "버킷 매니저 이름은 1자보다 길어야 합니다." }).max(1000, { message: "버킷 매니저 이름은 1,000자보다 짧아야 합니다." }),
	project_id: z.string().uuid(),
});

export type CreateBucketFormValues = z.infer<typeof BucketSchema>;

export default function NewBucketForm() {
	const router = useRouter();
	const { toast } = useToast();
	const searchParams = useSearchParams();
	const projectUUID: string = searchParams.get("project") as string;
	const [isCreating, setIsCreating] = useState<boolean>(false);

	if (projectUUID === "" || projectUUID === null) redirect("/dashboard");

	const defaultValues: Partial<CreateBucketFormValues> = {
		project_id: projectUUID,
	};

	const form = useForm<CreateBucketFormValues>({
		resolver: zodResolver(BucketSchema),
		defaultValues,
	});

	async function onSubmit(data: CreateBucketFormValues) {
		setIsCreating(true);
		try {
			await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dashboard/bucket/", { ...data });
		} catch (error) {
			console.error(error);
		}
		toast({
			title: "버킷 생성 완료",
			description: `버킷 ${data.title}이 성공적으로 생성되었습니다.`,
		});
		router.push(`/dashboard/project/${data.project_id}`);
	}

	return (
		<div className="w-full lg:w-1/2 my-4 mx-4 sm:mx-4 lg:mx-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<BucketTitleField form={form} />
					<BucketManagerField form={form} />
					<ProjectUUIDField form={form} />
					<div className="flex justify-center">
						<Button type="submit">
							{isCreating && (
								<>
									<Spinner />
									&nbsp;
								</>
							)}
							새 버킷 생성
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

const handleRemove = async (values: (CreateBucketFormValues & { id: string }) | undefined) => {
	if (values) {
		try {
			await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${values.id}`);
			return;
		} catch (error) {
			console.error(error);
		}
	}
	throw new Error("Cannot remove project");
};

export function EditBucketForm({ bucketInfo, mutate }: { bucketInfo: CreateBucketFormValues & { id: UUID }; mutate: KeyedMutator<any> }) {
	const { toast } = useToast();
	const router = useRouter();
	if (bucketInfo.id === null || bucketInfo.id === undefined) redirect("/dashboard");

	const form = useForm<CreateBucketFormValues>({
		resolver: zodResolver(BucketSchema),
		defaultValues: bucketInfo,
	});
	
	// const { data: teamUserList, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + "/user/team/list", async (url) => {
	// 	const result = await axios.get(url);
	// 	console.log(result.data.data);
	// 	return result.data.data as TeamUserType[];
	// });

	async function onSubmit(data: CreateBucketFormValues) {
		try {
			await axios.put(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${bucketInfo.id}`, { id: bucketInfo.id, ...data });
			toast({
				title: "버킷 수정 완료",
				description: `버킷 ${data.title}이 성공적으로 수정되었습니다.`,
			});
			const currentUrl = window.location.pathname;
			const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf("/"));
			router.push(newUrl);
		} catch (error: any) {
			console.error(error);
			toast({
				title: "버킷 수정 실패",
				description: `버킷 ${data.title}의 수정에 실패하였습니다. ${error?.response?.data?.detail ?? error.message}`,
			});
		}
		mutate();
	}

	return (
		<div className="w-full lg:w-1/2 my-4 mx-4 sm:mx-4 lg:mx-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<BucketTitleField form={form} />
					<BucketManagerField form={form} />
					<ProjectUUIDField form={form} />
					<div className="flex justify-center">
						<Button type="submit">버킷 수정</Button>
					</div>
					<RemoveModal targetEntity={bucketInfo.title} removeType="Bucket" onRemoveConfirmed={() => handleRemove(bucketInfo)} parentUUID={bucketInfo.project_id} />
				</form>
			</Form>
		</div>
	);
}

function BucketTitleField({ form }: { form: any }) {
	return (
		<FormField
			control={form.control}
			name="title"
			render={({ field }) => (
				<FormItem>
					{/* <FormLabel>버킷 이름</FormLabel> */}
					<TooltipProvider>
						<FormLabel>
							버킷 이름&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										버킷 이름을 텍스트로 입력합니다.
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<FormControl>
						<Input placeholder="버킷 이름" {...field} />
					</FormControl>
					{/* <FormDescription>버킷 이름을 입력합니다.</FormDescription> */}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function BucketManagerField({ form }: { form: any; }) {
	const { memberList, isLoading, error } = useTeamMemberList();

	useEffect(() => {
		console.log(form.getValues("manager_id"));
	}, [form, memberList, isLoading, error]);

	return (
		<FormField
			control={form.control}
			name="manager_id"
			render={({ field }) => (
				<FormItem>
					{/* <FormLabel>버킷 매니저</FormLabel> */}
					<TooltipProvider>
						<FormLabel>
							버킷 매니저&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										버킷 관리자를 선택하세요.
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={isLoading ? "버킷 매니저를 선택하세요." : "팀 목록"} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{memberList.map((member: TeamUserType, index: number) => (
								<SelectItem value={member.id} key={index}>
									{member.last_name} {member.first_name} {`<${member.email}>`}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{/* <FormDescription>버킷 관리자를 선택하세요.</FormDescription> */}
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
					{/* <FormLabel>프로젝트 UUID</FormLabel> */}
					<TooltipProvider>
						<FormLabel hidden >
							프로젝트 UUID&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										프로젝트 UUID입니다.
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<FormControl>
						{/* <Input disabled {...field} /> */}
						<Input type="hidden" disabled {...field} />
					</FormControl>
					{/* <FormDescription>프로젝트 UUID입니다.</FormDescription> */}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
