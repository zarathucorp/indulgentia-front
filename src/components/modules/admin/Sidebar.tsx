import NextLink from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/modules/admin/Menu";
import { SidebarToggle } from "@/components/modules/admin/SidebarToggle";

export function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          asChild
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 justify-start",
            isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
        >
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <p
              className={cn(
                "font-bold text-[16px]",
                isOpen === false ? "invisible" : "",
              )}
            >
              차라투
            </p>
          </NextLink>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
