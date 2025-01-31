"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/modules/admin/Sidebar";
import useUser from "@/hooks/fetch/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const { userInfo } = useUser();

  useEffect(() => {
    console.log(userInfo);
    if (userInfo?.is_admin === false) {
      router.push("/dashboard");
    }
  }, [router, userInfo]);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={cn(
          "flex-grow bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
