import axios from "axios";
import useSWRImmutable from "swr/immutable";

if (process.env.NODE_ENV === 'development') {
	console.log('development');
	axios.defaults.withCredentials = true;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useGithub = () => {
	const { data, error, mutate: mutateGitHub } = useSWRImmutable("/next-api/github/user", fetcher);

	const isLoading = !error && !data;
	const username = data?.login ?? "";

	return {
		username,
		error: error ? (error.response?.status === 403 ? "GitHub 로그인이 필요합니다." : error.response?.status === 500 ? "다시 로그인해주세요" : error.message) : null,
		isLoading,
		mutate: mutateGitHub,
	};
};

const disconnectGitHub = async () => {
	const { data } = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/user/settings/github/token");

	return data.status;
};

export default useGithub;
export { disconnectGitHub };
