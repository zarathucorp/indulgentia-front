import { Separator } from "@/components/ui/separator";
import { AccountLinkForm } from "./account-link-form";

export default function SettingsNotificationsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">연결</h3>
				<p className="text-sm text-muted-foreground">계정 연결과 관련된 설정을 관리합니다.</p>
			</div>
			<Separator />
			<AccountLinkForm />
		</div>
	);
}
