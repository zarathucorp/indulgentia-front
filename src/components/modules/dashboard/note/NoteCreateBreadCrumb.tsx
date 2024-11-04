"use client";
import useSWR from "swr";
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";

export default function NoteCreateBreadCrumb() {
  const searchParams = useSearchParams();
	const bucket_uuid = searchParams.get("bucket");
	const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${bucket_uuid}/breadcrumb`, async (url) => {
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
					<DashboardBreadCrumbLoading type="Note" />
				) : (
				<DashboardBreadCrumb breadcrumbData={{ level: "Note", ...breadcrumbData, bucket_id: bucket_uuid, note_title: "[새 노트]", note_id: "" }} />
				)}
			</div>
		</>
	);
}
