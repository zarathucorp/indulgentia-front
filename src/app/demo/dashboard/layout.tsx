import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Alert className="bg-yellow-100">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>데모 페이지</AlertTitle>
        <AlertDescription>
          이 페이지는 데모 페이지입니다. 샘플 데이터의 변경이나 삭제는
          불가능합니다.
        </AlertDescription>
      </Alert>
      <div>{children}</div>
    </>
  );
}
