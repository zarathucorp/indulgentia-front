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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { SendPasswordResetMailModal } from "@/app/auth/login/SendPasswordResetMailModal";
import { AccountRemoveModal } from "@/components/global/RemoveModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
const accountFormSchema = z.object({
	lastName: z.string().max(30, { message: "30자 이하로 입력해주세요" }).nullable(),
	firstName: z.string().max(30, { message: "30자 이하로 입력해주세요" }).nullable(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
	const [userEmail, setUserEmail] = useVariable<string>("");
	const { username: githubUsername, error: githubError, isLoading: isLoadingGithub, mutate: mutateGithub } = useGithub();
	const { userInfo, isUser, error: userInfoError, isLoading: isLoadingUserInfo, mutate: userMutate } = useUser();
	const [ accountRemoveModalOpen, setAccountRemoveModalOpen] = useState<boolean>(false);
	const router = useRouter();
	const onLeaveButtonClick = async () => {
		try {
			setAccountRemoveModalOpen(true);
			return;
		} catch (error: any) {
			console.error("Error account remove:", error.response.data.detail);
			toast({
				title: "계정 탈퇴 실패",
				description: `계정이 탈퇴되지 않았습니다. ${error?.response?.data?.detail ?? error.message}`,
			});
		}
	};

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

			if (!user) {
				toast({
					title: "로그인이 필요합니다.",
					description: "계정 설정은 로그인 후 가능합니다.",
				});
				router.push("/auth/login");
			}

			if (!user?.email) redirect("/auth/login");

			setUserEmail(user.email);
		};

		getUser();
		userMutate();
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

			const response = await axios.patch(
				process.env.NEXT_PUBLIC_API_URL + "/user/settings/info",
				{
					first_name: processedData.firstName,
					last_name: processedData.lastName,
				},
			);

			toast({
				title: "업데이트에 성공하였습니다.",
				description: `설정 업데이트에 성공하였습니다.`,
			});
		} catch (error: any) {
			console.error(error);

			toast({
				title: "업데이트에 실패하였습니다.",
				description: `설정 업데이트에 실패하였습니다: ${error?.response?.data?.detail ?? error.message}`,
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
								{/* <FormLabel>성</FormLabel> */}
								<TooltipProvider>
									<FormLabel>
										성&nbsp;{" "}
										<Tooltip delayDuration={100}>
											<TooltipTrigger>
												<FaRegCircleQuestion />
											</TooltipTrigger>
											<TooltipContent>
												<p>
													사용자의 성(Last name)입니다.
												</p>
												<p>
												이 성은 연구노트 작성자로 활용됩니다. 성을 변경하더라도 이미 생성된 연구노트 PDF에는 영향을 끼치지 않습니다.
												</p>
											</TooltipContent>
										</Tooltip>
									</FormLabel>
								</TooltipProvider>
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
								{/* <FormLabel>이름</FormLabel> */}
								<TooltipProvider>
									<FormLabel>
										이름&nbsp;{" "}
										<Tooltip delayDuration={100}>
											<TooltipTrigger>
												<FaRegCircleQuestion />
											</TooltipTrigger>
											<TooltipContent>
												<p>
													사용자의 이름(First name)입니다.
												</p>
												<p>
												이 이름은 연구노트 작성자로 활용됩니다. 이름을 변경하더라도 이미 생성된 연구노트 PDF에는 영향을 끼치지 않습니다.
												</p>
											</TooltipContent>
										</Tooltip>
									</FormLabel>
								</TooltipProvider>
								<FormControl>
									<Input placeholder="이름을 입력하세요" {...field} disabled={isLoadingUserInfo} value={isLoadingUserInfo ? "값을 불러오는 중입니다." : field.value ?? ""} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{/* <FormDescription>이 이름은 연구노트 작성자로 활용됩니다. 이름을 변경하더라도 이미 생성된 연구노트 PDF에는 영향을 끼치지 않습니다.</FormDescription> */}
				<FormField
					name="signature"
					render={() => (
						<FormItem>
							{/* <FormLabel>이메일</FormLabel> */}
							<TooltipProvider>
								<FormLabel>
									이메일&nbsp;{" "}
									<Tooltip delayDuration={100}>
										<TooltipTrigger>
											<FaRegCircleQuestion />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												사용자의 이메일입니다.
											</p>
											<p>
												이메일은 변경할 수 없습니다.
											</p>
										</TooltipContent>
									</Tooltip>
								</FormLabel>
							</TooltipProvider>
							<FormControl>
								<Input disabled type="email" value={userEmail} />
							</FormControl>
							{/* <FormDescription>이메일은 변경할 수 없습니다.</FormDescription> */}
							<FormMessage />
							<SendPasswordResetMailModal/>
						</FormItem>
					)}
				/>
				<div className="hidden">
					<div>
						<TooltipProvider>
							<FormLabel className="flex">
								GitHub 계정 연결&nbsp;{" "}
								<Tooltip delayDuration={100}>
									<TooltipTrigger>
										<FaRegCircleQuestion />
									</TooltipTrigger>
									<TooltipContent>
										<p>
											&apos;GitHub 계정 연동&apos; 버튼을 눌러도 계정을 연결할 수 없는 경우{" "}
											<Link href="/setting/link">
												<u>&apos;계정 연동&apos;</u>
											</Link>{" "}
											탭으로 가시기 바랍니다.
										</p>
									</TooltipContent>
								</Tooltip>
							</FormLabel>
						</TooltipProvider>
						{/* <Label>연결된 계정</Label> */}
					</div>
					<div className="mt-2 flex items-center gap-2">
						<Input type="email" disabled value={isLoadingGithub ? "정보를 불러오는 중입니다." : githubError || githubUsername} />
						<a target="_blank" href={process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL || "#"}>
							<Button type="button">GitHub 계정 연동</Button>
						</a>
						{/* <Link href={"https://github.com/login/oauth/authorize?client_id=Iv23li79mqTdxRfQ2tpK&redirect_uri=https://dev.rndsillog.com/next-api/github/callback" || "#"}>
							<Button type="button">토큰 다시 받아오기</Button>
						</Link> */}

						{githubError ? (<Button
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
							className={`bg-red-500 hover:bg-red-700 ${githubError ? "hidden" : ""}`}
						>
							연동 해제
						</Button>) : null}
					</div>
				</div>
				<Button type="submit">설정 업데이트</Button>
				<Button type="button" disabled={!isUser} className="bg-red-500 hover:bg-red-700" onClick={onLeaveButtonClick}>
					계정 탈퇴
				</Button>
				{userInfo && <AccountRemoveModal isOpen={accountRemoveModalOpen} setIsOpen={setAccountRemoveModalOpen} userInfo={userInfo} userMutate={userMutate} />}
			</form>
		</Form>
	);
}
