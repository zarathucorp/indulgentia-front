"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function JoinAction(
    prevState: {
        message: string;
    },
    formData: FormData
) {
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const lastName = formData.get("last-name") as string;
    const firstName = formData.get("first-name") as string;

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });
		console.log("Data from JoinAction");
		console.log(data);
    if (error) {
        console.log("Error occured!");
        console.log(error);
        console.log(error.code);
        return { message: error.code };
    }

    return { message: "Check email to continue sign in process" };
}