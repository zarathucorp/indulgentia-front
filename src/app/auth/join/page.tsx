"use client";

// import { useActionState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { JoinAction } from "./actions.ts";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../login/submit-button";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";


type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function JoinForm() {
	// // react 19 
	// const [state, formAction] = useActionState(JoinAction, initialState);

	// react 18
  const { register, handleSubmit, control, setError } = useForm<FormData>();
  const { isSubmitting, errors } = useFormState({ control });

	const { toast } = useToast();

  const signUp = async (data: FormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("first-name", data.firstName);
    formData.append("last-name", data.lastName);

    const result = await JoinAction({ message: "" }, formData);

    if (result.message === "Check email to continue sign in process") {
      console.log(result.message);
      toast({
        title: "회원가입 성공",
        description: "이메일을 확인하여 계속 진행하세요.",
      });
    } else if (result.message === "user_already_registered") {
      console.log(result.message);
      toast({
        title: "회원가입에 실패하였습니다.",
        description: "이미 가입된 이메일입니다.",
      });
    } else if (result.message === "weak_password") {
      console.log(result.message);
      toast({
        title: "회원가입에 실패하였습니다.",
        description: "6자 이상의 비밀번호를 입력해주세요.",
      });
    } else if (result.message === "over_email_send_rate_limit") {
      console.log(result.message);
      toast({
        title: "회원가입에 실패하였습니다.",
        description: "이메일 전송 제한에 걸렸습니다. 잠시 후 다시 시도해주세요.",
      });
    } else {
      console.log(result.message);
			toast({
				title: "회원가입에 실패하였습니다.",
				description: "다시 시도해주세요.",
			});
		};
	}

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">회원가입</CardTitle>
				<CardDescription>간편하게 회원가입하세요</CardDescription>
			</CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit(signUp)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="last-name">성</Label>
                <Input id="last-name" {...register("lastName", { required: true })} name="last-name" required placeholder="홍" />
                {/* {errors.lastName && <span>{errors.lastName.message}</span>} */}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="first-name">이름</Label>
                <Input id="first-name" {...register("firstName", { required: true })} name="first-name" required placeholder="길동" />
                {/* {errors.firstName && <span>{errors.firstName.message}</span>} */}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" {...register("email", { required: true })} name="email" required placeholder="user@example.com" />
              {/* {errors.email && <span>{errors.email.message}</span>} */}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" {...register("password", { required: true })} name="passowrd" required />
              {/* {errors.password && <span>{errors.password.message}</span>} */}
            </div>
            <SubmitButton type="submit" className="w-full outline" pendingText="Signing Up..." disabled={isSubmitting}>
              회원가입
            </SubmitButton>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href="/auth/login" className="underline">
            로그인
          </Link>
        </div>
      </CardContent>
    </Card>
	);
}