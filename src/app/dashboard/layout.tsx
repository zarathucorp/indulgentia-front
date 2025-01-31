import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/auth/login");
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}
