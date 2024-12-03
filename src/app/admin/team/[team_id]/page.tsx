"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ContentLayout } from "@/components/modules/admin/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserMultipleSelect from "@/components/modules/admin/UserMultipleSelect";

export default function AdminTeamSinglePage() {
  const params = useParams<{ team_id: string }>();

  return (
    <ContentLayout title="Admin add users in Team">
      <AdminTeamBreadcrumb teamId={params.team_id} />
      <UserMultipleSelect teamId={params.team_id} />
    </ContentLayout>
  );
}

function AdminTeamBreadcrumb({ teamId }: { teamId: string }) {
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
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/admin/team/${teamId}`}>{teamId}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
