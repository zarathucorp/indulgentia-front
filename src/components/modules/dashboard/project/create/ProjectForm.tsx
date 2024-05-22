"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/global/DatePicker";
import useSWRImmutable from "swr/immutable";
import { KeyedMutator } from "swr";
import RemoveModal from "@/components/global/RemoveModal";

const ProjectSchema = z
	.object({
		title: z.string().min(1, "프로젝트 이름은 1자보다 길어야 합니다.").max(1000, "프로젝트 이름은 1,000자보다 짧아야 합니다."),
		project_leader: z.string().min(1, "연구책임자 이름은 1자보다 길어야 합니다.").max(1000, "연구책임자 이름은 1,000자보다 짧아야 합니다.").optional(),
		grant_number: z.string().min(1, "과제 번호는 1자보다 길어야 합니다.").max(1000, "과제 번호는 1,000자보다 짧아야 합니다.").optional(),
		start_date: z.date().optional(),
		end_date: z.date().optional(),
	})
	.refine((data) => !data.start_date || !data.end_date || data.start_date <= data.end_date, {
		message: "연구 종료일은 연구 시작일보다 나중이어야 합니다.",
		path: ["end_date"],
	});

type CreateProjectFormValues = z.infer<typeof ProjectSchema>;

const preprocessValues = (values: CreateProjectFormValues & { id: string }) => ({
	...values,
	start_date: values.start_date ? new Date(values.start_date) : undefined,
	end_date: values.end_date ? new Date(values.end_date) : undefined,
});

const useTeamId = () => {
	const { data: teamId } = useSWRImmutable<string>(process.env.NEXT_PUBLIC_API_URL + "/user/team/", async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		return data.data;
	});
	return teamId;
};

const useProjectForm = (isNew: boolean, values?: CreateProjectFormValues & { id: string }) => {
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(ProjectSchema),
		values: isNew ? undefined : preprocessValues(values as CreateProjectFormValues & { id: string }),
	});
	return form;
};

const handleSubmit = async (isNew: boolean, data: CreateProjectFormValues, teamId: string | undefined, values: (CreateProjectFormValues & { id: string }) | undefined, mutator?: KeyedMutator<any>) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/";
	const payload = { team_id: teamId, ...data };
	const options = { withCredentials: true };

	try {
		if (isNew) {
			await axios.post(apiUrl, payload, options);
		} else if (values) {
			await axios.put(`${apiUrl}${values.id}`, { id: values.id, ...payload }, options);
			mutator && mutator();
		}
		console.log("update done");
	} catch (error) {
		console.error(error);
	}
};

const handleRemove = async (isNew: boolean, values: (CreateProjectFormValues & { id: string }) | undefined) => {
	if (!isNew && values) {
		try {
			const result = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${values.id}`, { withCredentials: true });
			console.log(result);
			return;
		} catch (error) {
			console.error(error);
			throw new Error("Cannot remove project: Axios 에러:" + error);
		}
	}
	throw new Error("Cannot remove project");
};

const ProjectFormFields = ({ form }: { form: ReturnType<typeof useProjectForm> }) => (
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
	</>
);

const ProjectForm = ({ isNew = true, mutator, values }: { isNew?: boolean; mutator?: KeyedMutator<any>; values?: CreateProjectFormValues & { id: string } }) => {
	const teamId = useTeamId();
	const form = useProjectForm(isNew, values);

	return (
		<div className="w-full lg:w-1/2 mx-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit((data) => handleSubmit(isNew, data, teamId, values, mutator))} className="space-y-8">
					<ProjectFormFields form={form} />
					<div className="flex justify-center">
						<Button type="submit">{isNew ? "새 프로젝트 생성" : "프로젝트 업데이트"}</Button>
					</div>
				</form>
			</Form>

			{values && <RemoveModal targetEntity={values.title} removeType="Project" onRemoveConfirmed={() => handleRemove(isNew, values)} />}
		</div>
	);
};

export default ProjectForm;
