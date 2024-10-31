"use client";
import useSWR from "swr";
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NewNoteForm from "@/components/modules/dashboard/note/NoteForm";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";

export default function CreateNote() {
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
			<NewNoteForm />
		</>
	);
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" x2="12" y1="3" y2="15" />
		</svg>
	);
}
