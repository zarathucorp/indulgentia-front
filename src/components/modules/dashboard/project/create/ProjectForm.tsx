"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useTeamMemberList } from "@/hooks/fetch/useTeam";
import { TeamUserType } from "@/types/TeamUserType";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const ProjectSchema = z
	.object({
		title: z.string().min(1, "프로젝트 이름은 1자보다 길어야 합니다.").max(1000, "프로젝트 이름은 1,000자보다 짧아야 합니다."),
		project_leader: z.string().max(1000, "연구책임자 이름은 1,000자보다 짧아야 합니다.").nullable(),
    grant_number: z
      .string()
      .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, "과제 번호는 영문, 숫자, 특수문자만 포함할 수 있습니다.")
      .max(1000, "과제 번호는 1,000자보다 짧아야 합니다.")
      .optional()
      .nullable(),
		start_date: z.string().date("날짜 형식이 아닙니다.").optional().nullable(),
		end_date: z.string().date("날짜 형식이 아닙니다.").optional().nullable(),
	})
	.refine((data) => !data.start_date || !data.end_date || new Date(data.start_date) <= new Date(data.end_date), {
		message: "연구 종료일은 연구 시작일보다 나중이어야 합니다.",
		path: ["end_date"],
	});

export type CreateProjectFormValues = z.infer<typeof ProjectSchema>;

const preprocessValues = (values: CreateProjectFormValues & { id: string }) => ({
	...values,
	start_date: values.start_date ? new Date(values.start_date).toLocaleDateString("en-CA") : undefined,
	end_date: values.end_date ? new Date(values.end_date).toLocaleDateString("en-CA") : undefined,
});

const useTeamId = () => {
	const { data: teamInfo } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/", async (url: string) => {
		const { data } = await axios.get(url);
		return data.data;
	});
	return teamInfo?.id;
};

