import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
	title: "설정 - 연구실록",
	description: "사용자 설정을 관리합니다.",
};

const sidebarNavItems = [
	// {
	// 	title: "Profile",
	// 	href: "/setting",
	// },
	{
		title: "계정",
		href: "/setting/account",
	},
	{
		title: "팀",
		href: "/setting/team",
	},
	{
		title: "노트",
		href: "/setting/note",
	},
	// {
	// 	title: "Display",
	// 	href: "/setting/display",
	// },
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			{/* <div className="md:hidden">
				<Image src="/examples/forms-light.png" width={1280} height={791} alt="Forms" className="block dark:hidden" />
				<Image src="/examples/forms-dark.png" width={1280} height={791} alt="Forms" className="hidden dark:block" />
			</div> */}
			<div className="space-y-6 p-10 pb-16 md:block">
				<div className="space-y-0.5">
					<h2 className="text-2xl font-bold tracking-tight">설정</h2>
					<p className="text-muted-foreground">계정, 팀, 노트 관련 설정입니다.</p>
				</div>
				<Separator className="my-6" />
				<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className="-mx-4 lg:w-1/5">
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className="flex-1 lg:max-w-2xl">{children}</div>
				</div>
			</div>
		</>
	);
}
