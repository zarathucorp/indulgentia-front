"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { map } from "zod";
import { UsePeriodPolicy, RefundPolicy } from "@/components/global/UsePeriodRefundPolicy";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function PricingPage() {
	const numbers = Array.from({ length: 41 }, (_, i) => i + 10);
	const [numUser, setNumUser] = useState<string>("10");
	const totalPrice = parseInt(numUser) * 100_000;
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const getUser = async () => {
			const supabase = createClient();
			const { data: user } = await supabase.auth.getUser();
			if (user) setIsLoggedIn(true);
		};

		getUser();
	}, []);

	const handleSubmit = (e: any) => {
		e.preventDefault();
    if (isLoggedIn) {
      router.push(`/payment?type=New&user=${numUser}`);
    } else {
      router.push("/auth/login");
    }
	}

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
								<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<Label htmlFor="num_user" className="block text-sm font-medium text-gray-700 mb-2">
										유저 수를 선택해주세요
									</Label>
									<Input type="number" value={numUser} step="5" min="10" onChange={(e) => setNumUser(e.target.value)} />
								</div>
								<p className="text-lg font-medium text-gray-800 mb-6">
									{Math.ceil(parseInt(numUser)/5)*5}명 * 100,000원/1년 = {totalPrice.toLocaleString()}원
								</p>
								<Button size="lg" className="w-full text-white" type="submit">
									시작하기
								</Button>
								</form>
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
