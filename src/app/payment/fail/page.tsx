"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineErrorOutline } from "react-icons/md";
export default function FailPage() {
	const searchParams = useSearchParams();

	return (
		<main className="flex flex-col items-center p-6">
			<div className="box_section w-full max-w-xl p-6 bg-white shadow-md rounded-lg">
				<MdOutlineErrorOutline width={100} height={100} className="mx-auto text-5xl" />
				<h2 className="text-2xl font-semibold mt-4 text-center">결제를 실패했어요</h2>
				<h3 className="text-xl font-semibold mt-4 text-center">우측 하단 채팅이나 상단 문의하기를 통해 문의해주세요.</h3>
				<div className="grid grid-cols-2 gap-4 mt-8 text-lg">
					<div className="text-left font-medium">에러메시지</div>
					<div className="text-right">{searchParams.get("message") ?? "알 수 없음"}</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4 text-lg">
					<div className="text-left font-medium">에러코드</div>
					<div className="text-right">{searchParams.get("code") ?? "UNKNOWN_ERROR"}</div>
				</div>
			</div>
		</main>
	);
}
