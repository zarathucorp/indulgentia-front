"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/modules/admin/Sidebar";
import useUser from "@/hooks/fetch/useUser";
import { redirect } from "next/navigation";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { userInfo, isLoading: isUserLoading, error: teamError } = useUser();
  if (isUserLoading) return null;
  if (teamError) return <p>Error</p>;
  if (!userInfo?.is_admin) redirect("/dashboard");

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
