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
	const numbers = Array.from({ length: 41 }, (_, i) => i + 10);
	const [numUser, setNumUser] = useState<string>("10");
	const totalPrice = parseInt(numUser) * 100_000;
	return (
		<>
			<section className="w-full py-12 ">
				<div className="container mx-auto px-4 md:px-6">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">알맞는 플랜을 선택하세요</h2>
						<div className="bg-white shadow-lg rounded-lg overflow-hidden">
							<div className="p-6 md:p-8">
								<h3 className="text-2xl font-semibold text-gray-800 mb-4">팀 플랜</h3>
								<ul className="text-left list-disc pl-6 mb-6 text-gray-600">
									<li>무제한 GitHub Repository 연동</li>
									<li>무제한 프로젝트/버킷/노트 생성</li>
									<li>블록체인을 이용한 전자서명</li>
								</ul>
								<div className="mb-4">
									<Label htmlFor="num_user" className="block text-sm font-medium text-gray-700 mb-2">
										유저 수를 선택해주세요
									</Label>
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
								</div>
								<p className="text-lg font-medium text-gray-800 mb-6">
									{numUser}명 * 100,000원/1년 = {totalPrice.toLocaleString()}원
								</p>
								{/* <Link href={`/payment?user=${numUser}`}>
									<Button size="lg" className="w-full text-white">
										선택하기
									</Button>
								</Link> */}
								<Link href={`/setting/payment`}>
									<Button size="lg" className="w-full text-white">
										시작하기
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="py-12">
				<UsePeriodPolicy />
				<RefundPolicy />
			</div>
		</>
	);
}
