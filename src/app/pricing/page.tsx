"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { map } from "zod";
import { UsePeriodPolicy, RefundPolicy } from "@/components/global/UsePeriodRefundPolicy";
import { useState } from "react";
export default function PricingPage() {
	const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
	const [numUser, setNumUser] = useState<string>("10");
	return (
		<>
			<section className="w-full py-6 md:py-12 lg:py-16">
				<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
					<div>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">알맞는 플랜을 선택하세요</h2>
						<div className="grid grid-cols-1 gap-4">
							{/* <div className="border rounded-lg p-4">
								<h3 className="text-xl font-bold">무료 플랜</h3>
								<ul className="text-left list-disc pl-4">
									<li>Basic features included</li>
									<li>Limited support</li>
									<li>Up to 5 projects</li>
								</ul>
								<div className="mt-4">
									<Button size="lg">Select Free Plan</Button>
								</div>
							</div> */}
							<div className="border rounded-lg p-4">
								<h3 className="text-xl font-bold">팀 플랜</h3>
								<ul className="text-left list-disc pl-4">
									<li>무제한 GitHub Repository 연동</li>
									<li>무제한 프로젝트/버킷/노트 생성</li>
									<li>블록체인을 이용한 전자서명</li>
								</ul>
								<div className="mt-4">
									<Label htmlFor="num_user">유저 수를 선택해주세요.</Label>
									<Select name="num_user" value={numUser} onValueChange={setNumUser}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="유저 수 선택" />
										</SelectTrigger>
										<SelectContent>
											{numbers.map((num: number) => (
												<SelectItem key={num} value={num.toString()}>
													{num}명
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<Label>
									{numUser}명 * 50,000원/1년 = {(parseInt(numUser) * 50_000).toLocaleString()}원
								</Label>
								<div className="mt-4">
									<Link href={`/payment?user=${numUser}`}>
										<Button size="lg">선택하기</Button>
									</Link>
								</div>
							</div>
						</div>
						{/* <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Need more details? Compare the plans below.</p> */}
					</div>

					{/* <div className="mx-auto w-full max-w-2xl space-y-2">
						<table className="w-full border-collapse border border-gray-200 dark:border-gray-800">
							<thead>
								<tr className="bg-gray-100 dark:bg-gray-800">
									<th className="border border-gray-200 dark:border-gray-800 p-2">Features</th>
									<th className="border border-gray-200 dark:border-gray-800 p-2">Free Plan</th>
									<th className="border border-gray-200 dark:border-gray-800 p-2">Professional Plan</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Basic features</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">✓</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">✓</td>
								</tr>
								<tr>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Support</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Limited</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Premium</td>
								</tr>
								<tr>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Projects</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Up to 5</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Unlimited</td>
								</tr>
							</tbody>
						</table>
					</div> */}
				</div>
			</section>
			<UsePeriodPolicy />
			<RefundPolicy />
		</>
	);
}
