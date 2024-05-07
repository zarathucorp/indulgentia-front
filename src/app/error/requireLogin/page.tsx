import Link from "next/link";
export default function RequireLogin() {
	return (
		<div className="flex h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
			<div className="mx-auto max-w-md space-y-4 text-center">
				<h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">로그인이 필요합니다.</h1>
				<p className="text-lg text-gray-500 dark:text-gray-400">이 페이지에 접근하기 위해서는 로그인이 필요합니다. 아래 버튼을 클릭해 로그인 하신 후 다시 시도해주세요.</p>
				<Link
					className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
					href="/auth/login"
				>
					로그인
				</Link>
			</div>
		</div>
	);
}
