"use client";
import { EditProjectForm } from "@/components/modules/dashboard/project/create/ProjectForm";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { CreateProjectFormValues } from "@/components/modules/dashboard/project/create/ProjectForm";
import { UUID } from "crypto";
import { redirect } from "next/navigation";
export default function ProjectSetting() {
	const params = useParams<{ project_uuid: UUID }>();

	if (!params.project_uuid) redirect("/dashboard");

	const {
		data: projectData,
		isLoading,
		mutate,
	} = useSWRImmutable<CreateProjectFormValues>(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${params.project_uuid}`, async (url: string) => {
		const { data } = await axios.get(url);
		console.log(data.data);
		console.log(params.project_uuid);
		return data.data;
		// return { id: params.project_uuid, ...data.data };
	});

	return <>{isLoading ? <p>Loading</p> : projectData && <EditProjectForm projectInfo={{ id: params.project_uuid, ...projectData }} mutate={mutate} />}</>;
}
