"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import supabase from "../lib/supabase";
import { useRouter } from "next/navigation";
import { AccountForm } from "./account-form";
type FormData = {
	username: string;
	email: string;
};

const SettingsPage: React.FC = () => {
	const { register, handleSubmit, setValue } = useForm<FormData>();
	const router = useRouter();
	return <AccountForm />;
};

export default SettingsPage;
