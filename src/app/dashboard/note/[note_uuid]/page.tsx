"use client";
import PDFViewer from "@/components/global/PDFViewer";
import { Button } from "@/components/ui/button";
import NoteBreadcrumb from "./NoteBreadcrumb";
import NoteAuditLog from "./NoteAuditLog";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import RemoveModal from "@/components/global/RemoveModal";
import { ErrorPage } from "@/components/global/Error/Error";
import { NoteLoading } from "@/components/global/Loading/Note";
import { handleNoteRemove } from "./handleNoteRemove";
import NoteInfo from "./NoteInfo";
const getDownloadURL = async (url: string): Promise<string> => {
	const res = await fetch(url);
	const blob = await res.blob();
	const downloadUrl = window.URL.createObjectURL(blob);

	return downloadUrl;
};

export default function ViewNote() {
	const params = useParams<{ note_uuid: string }>();
	const [downloadURL, setDownloadURL] = useState<string>("");

	const { data, isValidating, error, mutate, isLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + `/dashboard/note/file/${params.note_uuid}`, async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		if (result.status !== 200) {
			const error = new Error("An error occurred while fetching the data.");
			throw error;
		}
		setDownloadURL(await getDownloadURL(result.data.url));
		return result.data.url;
	});

	const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + `/dashboard/note/${params.note_uuid}/breadcrumb`, async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		if (result.status !== 200) {
			const error = new Error("An error occurred while fetching the data.");
			throw error;
		}
		return result.data.data;
	});
	if (error)
		return (
			<>
				<ErrorPage error={error} reset={() => mutate()} />
			</>
		);

	// // 파일 다운로드용 URL 생성
	// useEffect(() => {
	// 	fetchDownloadUrl();
	// }, [data]);

	return (
		<>
			<div className="py-3 pl-4">
				{/* <NoteBreadcrumb /> */}
				{isBreadcrumbLoading ? <DashboardBreadCrumbLoading type="Note" /> : <DashboardBreadCrumb breadcrumbData={{ level: "Note", note_id: params.note_uuid, ...breadcrumbData }} />}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] lg:grid-cols-[3fr_1fr]">
				<div className="px-2">{isLoading ? <NoteLoading /> : <>{<PDFViewer fileUrl={data} />}</>}</div>
				<div className="flex flex-col">
					<NoteInfo />
					<a href={downloadURL || "#"} download={`Report_${params.note_uuid}.pdf`}>
						<Button className="py-2 w-full">노트 다운로드</Button>
					</a>
					{breadcrumbData && (
						<RemoveModal targetEntity={breadcrumbData.note_title} removeType="Note" onRemoveConfirmed={() => handleNoteRemove(params.note_uuid)} parentUUID={breadcrumbData.bucket_id} />
					)}
					{/* <NoteAuditLog /> */}
				</div>
			</div>
		</>
	);
}
