import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion";
import Link from "next/link";
export default function FAQ() {
	return (
		<div className="container mx-auto py-12 px-4 md:px-6">
			<h1 className="text-3xl font-bold mb-8">자주 묻는 질문들</h1>
			<Tabs className="w-full" defaultValue="general">
				<TabsList className="grid grid-cols-4 gap-4 mb-8">
					<TabsTrigger value="general">일반</TabsTrigger>
					<TabsTrigger value="pricing">가격</TabsTrigger>
					<TabsTrigger value="features">기능</TabsTrigger>
					<TabsTrigger value="account">계정</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<Accordion className="space-y-4" collapsible type="single">
						<AccordionItem value="general-1">
							<AccordionTrigger className="text-lg font-medium">연구실록이 무엇인가요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									연구실록은 전자연구노트 서비스입니다. GitHub Repository와 연동하여 프로젝트, Bucket, 노트를 생성하고 블록체인을 이용한 전자서명을 할 수 있습니다. 연구실록은 &apos;국가연구개발사업
									연구노트 지침&apos;의 &apos;연구노트 요건&apos;을 준수합니다.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="general-2">
							<AccordionTrigger className="text-lg font-medium">GitHub와 연구실록은 어떻게 연동하나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									가입 후 우측 상단 &apos;사람 모양 아이콘-설정-계정&apos;에서 GitHub 계정을 연동할 수 있습니다. 연동 후 &apos;Bucket 설정&apos;에서 GitHub Repository를 선택하면 해당 Repository가
									연동됩니다. 연동 이후에는 해당 Repository의 Issue, Pull Request, Commit 등을 연구실록에서 확인할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="general-3">
							<AccordionTrigger className="text-lg font-medium">What are the benefits?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									The main benefits of using this product include increased efficiency, improved decision-making, and better overall performance. It can help you save time and money while achieving
									your goals more effectively.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="pricing">
					<Accordion className="space-y-4" collapsible type="single">
						<AccordionItem value="pricing-1">
							<AccordionTrigger className="text-lg font-medium">What are the pricing options?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									We offer a range of pricing options to suit your needs and budget. Our plans start at $9.99 per month for individuals, and we also have enterprise-level plans for larger
									organizations.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="pricing-2">
							<AccordionTrigger className="text-lg font-medium">R&D 예산을 사용할 수 있나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">네, R&D 예산을 사용할 수 있습니다. 구체적으로 직접비의 ~~, 간접비의 ~~~ 등등</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="pricing-3">
							<AccordionTrigger className="text-lg font-medium">Do you offer a free trial?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									Yes, we offer a 14-day free trial for all of our plans. This gives you the opportunity to try out the product and see if it&apos;s a good fit for your needs before committing to a
									subscription.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="features">
					<Accordion className="space-y-4" collapsible type="single">
						<AccordionItem value="features-1">
							<AccordionTrigger className="text-lg font-medium">어떤 기능이 포함되어 있나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									Our product includes a wide range of features to help you achieve your goals. Some of the key features include advanced analytics, customizable dashboards, collaboration tools, and
									integrations with popular third-party apps.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="features-2">
							<AccordionTrigger className="text-lg font-medium">Are there any limitations or restrictions?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									There are a few limitations and restrictions to be aware of. For example, our free plan has a limit on the number of users and the amount of data you can store. Our paid plans have
									more generous limits and additional features.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="features-3">
							<AccordionTrigger className="text-lg font-medium">커스텀 기능 요청이 가능한가요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									네, 가능합니다. 연구실록 팀은 고객의 만족을 최우선으로 여깁니다. 커스텀 기능 요청은 &apos;<Link href="/inquiry">문의하기</Link>&apos; 또는 우측 하단 채팅 버턴으로 문의 해 주시기
									바랍니다.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="account">
					<Accordion className="space-y-4" collapsible type="single">
						<AccordionItem value="features-1">
							<AccordionTrigger className="text-lg font-medium">이미 가입한 계정과 동일한 이메일의 소셜 게정으로 로그인 하면 어떻게 되나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									한 이메일에는 하나의 계정만 할당됩니다. 이미 가입한 계정과 동일한 이메일의 소셜 계정으로 로그인하면 이미 가입한 계정으로 로그인됩니다. 이 경우 ID/PW 또는 소셜 로그인 어느 쪽으로도
									로그인할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
			</Tabs>
		</div>
	);
}
