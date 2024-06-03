import axios from "axios";
import { UUID } from "crypto";
import useSWRImmutable from "swr/immutable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type DateTimeString = string;

type TeamInfoType = {
	id: UUID;
	created_at: DateTimeString;
	updated_at: DateTimeString;
	name: string;
	is_premium: boolean;
	team_leader_id: UUID;
	is_deleted: boolean;
};

const useTeamInfo = () => {
	const { data, error, mutate } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/", fetcher);

	const isLoading = !error && !data;
	const teamInfo: TeamInfoType | null = data?.data ?? null;
	const hasTeam: boolean = !!teamInfo;

	// console.log(data.data);

	return {
		teamInfo,
		hasTeam,
		error: error ? (error.response?.status === 404 ? "GitHub 로그인이 필요합니다." : error.response?.status === 500 ? "다시 로그인해주세요" : error.message) : null,
		isLoading,
	};
};

const useTeamName = () => {
	const { data, error, mutate } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/", fetcher);
};

type TeamMemberType = {
	id: UUID;
	email: string;
	first_name: string;
	last_name: string;
};

const useTeamMemberList = () => {
	const { data, error, isLoading, mutate } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/list", fetcher);
	console.log(data?.data.map((member: any) => member.id));

	const memberList: TeamMemberType[] = data?.data.map((member: any) => {
		const eachMember = {
			id: member.id,
			email: member.email,
			first_name: member.first_name || "",
			last_name: member.last_name || "",
		};

		if (member.first_name === null && member.last_name === null) {
			eachMember.last_name = member.email.split("@")[0];
		}

		return eachMember;
	});

	// console.log(memberList);

	return {
		memberList,
		isLoading,
		error,
	};
};

const createTeam = async (team_name: string) => {
	await axios.post(
		process.env.NEXT_PUBLIC_API_URL + "/user/team",
		{
			name: team_name,
		},
		{
			withCredentials: true,
		}
	);
};
export type { TeamMemberType };
export { useTeamInfo, useTeamMemberList, createTeam };
