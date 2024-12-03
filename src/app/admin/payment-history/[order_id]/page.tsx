"use client";
import Link from "next/link";
import { useParams, redirect } from "next/navigation";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import { UUID } from "crypto";

import { ContentLayout } from "@/components/modules/admin/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import OrderForm, {
  OrderFormValues,
} from "@/components/modules/admin/OrderForm";
import { useEffect } from "react";

export default function AdminPaymentHistorySinglePage() {
  const params = useParams<{ order_id: UUID }>();

  if (!params.order_id) redirect("/admin/payment-history");

  const {
    data: orderData,
    isLoading,
    mutate,
  } = useSWRImmutable<OrderFormValues>(
    process.env.NEXT_PUBLIC_API_URL + `/admin/payment/order/${params.order_id}`,
    async (url: string) => {
      const { data } = await axios.get(url);
      return data.data;
    }
  );

  useEffect(() => {
    console.log(orderData);
    console.log(params.order_id);
  }, [orderData]);

  return (
    <ContentLayout title="Admin add users in Team">
      <AdminPaymentHistorySingleBreadcrumb orderId={params.order_id} />
      {isLoading ? (
        <p>Loading</p>
      ) : (
        orderData && <OrderForm orderData={orderData} mutate={mutate} />
      )}
    </ContentLayout>
  );
}

function AdminPaymentHistorySingleBreadcrumb({ orderId }: { orderId: string }) {
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
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/admin/payment-history/${orderId}`}>{orderId}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
