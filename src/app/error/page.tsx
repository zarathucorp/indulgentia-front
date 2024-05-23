'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"


export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string, response: { data: { detail: string }, status: number, statusText: string } },
  reset: () => void
}) { 
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error)
  }, [error])
  return (
		<div className="flex h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
			<div className="mx-auto max-w-md space-y-4 text-center">
				<h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">{error.response.status} {error.response.statusText}</h1>
				<p className="text-lg text-gray-500 dark:text-gray-400">{error.response.data?.detail || "Unexpected error occurred."}</p>
				<Button
					className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
					onClick={reset}
				>
					Try again
				</Button>
			</div>
		</div>
  )
}