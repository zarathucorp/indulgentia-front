import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WelcomePage from "./Welcone";
import Footer from "@/components/global/Footer";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="">
      {/* flex min-h-screen flex-col items-center justify-between p-24
			main classname 구버전 */}
      <WelcomePage />
      {/* <div className="">
				<div className="text-5xl">Indulgentia - ELN</div>
				<Link href="/dashboard">
					<Button>시작하기</Button>
				</Link>
			</div> */}
      <Footer />
    </main>
  );
}
