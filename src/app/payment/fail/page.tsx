"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function FailPage() {
	const searchParams = useSearchParams();

	return (
		<main className="flex flex-col items-center p-6">
			<div className="box_section w-full max-w-xl p-6 bg-white shadow-md rounded-lg">
				<img width={100} height={100} src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="에러 이미지" className="mx-auto" />
				<h2 className="text-2xl font-semibold mt-4 text-center">결제를 실패했어요</h2>

				<div className="grid grid-cols-2 gap-4 mt-8 text-lg">
					<div className="text-left font-medium">에러메시지</div>
					<div className="text-right">{searchParams.get("message") ?? "알 수 없음"}</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4 text-lg">
					<div className="text-left font-medium">에러코드</div>
					<div className="text-right">{searchParams.get("code") ?? "UNKNOWN_ERROR"}</div>
				</div>

				<div className="flex justify-between mt-6">
					<Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
						<button className="px-4 py-2 bg-blue-500 text-white rounded-md">연동 문서</button>
					</Link>
					<Link href="https://discord.gg/A4fRFXQhRu">
						<button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md">실시간 문의</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
