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
import {
  AdminPaymentHistoryTable,
  Order,
} from "@/components/modules/admin/table/AdminPaymentHistoryTable";

type FetchResultType<T> = {
  status: "succeed" | "error";
  orders: T;
};

const fetcher = async (url: string) => {
  const result = await axios.get(url);
  console.log(result.data);
  if (result.status !== 200) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return result.data;
};

export default function AdminPaymentHistoryPage() {
  const params = useParams<{ team_id: string; user_id: string }>();
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/payment/order/list`;

  const { data, isLoading, error, mutate } = useSWR<FetchResultType<Order[]>>(
    fetchUrl,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  return (
    <ContentLayout title="Admin Payment History">
      <AdminPaymentHistoryBreadcrumb
        team_id={params.team_id}
        user_id={params.user_id}
      />
      {error ? (
        <p>에러가 발생했습니다.</p>
      ) : isLoading ? (
        <p>데이터를 로딩하는 중입니다.</p>
      ) : (
        data && <AdminPaymentHistoryTable data={data.orders} mutate={mutate} />
      )}
    </ContentLayout>
  );
}

function AdminPaymentHistoryBreadcrumb({
  team_id,
  user_id,
}: {
  team_id: string | null;
  user_id: string | null;
}) {
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
            <Link href="/admin/payment-history">결제 이력</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {team_id && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/admin/payment-history?team_id=${team_id}`}>
                  ?team_id={team_id}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {user_id && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/admin/payment-history?user_id=${user_id}`}>
                  ?user_id={user_id}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
