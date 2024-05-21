"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import axios from "axios";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

type ProjectLevel = {
	level: "Project";
	project_title: string;
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

type DashboardBreadCrumbType = ProjectLevel | BucketLevel | NoteLevel;

export function DashboardBreadCrumb({ breadcrumbData }: { breadcrumbData: DashboardBreadCrumbType }) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					{/* 대시보드 */}
					<BreadcrumbLink href="/dashboard">대시보드</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{/* 프로젝트 */}
				{breadcrumbData.level === "Project" ? (
					<BreadcrumbItem>{breadcrumbData.project_title}</BreadcrumbItem>
				) : (
					<BreadcrumbLink href={`/dashboard/project/${breadcrumbData.project_id}`}>{breadcrumbData.project_title}</BreadcrumbLink>
				)}
				{(breadcrumbData.level === "Bucket" || breadcrumbData.level === "Note") && (
					<>
						<BreadcrumbSeparator />
						{/* 버킷 */}
						{breadcrumbData.level === "Bucket" ? (
							<BreadcrumbItem>{breadcrumbData.bucket_title}</BreadcrumbItem>
						) : (
							<BreadcrumbLink href={`/dashboard/bucket/${breadcrumbData.bucket_id}`}>{breadcrumbData.bucket_title}</BreadcrumbLink>
						)}
						{breadcrumbData.level === "Note" && (
							<>
								<BreadcrumbSeparator />
								{/* 노트 */}
								<BreadcrumbItem>{breadcrumbData.note_title}</BreadcrumbItem>
							</>
						)}
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
