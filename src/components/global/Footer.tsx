import Link from "next/link";
export default function Footer() {
	return (
		<footer className="bg-[#051f20] text-white py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
					<div className="mb-6 md:mb-0 place-items-center">
						<img src="/logo.png" alt="Zarathu Logo" className="h-12 mb-4" />
						<Link href="https://www.zarathu.com/">
							<h1 className="text-xl font-bold">차라투 주식회사</h1>
						</Link>
						{/* <p className="mt-2 text-sm">Company Introduction: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
					</div>
					<div className="mb-6 md:mb-0 md:flex md:items-center">
						<Link href="https://www.zarathu.com/">
							<span className="block md:inline md:mr-4">이용약관</span>
						</Link>
						<Link href="https://www.zarathu.com/">
							<span className="block md:inline md:mr-4">개인정보처리방침</span>
						</Link>
						<Link href="/help/refund-policy">
							<span className="block md:inline md:mr-4">환불 정책</span>
						</Link>
						{/* <p className="mt-2 text-sm">Company Introduction: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
					</div>
					<div className="md:ml-12">
						<h2 className="text-lg font-semibold">회사정보</h2>
						<p className="mt-2 text-sm">
							<strong>대표이사:</strong> 김진섭 <br />
							<strong>주소:</strong> 서울특별시 송파구 송파대로 201, B동 1513호 <br />
							<strong>사업자 등록번호:</strong> 624-86-01323 <br />
							<strong>전화번호:</strong> 070-7954-3712 <br />
							<strong>개인정보보호책임자:</strong> 김진섭 <br />
							<strong>통신판매업신고번호:</strong> 2022-서울송파-0593호
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
