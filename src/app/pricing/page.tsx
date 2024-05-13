import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function PricingPage() {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
					<div className="space-y-3">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Choose the plan that suits your needs</h2>
						<div className="grid grid-cols-2 gap-4">
							<div className="border rounded-lg p-4">
								<h3 className="text-xl font-bold">Free Plan</h3>
								<ul className="text-left list-disc pl-4">
									<li>Basic features included</li>
									<li>Limited support</li>
									<li>Up to 5 projects</li>
								</ul>
								<div className="mt-4">
									<Button size="lg">Select Free Plan</Button>
								</div>
							</div>
							<div className="border rounded-lg p-4">
								<h3 className="text-xl font-bold">Professional Plan</h3>
								<ul className="text-left list-disc pl-4">
									<li>All features included</li>
									<li>Premium support</li>
									<li>Unlimited projects</li>
								</ul>
								<div className="mt-4">
									<Button size="lg">Select Professional Plan</Button>
								</div>
							</div>
						</div>
						<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Need more details? Compare the plans below.</p>
					</div>
					<div className="mx-auto w-full max-w-2xl space-y-2">
						<table className="w-full border-collapse border border-gray-200 dark:border-gray-800">
							<thead>
								<tr className="bg-gray-100 dark:bg-gray-800">
									<th className="border border-gray-200 dark:border-gray-800 p-2">Features</th>
									<th className="border border-gray-200 dark:border-gray-800 p-2">Free Plan</th>
									<th className="border border-gray-200 dark:border-gray-800 p-2">Professional Plan</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Basic features</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">✓</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">✓</td>
								</tr>
								<tr>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Support</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Limited</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Premium</td>
								</tr>
								<tr>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Projects</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Up to 5</td>
									<td className="border border-gray-200 dark:border-gray-800 p-2">Unlimited</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</>
	);
}
