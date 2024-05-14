"use client";
import useSWR from "swr";
import axios from "axios";

import MyProjectList from "@/components/modules/dashboard/MyProjectList";
import ProjectType from "@/types/ProjectType";

const projectListFetcher = async (url: string) => {
	const result = await axios.get(url, { withCredentials: true });
	console.log(result.data.data);
	if (result.status !== 200) {
		const error = new Error("An error occurred while fetching the data.");
		throw error;
	}
	return result.data.data;
};

// const exampleProjectList: ProjectType[] = [
// 	{
// 		id: "f2321525-6ee9-4604-a52c-45d8d9e8614f",
// 		title: "Statgarten",
// 		status: "Active",
// 		project_leader: "Kim",
// 		start_date: new Date(),
// 		end_date: new Date(),
// 		grant_number: "2021-1234",
// 	},
// ];

export default function Dashboard() {
	const { data, isValidating, error, mutate, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + "/dashboard/project/list", projectListFetcher);
	if (error) return <div>{JSON.stringify(error)}</div>;
	return <div className="flex min-h-screen max-w-screen-xl flex-col mx-auto">{isLoading ? <p>loading</p> : <>{data && <MyProjectList projectList={data} />}</>}</div>;
}
