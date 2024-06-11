"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import FileUploader from "@/components/global/FileUploader";
const NoteSchema = z.object({
	title: z
		.string()
		.min(1, {
			message: "노트 이름은 1자보다 길어야 합니다.",
		})
		.max(1000, {
			message: "노트 이름은 1,000자보다 짧아야 합니다.",
		}),
	description: z.string().min(1, { message: "노트 내용은 1자보다 길어야 합니다." }),
	tags: z.string().optional(),
	files: z.array(z.instanceof(File)).optional(),
	bucket_id: z.string().uuid(),
});

export type CreateNoteFormValues = z.infer<typeof NoteSchema>;

export default function NewNoteForm() {
	const [userUUID, setUserUUID] = useState<string | null>(null);

	// useEffect(() => {
	// 	const supabase = createClient();
	// 	const getUserUUID = async () => {
	// 		const {
	// 			data: { user },
	// 		} = await supabase.auth.getUser();
	// 		if (user) {
	// 			setUserUUID(user.id);
	// 		} else {
	// 			console.log("No user is logged in");
	// 		}
	// 	};
	// 	getUserUUID();
	// }, []);

	const searchParams = useSearchParams();
	const bucketUUID: string = searchParams.get("bucket") as string;

	const defaultValues: Partial<CreateNoteFormValues> = {
		bucket_id: bucketUUID,
	};

	const form = useForm<CreateNoteFormValues>({
		resolver: zodResolver(NoteSchema),
		defaultValues,
	});

	async function onSubmit(data: CreateNoteFormValues) {
		const validationResult = NoteSchema.safeParse(data);
		if (!validationResult.success) {
			console.error(validationResult.error.errors);
			return;
		}

		const sendData = new FormData();
		if (data.files) {
			data.files.forEach((file) => {
				console.log(file);
				sendData.append("files", file);
			});
		}

		sendData.append("title", data.title);
		sendData.append("file_name", data.title);
		sendData.append("bucket_id", data.bucket_id);
		sendData.append("is_github", false.toString());

		try {
			const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dashboard/note/", sendData, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="w-full lg:w-1/2 mx-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<NoteTitleField form={form} />
					<NoteDescriptionField form={form} />
					<NoteTagField form={form} />
					<NoteFileField form={form} />
					<BucketUUIDField form={form} />
					<div className="flex justify-center">
						<Button type="submit">새 노트 생성</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

function NoteTitleField({ form }: { form: any }) {
	return (
		<FormField
			control={form.control}
			name="title"
			render={({ field }) => (
				<FormItem>
					<FormLabel>노트 이름</FormLabel>
					<FormControl>
						<Input placeholder="노트 이름" {...field} />
					</FormControl>
					<FormDescription>노트 이름을 입력합니다.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function NoteDescriptionField({ form }: { form: any }) {
	return (
		<FormField
			control={form.control}
			name="description"
			render={({ field }) => (
				<FormItem>
					<FormLabel>노트 내용</FormLabel>
					<FormControl>
						<Textarea placeholder="노트 내용을 입력하여 주십시오." {...field} />
					</FormControl>
					<FormDescription>노트 내용을 입력합니다.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function NoteTagField({ form }: { form: any }) {
	return (
		<FormField
			control={form.control}
			name="tags"
			render={({ field }) => (
				<FormItem>
					<FormLabel>노트 태그</FormLabel>
					<FormControl>
						<Input placeholder="노트 태그" {...field} />
					</FormControl>
					<FormDescription>&quot;,&quot;로 구분된 태그를 입력합니다.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function NoteFileField({ form }: { form: any }) {
	const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			form.setValue("files", Array.from(files));
			setIsFileSelected(true);
		}
	};

	const handleFileUnselect = () => {
		form.setValue("files", []);
		setIsFileSelected(false);
	};

	return (
		<FormField
			control={form.control}
			name="files"
			render={({ field }) => (
				<FormItem>
					<FormLabel>노트 파일</FormLabel>
					<FormControl>
						<FileUploader typeString="" multiple onChange={handleFileChange} isFileSelected={isFileSelected} fileUnselectHandling={handleFileUnselect} />
					</FormControl>
					<FormDescription>노트 파일을 업로드합니다.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function BucketUUIDField({ form }: { form: any }) {
	return (
		<FormField
			control={form.control}
			name="bucket_id"
			render={({ field }) => (
				<FormItem>
					<FormLabel>버킷 UUID</FormLabel>
					<FormControl>
						<Input disabled {...field} />
					</FormControl>
					<FormDescription>버킷 UUID입니다.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
