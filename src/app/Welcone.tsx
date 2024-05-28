import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Divide } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
export default function WelcomePage() {
	return (
		<main className="flex flex-col">
			<section className="text-black py-20 md:py-32 lg:py-40">
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">깃허브로 완성하는 연구실록</h1>
						<p className="text-lg md:text-xl lg:text-2xl">GitHub 활동만으로 자동으로 연구노트 완성 어쩌고 저쩌고</p>
						<Link href="/dashboard">
							<Button size="lg">시작하기</Button>
						</Link>
					</div>
				</div>
			</section>
			<Separator />
			<section className="py-16 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Features That Make a Difference</h2>
						<p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400">Our electronic research note offers a suite of powerful features to streamline your workflow.</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
							<PenIcon className="w-10 h-10 text-[#4b0082]" />
							<h3 className="text-xl font-bold">GitHub 데이터를 자동으로 연구노트로 전환</h3>
							<p className="text-gray-600 dark:text-gray-400">GitHub 등 Git에서의 활동만으로 정부에서 인정하는 전자연구노트 자동작성</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
							<SearchIcon className="w-10 h-10 text-[#4b0082]" />
							<h3 className="text-xl font-bold">Poweㅌrful Search</h3>
							<p className="text-gray-600 dark:text-gray-400">Quickly find the information you need with our advanced search functionality.</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
							<FolderSyncIcon className="w-10 h-10 text-[#4b0082]" />
							<h3 className="text-xl font-bold">Seamless Sync</h3>
							<p className="text-gray-600 dark:text-gray-400">Access your notes from anywhere, with automatic syncing across all your devices.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-[#4b0082] text-white py-16 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">How It Works</h2>
						<p className="text-lg md:text-xl lg:text-2xl">Discover the simple steps to get started with our electronic research note.</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 text-[#4b0082]">
							<DeleteIcon className="w-10 h-10" />
							<h3 className="text-xl font-bold">Create Notes</h3>
							<p className="text-gray-600 dark:text-gray-400">Easily capture your research and ideas using our intuitive note-taking tools.</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 text-[#4b0082]">
							<GroupIcon className="w-10 h-10" />
							<h3 className="text-xl font-bold">Organize Your Work</h3>
							<p className="text-gray-600 dark:text-gray-400">Categorize and structure your notes for effortless retrieval and reference.</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 text-[#4b0082]">
							<ShareIcon className="w-10 h-10" />
							<h3 className="text-xl font-bold">Share and Collaborate</h3>
							<p className="text-gray-600 dark:text-gray-400">Seamlessly share your notes and collaborate with your team.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="py-16 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">What Our Users Say</h2>
						<p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400">Hear from our satisfied customers about their experience with our electronic research note.</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
							<blockquote className="text-lg font-medium">This electronic research note has been a game-changer for my workflow. Its intuitive, powerful, and has saved me so much time.</blockquote>
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="/avatar1.jpg" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="font-bold">John Doe</h4>
									<p className="text-gray-600 dark:text-gray-400">Researcher</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
							<blockquote className="text-lg font-medium">
								Ive tried countless note-taking apps, but this electronic research note is by far the best. The features and functionality are unparalleled.
							</blockquote>
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="/avatar2.jpg" />
									<AvatarFallback>SA</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="font-bold">Sarah Anderson</h4>
									<p className="text-gray-600 dark:text-gray-400">Graduate Student</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
							<blockquote className="text-lg font-medium">
								Ive been using this electronic research note for months, and it has completely transformed the way I manage my research projects. Highly recommended!
							</blockquote>
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="/avatar3.jpg" />
									<AvatarFallback>MJ</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="font-bold">Michael Johnson</h4>
									<p className="text-gray-600 dark:text-gray-400">Senior Researcher</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

function DeleteIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
			<line x1="18" x2="12" y1="9" y2="15" />
			<line x1="12" x2="18" y1="9" y2="15" />
		</svg>
	);
}

function FolderSyncIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
			<path d="M12 10v4h4" />
			<path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
			<path d="M22 22v-4h-4" />
			<path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
		</svg>
	);
}

function GroupIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 7V5c0-1.1.9-2 2-2h2" />
			<path d="M17 3h2c1.1 0 2 .9 2 2v2" />
			<path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
			<path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
			<rect width="7" height="5" x="7" y="7" rx="1" />
			<rect width="7" height="5" x="10" y="12" rx="1" />
		</svg>
	);
}

function PenIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
		</svg>
	);
}

function SearchIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function ShareIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
			<polyline points="16 6 12 2 8 6" />
			<line x1="12" x2="12" y1="2" y2="15" />
		</svg>
	);
}
