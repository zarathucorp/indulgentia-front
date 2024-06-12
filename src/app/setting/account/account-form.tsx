"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import SignaturePad from "@/components/global/SignaturePad";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useVariable } from "@/hooks/useVariable";
import { redirect } from "next/navigation";
import useGithub, { disconnectGitHub } from "@/hooks/fetch/useGithub";
import useUser from "@/hooks/fetch/useUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const accountFormSchema = z.object({
	lastName: z.string().max(30, { message: "30자 이하로 입력해주세요" }).nullable(),
	firstName: z.string().max(30, { message: "30자 이하로 입력해주세요" }).nullable(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
	const [userEmail, setUserEmail] = useVariable<string>("");
	const { username: githubUsername, error: githubError, isLoading: isLoadingGithub, mutate: mutateGithub } = useGithub();
	const { userInfo, error: userInfoError, isLoading: isLoadingUserInfo } = useUser();

	const values: AccountFormValues = {
		firstName: userInfo?.first_name || null,
		lastName: userInfo?.last_name || null,
	};

	useEffect(() => {
		const getUser = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user?.email) redirect("/auth/login");

			setUserEmail(user.email);
		};

		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		values: values,
	});

	const onSubmit = async (data: AccountFormValues) => {
		const processedData = {
			...data,
			lastName: data.lastName?.trim() === "" ? null : data.lastName,
			firstName: data.firstName?.trim() === "" ? null : data.firstName,
		};

		try {
			if (processedData.lastName === null && processedData.firstName === null) {
				throw new Error("성과 이름 중 하나는 반드시 입력해야 합니다.");
			}

			await axios.patch(
				process.env.NEXT_PUBLIC_API_URL + "/user/settings/info",
				{
					first_name: processedData.firstName,
					last_name: processedData.lastName,
				},
				{ withCredentials: true }
			);

			toast({
				title: "업데이트에 성공하였습니다.",
				description: `설정 업데이트에 성공하였습니다.`,
			});
		} catch (error: any) {
			console.error(error);

			toast({
				title: "업데이트에 실패하였습니다.",
				description: `설정 업데이트에 실패하였습니다: ${error.message}`,
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>성</FormLabel>
								<FormControl>
									<Input placeholder="성을 입력하세요" {...field} disabled={isLoadingUserInfo} value={isLoadingUserInfo ? "값을 불러오는 중입니다." : field.value ?? ""} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>이름</FormLabel>
								<FormControl>
									<Input placeholder="이름을 입력하세요" {...field} disabled={isLoadingUserInfo} value={isLoadingUserInfo ? "값을 불러오는 중입니다." : field.value ?? ""} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormDescription>이 이름은 연구노트 작성자로 활용됩니다. 이름을 변경하더라도 이미 생성된 연구노트 PDF에는 영향을 끼치지 않습니다.</FormDescription>
				<FormField
					name="signature"
					render={() => (
						<FormItem>
							<FormLabel>이메일</FormLabel>
							<FormControl>
								<Input disabled type="email" value={userEmail} />
							</FormControl>
							<FormDescription>이메일은 변경할 수 없습니다.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="">
					<div>
						<FormLabel>GitHub 계정 연결</FormLabel>
						{/* <Label>연결된 계정</Label> */}
					</div>
					<div className="mt-2 flex items-center gap-2">
						<Input type="email" disabled value={isLoadingGithub ? "정보를 불러오는 중입니다." : githubError || githubUsername} />
						<Link href={process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL || "#"}>
							<Button type="button">깃허브 계정 연동</Button>
						</Link>
						<Link href={"https://github.com/login/oauth/authorize?client_id=Iv23li79mqTdxRfQ2tpK&redirect_uri=https://dev.rndsillog.com/next-api/github/callback" || "#"}>
							<Button type="button">토큰 다시 받아오기</Button>
						</Link>

						<Button
							type="button"
							onClick={async () => {
								try {
									await disconnectGitHub();
									toast({
										title: "연동 해제에 성공하였습니다.",
										description: `연동 해제에 성공하였습니다.`,
									});
								} catch (e: any) {
									toast({
										title: "연동 해제에 실패하였습니다.",
										description: `연동 해제에 실패하였습니다: ${e.message}`,
									});
								} finally {
									await mutateGithub();
								}
							}}
							className="bg-red-500 hover:bg-red-700"
						>
							연동 해제
						</Button>
					</div>
				</div>
				<Button type="submit">설정 업데이트</Button>
			</form>
		</Form>
	);
}
