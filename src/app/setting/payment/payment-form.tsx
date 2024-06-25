import Link from "next/link";
import { Badge } from "@/components/ui/badge";
function PaymentForm() {
	return (
		<div className="container mx-auto py-10 px-4 md:px-6">
			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-card rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold">현재 플랜</h2>
							<p className="text-muted-foreground">구독중인 플랜입니다.</p>
						</div>
						{/* <Link href="#" className="text-primary underline" prefetch={false}>
							Change plan
						</Link> */}
					</div>
					<div className="mt-6">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-medium">팀 플랜</h3>
								<p className="text-muted-foreground">20명</p>
							</div>
							<Badge variant="outline">이용 기간 365일 남음</Badge>
						</div>
						<div className="mt-4 text-sm text-muted-foreground">
							{/* <p>Includes:</p> */}
							<ul className="list-disc pl-4 space-y-1">
								<li>무제한 프로젝트/버킷/노트</li>
								<li>팀 간 프로젝트 공유</li>
								<li>블록체인 무제한 저장</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="bg-card rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold">결제 이력</h2>
						<Link href="#" className="text-primary underline" prefetch={false}>
							View all
						</Link>
					</div>
					<div className="mt-6 space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">June 25, 2024</p>
								<p className="text-muted-foreground text-sm">Pro Plan</p>
							</div>
							<div className="text-right">
								<p className="font-medium">$19.00</p>
								<p className="text-muted-foreground text-sm">Visa *1234</p>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">May 25, 2024</p>
								<p className="text-muted-foreground text-sm">Pro Plan</p>
							</div>
							<div className="text-right">
								<p className="font-medium">$19.00</p>
								<p className="text-muted-foreground text-sm">Visa *1234</p>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">April 25, 2024</p>
								<p className="text-muted-foreground text-sm">Pro Plan</p>
							</div>
							<div className="text-right">
								<p className="font-medium">$19.00</p>
								<p className="text-muted-foreground text-sm">Visa *1234</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { PaymentForm };
