"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import supabase from "../lib/supabase";
import { useRouter } from "next/navigation";
import { AccountForm } from "./account-form";
import { Separator } from "@/components/ui/separator";
type FormData = {
  username: string;
  email: string;
};

const SettingsPage: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  return (
    <div id="onborda-step1" className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">계정</h3>
        <p className="text-sm text-muted-foreground">계정 설정을 관리합니다.</p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
};

export default SettingsPage;
