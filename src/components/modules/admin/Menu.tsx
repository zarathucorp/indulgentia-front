"use client";

import Link from "next/link";
import {
  Ellipsis,
  Tag,
  Users,
  User2,
  CreditCard,
  ReceiptText,
  Megaphone,
  Mail,
  FileClock,
  LucideIcon,
  AreaChart,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/modules/admin/CollapseMenuButton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "대시보드",
          active: pathname.includes("/admin"),
          icon: AreaChart,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "사용자 관리",
      menus: [
        {
          href: "/admin/team",
          label: "팀",
          active: pathname.includes("/admin"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/admin/user",
          label: "사용자",
          active: pathname.includes("/admin"),
          icon: User2,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "연구노트 관리",
      menus: [
        {
          href: "/admin/note-history",
          label: "노트 이력 발급",
          active: pathname.includes("/admin"),
          icon: FileClock,
          submenus: [],
        },
        {
          href: "/admin/note-tag",
          label: "기본 노트 태그",
          active: pathname.includes("/admin"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "결제",
      menus: [
        {
          href: "/admin/payment-history",
          label: "결제 이력",
          active: pathname.includes("/admin"),
          icon: CreditCard,
          submenus: [],
        },
        {
          href: "/admin/receipt",
          label: "영수증 발급",
          active: pathname.includes("/admin"),
          icon: ReceiptText,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "알림",
      menus: [
        {
          href: "/admin/announcement",
          label: "사이트 공지",
          active: pathname.includes("/admin"),
          icon: Megaphone,
          submenus: [],
        },
        {
          href: "/admin/email",
          label: "이메일 공지",
          active: pathname.includes("/admin"),
          icon: Mail,
          submenus: [],
        },
      ],
    },
  ];
}

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li key={index} className={cn("w-full", groupLabel ? "pt-5" : "")}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2" />
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div key={index} className="w-full">
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              className="w-full justify-start h-10 mb-1"
                              variant={active ? "secondary" : "ghost"}
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100",
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div key={index} className="w-full">
                      <CollapseMenuButton
                        active={active}
                        icon={Icon}
                        isOpen={isOpen}
                        label={label}
                        submenus={submenus}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}
