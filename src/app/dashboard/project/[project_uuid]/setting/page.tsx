"use client";
import ProjectForm from "@/components/modules/dashboard/project/create/ProjectForm";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
// import useSWR from "swr";
import { useParams } from "next/navigation";
export default function ProjectSetting() {
	const params = useParams<{ project_uuid: string }>();
	const {
		data: projectData,
		isLoading,
		mutate,
	} = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${params.project_uuid}`, async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		console.log(result.data.data);
		return { id: params.project_uuid, ...result.data.data };
	});
	return (
		<>
			{/* {isLoading ? null : <ProjectForm isNew={false} defaultValues={projectData} />} */}
			<ProjectForm isNew={false} values={isLoading ? {} : projectData} mutator={mutate} />
		</>
	);
}
