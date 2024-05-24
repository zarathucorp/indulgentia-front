import { Card, CardHeader, CardTitle, CardDescriptionSkeleton, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoading() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="grid grid-cols-6">
						<div className="col-start-1 col-span-2">
							<Skeleton className="h-6 w-24" />
						</div>
					</CardTitle>
					<CardDescriptionSkeleton>
						<Skeleton className="h-4 w-full" />
					</CardDescriptionSkeleton>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead>
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="hidden md:table-cell">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="hidden md:table-cell">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead>
									<span className="sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 3 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-4 w-full" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-full" />
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<Skeleton className="h-4 w-full" />
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<Skeleton className="h-4 w-full" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-10 w-24" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						<Skeleton className="h-4 w-40" />
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
