import Link from "next/link";
export function UsePeriodPolicy() {
	return (
		<div className="container mx-auto">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">제공 기간</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">연구실록은 결제일 다음 날부터 시작하여 365일간 제공됩니다.</p>{" "}
			</div>
		</div>
	);
}

export function RefundPolicy() {
	return (
		<div className="container mx-auto">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">환불 정책</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					우리 회사는 고객님께 고품질의 제품과 서비스를 제공하기 위해 최선을 다하고 있습니다. 그러나 때때로 예상치 못한 일이 발생할 수 있다는 점을 이해하고 있습니다. 그래서 저희는 고객 만족을 보장하기
					위해 명확하고 투명한 환불 정책을 마련하였습니다.
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">주요 정책</h2>
					<ul className="space-y-4">
						<li className="flex items-start">
							<CircleCheckIcon className="flex-none w-6 h-6 text-green-500 mr-4" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-gray-100">14일 환불 보장</h3>
								<p className="text-gray-600 dark:text-gray-400">
									상품에 만족하지 못하셨을 경우, 14일 이내에 전액 환불해 드립니다. 결제일을 포함하여 14일 후의 23:59까지 상단 '문의하기' 또는 고객 서비스 이메일로 접수 된 건에 한합니다.
								</p>
							</div>
						</li>
						<li className="flex items-start">
							<CircleCheckIcon className="flex-none w-6 h-6 text-green-500 mr-4" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-gray-100">환불 과정</h3>
								<p className="text-gray-600 dark:text-gray-400">
									고객님의 환불 요청이 있을 경우, 회사는 2일 이내(영업일 기준)에 환불 요청이 유효한지 고객에게 안내합니다. 환불 요청이 유효할 경우, 안내일로부터 1일 이내에 환불을 완료합니다. 카드
									승인이 취소되기까지 5~7일정도 소요될 수 있습니다.
								</p>
							</div>
						</li>
						<li className="flex items-start">
							<CircleCheckIcon className="flex-none w-6 h-6 text-green-500 mr-4" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-gray-100">예외</h3>
								<p className="text-gray-600 dark:text-gray-400">당사와의 별도 계약에 의해, 고객님을 위해 별도로 제작/제공되는 상품은 환불의 대상이 되지 아니합니다.</p>
							</div>
						</li>
					</ul>
				</div>
				<div className="text-center">
					<p className="text-gray-600 dark:text-gray-400">
						환불과 관련하여 문의 사항이 있는 경우 언제든지{" "}
						<Link href="/inquiry" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" prefetch={false}>
							문의하기
						</Link>{" "}
						또는 우측 하단 채팅 버튼을 통해 문의해 주시기 바랍니다.
					</p>
				</div>
			</div>
		</div>
	);
}

function CircleCheckIcon(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="10" />
			<path d="m9 12 2 2 4-4" />
		</svg>
	);
}
