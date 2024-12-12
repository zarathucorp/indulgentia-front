import { Separator } from "@/components/ui/separator";
import { TeamForm } from "./team-form";

export default function SettingsAppearancePage() {
  return (
    <div id="onborda-step1" className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">팀</h3>
        <p className="text-sm text-muted-foreground">팀 설정을 관리합니다.</p>
      </div>
      <Separator />
      <TeamForm />
    </div>
  );
}
