import { Separator } from "@/components/ui/separator";
import { TeamForm } from "./team-form";

export default function SettingsAppearancePage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">팀</h3>
				<p className="text-sm text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</p>
			</div>
			<Separator />
			<TeamForm />
		</div>
	);
}
