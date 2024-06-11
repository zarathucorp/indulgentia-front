import axios from "axios";
import { UUID } from "crypto";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
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
	const { data, error, mutate, isLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team", fetcher);
	const supabase = createClient();
	// const isLoading = !error && !data;
	const [isLeader, setIsLeader] = useState(false);
	const teamInfo: TeamInfoType | null = data?.data ?? null;
	const hasTeam: boolean = !!teamInfo;

	useEffect(() => {
		const fetchCurrentUserId = async () => {
			const { data } = await supabase.auth.getUser();
			if (data.user?.id === teamInfo?.team_leader_id) {
				setIsLeader(true);
			} else {
				setIsLeader(false);
			}
		};

		if (teamInfo) {
			fetchCurrentUserId();
		}
	}, [teamInfo]);

	return {
		teamInfo,
		hasTeam,
		error: error ? (error.response?.status === 404 ? "GitHub 로그인이 필요합니다." : error.response?.status === 500 ? "다시 로그인해주세요" : error.message) : null,
		isLoading,
		mutate,
		isLeader,
	};
};

const useTeamName = () => {
	const { data, error, mutate } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team", fetcher);
};

type TeamMemberType = {
	id: UUID;
	email: string;
	first_name: string;
	last_name: string;
};

type InvitationReceiveType = {
	id: UUID;
	created_at: DateTimeString;
	updated_at: DateTimeString;
	team_id: UUID;
	team_name: string;
	team_leader: {
		id: UUID;
		last_name: string | null;
		first_name: string | null;
	};
	invited_user_id: UUID;
	is_accepted: boolean;
};

type InvitationSendType = {
	id: UUID;
	created_at: DateTimeString;
	updated_at: DateTimeString;
	team_id: UUID;
	invited_user_id: UUID;
	is_accepted: boolean;
	is_deleted: boolean;
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
		mutate,
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

const inviteUser = async (invitee_email: string): Promise<void> => {
	const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/team/invite", {
		user_email: invitee_email,
	});

	if (data.status !== "succeed") {
		throw new Error("유저 초대 실패");
	}
};

const useInvitationReceiveList = () => {
	const { data, error, mutate, isLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/invite/receive/list", fetcher);

	return {
		invitationList: data?.data,
		error,
		isLoading,
		mutate,
	};
};
const useInvitationSendList = () => {
	const { data, error, mutate, isLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team/invite/send/list", fetcher);

	return {
		invitationSendList: data?.data,
		error,
		isLoading,
		mutate,
	};
};
export type { TeamMemberType, InvitationReceiveType, InvitationSendType };
export { useTeamInfo, useTeamMemberList, createTeam, inviteUser, useInvitationReceiveList as getInvitationReceiveList, useInvitationSendList as getInvitationSendList };
