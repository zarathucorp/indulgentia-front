"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { AdminSubscriptionHistoryTable, Subscription } from "@/components/modules/admin/table/AdminSubscriptionHistoryTable";

type FetchResultType<T> = {
  status: "succeed" | "error";
  subscriptions: T;
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

export default function AdminSubscriptionHistoryPage() {
	const params = useParams<{ team_id: string }>();
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/payment/subscription/list`

  const {
    data,
    isLoading,
    error,
    mutate,
  } = useSWR<FetchResultType<Subscription[]>>(fetchUrl, fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  return (
    <ContentLayout title="Admin Subscription History">
      <AdminSubscriptionHistoryBreadcrumb team_id={params.team_id} />
      {error ? (
        <p>에러가 발생했습니다.</p>
      ) : isLoading ? (
        <p>데이터를 로딩하는 중입니다.</p>
      ) : (
      data && (
        <AdminSubscriptionHistoryTable
          data={data.subscriptions}
          mutate={mutate}
        />
        )
      )}
    </ContentLayout>
  );
}

function AdminSubscriptionHistoryBreadcrumb({ team_id }: { team_id: string | null; }) {
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
            <Link href="/admin/subscription-history">구독 이력</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {team_id && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/admin/subscription-history?team_id=${team_id}`}>?team_id={team_id}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
          )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
