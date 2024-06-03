import axios from "axios";
import useSWRImmutable from "swr/immutable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useGithub = () => {
	const { data, error, mutate: mutateGitHub } = useSWRImmutable("/next-api/github/user", fetcher);

	const isLoading = !error && !data;
	const username = data?.login ?? "";

	return {
		username,
		error: error ? (error.response?.status === 404 ? "GitHub 로그인이 필요합니다." : error.response?.status === 500 ? "다시 로그인해주세요" : error.message) : null,
		isLoading,
	};
};

export default useGithub;
