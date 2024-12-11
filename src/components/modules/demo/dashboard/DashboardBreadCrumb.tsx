import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaHome } from "react-icons/fa";
type DashboardLevel = {
  level: "Dashboard";
};

type ProjectLevel = {
  level: "Project";
  title: string;
  project_id: string;
};

type BucketLevel = {
  level: "Bucket";
  project_title: string;
  project_id: string;
  bucket_title: string;
  bucket_id: string;
};

type NoteLevel = {
  level: "Note";
  project_title: string;
  project_id: string;
  bucket_title: string;
  bucket_id: string;
  note_title: string;
  note_id: string;
};

type DashboardBreadCrumbType =
  | DashboardLevel
  | ProjectLevel
  | BucketLevel
  | NoteLevel;

function isProjectLevel(data: DashboardBreadCrumbType): data is ProjectLevel {
  return data.level === "Project";
}

function isBucketOrNoteLevel(
  data: DashboardBreadCrumbType
): data is BucketLevel | NoteLevel {
  return data.level === "Bucket" || data.level === "Note";
}

function isNoteLevel(data: DashboardBreadCrumbType): data is NoteLevel {
  return data.level === "Note";
}

export function DashboardBreadCrumb({
  breadcrumbData,
}: {
  breadcrumbData: DashboardBreadCrumbType;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink href="/">
          <FaHome />
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        {breadcrumbData.level === "Dashboard" ? (
          <BreadcrumbItem>대시보드</BreadcrumbItem>
        ) : (
          <BreadcrumbLink href="/demo/dashboard">대시보드</BreadcrumbLink>
        )}

        {(isProjectLevel(breadcrumbData) ||
          isBucketOrNoteLevel(breadcrumbData)) && (
          <>
            <BreadcrumbSeparator />
            {breadcrumbData.level === "Project" ? (
              breadcrumbData.project_id ? (
                <BreadcrumbLink
                  href={`/demo/dashboard/project/${breadcrumbData.project_id}`}
                >
                  {breadcrumbData.title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbItem>{breadcrumbData.title}</BreadcrumbItem>
              )
            ) : (
              <BreadcrumbLink
                href={`/demo/dashboard/project/${breadcrumbData.project_id}`}
              >
                {breadcrumbData.project_title}
              </BreadcrumbLink>
            )}
          </>
        )}

        {isBucketOrNoteLevel(breadcrumbData) && (
          <>
            <BreadcrumbSeparator />
            {breadcrumbData.level === "Bucket" ? (
              breadcrumbData.bucket_id ? (
                <BreadcrumbLink
                  href={`/demo/dashboard/bucket/${breadcrumbData.bucket_id}`}
                >
                  {breadcrumbData.bucket_title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbItem>{breadcrumbData.bucket_title}</BreadcrumbItem>
              )
            ) : (
              <BreadcrumbLink
                href={`/demo/dashboard/bucket/${breadcrumbData.bucket_id}`}
              >
                {breadcrumbData.bucket_title}
              </BreadcrumbLink>
            )}
          </>
        )}

        {isNoteLevel(breadcrumbData) && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{breadcrumbData.note_title}</BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
