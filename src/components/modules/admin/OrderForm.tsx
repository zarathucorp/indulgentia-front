"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { UUID } from "crypto";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ActionButton } from "@/components/ui/actionbutton";
import DatePicker from "@/components/global/DatePicker";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Textarea } from "@/components/ui/textarea";

// const optionSchema = z.object({
//   label: z.string(),
//   value: z.string().uuid(),
//   disable: z.boolean().optional(),
// });

const OrderSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  team_id: z.string().uuid(),
  order_no: z.string(),
  status: z.string(),
  payment_key: z.string().nullable(),
  purchase_datetime: z.string().nullable(),
  is_canceled: z.boolean(),
  total_amount: z.number(),
  refund_amount: z.number(),
  purchase_user_id: z.string().uuid(),
  payment_method: z.string().nullable(),
  currency: z.string().nullable(),
  notes: z.string().nullable(),
});

export type OrderFormValues = z.infer<typeof OrderSchema>;

const preprocessValues = (values: OrderFormValues) => ({
  ...values,
});

const OrderFormFields = ({
  form,
}: {
  form: UseFormReturn<OrderFormValues>;
}) => {
  const [customValue, setCustomValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleCopy = (value: string | number) => {
    if (typeof value === "number") value = value.toString();
    navigator.clipboard.writeText(value);
    alert("복사되었습니다.");
  };

  const statusOptions = [
    "READY",
    "IN_PROGRESS",
    "WAITING_FOR_DEPOSIT",
    "DONE",
    "CANCELED",
    "PARTIAL_CANCELED",
    "ABORTED",
    "EXPIRED",
  ];

  return (
    <>
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>id</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                value={field.value ?? ""}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="created_at"
        render={({ field }) => (
          <FormItem>
            <FormLabel>생성일</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                value={field.value ?? ""}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="updated_at"
        render={({ field }) => (
          <FormItem>
            <FormLabel>수정일</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                value={field.value ?? ""}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="team_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>team id</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="order_no"
        render={({ field }) => (
          <FormItem>
            <FormLabel>주문 번호</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>상태</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payment_key"
        render={({ field }) => (
          <FormItem>
            <FormLabel>결제 키</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                value={field.value ? field.value : ""}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="purchase_datetime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>구매 일시</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                value={field.value ?? ""}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="is_canceled"
        render={({ field }) => (
          <FormItem style={{ display: "flex", alignItems: "center" }}>
            <FormLabel className="mt-2 mr-2">취소 여부</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="total_amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>총 금액</FormLabel>
            <FormControl>
              <Input
                type="text"
                inputMode="numeric"
                readOnly
                {...field}
                onClick={() => handleCopy(field.value)}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="refund_amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>환불 금액</FormLabel>
            <FormControl>
              <Input type="text" inputMode="numeric" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="purchase_user_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>구매자 ID</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payment_method"
        render={({ field }) => (
          <FormItem>
            <FormLabel>결제 방법</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                value={field.value ? field.value : ""}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>통화</FormLabel>
            <FormControl>
              <Input
                readOnly
                {...field}
                value={field.value ? field.value : ""}
                onClick={() => handleCopy(field.value ?? "")}
                className={"cursor-pointer text-gray-500"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>비고</FormLabel>
            <FormControl>
              <Textarea {...field} value={field.value ? field.value : ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const OrderForm = ({
  orderData,
  mutate,
}: {
  orderData: OrderFormValues;
  mutate: any;
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    values: preprocessValues(orderData),
  });

  async function onSubmit(data: z.infer<typeof OrderSchema>) {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL + `/admin/payment/order/${orderData.id}`;
    const payload = { ...data };
    const options = {};

    try {
      await axios.put(apiUrl, payload, options);
      mutate();
      console.log("Order updated");
      toast({
        title: "결제 이력 업데이트 완료",
        description: "결제 이력이 성공적으로 업데이트되었습니다.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "결제 이력 업데이트 실패",
        description: `결제 이력이 업데이트되지 않았습니다. ${
          error?.response?.data?.detail ?? error.message
        }`,
      });
    }
  }

  return (
    <div className="w-full lg:w-1/2 my-4 mx-4 sm:mx-4 lg:mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <OrderFormFields form={form} />
          <div className="flex justify-center">
            <ActionButton type="submit" onClick={() => {}}>
              결제 이력 업데이트
            </ActionButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
