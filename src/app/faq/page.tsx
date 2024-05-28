import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion";

export default function FAQ() {
	return (
		<div className="container mx-auto py-12 px-4 md:px-6">
			<h1 className="text-3xl font-bold mb-8">자주 묻는 질문들</h1>
			<Tabs className="w-full" defaultValue="general">
				<TabsList className="grid grid-cols-3 gap-4 mb-8">
					<TabsTrigger value="general">일반</TabsTrigger>
					<TabsTrigger value="pricing">가격</TabsTrigger>
					<TabsTrigger value="features">기능</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<Accordion className="space-y-4" collapsible type="single">
						<AccordionItem value="general-1">
							<AccordionTrigger className="text-lg font-medium">What is this product?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									This is a powerful and versatile product that can help you achieve your goals. It's designed to be easy to use and customizable to your needs.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="general-2">
							<AccordionTrigger className="text-lg font-medium">How does it work?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									The product works by integrating with your existing systems and workflows. It uses advanced algorithms to analyze your data and provide insights and recommendations to help you make
									better decisions.
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
							<AccordionTrigger className="text-lg font-medium">Are there any discounts available?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									Yes, we offer a number of discounts and promotions throughout the year. For example, we have a 20% discount for annual subscriptions, and we also offer special discounts for
									students, non-profits, and enterprise customers.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="pricing-3">
							<AccordionTrigger className="text-lg font-medium">Do you offer a free trial?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									Yes, we offer a 14-day free trial for all of our plans. This gives you the opportunity to try out the product and see if it's a good fit for your needs before committing to a
									subscription.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
				<TabsContent value="features">
					<Accordion className="space-y-4" collapsible type="single">
						<AccordionItem value="features-1">
							<AccordionTrigger className="text-lg font-medium">What features are included?</AccordionTrigger>
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
							<AccordionTrigger className="text-lg font-medium">Can I customize the features?</AccordionTrigger>
							<AccordionContent>
								<p className="text-gray-500 dark:text-gray-400">
									Yes, our product is highly customizable and you can tailor the features to your specific needs. You can adjust the layout, add or remove widgets, and even integrate with third-party
									tools and services.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
			</Tabs>
		</div>
	);
}
