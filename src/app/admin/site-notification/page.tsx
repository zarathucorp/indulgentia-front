import Link from "next/link";

import { ContentLayout } from "@/components/modules/admin/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminSiteNotificationPage() {
  return (
    <ContentLayout title="Admin Site Notification">
      <AdminSiteNotificationBreadcrumb />
      <h1 className="mt-5"><i>미구현</i></h1>
    </ContentLayout>
  );
}

function AdminSiteNotificationBreadcrumb() {
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
            <Link href="/admin/site-notification">사이트 공지</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
