"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import SignaturePad from "@/components/global/SignaturePad";
const languages = [
	{ label: "English", value: "en" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" },
	{ label: "Spanish", value: "es" },
	{ label: "Portuguese", value: "pt" },
	{ label: "Russian", value: "ru" },
	{ label: "Japanese", value: "ja" },
	{ label: "Korean", value: "ko" },
	{ label: "Chinese", value: "zh" },
] as const;

const accountFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(30, {
			message: "Name must not be longer than 30 characters.",
		}),

	dob: z.date({
		required_error: "A date of birth is required.",
	}),
	language: z.string({
		required_error: "Please select a language.",
	}),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
	// name: "Your name",
	// dob: new Date("2023-01-23"),
};

export function AccountForm() {
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	});

	const handleSaveSignature = async (signatureImage: string) => {
		try {
			const response = await axios.post("https://quick-star-teal.ngrok-free.app/api/signatures", { image: signatureImage });
			console.log("Signature saved:", response.data);
		} catch (error) {
			console.error("Error saving signature:", error);
		}
	};

	function onSubmit(data: AccountFormValues) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>이름</FormLabel>
								<FormControl>
									<Input placeholder="이름을 입력하세요" {...field} />
								</FormControl>
								<FormDescription>이 이름은 연구노트 작성자로 활용됩니다. 이름을 변경하더라도 이미 생성된 연구노트 PDF에는 영향을 끼치지 않습니다.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						// control={form.control}
						name="signature"
						render={({ field }) => (
							<FormItem>
								<FormLabel>이메일</FormLabel>
								<FormControl>
									<Input disabled type="email" />
								</FormControl>
								<FormDescription>이메일은 변경할 수 없습니다.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<FormItem>
							<FormLabel>서명</FormLabel>

							{/* <SignaturePad onSave={handleSaveSignature} /> */}
							<SignaturePad />
							<FormDescription>이 서명은 연구노트에 기록됩니다.</FormDescription>
							<FormMessage />
						</FormItem>
					</div>
					<Button type="submit">설정 업데이트</Button>
				</form>
			</Form>
		</>
	);
}
