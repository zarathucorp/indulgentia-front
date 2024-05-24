"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorDefault() {
	return null;
}

export function ErrorPage({ error, reset }: { error: Error & { digest?: string; response: { data: { detail: string }; status: number; statusText: string } }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		// console.error(error)
	}, [error]);
	return (
		<div className="flex flex-col h-screen items-center justify-center px-4 dark:bg-gray-900">
			<div className="mx-auto max-w-md space-y-4 text-center text-red-">
				<h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
					{error.response.status} {error.response.statusText}
				</h1>
				<p className="text-lg text-gray-500 dark:text-gray-400">{error.response.data?.detail || "Unexpected error occurred."}</p>
				<Button
					className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
					onClick={reset}
				>
					<RefreshCwIcon />
					&nbsp;Try again
				</Button>
			</div>
		</div>
	);
}

function RefreshCwIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
			<path d="M21 3v5h-5" />
			<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
			<path d="M8 16H3v5" />
		</svg>
	);
}

function TriangleAlertIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
			<path d="M12 9v4" />
			<path d="M12 17h.01" />
		</svg>
	);
}
