"use client";
import useSWR from "swr";
import axios from "axios";

import MyProjectList from "@/components/modules/dashboard/MyProjectList";
import ProjectType from "@/types/ProjectType";
import ErrorPage from "@/app/error/page";

const projectListFetcher = async (url: string) => {
	const result = await axios.get(url, { withCredentials: true });
	console.log(result.data.data);
	if (result.status !== 200) {
		const error = new Error("An error occurred while fetching the data.");
		throw error;
	}
	return result.data.data;
};

export default function Dashboard() {
	const { data, isValidating, error, mutate, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/list", projectListFetcher);
	if (error) {
		return (
			<>
				<ErrorPage error={error} reset={() => mutate()} />
			</>
		);
	}
	return <div className="flex max-w-screen-xl flex-col mx-auto">{isLoading ? <p>loading</p> : <>{data && <MyProjectList projectList={data} />}</>}</div>;
}
