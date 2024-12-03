import Link from "next/link";

import { ContentLayout } from "@/components/modules/admin/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function AdminTosspaymentsPage() {
  return (
    <ContentLayout title="Admin Tosspayments">
      <AdminTosspaymentsBreadcrumb />
      <Button variant={"link"} className="mt-4">
        <Link
          href="https://app.tosspayments.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          토스 상점관리자 바로가기
        </Link>
      </Button>
    </ContentLayout>
  );
}

function AdminTosspaymentsBreadcrumb() {
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
            <Link href="/admin/receipt">토스페이먼츠</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
