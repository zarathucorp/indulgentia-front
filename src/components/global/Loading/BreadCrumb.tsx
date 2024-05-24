import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
type DashboardBreadcrumbLoadingType = "Project" | "Bucket" | "Note";
export function DashboardBreadCrumbLoading({ type }: { type: DashboardBreadcrumbLoadingType }) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<Skeleton className="h-6 w-20" />
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<Skeleton className="h-6 w-24" />
				</BreadcrumbItem>
				{(type === "Note" || type === "Bucket") && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<Skeleton className="h-6 w-24" />
						</BreadcrumbItem>
					</>
				)}
				{type === "Note" && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<Skeleton className="h-6 w-24" />
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
