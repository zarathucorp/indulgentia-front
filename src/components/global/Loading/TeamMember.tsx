import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
export function TeamMemberLoading() {
	return (
		<>
			<div className="flex items-center gap-3">
				<Skeleton className="h-10 w-10 rounded-full" />
				<div>
					<Skeleton className="h-5 w-24 mb-1" />
					<Skeleton className="h-5 w-36" />
				</div>
				<div className="flex-grow"></div>
				<Skeleton className="h-5 w-12" />
			</div>
		</>
	);
}
