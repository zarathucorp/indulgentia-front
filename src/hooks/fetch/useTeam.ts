import axios from "axios";
import useSWRImmutable from "swr/immutable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useTeam = () => {
	const { data, error, mutate } = useSWRImmutable("/next-api/github/user", fetcher);

	const isLoading = !error && !data;
	const username = data?.login ?? "";

	return {
		username,
		error: error ? (error.response?.status === 404 ? "GitHub 로그인이 필요합니다." : error.response?.status === 500 ? "다시 로그인해주세요" : error.message) : null,
		isLoading,
	};
};

const createTeam = async (team_name: string) => {
	await axios.post(
		process.env.NEXT_PUBLIC_API_URL + "/user/team/",
		{
			name: team_name,
		},
		{
			withCredentials: true,
		}
	);
};

export default useTeam;
export { createTeam };
