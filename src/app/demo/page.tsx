import { redirect } from "next/navigation";
export default function DemoWithoutDashboard() {
  redirect("/demo/dashboard");
}
