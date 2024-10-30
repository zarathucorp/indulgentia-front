import axios from "axios";
import { UUID } from "crypto";
import useSWRImmutable from "swr/immutable";

if (process.env.NODE_ENV === 'development') {
	axios.defaults.withCredentials = true;
}

type UserInfoType = {
	id: UUID;
	team_id: UUID;
	has_signature: boolean;
	is_admin: boolean;
	first_name: string;
	last_name: string;
	email: string;
	github_token: boolean;
};

const fetcher = async (url: string) => await axios.get(url).then((res) => res.data.data as UserInfoType);

const useUser = () => {
	const { data: userInfo, error, mutate, isLoading } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/settings/info", fetcher);
	const isUser: boolean = !!userInfo;

	// const isLoading = !error && !userInfo;
	// console.log(userInfo);
	return {
		userInfo,
		isUser,
		error: error ? error : null,
		mutate,
		isLoading,
	};
};

export default useUser;
export type { UserInfoType };
