import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion";
import Link from "next/link";
export default function FAQ() {
	return (
		<div className="container mx-auto py-12 px-4 md:px-6">
			<h1 className="text-3xl font-bold mb-8">자주 묻는 질문들</h1>
			<Tabs className="w-full" defaultValue="general">
				<TabsList className="grid grid-cols-5 gap-4 mb-8">
					<TabsTrigger value="general">일반</TabsTrigger>
					<TabsTrigger value="pricing">가격</TabsTrigger>
					<TabsTrigger value="features">기능</TabsTrigger>
					<TabsTrigger value="account">계정</TabsTrigger>
					<TabsTrigger value="note">노트 작성</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<Accordion className="space-y-4" type="multiple">
						<AccordionItem value="general-1">
							<AccordionTrigger className="text-lg font-medium">연구실록이 무엇인가요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									연구실록은 전자연구노트 서비스입니다. GitHub Repository와 연동하여 프로젝트, 버킷, 노트를 생성하고 블록체인을 이용한 전자서명을 할 수 있습니다. 연구실록은 &apos;국가연구개발사업
									연구노트 지침&apos;의 &apos;연구노트 요건&apos;을 준수합니다.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="general-2">
							<AccordionTrigger className="text-lg font-medium">GitHub와 연구실록은 어떻게 연동하나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									가입 후 우측 상단 &apos;사람 모양 아이콘-설정-계정&apos;에서 GitHub 계정을 연동할 수 있습니다.
									<br />
									연동 후 &apos;버킷 설정&apos;에서 GitHub Repository를 선택하면 해당 Repository가 연결됩니다. 연결 후에는 해당 Repository의 Issue, Pull Request, Commit 등을 연구실록에서 확인할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="general-3">
							<AccordionTrigger className="text-lg font-medium">연구실록을 사용하는 이점이 무엇인가요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									연구실록은 소프트웨어 개발 연구 맞춤형 전자연구노트 서비스입니다.
									<br />
									GitHub Repository와 연동하여 자동화된 연구노트 작성을 도와줘 연구자의 생산성을 높입니다. 또한 국가연구개발사업 연구노트 지침을 준수하여 언제든지 문서화해 활용할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="pricing">
					<Accordion className="space-y-4" type="multiple">
						<AccordionItem value="pricing-1">
							<AccordionTrigger className="text-lg font-medium">비용은 얼마인가요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									연간 플랜 기준, 1인당 10만원입니다. 팀 구성은 최소 10명부터 가능하며, 5명씩 추가할 수 있습니다.
									<br />
									 이는 50% 이상 저렴한 가격입니다. 연구실록은 연구개발사업의 일환으로 사용되는 서비스이므로 연구개발사업 예산을 활용할 수 있습니다.
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
							<AccordionTrigger className="text-lg font-medium">무료 체험을 제공하나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">무료 체험을 제공하지는 않지만, 고객이 서비스에 만족하지 못하는 경우 14일 이내 환불이 가능합니다.</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="features">
					<Accordion className="space-y-4" type="multiple">
						<AccordionItem value="features-1">
							<AccordionTrigger className="text-lg font-medium">어떤 기능이 포함되어 있나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									연구노트 작성 및 문서화, 블록체인 시점인증, GitHub Repository 연동, 연구 노트 무결성 검증 등이 있습니다.
									<br />
									더 자세한 내용은 메뉴얼 페이지를 참고해 주세요.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="features-2">
							<AccordionTrigger className="text-lg font-medium">연구노트 시점 인증은 어떤식으로 진행되고 있나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									연구노트 작성 시 블록체인을 이용한 시각 정보가 실시간으로 기록됩니다. 이를 통해 연구노트의 무결성을 보장할 수 있습니다. 블록체인 시점 인증은 연구노트 작성 시 자동으로 진행됩니다.
									<br />
									연구노트 검증 기능을 통해 구체적인 내용을 확인할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="features-3">
							<AccordionTrigger className="text-lg font-medium">커스텀 기능 요청이 가능한가요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									네, 가능합니다. 연구실록 팀은 고객의 만족을 최우선으로 여깁니다. 커스텀 기능 요청은 &apos;<Link href="/inquiry">문의하기</Link>&apos; 또는 우측 하단 채팅 버튼으로 문의해 주시기
									바랍니다.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="account">
					<Accordion className="space-y-4" type="multiple">
						<AccordionItem value="account-1">
							<AccordionTrigger className="text-lg font-medium">이미 가입한 계정과 동일한 이메일의 소셜 계정으로 로그인 하면 어떻게 되나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									이메일 하나에는 하나의 계정만 할당됩니다. 이미 가입한 계정과 동일한 이메일의 소셜 계정으로 로그인하면 가입된 계정으로 로그인됩니다. 이 경우 ID/PW 또는 소셜 로그인 어느 쪽으로도
									로그인할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="note">
					<Accordion className="space-y-4" type="multiple">
						<AccordionItem value="note-1">
							<AccordionTrigger className="text-lg font-medium">프로젝트, 버킷, 노트가 구체적으로 무엇을 의미하나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									프로젝트는 연구실록의 최상위 단위입니다. 프로젝트 안에는 버킷이 포함되며, 버킷 안에는 노트가 포함됩니다.
									<br />
									프로젝트는 연구의 주제를, 버킷은 프로젝트의 세부 주제를, 노트는 세부 주제에 해당하는 연구 자료 전반을 의미합니다.
									<br />
									자세한 예시는 메뉴얼 페이지를 참고해 주세요.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="note-2">
							<AccordionTrigger className="text-lg font-medium">노트 문서 변환 후 결과물에 대한 미리보기를 제공하나요?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									네, 제공합니다. 노트 변환 전 미리보기 창을 통해 변환된 문서를 확인할 수 있습니다.
									<br />
									미리보기 창을 통해 변환된 문서의 레이아웃, 이미지, 링크 등을 확인할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="note-3">
							<AccordionTrigger className="text-lg font-medium">노트 문서 변환이 이상해요.</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									노트 변환시 pdf 파일로 변환되며 이 과정중 문서의 레이아웃이 변할 수 있습니다.
									<br />
									연구실록 자체개발의 변환과정으로, 자료의 내용은 변하지 않으나 결과를 미리보기에서 확인하시고 문제가 지속될 경우 문의해 주시기 바랍니다.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="note-4">
							<AccordionTrigger className="text-lg font-medium">문서 변환시 알려진 문제점</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									ppt: Textarea 크기가 해당 Textarea 내부 글자 크기보다 작은 경우 줄넘김이 일어날 수 있습니다.
									<br />
									hwp: 이미지 레이아웃이 변할 수 있습니다.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
			</Tabs>
		</div>
	);
}
