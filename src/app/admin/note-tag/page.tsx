import Link from "next/link";

import { ContentLayout } from "@/components/modules/admin/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminNoteTagPage() {
  return (
    <ContentLayout title="Admin Note tag">
      <AdminNoteTagBreadcrumb />
      <h1 className="mt-5"><i>미구현</i></h1>
    </ContentLayout>
  );
}

function AdminNoteTagBreadcrumb() {
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
            <Link href="/admin/note-tag">노트 태그</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
