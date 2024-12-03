"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/global/Spinner";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { UUID } from "crypto";

const optionSchema = z.object({
  label: z.string(),
  value: z.string().uuid(),
  disable: z.boolean().optional(),
});

const FormSchema = z.object({
  users: z.array(optionSchema).min(1),
});

type FetchResultType<T> = {
  status: "succeed" | "error";
  users: T;
};

const fetcher = async (url: string) => {
  const result = await axios.get(url);
  console.log(result.data);
  if (result.status !== 200) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return result.data;
};

export type User = {
  id: UUID;
  team_id: UUID | null;
  is_admin: boolean;
  first_name: string;
  last_name: string;
  email: string;
  github_token: string;
  is_deleted: boolean;
  last_note_created_at: string;
};

const UserMultipleSelect = ({ teamId }: { teamId: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data, isLoading, error, mutate } = useSWR<FetchResultType<User[]>>(
    process.env.NEXT_PUBLIC_API_URL + "/admin/user/list/no-team",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );
  const [options, setOptions] = useState<Option[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const searchOptions = async (value: string): Promise<Option[]> => {
    // options 배열에서 label에 검색어가 정확히 일치하는 항목을 필터링
    return options.filter((option) => option.label.includes(value));
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSending(true);
    try {
      const { data: axiosResult } = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/admin/team/${teamId}`,
        data
      );
      console.log(data);
      if (axiosResult.status !== "succeed")
        throw new Error("유저 추가에 실패하였습니다.");
      toast({
        title: "유저 추가에 성공하였습니다.",
        description: `유저를 추가하였습니다.`,
      });
      setIsSending(false);
      mutate();
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "유저 추가에 실패하였습니다.",
        description: `잠시 후 다시 시도하여 주십시오.`,
      });
    }
  }

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setOptions(
        data.users.map((user) => ({
          value: user.id,
          label: `${user.last_name} ${user.first_name} <${user.email}>`,
        }))
      );
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (options.length === 0) {
    return <p>No users found.</p>;
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="users"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Users</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={options}
                    placeholder="팀에 추가할 유저를 검색하세요."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onSearch={searchOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isSending && (
              <>
                <Spinner />
                &nbsp;
              </>
            )}
            유저 추가
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserMultipleSelect;
