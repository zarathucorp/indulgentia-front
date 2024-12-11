import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
export default function NoteAuditLog() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Activity Log</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Avatar>
							<AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
							<AvatarFallback>I</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">John Doe</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">Edited a post</p>
						</div>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Avatar>
							<AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">Jane Doe</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">Commented on a post</p>
						</div>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Avatar>
							<AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
							<AvatarFallback>In</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">Indulgentia</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">파일 생성(Github)</p>
						</div>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">3 days ago</p>
				</div>
			</CardContent>
		</Card>
	);
}
