"use client";
import { useEffect, useRef, useState } from "react";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import useSWRImmutable from "swr/immutable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { UsePeriodPolicy, RefundPolicy } from "@/components/global/UsePeriodRefundPolicy";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import daysLeft from "@/utils/time/daysLeft";
import next from "next";
import axios, { isAxiosError } from "axios";
// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY as string;
const customerKey = nanoid();

const fetcher = async ({ clientKey, customerKey }: { clientKey: string; customerKey: string }) => {
	return loadPaymentWidget(clientKey, customerKey);
};

type PaymentTypeType = "New" | "AddUser";

function getPaymentType(param: string | null): PaymentTypeType {
	const validTypes: PaymentTypeType[] = ["New", "AddUser"];
	return validTypes.includes(param as PaymentTypeType) ? (param as PaymentTypeType) : "New";
}

export default function Payment() {
	const router = useRouter();
	const params = useSearchParams();

	if (!params.has("user") || !params.has("type")) router.push("/pricing");
	if (params.get("type") === "AddUser" && !params.has("subscribeEndDate")) router.push("/pricing");
	const { toast } = useToast();
	const numUser = params.get("user") || "10";
	if (params.get("type") === "New" && parseInt(numUser) < 10) router.push("/pricing");
	const paymentType: PaymentTypeType = getPaymentType(params.get("type"));

	let price: number = 0;
	if (paymentType === "New") {
		price = parseInt(numUser) * 100_000;
	} else if (paymentType === "AddUser") {
		const subscribeEndDate = params.get("subscribeEndDate");
		const subscribeLeftDays = daysLeft(subscribeEndDate);
		price = Math.round(100_000 / 365 / 100) * 100 * subscribeLeftDays * parseInt(numUser);
	} else {
		router.push("/pricing");
	}
	const { data: paymentWidget, error } = useSWRImmutable({ clientKey, customerKey }, fetcher);
	const paymentMethodsWidgetRef = useRef<any>(null);
	// const [price, setPrice] = priceuseState(50000);
	const [paymentMethodsWidgetReady, setPaymentMethodsWidgetReady] = useState(false);

	useEffect(() => {
		const currentUser = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				toast({
					title: "로그인이 필요합니다.",
					description: "결제는 로그인 후 가능합니다.",
				});
				router.push("/auth/login");
			}
		};
		currentUser();
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paymentWidget]);

	useEffect(() => {
		const paymentMethodsWidget = paymentMethodsWidgetRef.current;
		if (paymentMethodsWidget) {
			// Update amount
			paymentMethodsWidget.updateAmount(price);
		}
	}, [price]);

	return (
		<div className="flex flex-col items-center max-w-2xl mx-auto p-6">
			<h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">결제하기 - {params.get("type") === "New" ? `${numUser}명 신규 구독` : `${numUser}명 추가 구독`}</h1>
			<div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
				<div className="p-8">
					<p className="text-xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-300">{price.toLocaleString()}원을 결제합니다</p>
					<div id="payment-widget" className="w-full mb-6" />
					<div id="agreement" className="w-full mb-6" />
					<Button
						className="w-full py-3 text-lg font-semibold transition-all duration-200 ease-in-out"
						disabled={!paymentMethodsWidgetReady}
						onClick={async (event) => {
							event.preventDefault();

							try {
								if (!paymentWidget) throw new Error("Payment widget is not ready");
								const supabase = createClient();
								const { data } = await supabase.auth.getUser();
								console.log(data);
								const orderId = nanoid();
								try {
									console.log(orderId);
									await axios.post(process.env.NEXT_PUBLIC_API_URL + `/payment/toss/start`, {
										orderId: orderId,
										amount: price,
										is_annual: true,
										max_members: numUser,
										note: paymentType === "New" ? `연구실록 ${numUser}명 1년 구독` : `연구실록 ${numUser}명 추가 구독`,
									});
								} catch (error: any) {
									console.log(error);
									if (isAxiosError(error)) {
										throw new Error(error?.response?.data?.detail);
									} else {
										throw new Error(error?.message);
									}
								}
								await paymentWidget.requestPayment({
									orderId: orderId,
									orderName: paymentType === "New" ? `연구실록 ${numUser}명 1년 구독` : `연구실록 ${numUser}명 추가 구독`,
									customerName: (data?.user?.user_metadata?.last_name ?? "") + (data?.user?.user_metadata?.first_name ?? ""),
									customerEmail: data?.user?.email ?? "",
									successUrl: `${window.location.origin}/payment/success`,
									failUrl: `${window.location.origin}/payment/fail`,
								});
							} catch (error: any) {
								console.error(error);
								toast({
									title: "결제 요청 실패",
									description: `결제 요청에 실패했습니다. ${error?.response?.data?.detail ?? error.message}`,
								});
							}
						}}
					>
						결제하기
					</Button>
				</div>
			</div>
			<div className="mt-8 w-full">
				<UsePeriodPolicy />
				<RefundPolicy />
			</div>
		</div>
	);
}
