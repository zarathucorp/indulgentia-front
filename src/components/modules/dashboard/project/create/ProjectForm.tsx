"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/global/DatePicker";
import useSWRImmutable from "swr/immutable";
import RemoveModal from "@/components/global/RemoveModal";
import { useToast } from "@/components/ui/use-toast";
import { ActionButton } from "@/components/ui/actionbutton";
const ProjectSchema = z
	.object({
		title: z.string().min(1, "프로젝트 이름은 1자보다 길어야 합니다.").max(1000, "프로젝트 이름은 1,000자보다 짧아야 합니다."),
		project_leader: z.string().min(1, "연구책임자 이름은 1자보다 길어야 합니다.").max(1000, "연구책임자 이름은 1,000자보다 짧아야 합니다.").optional().nullable(),
		grant_number: z.string().min(1, "과제 번호는 1자보다 길어야 합니다.").max(1000, "과제 번호는 1,000자보다 짧아야 합니다.").optional().nullable(),
		start_date: z.date().optional().nullable(),
		end_date: z.date().optional().nullable(),
	})
	.refine((data) => !data.start_date || !data.end_date || data.start_date <= data.end_date, {
		message: "연구 종료일은 연구 시작일보다 나중이어야 합니다.",
		path: ["end_date"],
	});

export type CreateProjectFormValues = z.infer<typeof ProjectSchema>;

const preprocessValues = (values: CreateProjectFormValues & { id: string }) => ({
	...values,
	start_date: values.start_date ? new Date(values.start_date) : undefined,
	end_date: values.end_date ? new Date(values.end_date) : undefined,
});

const useTeamId = () => {
	const { data: teamInfo } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/", async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		return data.data;
	});
	return teamInfo?.id;
};

const ProjectFormFields = ({ form }: { form: UseFormReturn<CreateProjectFormValues> }) => (
	<>
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
						<Input placeholder="연구책임자" {...field} value={field.value ?? ""} />
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
						<Input placeholder="과제 번호" {...field} value={field.value ?? ""} />
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
	</>
);

const handleRemove = async (values: (CreateProjectFormValues & { id: string }) | undefined) => {
	if (values) {
		try {
			await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${values.id}`, { withCredentials: true });
			console.log("Project removed successfully");
			return;
		} catch (error) {
			console.error(error);
		}
	}
	throw new Error("Cannot remove project");
};

const NewProjectForm = () => {
	const teamId = useTeamId();
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(ProjectSchema),
	});
	const { toast } = useToast();

	const onSubmit = async (data: CreateProjectFormValues) => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/";
		const payload = { team_id: teamId, ...data };
		const options = { withCredentials: true };
		console.log(payload);
		try {
			await axios.post(apiUrl, payload, options);
			toast({
				title: "프로젝트 생성",
				description: "프로젝트가 성공적으로 생성되었습니다.",
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-full lg:w-1/2 mx-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<ProjectFormFields form={form} />
					<div className="flex justify-center">
						<Button type="submit">새 프로젝트 생성</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

const EditProjectForm = ({ projectInfo, mutate }: { projectInfo: CreateProjectFormValues & { id: string }; mutate: any }) => {
	const { toast } = useToast();
	const teamId = useTeamId();
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(ProjectSchema),
		// defaultValues: preprocessValues(projectInfo),
		values: preprocessValues(projectInfo),
	});

	const onSubmit = async (data: CreateProjectFormValues) => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${projectInfo.id}`;
		const payload = { id: projectInfo.id, team_id: teamId, ...data };
		const options = { withCredentials: true };

		try {
			await axios.put(apiUrl, payload, options);
			mutate();
			console.log("Project updated successfully");
			toast({
				title: "프로젝트 업데이트 완료",
				description: "프로젝트가 성공적으로 업데이트되었습니다.",
			});
		} catch (error) {
			console.error(error);
			toast({
				title: "프로젝트 업데이트 실패",
				description: "프로젝트가 업데이트되지 않았습니다.",
			});
		}
	};

	return (
		<div className="w-full lg:w-1/2 mx-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<ProjectFormFields form={form} />
					<div className="flex justify-center">
						<ActionButton type="submit" onClick={() => {}}>
							프로젝트 업데이트
						</ActionButton>
					</div>
					<RemoveModal targetEntity={projectInfo.title} removeType="Project" onRemoveConfirmed={() => handleRemove(projectInfo)} />
				</form>
			</Form>
		</div>
	);
};

export { NewProjectForm, EditProjectForm };
