import { redirect } from "next/navigation";
export default function BucketWithoutUUID() {
	redirect("/dashboard");
	return null;
}