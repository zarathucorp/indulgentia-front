"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { AdminUserTable, User } from "@/components/modules/admin/table/AdminUserTable";

type FetchResultType<T> = {
  status: "succeed" | "error";
  users: T;
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

export default function AdminUserPage() {
  const {
    data,
    isLoading,
    error,
    mutate,
  } = useSWR<FetchResultType<User[]>>(process.env.NEXT_PUBLIC_API_URL + `/admin/user/list`, fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  const params = useSearchParams();
  const { team_id } = params.get("team_id") ? { team_id: params.get("team_id") } : { team_id: null };
  const { id } = params.get("id") ? { id: params.get("id") } : { id: null };

  return (
    <ContentLayout title="Admin User">
      <AdminUserBreadcrumb team_id={team_id} id={id} />
      {error ? (
        <p>에러가 발생했습니다.</p>
      ) : isLoading ? (
        <p>데이터를 로딩하는 중입니다.</p>
      ) : (
      data && (
        <AdminUserTable
          data={data.users}
          mutate={mutate}
        />
        )
      )}
    </ContentLayout>
  );
}

function AdminUserBreadcrumb({ team_id, id }: { team_id: string | null; id: string | null; }) {
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
            <Link href="/admin/user">유저</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {team_id && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/admin/user?team_id=${team_id}`}>?team_id={team_id}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
          )}
          {id && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/admin/user?id=${id}`}>?id={id}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
            )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
