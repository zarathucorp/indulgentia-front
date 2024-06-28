"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddUserButton } from "./payment-button";
import { useTeamInfo } from "@/hooks/fetch/useTeam";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function UserAddModal({ className }: { className?: string }) {
	const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
	const [numUser, setNumUser] = useState<string>("1");
	const [subscribeEndDate, setSubscribeEndDate] = useState<string>("");
	const { teamInfo, hasTeam, error, isLoading, mutate, isLeader } = useTeamInfo();
	return (
		<Dialog>
			<DialogTrigger asChild>
				{!isLoading && (
					<Button className={className} disabled={!hasTeam || !isLeader}>
						{/* // 먼저 결제 후 */}
						{isLeader ? "유저 추가하기" : "팀장만 유저를 추가할 수 있습니다."}
					</Button>
				)}
				{/* <AddUserButton className={`${className}`} /> */}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>유저를 추가합니다</DialogTitle>
					<DialogDescription>현재 플랜에 유저를 추가합니다.</DialogDescription>
				</DialogHeader>
				<Select name="num_user" value={numUser} onValueChange={setNumUser}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="유저 수 선택" />
					</SelectTrigger>
					<SelectContent>
						{numbers.map((num) => (
							<SelectItem key={num} value={num.toString()}>
								{num}명
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<p>이용 기간은 _까지이며 추가 비용은 _원입니다.</p>
				<Link href={`/payment?user=${numUser}&type="AddUser&subscribeEndDate=${subscribeEndDate}`}>
					<Button className="w-full">추가하기</Button>
				</Link>
			</DialogContent>
		</Dialog>
	);
}
