import MyBucketList from "@/components/modules/dashboard/project/MyBucketList";
// Project UUID를 받으므로 Project 리스트를 보여주어야 함.
import BucketType from "@/types/BucketType";
const exampleBucketList: BucketType[] = [
	{
		bucket_name: "door",
		bucket_status: "Active",
		bucket_owner: "Lee",
		bucket_uuid: "f2321525-6ee9-4604-a52c-45d8d9e86141",
		has_github: true,
		github_link: "https://github.com",
	},
];

export default function Project() {
	return (
		<>
			<div className="flex min-h-screen max-w-screen-xl flex-col mx-auto">
				<MyBucketList bucketList={exampleBucketList} />
			</div>
		</>
	);
}