const ProjectFormFields = ({ form }: { form: UseFormReturn<CreateProjectFormValues> }) => {	
	const { memberList, isLoading, error } = useTeamMemberList();
	const [customValue, setCustomValue] = useState("");
	const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    // form에서 project_leader 초기값 가져오기
    const initialProjectLeader = form.getValues("project_leader");
    if (initialProjectLeader) {
      setCustomValue(initialProjectLeader); // 기존 값이 있을 때 Input에 표시
    }
		console.log("initialProjectLeader", initialProjectLeader);
  }, [form]);

	return (
	<>
		<FormField
			control={form.control}
			name="title"
			render={({ field }) => (
				<FormItem>
					{/* <FormLabel>프로젝트 이름</FormLabel> */}
					<TooltipProvider>
						<FormLabel>
							프로젝트 이름&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										프로젝트 이름을 텍스트로 입력합니다.
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<FormControl>
						<Input placeholder="프로젝트 이름" {...field} />
					</FormControl>
					{/* <FormDescription>프로젝트 이름을 입력합니다.</FormDescription> */}
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="project_leader"
			render={({ field }) => (
				<FormItem>
					{/* <FormLabel>연구책임자</FormLabel> */}
					<TooltipProvider>
						<FormLabel>
							연구책임자&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										연구책임자의 이름을 텍스트로 입력합니다.
									</p>
									<p>
										팀 목록에서 선택하기와 직접 입력하기 중 선택할 수 있습니다.
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<FormControl>
						{/* <Input placeholder="연구책임자" {...field} value={field.value ?? ""} /> */}
						<div>
							<Input
								placeholder={selectedValue ? `${selectedValue}` : `연구책임자`}
								{...field}
								value={customValue}
								onChange={(e) => {
									setCustomValue(e.target.value);
									setSelectedValue(""); // Input 사용 시 Select 값 초기화
									field.onChange(e.target.value); // FormField 값 업데이트
								}}
							/>
							<Select
								disabled={isLoading || memberList === null}
								onValueChange={(value) => {
									setSelectedValue(value);
									setCustomValue(""); // Select 사용 시 Input 값 초기화
									field.onChange(value); // FormField 값 업데이트
								}}
								value={selectedValue}
							>
								<SelectTrigger
									className="mt-1"
								>
								<SelectValue placeholder={isLoading ? "연구책임자를 불러오는 중입니다." : "팀 목록"} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{memberList.map((member: TeamUserType, index: number) => (
											<SelectItem value={`${member.last_name} ${member.first_name}`} key={index}>
												{member.last_name} {member.first_name} {`<${member.email}>`}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</FormControl>
					{/* <FormDescription>연구책임자의 이름을 입력합니다.</FormDescription> */}
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="grant_number"
			render={({ field }) => (
				<FormItem>
					{/* <FormLabel>과제 번호</FormLabel> */}
					<TooltipProvider>
						<FormLabel>
							과제 번호&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										과제 번호를 텍스트로 입력합니다.
									</p>
									<p>
										* 영문, 숫자, 특수문자 사용 가능
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<FormControl>
						<Input placeholder="과제 번호" {...field} value={field.value ?? ""} />
					</FormControl>
					{/* <FormDescription>과제 번호를 입력합니다.</FormDescription> */}
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="start_date"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					{/* <FormLabel>연구 시작일</FormLabel> */}
					<TooltipProvider>
						<FormLabel>
							연구 시작일&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										연구 시작일을 선택하세요.
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<DatePicker
						field={{
							...field,
							onChange: (date: Date) => field.onChange(date.toLocaleDateString("en-CA")), // Convert to ISO date string
						}}
					/>
					{/* <FormDescription>연구 시작일을 선택하세요.</FormDescription> */}
					<FormMessage />
				</FormItem>
			)}
		/>
		<FormField
			control={form.control}
			name="end_date"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					{/* <FormLabel>연구 종료일</FormLabel> */}
					<TooltipProvider>
						<FormLabel>
							연구 종료일&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger type="button">
									<FaRegCircleQuestion />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										연구 종료일을 선택하세요.
									</p>
								</TooltipContent>
							</Tooltip>
						</FormLabel>
					</TooltipProvider>
					<DatePicker
						field={{
							...field,
							onChange: (date: Date) => field.onChange(date.toLocaleDateString("en-CA")), // Convert to ISO date string
						}}
					/>
					{/* <FormDescription>연구 종료일을 선택하세요.</FormDescription> */}
					<FormMessage />
				</FormItem>
			)}
		/>
	</>
)};

const handleRemove = async (values: (CreateProjectFormValues & { id: string }) | undefined) => {
	if (values) {
		try {
			await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${values.id}`);
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
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(ProjectSchema),
	});

	const onSubmit = async (data: CreateProjectFormValues) => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/";
		const payload = { team_id: teamId, ...data };
		const options = {};
		console.log(payload);
		try {
			await axios.post(apiUrl, payload, options);

			toast({
				title: "프로젝트 생성",
				description: "프로젝트가 성공적으로 생성되었습니다.",
			});

			router.push("/dashboard");
		} catch (error: any) {
			console.error(error);
			toast({
				title: "프로젝트 수정 실패",
				description: `프로젝트 ${data.title}의 수정에 실패하였습니다. ${error?.response?.data?.detail ?? error.message}`,
			});
		}
	};

	return (
		<div className="w-full lg:w-1/2 my-4 mx-4 sm:mx-4 lg:mx-auto">
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
	const teamId = useTeamId();
	const { toast } = useToast();
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(ProjectSchema),
		// defaultValues: preprocessValues(projectInfo),
		values: preprocessValues(projectInfo),
	});
	const router = useRouter();

	const onSubmit = async (data: CreateProjectFormValues) => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${projectInfo.id}`;
		const payload = { id: projectInfo.id, team_id: teamId, ...data };
		const options = {};

		try {
			await axios.put(apiUrl, payload, options);
			mutate();
			console.log("Project updated successfully");
			toast({
				title: "프로젝트 업데이트 완료",
				description: "프로젝트가 성공적으로 업데이트되었습니다.",
			});
			const currentUrl = window.location.pathname;
			const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf("/"));
			router.push(newUrl);
		} catch (error: any) {
			console.error(error);
			toast({
				title: "프로젝트 업데이트 실패",
				description: `프로젝트가 업데이트되지 않았습니다. ${error?.response?.data?.detail ?? error.message}`,
			});
		}
	};

	return (
		<div className="w-full lg:w-1/2 my-4 mx-4 sm:mx-4 lg:mx-auto">
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
