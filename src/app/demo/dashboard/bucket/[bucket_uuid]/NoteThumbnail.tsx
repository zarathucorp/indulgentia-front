import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NoteThumbnail() {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle>노트 이름</CardTitle>
				<CardDescription>노트 ID: </CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">날짜</Label>
							{/* <Input id="name" placeholder="Name of your project" /> */}
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">작성자</Label>
							{/* <Input id="name" placeholder="Name of your project" /> */}
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">삭제</Button>
				<Button>노트 보기</Button>
			</CardFooter>
		</Card>
	);
}
