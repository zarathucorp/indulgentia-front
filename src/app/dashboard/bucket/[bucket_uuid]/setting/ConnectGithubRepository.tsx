import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ConnectGithubRepository() {
	return (
		<>
			<div className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">GitHub Repository 연결</h1>
			</div>
			<div className="grid gap-6 max-w-6xl w-full mx-auto">
				<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
					<Input className="bg-white md:flex-1 dark:bg-gray-950" placeholder="Add a new repository" type="text" />
					<Button>Add Repository</Button>
				</div>
				<div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100" />
			</div>
			<div className="max-w-6xl w-full mx-auto grid gap-2">
				<h1 className="font-semibold text-3xl">연결된 GitHub Repository</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<div className="bg-white rounded-lg shadow-md p-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-bold">shadcn/ui</h3>
							<p className="text-gray-500">shadcn</p>
						</div>
						<Button className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" size="icon" variant="ghost">
							<TrashIcon className="w-5 h-5" />
						</Button>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md p-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-bold">vercel/next.js</h3>
							<p className="text-gray-500">vercel</p>
						</div>
						<Button className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" size="icon" variant="ghost">
							<TrashIcon className="w-5 h-5" />
						</Button>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md p-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-bold">tailwindlabs/tailwindcss</h3>
							<p className="text-gray-500">tailwindlabs</p>
						</div>
						<Button className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" size="icon" variant="ghost">
							<TrashIcon className="w-5 h-5" />
						</Button>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md p-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-bold">prisma/prisma</h3>
							<p className="text-gray-500">prisma</p>
						</div>
						<Button className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" size="icon" variant="ghost">
							<TrashIcon className="w-5 h-5" />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

function TrashIcon(props: any) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 6h18" />
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
		</svg>
	);
}
