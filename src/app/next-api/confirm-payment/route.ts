// app/api/confirm-payment/route.ts
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
	const { paymentKey, orderId, amount } = await request.json();

	try {
		const response = await fetch("https://api.tosspayments.com/v1/payments/confirm/", {
			method: "POST",
			headers: {
				Authorization: `Basic ${Buffer.from(`${process.env.TOSS_PAYMENTS_SECRET_KEY}:`).toString("base64")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ paymentKey, orderId, amount }),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.redirect(new URL(`/payment/fail?code=${errorData.code}&message=${encodeURIComponent(errorData.message)}`, request.url));
		}

		const payment: Payment = await response.json();
		return NextResponse.json({ payment });
	} catch (error: any) {
		console.error("Error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
