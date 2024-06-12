import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { FaHome } from "react-icons/fa";
type DashboardBreadcrumbLoadingType = "Project" | "Bucket" | "Note";
export function DashboardBreadCrumbLoading({ type }: { type: DashboardBreadcrumbLoadingType }) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbLink href="/">
					<FaHome />
				</BreadcrumbLink>
				<BreadcrumbSeparator />
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
