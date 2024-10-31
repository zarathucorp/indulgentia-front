"use client";
import useSWR from "swr";
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import NewBucketForm from "@/components/modules/dashboard/bucket/BucketForm";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
export default function BucketCreate() {
  const searchParams = useSearchParams();
	const project_uuid = searchParams.get("project");
	const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + `/dashboard/project/${project_uuid}`, async (url) => {
		const result = await axios.get(url);
		if (result.status !== 200) {
			const error = new Error("An error occurred while fetching the data.");
			throw error;
		}
		console.log(result.data.data);
		return result.data.data;
	});

	return (
	<>
		<div className="py-3 pl-4">
			{isBreadcrumbLoading ? (
				<DashboardBreadCrumbLoading type="Bucket" />
			) : (
			<DashboardBreadCrumb breadcrumbData={{ level: "Bucket", project_id: breadcrumbData.id, project_title: breadcrumbData.title, bucket_title: "[새 버킷]", bucket_id: "" }} />
			)}
		</div>
		<NewBucketForm />
	</>
	);
}
