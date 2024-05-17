"use client";
import { EditBucketForm, CreateBucketFormValues } from "@/components/modules/dashboard/bucket/BucketForm";
import axios from "axios";
import { UUID } from "crypto";
import ConnectGithubRepository from "./ConnectGithubRepository";
// import useSWR from "swr";
// function ConnectGithubRepository() {
// 	return <></>;
// }
import { useParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";
export default function BucketSetting() {
	const params = useParams<{ bucket_uuid: UUID }>();

	const {
		data: bucketInfo,
		isLoading: isLoadingBucketInfo,
		mutate: mutateBucketInfo,
	} = useSWRImmutable<CreateBucketFormValues & { id: UUID }>(process.env.NEXT_PUBLIC_API_URL + `/dashboard/bucket/${params.bucket_uuid}`, async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
		console.log(data);
		return data.data;
	});

	return (
		<>
			{/* 깃허브 연동부분 */}
			<div>
				<p>깃허브 연동</p>
				<p>일단 원시적으로 id/repo 입력하도록</p>
				{isLoadingBucketInfo ? <p>Loading...</p> : bucketInfo && <EditBucketForm bucketInfo={bucketInfo} mutate={mutateBucketInfo} />}

				<ConnectGithubRepository />
			</div>
		</>
	);
}