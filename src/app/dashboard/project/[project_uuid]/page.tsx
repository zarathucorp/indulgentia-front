import MyBucketList from "@/components/modules/dashboard/project/MyBucketList";
// Project UUID를 받으므로 Project 리스트를 보여주어야 함.
export default function Project() {
	return (
		<>
			<div className="flex min-h-screen max-w-screen-xl flex-col mx-auto">
				<MyBucketList />
			</div>
		</>
	);
}
