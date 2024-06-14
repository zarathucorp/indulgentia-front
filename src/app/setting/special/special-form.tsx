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

export function SpecialForm() {
	const { username: githubUsername, error: githubError, isLoading: isLoadingGithub, mutate: mutateGithub } = useGithub();

	return (
		<div className="">
			<TooltipProvider>
				<Label className="flex">
					GitHub 토큰 다시 받아오기&nbsp;{" "}
					<Tooltip>
						<TooltipTrigger>
							<FaRegCircleQuestion />
						</TooltipTrigger>
						<TooltipContent>
							<p>GitHub 계정에 연구실록 앱을 설치하였으나, 연구실록상에서 연결을 해제한 경우, 다시 연동 버튼을 클릭해도 새로운 Organization에 연결하지 않는 경우 토큰을 받아올 수 없습니다.</p>
							<p>이런 경우 &apos;토큰 다시 받아오기&apos; 버튼을 클릭하시기 바랍니다.</p>
						</TooltipContent>
					</Tooltip>
				</Label>
			</TooltipProvider>
			<div className="mt-2 flex items-center gap-2">
				<Input type="email" disabled value={isLoadingGithub ? "정보를 불러오는 중입니다." : githubError || githubUsername} />
				<Link href={process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL || "#"}>
					<Button type="button">깃허브 계정 연동</Button>
				</Link>
				<Link href={"https://github.com/login/oauth/authorize?client_id=Iv23li79mqTdxRfQ2tpK&redirect_uri=https://dev.rndsillog.com/next-api/github/callback" || "#"}>
					<Button type="button">토큰 다시 받아오기</Button>
				</Link>

				{/* <Button
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
				</Button> */}
			</div>
		</div>
	);
}
