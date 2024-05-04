import PDFViewer from "@/components/global/PDFViewer";
import { Button } from "@/components/ui/button";
import NoteBreadcrumb from "./NoteBreadcrumb";
import NoteAuditLog from "./NoteAuditLog";
export default function ViewNote() {
	return (
		<>
			<div className="py-3 pl-4">
				<NoteBreadcrumb />
			</div>
			<div className="grid grid-cols-[3fr_1fr]">
				<PDFViewer fileUrl="/med_timetable.pdf" className="px-2" />
				<div className="flex flex-col">
					<Button className="py-2">다운로드</Button>
					<Button className="bg-red-600 ">삭제</Button>
					<NoteAuditLog />
				</div>
			</div>
		</>
	);
}
