"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdError } from "react-icons/md";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
const FormSchema = z.object({
	name: z.string({
		required_error: "이름은 필수 항목입니다",
	}),
	email: z
		.string({
			required_error: "이메일은 필수 항목입니다.",
		})
		.email({ message: "유효하지 않은 이메일 주소입니다." }),
	phone: z.string().optional(),
	description: z.string().optional(),
	size: z.string({ required_error: "검토 규모는 필수 항목입니다." }),
});
export default function Component() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const { data: axiosResult } = await axios.post(process.env.NEXT_PUBLIC_INQUIRY_URL as string, data);
			if (axiosResult.status !== "succeed") throw new Error("문의 접수에 실패하였습니다.");
			toast({
				title: "문의 접수에 성공하였습니다.",
				description: (
					<p>
						<IoIosCheckmarkCircleOutline /> 문의를 접수하였습니다. 최대한 빠르게 연락드리도록 하겠습니다.
					</p>
				),
			});
		} catch (error) {
			console.error(error);
			toast({
				title: "문의 접수에 실패하였습니다.",
				description: <p>잠시 후 다시 시도하여 주십시오. 오류가 지속되는 경우 limcw@zarathu.com 으로 연락주시면 빠르게 응대해 드리겠습니다.</p>,
			});
		}
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="space-y-6">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">문의하기</h1>
					<p className="mt-3 text-lg text-gray-500 dark:text-gray-400">아래 정보를 남겨주시면 빠르게 회신 드리겠습니다.</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										이름 <b className="text-red-600">*</b>
									</FormLabel>
									<FormControl>
										<Input placeholder="이름을 입력하여 주십시오." {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										이메일 <b className="text-red-600">*</b>
									</FormLabel>
									<FormControl>
										<Input placeholder="이메일을 입력하여 주십시오." {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>전화번호</FormLabel>
									<FormControl>
										<Input placeholder="전화번호를 입력하여 주십시오." {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>남기실 말씀</FormLabel>
									<FormControl>
										<Textarea placeholder="남기실 말씀을 입력하여 주십시오." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="size"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										검토 규모(예상) <b className="text-red-600">*</b>
									</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="규모 선택" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="size_1to10">1~10인</SelectItem>
											<SelectItem value="size_11to50">11~50인</SelectItem>
											<SelectItem value="size_over50">50인 이상</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>도입을 검토하시는 규모를 선택하여 주십시오.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							제출하기
						</Button>
					</form>
				</Form>

				<Separator />
				<div className="text-center">
					{/* <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">문의하기</h1> */}
					<Link href="mailto:office@zarathu.com">
						<p className="mt-3 text-lg text-gray-500 dark:text-gray-400">또는 이메일로 문의하기</p>
					</Link>
					<p className="mt-3 text-lg text-gray-500 dark:text-gray-400">우측 하단의 채널톡을 통해서도 문의 가능합니다.</p>
				</div>
			</div>
		</div>
	);
}
