"use client";
import { Button } from "@/components/ui/button";
import { useTeamInfo } from "@/hooks/fetch/useTeam";
function StartTeamPlanButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { teamInfo, hasTeam, error, isLoading, mutate, isLeader } = useTeamInfo();

	return (
		<Button disabled={isLoading || !hasTeam} {...props}>
			{!isLoading && !hasTeam ? "팀 플랜을 시작하려면 먼저 팀을 만들어야 합니다." : "팀 플랜 시작하기"}
		</Button>
	);
}

function AddUserButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	// 현재 안 씀
	const { teamInfo, hasTeam, error, isLoading, mutate, isLeader } = useTeamInfo();

	return (
		!isLoading && (
			<Button {...props} disabled={!hasTeam || !isLeader}>
				{
					// 먼저 결제 후,
					isLeader ? "유저 추가하기" : "팀장만 유저를 추가할 수 있습니다."
				}
			</Button>
		)
	);
}

export { StartTeamPlanButton, AddUserButton };
