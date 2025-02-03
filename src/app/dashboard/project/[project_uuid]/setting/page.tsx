"use client";
import { EditProjectForm } from "@/components/modules/dashboard/project/create/ProjectForm";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { CreateProjectFormValues } from "@/components/modules/dashboard/project/create/ProjectForm";
import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
import useUser from "@/hooks/fetch/useUser";
export default function ProjectSetting() {
  const params = useParams<{ project_uuid: UUID }>();
  const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL +
      `/dashboard/project/${params.project_uuid}`,
    async (url) => {
      const result = await axios.get(url);
      if (result.status !== 200) {
        const error = new Error("An error occurred while fetching the data.");
        throw error;
      }
      console.log(result.data.data);
      return result.data.data;
    }
  );

  if (!params.project_uuid) redirect("/dashboard");

  const { userInfo } = useUser();
  if (!userInfo?.is_leader)
    redirect(`/dashboard/project/${params.project_uuid}`);

  const {
    data: projectData,
    isLoading,
    mutate,
  } = useSWRImmutable<CreateProjectFormValues>(
    process.env.NEXT_PUBLIC_API_URL +
      `/dashboard/project/${params.project_uuid}`,
    async (url: string) => {
      const { data } = await axios.get(url);
      console.log(data.data);
      console.log(params.project_uuid);
      return data.data;
      // return { id: params.project_uuid, ...data.data };
    }
  );

  return (
    <>
      <div className="py-3 pl-4">
        {isBreadcrumbLoading ? (
          <DashboardBreadCrumbLoading type="Project" />
        ) : (
          breadcrumbData && (
            <DashboardBreadCrumb
              breadcrumbData={{
                level: "Project",
                project_id: params.project_uuid,
                ...breadcrumbData,
              }}
            />
          )
        )}
      </div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        projectData && (
          <EditProjectForm
            projectInfo={{ id: params.project_uuid, ...projectData }}
            mutate={mutate}
          />
        )
      )}
    </>
  );
}
