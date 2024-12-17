import React from "react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaRegQuestionCircle } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import {
  Menu,
  Package2,
  Search,
  FileText,
  User,
  Handshake,
  LayoutDashboard,
  AtSign,
  BadgeDollarSign,
} from "lucide-react";
import Link from "next/link";
import UserBadge from "./Navbar/UserBadge";
import Image from "next/image";

// 네비게이션 링크 타입 정의
interface NavLink {
  href: string;
  icon: React.ReactNode;
  text: string;
}

// 네비게이션 링크 배열
const navLinks: NavLink[] = [
  {
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    text: "대시보드",
  },
  { href: "/inquiry", icon: <AtSign className="h-5 w-5" />, text: "문의하기" },
  {
    href: "/pricing",
    icon: <BadgeDollarSign className="h-5 w-5" />,
    text: "가격",
  },
  {
    href: "/help/faq",
    icon: <FaRegQuestionCircle className="h-5 w-5" />,
    text: "FAQ",
  },
  {
    href: "/validate",
    icon: <GrValidate className="h-5 w-5" />,
    text: "연구노트 검증",
  },
];

const Navbar: React.FC = () => {
  // 네비게이션 링크 렌더링 함수
  const renderNavLinks = (mobile: boolean = false) => {
    return navLinks.map((link, index) => (
      <React.Fragment key={link.href}>
        {mobile ? (
          <SheetClose asChild>
            <Link href={link.href} className="flex items-center gap-1">
              {link.icon} {link.text}
            </Link>
          </SheetClose>
        ) : (
          <Link href={link.href} className="nav-link flex items-center gap-1">
            {link.icon} {link.text}
          </Link>
        )}
      </React.Fragment>
    ));
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-[#051f20] text-white px-6 z-50">
      <nav className="flex flex-grow items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span className="sr-only">RnDSillog Home</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            &nbsp;
            {renderNavLinks()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UserBadge />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden text-gray-900 hover:text-gray-700"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                {renderNavLinks(true)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
