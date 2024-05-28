"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
interface Payment {
	orderName: string;
	approvedAt: string;
	receipt: {
		url: string;
	};
	totalAmount: number;
	method: "카드" | "가상계좌" | "계좌이체";
	paymentKey: string;
	orderId: string;
}

export default function SuccessPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [payment, setPayment] = useState<Payment | null>(null);

	useEffect(() => {
		const paymentKey = searchParams.get("paymentKey");
		const orderId = searchParams.get("orderId");
		const amount = searchParams.get("amount");

		if (paymentKey && orderId && amount) {
			axios
				.post(
					"/next-api/confirm-payment",
					{ paymentKey, orderId, amount },
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((response) => {
					if (response.data.payment) {
						setPayment(response.data.payment);
					} else {
						router.push(`/payment/fail?code=${response.data.error.code}&message=${encodeURIComponent(response.data.error.message)}`);
					}
				})
				.catch((error) => {
					console.error("Error:", error);
					router.push(`/payment/fail?message=${encodeURIComponent(error.message)}`);
				});
		}
	}, [searchParams, router]);

	if (!payment) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center p-6">
			<div className="box_section w-full max-w-xl p-6 bg-white shadow-md rounded-lg">
				<img width={100} height={100} src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="결제 완료" />
				<h2 className="text-2xl font-semibold mt-4">결제를 완료했어요</h2>
				<div className="grid grid-cols-2 gap-4 mt-8 text-lg">
					<div className="text-left font-medium">결제금액</div>
					<div className="text-right">{payment.totalAmount.toLocaleString()}원</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4 text-lg">
					<div className="text-left font-medium">주문번호</div>
					<div className="text-right">{payment.orderId}</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4 text-lg">
					<div className="text-left font-medium">PaymentKey</div>
					<div className="text-right break-all">{payment.paymentKey}</div>
				</div>
				<div className="flex justify-between mt-6">
					<Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
						<Button className="px-4 py-2 bg-blue-500 text-white rounded-md">연동 문서</Button>
					</Link>
					<Link href="https://discord.gg/A4fRFXQhRu">
						<Button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md">실시간 문의</Button>
					</Link>
				</div>
			</div>
			<div className="box_section w-full max-w-xl mt-6 p-6 bg-white shadow-md rounded-lg">
				<b>Response Data:</b>
				<div className="mt-2">{payment && <pre className="whitespace-pre-wrap">{JSON.stringify(payment, null, 4)}</pre>}</div>
			</div>
		</div>
	);
}
