import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Auth() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/dashboard");
  }
  redirect("/auth/login");
}
