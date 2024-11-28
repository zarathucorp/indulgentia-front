"use client";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

import { ContentLayout } from "@/components/modules/admin/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AdminTeamTable, Team } from "@/components/modules/admin/table/AdminTeamTable";

type FetchResultType<T> = {
  status: "succeed" | "error";
  teams: T;
};

const fetcher = async (url: string) => {
	const result = await axios.get(url);
	console.log(result.data);
	if (result.status !== 200) {
		const error = new Error("An error occurred while fetching the data.");
		throw error;
	}
	return result.data;
}

export default function AdminTeamPage() {
  const {
    data,
    isLoading,
    error,
    mutate,
  } = useSWR<FetchResultType<Team[]>>(process.env.NEXT_PUBLIC_API_URL + "/admin/team/list", fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  return (
    <ContentLayout title="Admin Team">
      <AdminTeamBreadcrumb />
      {error ? (
        <p>에러가 발생했습니다.</p>
      ) : isLoading ? (
        <p>데이터를 로딩하는 중입니다.</p>
      ) : (
      data && (
        <AdminTeamTable
          data={data.teams}
          mutate={mutate}
        />
        )
      )}
    </ContentLayout>
  );
}

function AdminTeamBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin">Admin</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin/team">팀</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
