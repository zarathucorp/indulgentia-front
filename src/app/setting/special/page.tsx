import { Separator } from "@/components/ui/separator";
import { SpecialForm } from "./special-form";

export default function SettingsNotificationsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">특수 설정</h3>
				<p className="text-sm text-muted-foreground">특수한 상황에 사용하는 설정 항목입니다.</p>
			</div>
			<Separator />
			<SpecialForm />
		</div>
	);
}
