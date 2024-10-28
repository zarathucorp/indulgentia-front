import axios from "axios";
import { UUID } from "crypto";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";

if (process.env.NODE_ENV === 'development') {
	console.log('development');
	axios.defaults.withCredentials = true;
}

const fetcher = (url: string) =>
	axios
		.get(url)
		.then((res) => res.data)
		.catch(function (error) {
			if (error.response) {
				console.log("서버에서 오류가 발생했습니다.");
				console.error(error.response.data);
				throw new Error(error.response.data.message);
			} else if (error.request) {
				console.error(error.request);
				throw new Error("서버와 통신 중 문제가 발생했습니다.");
			} else {
				console.error("Error", error.message);
				throw new Error("알 수 없는 오류가 발생했습니다.");
			}
		});
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
	const { data, error, mutate, isLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team", fetcher, {
		onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
			if (retryCount >= 3) return;
			if (error.status === 404) return;
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});
	const supabase = createClient();
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
	const { data, error, mutate } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/team", fetcher, {
		onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
			if (retryCount >= 3) return;
			if (error.status === 404) return;
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});
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
	invited_user: {
		id: UUID;
		first_name: string | null;
		last_name: string | null;
		email: string;
	};
	is_accepted: boolean | null;
	is_deleted: boolean;
};

const useTeamMemberList = () => {
	const { hasTeam } = useTeamInfo();
	const { data, error, isLoading, mutate } = useSWR(hasTeam ? process.env.NEXT_PUBLIC_API_URL + "/user/team/list" : null, fetcher, {
		onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
			if (retryCount >= 3) return;
			if (error.status === 404) return;
			setTimeout(() => revalidate({ retryCount }), 2000);
		},
	});

	// Check if data is available and is an array before mapping
	const memberList: TeamMemberType[] =
		data?.data && Array.isArray(data.data)
			? data.data.map((member: any) => {
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
			  })
			: [];

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
	);
};

const inviteUser = async (invitee_email: string): Promise<void> => {
	const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/team/invite", {
		user_email: invitee_email,
	},);

	if (data.status !== "succeed") {
		throw new Error("유저 초대 실패");
	}
};

const useInvitationReceiveList = () => {
	const { data, error, mutate, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + "/user/team/invite/receive/list", fetcher, {
		onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
			if (retryCount >= 3) return;
			if (error.status === 404) return;
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});

	return {
		invitationList: data?.data,
		error,
		isLoading,
		mutate,
	};
};
const useInvitationSendList = () => {
	const { hasTeam } = useTeamInfo();
	const { data, error, mutate, isLoading } = useSWRImmutable(hasTeam ? process.env.NEXT_PUBLIC_API_URL + "/user/team/invite/send/list" : null, fetcher, {
		onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
			if (retryCount >= 3) return;
			if (error.status === 404) return;
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});

	// console.log(data?.data);

	return {
		invitationSendList: data?.data,
		error,
		isLoading,
		mutate,
	};
};

const useCurrentUserWithPending = () => {
	const { memberList, isLoading: memberListLoading, error: memberListError, mutate: memberListMutate } = useTeamMemberList();
	const { invitationSendList, error: invitationSendListError, isLoading: invitationSendListLoading, mutate: invitationSendListMutate } = useInvitationSendList();

	return {
		numberCurrentUserWithPending: !memberListLoading && !invitationSendListLoading && memberList && invitationSendList && memberList.length + invitationSendList.length,
		isLoading: memberListLoading || invitationSendListLoading,
		isError: memberListError || invitationSendListError,
	};
};

export type { TeamMemberType, InvitationReceiveType, InvitationSendType, TeamInfoType };
export { useTeamInfo, useTeamMemberList, createTeam, inviteUser, useInvitationReceiveList as getInvitationReceiveList, useInvitationSendList as getInvitationSendList, useCurrentUserWithPending };
