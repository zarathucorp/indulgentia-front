import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import UserBadge from "./Navbar/UserBadge";
export default function Navbar() {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
				<Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
					<Package2 className="h-6 w-6" />
					<span className="sr-only">Indulgentia Home</span>
				</Link>
				<Link href="/dashboard" className="text-foreground transition-colors hover:text-foreground">
					대시보드
				</Link>
				<Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">
					가격
				</Link>
				<Link href="/inquiry" className="text-muted-foreground transition-colors hover:text-foreground">
					문의하기
				</Link>
				<Link href="/help" className="text-muted-foreground transition-colors hover:text-foreground">
					고객센터/도움말
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					Analytics
				</Link>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">메뉴 열기</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
							<Package2 className="h-6 w-6" />
							<span className="sr-only">Acme Inc</span>
						</Link>
						<Link href="#" className="hover:text-foreground">
							대시보드
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-foreground">
							Orders
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-foreground">
							Products
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-foreground">
							Customers
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-foreground">
							Analytics
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input type="search" placeholder="연구노트 검색" className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
					</div>
				</form>
				<UserBadge />
			</div>
		</header>
	);
}
