"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/global/Spinner";

interface BucketDownloadFormProps {
  selectedBuckets: string[];
}

const BucketdownloadSchema = z.object({
  bucket_ids: z.array(z.string().uuid()),
  is_merged_required: z.boolean(),
  is_filename_id: z.boolean(),
});

export type BucketDownloadFormValues = z.infer<typeof BucketdownloadSchema>;

export default function BucketdownloadForm({
  selectedBuckets,
}: BucketDownloadFormProps) {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const defaultValues: BucketDownloadFormValues = {
    bucket_ids: selectedBuckets,
    is_merged_required: false,
    is_filename_id: false,
  };

  const form = useForm({
    resolver: zodResolver(BucketdownloadSchema),
    defaultValues,
  });

  async function onSubmit(data: BucketDownloadFormValues) {
    setIsCreating(true);
    try {
      toast({
        title: "노트 다운로드",
        description: `데모 페이지에서는 노트 일괄 다운로드 기능을 지원하지 않습니다.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "오류 발생",
        description: `노트 다운로드 중 오류가 발생했습니다.`,
      });
    } finally {
      setIsCreating(false);
    }
  }

  if (selectedBuckets.length === undefined || selectedBuckets.length === 0) {
    return null;
  }

  return (
    <div className="w-full my-2 mx-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <SelectedBucketsField form={form} />
          <IsMergedRequiredField form={form} />
          <IsFilenameIdField form={form} />
          <FormMessage />
          <div className="flex justify-center">
            <Button type="submit">
              {isCreating && (
                <>
                  <Spinner />
                  &nbsp;
                </>
              )}
              확인
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function SelectedBucketsField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="bucket_ids"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            <strong>{field.value.length}</strong> 개의 버킷이 선택되었습니다.
          </FormLabel>
          <FormControl>
            <input type="hidden" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function IsMergedRequiredField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="is_merged_required"
      render={({ field }) => (
        <FormItem className="flex justify-between items-center w-full pr-4">
          <FormLabel className="cursor-pointer">노트 병합 여부</FormLabel>
          <FormControl>
            <Checkbox onCheckedChange={field.onChange} checked={field.value} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function IsFilenameIdField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="is_filename_id"
      render={({ field }) => (
        <FormItem className="flex justify-between items-center w-full pr-4">
          <FormLabel className="cursor-pointer">
            개별 노트 파일명 id 여부
          </FormLabel>
          <FormControl>
            <Checkbox onCheckedChange={field.onChange} checked={field.value} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
