"use client";
import { EditProjectForm } from "@/components/modules/dashboard/project/create/ProjectForm";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import { useParams } from "next/navigation";
import { CreateProjectFormValues } from "@/components/modules/dashboard/project/create/ProjectForm";
import { UUID } from "crypto";

export default function ProjectSetting() {
	const params = useParams<{ project_uuid: UUID }>();

	const {
		data: projectData,
		isLoading,
		mutate,
	} = useSWRImmutable<CreateProjectFormValues>(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${params.project_uuid}`, async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		console.log(data.data);
		console.log(params.project_uuid);
		return data.data;
		// return { id: params.project_uuid, ...data.data };
	});

	return <>{!isLoading && projectData && params.project_uuid && <EditProjectForm projectInfo={{ id: params.project_uuid, ...projectData }} mutator={mutate} />}</>;
}
