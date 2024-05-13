import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "@shadcn/ui";
import supabase from "../lib/supabase";
import { useRouter } from "next/router";

type FormData = {
	username: string;
	email: string;
};

const SettingsPage: React.FC = () => {
	const { register, handleSubmit, setValue } = useForm<FormData>();
	const router = useRouter();

	React.useEffect(() => {
		// Load user settings
		const loadSettings = async () => {
			const user = supabase.auth.user();
			if (user) {
				const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single();
				if (error) {
					console.error("Error loading settings:", error);
					return;
				}
				setValue("username", data.username);
				setValue("email", data.email);
			}
		};
		loadSettings();
	}, [setValue]);

	const onSubmit = async (data: FormData) => {
		const user = supabase.auth.user();
		if (user) {
			const { error } = await supabase.from("users").update({ username: data.username, email: data.email }).eq("id", user.id);
			if (error) {
				console.error("Error updating settings:", error);
				return;
			}
			router.push("/"); // or any other success action
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<TextInput label="Username" {...register("username", { required: true })} />
			<TextInput type="email" label="Email" {...register("email", { required: true })} />
			<Button type="submit">Update Settings</Button>
		</form>
	);
};

export default SettingsPage;
