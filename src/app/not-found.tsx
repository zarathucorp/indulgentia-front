import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<>
			<div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center dark:bg-gray-900 overflow-hidden">
				<div className="mx-auto max-w-md text-center gap-4">
					<h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">404 - 페이지를 찾을 수 없습니다.</h1>
					{/* <p className="text-lg text-gray-500 dark:text-gray-400">페이지를 찾을 수 없습니다.</p> */}
					<Link href="/">
						<Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
							홈으로 돌아가기
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
}
