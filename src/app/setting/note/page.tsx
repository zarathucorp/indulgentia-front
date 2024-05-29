import { Separator } from "@/components/ui/separator";
import { NoteForm } from "./note-form";

export default function SettingsNotificationsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">노트</h3>
				<p className="text-sm text-muted-foreground">연구노트와 관련된 설정을 관리합니다.</p>
			</div>
			<Separator />
			<NoteForm />
		</div>
	);
}
