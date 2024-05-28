import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { redirect } from "next/navigation";
export default function SettingsProfilePage() {
	redirect("/setting/account");
	// return (
	// 	<div className="space-y-6">
	// 		<div>
	// 			<h3 className="text-lg font-medium">프로필</h3>
	// 			<p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
	// 		</div>
	// 		<Separator />
	// 		<ProfileForm />
	// 	</div>
	// );
}
