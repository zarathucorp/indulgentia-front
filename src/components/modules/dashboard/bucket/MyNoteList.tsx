import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MyNoteList() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>내 버킷</CardTitle>
				<CardDescription>Manage your products and view their sales performance.</CardDescription>
			</CardHeader>
			<CardContent>
				{/* 나중에 서버에서 데이터 받아서 map으로 */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden w-[100px] sm:table-cell">
								<span className="sr-only">이미지</span>
							</TableHead>
							<TableHead>내 버킷</TableHead>
							<TableHead>상태</TableHead>
							<TableHead className="hidden md:table-cell">연구책임자</TableHead>
							<TableHead className="hidden md:table-cell">참여 연구원 수</TableHead>
							<TableHead className="hidden md:table-cell">수행 기간</TableHead>
							<TableHead>
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="hidden sm:table-cell">
								<Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
							</TableCell>
							<TableCell className="font-medium">Laser Lemonade Machine</TableCell>
							<TableCell>
								<Badge variant="outline">Draft</Badge>
							</TableCell>
							<TableCell className="hidden md:table-cell">$499.99</TableCell>
							<TableCell className="hidden md:table-cell">25</TableCell>
							<TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
							<TableCell>
								<Button>관리</Button>
								{/* <DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup="true" size="icon" variant="ghost">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu> */}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="hidden sm:table-cell">
								<Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
							</TableCell>
							<TableCell className="font-medium">Hypernova Headphones</TableCell>
							<TableCell>
								<Badge variant="outline">Active</Badge>
							</TableCell>
							<TableCell className="hidden md:table-cell">$129.99</TableCell>
							<TableCell className="hidden md:table-cell">100</TableCell>
							<TableCell className="hidden md:table-cell">2023-10-18 03:21 PM</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup="true" size="icon" variant="ghost">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="hidden sm:table-cell">
								<Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
							</TableCell>
							<TableCell className="font-medium">AeroGlow Desk Lamp</TableCell>
							<TableCell>
								<Badge variant="outline">Active</Badge>
							</TableCell>
							<TableCell className="hidden md:table-cell">$39.99</TableCell>
							<TableCell className="hidden md:table-cell">50</TableCell>
							<TableCell className="hidden md:table-cell">2023-11-29 08:15 AM</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup="true" size="icon" variant="ghost">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="hidden sm:table-cell">
								<Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
							</TableCell>
							<TableCell className="font-medium">TechTonic Energy Drink</TableCell>
							<TableCell>
								<Badge variant="secondary">Draft</Badge>
							</TableCell>
							<TableCell className="hidden md:table-cell">$2.99</TableCell>
							<TableCell className="hidden md:table-cell">0</TableCell>
							<TableCell className="hidden md:table-cell">2023-12-25 11:59 PM</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup="true" size="icon" variant="ghost">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="hidden sm:table-cell">
								<Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
							</TableCell>
							<TableCell className="font-medium">Gamer Gear Pro Controller</TableCell>
							<TableCell>
								<Badge variant="outline">Active</Badge>
							</TableCell>
							<TableCell className="hidden md:table-cell">$59.99</TableCell>
							<TableCell className="hidden md:table-cell">75</TableCell>
							<TableCell className="hidden md:table-cell">2024-01-01 12:00 AM</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup="true" size="icon" variant="ghost">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="hidden sm:table-cell">
								<Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
							</TableCell>
							<TableCell className="font-medium">Luminous VR Headset</TableCell>
							<TableCell>
								<Badge variant="outline">Active</Badge>
							</TableCell>
							<TableCell className="hidden md:table-cell">$199.99</TableCell>
							<TableCell className="hidden md:table-cell">30</TableCell>
							<TableCell className="hidden md:table-cell">2024-02-14 02:14 PM</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup="true" size="icon" variant="ghost">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing <strong>1-10</strong> of <strong>32</strong> products
				</div>
			</CardFooter>
		</Card>
	);
}
