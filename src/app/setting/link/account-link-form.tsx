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
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export function AccountLinkForm() {
	const { username: githubUsername, error: githubError, isLoading: isLoadingGithub, mutate: mutateGithub } = useGithub();
	const [userProvider, setUserProvider] = useState<string | null>(null);
	
	const getUserIdentities = async () => {
		const supabase = createClient();
		const { data, error } = await supabase.auth.getUserIdentities();
		if (error) {
			throw error;
		}
		console.log(data);
		const emailIdentities = data?.identities.filter((identity) => identity.provider === "email");
		const nonEmailIdentities = data?.identities.filter((identity) => identity.provider !== "email");

		if (emailIdentities && emailIdentities.length > 0 && nonEmailIdentities.length < 1) {
			setUserProvider("email");
		} else if (nonEmailIdentities && nonEmailIdentities.length > 0) {
			setUserProvider(nonEmailIdentities[0].provider);
		}
	}
	
	
	useEffect(() => {
		getUserIdentities();
		console.log(userProvider);
	}, [userProvider]);

	return (
		<div className="">
		<TooltipProvider>
			<Label className="flex">
				연결한 계정&nbsp;{" "}
				<Tooltip delayDuration={100}>
					<TooltipTrigger>
						<FaRegCircleQuestion />
					</TooltipTrigger>
					<TooltipContent>
						<p>계정이 연결된 곳을 확인합니다.</p>
						<p>								
							서비스 제공자: 이메일, 구글, 네이버, 카카오
						</p>
						<p>
							<i>* 네이버, 카카오 연결은 준비중입니다.</i>
						</p>
					</TooltipContent>
				</Tooltip>
			</Label>
		</TooltipProvider>
		<div className="mt-2 mb-4 flex items-center gap-2">
			{userProvider === "google" ? <><FcGoogle /><p>Google</p></> : userProvider === "email" ? <><MdEmail /><p>Email</p></> : "연동된 계정이 없습니다."}
		</div>
			<TooltipProvider>
				<Label className="flex">
					<FaGithub/>&nbsp;GitHub 연결&nbsp;{" "}
					<Tooltip delayDuration={100}>
						<TooltipTrigger>
							<FaRegCircleQuestion />
						</TooltipTrigger>
						<TooltipContent>
							<p>&apos;GitHub 계정 연결&apos; 버튼이 반응하지 않는 경우 &apos;토큰 다시 받아오기&apos;를 사용하시기 바랍니다.</p>
							<p>								
								다음과 같은 상황에서 일어날 수 있습니다.
							</p>
							<p>
								- GitHub 계정 연동을 해제하고 GitHub 상에서는 연구실록을 삭제하지 않은 경우
							</p>
							<p>
								- 여러 개의 연구실록 계정에서 동일한 GitHub 계정으로 로그인 한 경우
							</p>
						</TooltipContent>
					</Tooltip>
				</Label>
			</TooltipProvider>
			<div className="mt-2 flex items-center gap-2">
				<Input type="email" disabled value={isLoadingGithub ? "정보를 불러오는 중입니다." : githubError || githubUsername} />
				<a target="_blank" href={process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL || "#"}>
					<Button type="button">GitHub 계정 연결</Button>
				</a>
				<a href={"https://github.com/login/oauth/authorize?client_id=Iv23li79mqTdxRfQ2tpK&redirect_uri=https://rndsillog.com/next-api/github/callback" || "#"}>
					<Button type="button">토큰 다시 받아오기</Button>
				</a>
				{githubError ? (<Button
					type="button"
					onClick={async () => {
						try {
							await disconnectGitHub();
							toast({
								title: "연결 해제에 성공하였습니다.",
								description: `연결 해제에 성공하였습니다.`,
							});
						} catch (e: any) {
							toast({
								title: "연결 해제에 실패하였습니다.",
								description: `연결 해제에 실패하였습니다: ${e.message}`,
							});
						} finally {
							await mutateGithub();
						}
					}}
					className={`bg-red-500 hover:bg-red-700 ${githubError ? "hidden" : ""}`}
				>
					연결 해제
				</Button>) : null}
				{/* <Button
					type="button"
					onClick={async () => {
						try {
							await disconnectGitHub();
							toast({
								title: "연결 해제에 성공하였습니다.",
								description: `연결 해제에 성공하였습니다.`,
							});
						} catch (e: any) {
							toast({
								title: "연결 해제에 실패하였습니다.",
								description: `연결 해제에 실패하였습니다: ${e.message}`,
							});
						} finally {
							await mutateGithub();
						}
					}}
					className="bg-red-500 hover:bg-red-700"
				>
					연결 해제
				</Button> */}
			</div>
		</div>
	);
}
