import axios from "axios";
import { UUID } from "crypto";
import useSWRImmutable from "swr/immutable";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data as UserInfoType);

const useGithub = () => {
	const { data: userInfo, error } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/settings/info", fetcher);

	const isLoading = !error && !userInfo;
	console.log(userInfo);
	return {
		userInfo,
		error: error ? error : null,
		isLoading,
	};
};

export default useGithub;
