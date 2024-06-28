"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProcessingPayment from "./ProcessingPayment";
import { FaCheck } from "react-icons/fa";
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
					process.env.NEXT_PUBLIC_API_URL + "/payment/toss/confirm",
					// "/next-api/confirm-payment",
					{
						paymentKey: paymentKey,
						orderId: orderId,
						amount: amount,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((response) => {
					if (response.data.data.payment) {
						setPayment(response.data.data.payment);
					} else {
						router.push(`/payment/fail?code=${response.data.error.code}&message=${encodeURIComponent(response.data.error.message)}`);
					}
				})
				.catch((error) => {
					console.error("Error:", error);
					router.push(`/payment/fail?message=${encodeURIComponent(error.message)}&orderId=${orderId}`);
				});
		}
	}, [searchParams, router]);

	if (!payment) {
		return <ProcessingPayment />;
	}

	return (
		<div className="flex flex-col items-center p-6">
			<div className="box_section w-full max-w-xl p-6 bg-white shadow-md rounded-lg">
				<FaCheck width={100} height={100} className="mx-auto text-5xl" />
				<h2 className="text-2xl font-semibold mt-4">결제가 완료되었습니다.</h2>
				<h3 className="text-xl font-semibold mt-4">설정-결제에서 결제내역을 확인하실 수 있습니다.</h3>
				<div className="grid grid-cols-2 gap-4 mt-8 text-lg">
					<div className="text-left font-medium">결제금액</div>
					<div className="text-right">{payment.totalAmount.toLocaleString()}원</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4 text-lg">
					<div className="text-left font-medium">주문번호</div>
					<div className="text-right">{payment.orderId}</div>
				</div>
			</div>
		</div>
	);
}
