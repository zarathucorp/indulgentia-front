"use client";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";

import MyProjectList from "@/components/modules/dashboard/MyProjectList";
import ProjectType from "@/types/ProjectType";
import { ErrorPage } from "@/components/global/Error/Error";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardLoading } from "@/components/global/Loading/Dashboard";
import { useTeamInfo } from "@/hooks/fetch/useTeam";
import { redirect } from "next/navigation";

const projectListFetcher = async (url: string) => {
  const result = await axios.get(url);
  console.log(result.data.data);
  if (result.status !== 200) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return result.data.data;
};

export default function Dashboard() {
  const { data, isValidating, error, mutate, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/list",
    projectListFetcher
  );
  const { hasTeam, teamInfo } = useTeamInfo();
  if (!hasTeam) {
    redirect("/setting/team");
  } else if (!teamInfo?.is_premium) {
    redirect("/setting/payment");
  }

  if (error) {
    return (
      <>
        <ErrorPage error={error} reset={() => mutate()} />
      </>
    );
  }

  return (
    <>
      <div id="onborda-step1" className="py-3 pl-4">
        <DashboardBreadCrumb breadcrumbData={{ level: "Dashboard" }} />
      </div>
      <div id="onborda-step2" className="flex max-w-screen-xl flex-col mx-auto">
        {isLoading ? (
          <DashboardLoading />
        ) : (
          <>{data && <MyProjectList projectList={data} />}</>
        )}
      </div>
    </>
  );
}
