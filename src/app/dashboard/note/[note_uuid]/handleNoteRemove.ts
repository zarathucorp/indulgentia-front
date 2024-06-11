"use client";
import axios from "axios";
export const handleNoteRemove = async (id: string) => {
	try {
		const { data } = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/dashboard/note/${id}`, { withCredentials: true });
		return;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
