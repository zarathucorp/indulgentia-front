import { redirect } from "next/navigation";
export default function NoteWithoutUUID() {
	redirect("/dashboard");
}
