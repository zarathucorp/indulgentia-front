/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g0n07msYZUq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NewNoteForm from "@/components/modules/dashboard/note/NoteForm";

export default function CreateNote() {
	return (
		<>
			<NewNoteForm />
		</>
		// <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
		// 	<div className="mx-auto w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
		// 		<div>
		// 			<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">새 노트 생성하기</h2>
		// 		</div>
		// 		<div className="space-y-6">
		// 			<div>
		// 				<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
		// 					Title
		// 				</Label>
		// 				<div className="mt-1">
		// 					<Input
		// 						autoComplete="title"
		// 						className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
		// 						id="title"
		// 						name="title"
		// 						required
		// 						type="text"
		// 					/>
		// 				</div>
		// 			</div>
		// 			<div>
		// 				<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="description">
		// 					Description
		// 				</Label>
		// 				<div className="mt-1">
		// 					<Textarea
		// 						className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
		// 						id="description"
		// 						name="description"
		// 						placeholder="Enter a description for your note"
		// 						rows={3}
		// 					/>
		// 				</div>
		// 			</div>
		// 			<div>
		// 				<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="tags">
		// 					Tags
		// 				</Label>
		// 				<div className="mt-1">
		// 					<Input
		// 						autoComplete="tags"
		// 						className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
		// 						id="tags"
		// 						name="tags"
		// 						placeholder="Enter tags separated by commas"
		// 						required
		// 						type="text"
		// 					/>
		// 				</div>
		// 			</div>
		// 			<div>
		// 				<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="file">
		// 					File
		// 				</Label>
		// 				<div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
		// 					<div className="space-y-1 text-center">
		// 						<UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
		// 						<div className="flex text-sm text-gray-600 dark:text-gray-400">
		// 							<Label
		// 								className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-800 dark:text-indigo-500"
		// 								htmlFor="file"
		// 							>
		// 								<span>Upload a file</span>
		// 								<Input className="sr-only" id="file" name="file" type="file" />
		// 							</Label>
		// 							<p className="pl-1">or drag and drop</p>
		// 						</div>
		// 						<p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
		// 					</div>
		// 				</div>
		// 			</div>
		// 			<div>
		// 				<Button
		// 					className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
		// 					type="submit"
		// 				>
		// 					Save
		// 				</Button>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" x2="12" y1="3" y2="15" />
		</svg>
	);
}
