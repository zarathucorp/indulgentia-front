import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Menu, Package2, Search, FileText, User, Handshake, LayoutDashboard, AtSign, BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import UserBadge from "./Navbar/UserBadge";
import Image from "next/image";
export default function Navbar() {
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
						{/* <Link href="/" className="flex-none items-center">
							<Image src="/logo.png" alt="Logo" width={40} height={40} />
							<span className="sr-only">RnDSillog Home</span>
						</Link> */}
						&nbsp;
						<Link href="/dashboard" className="nav-link flex items-center gap-1">
							<LayoutDashboard className="h-5 w-5" /> 대시보드
						</Link>
						<Link href="/inquiry" className="nav-link flex items-center gap-1">
							<AtSign className="h-5 w-5" /> 문의하기
						</Link>
						<Link href="/pricing" className="nav-link flex items-center gap-1">
							<BadgeDollarSign className="h-5 w-5" /> 가격
						</Link>
						<Link href="/help/faq" className="nav-link flex items-center gap-1">
							<FaRegQuestionCircle className="h-5 w-5" /> FAQ
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-4">
					{/* <form className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input type="search" placeholder="연구노트 검색" className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
					</form> */}
					<UserBadge />
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="shrink-0 md:hidden text-gray-900 hover:text-gray-700">
								<Menu className="h-5 w-5" />
								<span className="sr-only">메뉴 열기</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<nav className="grid gap-6 text-lg font-medium">
								{/* <Link href="/" className="flex items-center">
									<Image src="/logo.png" alt="Logo" width={40} height={40} />
									<span className="sr-only">연구실록 홈</span>
								</Link> */}
								<SheetClose asChild>
									<Link href="/dashboard" className="flex items-center gap-1">
										<LayoutDashboard className="h-5 w-5" /> 대시보드
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link href="/inquiry" className="flex items-center gap-1">
										<AtSign className="h-5 w-5" /> 문의하기
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link href="/pricing" className="flex items-center gap-1">
										<BadgeDollarSign className="h-5 w-5" /> 가격
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link href="/faq" className="flex items-center gap-1">
										<FaRegQuestionCircle className="h-5 w-5" />
										FAQ
									</Link>
								</SheetClose>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
