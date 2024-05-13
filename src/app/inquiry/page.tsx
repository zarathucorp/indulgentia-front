import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Component() {
	return (
		<div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="space-y-6">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Get in touch</h1>
					<p className="mt-3 text-lg text-gray-500 dark:text-gray-400">Have question?</p>
				</div>
				<form className="space-y-6">
					<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
						<div className="sm:col-span-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" placeholder="Enter your name" required type="text" />
						</div>
						<div className="sm:col-span-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" placeholder="Enter your email" required type="email" />
						</div>
						<div className="sm:col-span-2">
							<Label htmlFor="description">Description</Label>
							<Textarea id="description" placeholder="Describe your inquiry" required rows={3} />
						</div>
						<div className="sm:col-span-2">
							<Label htmlFor="users">Number of users</Label>
							<Select defaultValue="1-10" id="users">
								<SelectTrigger>
									<SelectValue placeholder="Select number of users" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1-10">1-10 users</SelectItem>
									<SelectItem value="10-50">10-50 users</SelectItem>
									<SelectItem value="50+">50+ users</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex justify-end">
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
