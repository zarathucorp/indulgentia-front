import { Separator } from "@/components/ui/separator";
import { PaymentForm } from "./payment-form";

export default function SettingsNotificationsPage() {
  return (
    <div id="onborda-step1" className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">결제</h3>
        <p className="text-sm text-muted-foreground">
          결제와 관련된 설정을 관리합니다.
        </p>
      </div>
      <Separator />
      <PaymentForm />
    </div>
  );
}
