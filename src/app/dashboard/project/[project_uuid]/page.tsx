"use client";
import MyBucketList from "@/components/modules/dashboard/project/MyBucketList";
// Project UUID를 받으므로 Project 리스트를 보여주어야 함.
import BucketType from "@/types/BucketType";
// const exampleBucketList: BucketType[] = [
// 	{
// 		bucket_name: "door",
// 		bucket_status: "Active",
// 		bucket_owner: "Lee",
// 		bucket_uuid: "f2321525-6ee9-4604-a52c-45d8d9e86141",
// 		has_github: true,
// 		github_link: "https://github.com",
// 	},
// ];
import { useParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
const projectListFetcher = async (url: string) => {
	const result = await axios.get(url, { withCredentials: true });
	console.log(result.data.data);
	if (result.status !== 200) {
		const error = new Error("An error occurred while fetching the data.");
		throw error;
	}
	return result.data.data;
};
export default function Project() {
	const params = useParams<{ project_uuid: string }>();
	const { data, isValidating, error, mutate, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/list/${params.project_uuid}`, projectListFetcher);
	if (error) return <div>{JSON.stringify(error)}</div>;
	return (
		<>
			<div className="flex min-h-screen max-w-screen-xl flex-col mx-auto">{isLoading ? <p>loading</p> : <>{data && <MyBucketList bucketList={data} />}</>}</div>
		</>
	);
}
