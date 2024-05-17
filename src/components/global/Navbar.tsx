import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Menu, Package2, Search, FileText, User, Handshake, LayoutDashboard, AtSign, BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import UserBadge from "./Navbar/UserBadge";
import Image from "next/image";
export default function Navbar() {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 bg-[#051f20] text-white px-4 md:px-6 z-50">
			<nav className="flex flex-grow items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-4">
						<Link href="/" className="flex items-center md:hidden">
							<Image src="/logo.png" alt="Logo" width={40} height={40} />
							<span className="sr-only">Indulgentia Home</span>
						</Link>
					</div>
					<div className="hidden md:flex items-center gap-4">
						<Link href="/" className="flex items-center">
							<Image src="/logo.png" alt="Logo" width={40} height={40} />
							<span className="sr-only">Indulgentia Home</span>
						</Link>
						&nbsp;
						<Link href="/dashboard" className="nav-link flex items-center gap-1">
							<LayoutDashboard className="h-5 w-5" /> Dashboard
						</Link>
						<Link href="/inquiry" className="nav-link flex items-center gap-1">
							<AtSign className="h-5 w-5" /> Inquiry
						</Link>
						<Link href="/pricing" className="nav-link flex items-center gap-1">
							<BadgeDollarSign className="h-5 w-5" /> Pricing
						</Link>
						<Link href="/qna" className="nav-link flex items-center gap-1">
							<FaRegQuestionCircle className="h-5 w-5" /> QNA
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
						<SheetContent side="left">
							<nav className="grid gap-6 text-lg font-medium">
								<Link href="/" className="flex items-center">
									<Image src="/logo.png" alt="Logo" width={40} height={40} />
									<span className="sr-only">Indulgentia Home</span>
								</Link>
								<Link href="/dashboard" className="flex items-center gap-1">
									<LayoutDashboard className="h-5 w-5" /> Dashboard
								</Link>
								<Link href="/inquiry" className="flex items-center gap-1">
									<AtSign className="h-5 w-5" /> Inquiry
								</Link>
								<Link href="/pricing" className="flex items-center gap-1">
									<BadgeDollarSign className="h-5 w-5" /> Pricing
								</Link>
								<Link href="/qna" className="flex items-center gap-1">
									<FaRegQuestionCircle className="h-5 w-5" />
									QNA
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
