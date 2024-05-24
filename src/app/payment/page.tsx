"use client";
import { useEffect, useRef, useState } from "react";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import useSWRImmutable from "swr/immutable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY as string;
const customerKey = nanoid();

const fetcher = async ({ clientKey, customerKey }: { clientKey: string; customerKey: string }) => {
	return loadPaymentWidget(clientKey, customerKey);
};

export default function Home() {
	const { data: paymentWidget, error } = useSWRImmutable({ clientKey, customerKey }, fetcher);
	const paymentMethodsWidgetRef = useRef<any>(null);
	const [price, setPrice] = useState(50000);
	const [paymentMethodsWidgetReady, setPaymentMethodsWidgetReady] = useState(false);

	useEffect(() => {
		if (!paymentWidget) return;

		// Render payment methods widget
		const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", { value: price }, { variantKey: "DEFAULT" });

		// Render agreement widget
		paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

		// Payment methods widget ready event
		paymentMethodsWidget.on("ready", () => {
			paymentMethodsWidgetRef.current = paymentMethodsWidget;
			setPaymentMethodsWidgetReady(true);
		});
	}, [paymentWidget]);

	useEffect(() => {
		const paymentMethodsWidget = paymentMethodsWidgetRef.current;
		if (paymentMethodsWidget) {
			// Update amount
			paymentMethodsWidget.updateAmount(price);
		}
	}, [price]);

	return (
		<div className="flex flex-col items-center">
			<div className="p-6 box_section w-full max-w-xl bg-white shadow-md rounded-lg">
				<div id="payment-widget" className="w-full mb-4" />
				<div id="agreement" className="w-full mb-4" />
				{/* <div className="pl-6">
					<div className="flex items-center space-x-2">
						<Input
							id="coupon-box"
							className="form-checkbox"
							type="checkbox"
							aria-checked="true"
							disabled={!paymentMethodsWidgetReady}
							onChange={(event) => {
								setPrice(event.target.checked ? price - 5000 : price + 5000);
							}}
						/>
						<label htmlFor="coupon-box" className="text-sm font-medium text-gray-900">
							5,000원 쿠폰 적용
						</label>
					</div>
				</div> */}

				<Button
					className="mt-6 w-full"
					disabled={!paymentMethodsWidgetReady}
					onClick={async (event) => {
						event.preventDefault();
						try {
							if (!paymentWidget) throw new Error("Payment widget is not ready");

							// Request payment
							await paymentWidget.requestPayment({
								orderId: nanoid(),
								orderName: "토스 티셔츠 외 2건",
								customerName: "김토스",
								customerEmail: "customer123@gmail.com",
								customerMobilePhone: "01012341234",
								successUrl: `${window.location.origin}/payment/success`,
								failUrl: `${window.location.origin}/payment/fail`,
							});
						} catch (error) {
							// Handle error
							console.error(error);
						}
					}}
				>
					결제하기
				</Button>
			</div>
		</div>
	);
}
