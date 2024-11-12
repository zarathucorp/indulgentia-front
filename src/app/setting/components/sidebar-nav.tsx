"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserRoundCog, Users, NotebookPen, Link as LinkIcon, CreditCard } from 'lucide-react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
	}[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	const pathname = usePathname();

	return (
		<nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
			{items.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(buttonVariants({ variant: "ghost" }), pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline", "justify-start")}
				>
					{item.title === "계정" && <UserRoundCog size={20} className={"mr-2"} />}
					{item.title === "팀" && <Users size={20} className={"mr-2"} />}
					{item.title === "노트" && <NotebookPen size={20} className={"mr-2"} />}
					{item.title === "연결" && <LinkIcon size={20} className={"mr-2"} />}
					{item.title === "결제" && <CreditCard size={20} className={"mr-2"} />}
					{item.title}
				</Link>
			))}
		</nav>
	);
}
