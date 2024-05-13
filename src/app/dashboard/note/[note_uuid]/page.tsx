"use client";
import PDFViewer from "@/components/global/PDFViewer";
import { Button } from "@/components/ui/button";
import NoteBreadcrumb from "./NoteBreadcrumb";
import NoteAuditLog from "./NoteAuditLog";
import Link from "next/link";
import axios from "axios";
// import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import { useParams } from "next/navigation";
export default function ViewNote() {
	const params = useParams<{ note_uuid: string }>();
	const { data, isValidating, error, mutate, isLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + `/dashboard/note/file/${params.note_uuid}`, async (url) => {
		const result = await axios.get(url, { withCredentials: true });
		if (result.status !== 200) {
			const error = new Error("An error occurred while fetching the data.");
			throw error;
		}
		console.log(result.data.url);
		return result.data.url;
	});
	return (
		<>
			<div className="py-3 pl-4">
				<NoteBreadcrumb />
			</div>
			<div className="grid grid-cols-[3fr_1fr]">
				{isLoading ? <p>loading</p> : <>{<PDFViewer fileUrl={data} className="px-2" />}</>}
				<div className="flex flex-col">
					<Button className="py-2">
						<Link href="/dummy.pdf">다운로드</Link>
					</Button>
					<Button className="bg-red-600 ">삭제</Button>
					<NoteAuditLog />
				</div>
			</div>
		</>
	);
}
