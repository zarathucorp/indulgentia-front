import axios from "axios";
import { UUID } from "crypto";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
const fetcher = (url: string) =>
	axios
		.get(url, { withCredentials: true })
		.then((res) => {
			console.log(res.data.data);
			return res.data.data;
		})
		.catch(function (error) {
			if (error.response) {
				console.log("서버에서 오류가 발생했습니다.");
				console.error(error.response.data);
				throw new Error(error.response.data.message);
			} else if (error.request) {
				console.error(error.request);
				throw new Error("서버와 통신 중 문제가 발생했습니다.");
			} else {
				console.error("Error", error.message);
				throw new Error("알 수 없는 오류가 발생했습니다.");
			}
		});

type currentPlanType = {
	id: UUID;
	created_at: Date;
	updated_at: Date;
	team_id: UUID;
	started_at: Date;
	expired_at: Date;
	max_members: number;
	is_active: boolean;
	order_no: string;
};

const useCurrentPlan = () => {
	const { data, error, isLoading } = useSWRImmutable<currentPlanType>(process.env.NEXT_PUBLIC_API_URL + "/payment/order/subscription", fetcher);

	return {
		currentPlan: data,
		isLoading,
		error,
	};
};
const getCurrentPlanAxios = async () => {
	const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/payment/order/subscription");

	return {
		currentPlan: data.data as currentPlanType,
	};
};
type PaymentHistoryType = {
	id: UUID;
	created_at: Date;
	updated_at: Date;
	team_id: UUID;
	order_no: string;
	status: "READY" | "IN_PROGRESS" | "WAITING_FOR_DEPOSIT" | "DONE" | "CANCELED" | "PARTIAL_CANCELED" | "ABORTED" | "EXPIRED";
	payment_key: string;
	purchase_datetime: Date;
	is_canceled: boolean;
	total_amount: number;
	refund_amount: number;
	purchase_user_id: UUID;
	payment_method: "카드" | "가상계좌" | "간편결제" | "휴대폰" | "계좌이체" | "문화상품권" | "도서문화상품권" | "게임문화상품권";
	currency: string;
	notes: null | string;
};

const usePaymentHistory = () => {
	const { data, error, isLoading } = useSWRImmutable<PaymentHistoryType[]>(process.env.NEXT_PUBLIC_API_URL + "/payment/order/list", fetcher);

	return {
		paymentHistory: data,
		isLoading: isLoading,
		error,
	};
};

export type { PaymentHistoryType };

export { useCurrentPlan, getCurrentPlanAxios, usePaymentHistory };
