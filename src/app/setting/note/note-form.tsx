"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import SignaturePad from "@/components/global/SignaturePad";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useOnborda } from "onborda";
import { useEffect } from "react";

export function NoteForm() {
  const { startOnborda, currentStep } = useOnborda();

  useEffect(() => {
    const hasVistedNoteSetting = localStorage.getItem("hasVistedNoteSetting");
    console.log("hasVistedNoteSetting", hasVistedNoteSetting);
    if (!hasVistedNoteSetting) {
      startOnborda("setting-note");
      localStorage.setItem("hasVistedNoteSetting", "true");
    }
  }, [startOnborda]);
  return (
    <div>
      <div id="onborda-step2" className="grid items-center gap-4">
        <TooltipProvider>
          <Label className="flex" htmlFor="team-uuid">
            서명&nbsp;{" "}
            <Tooltip delayDuration={100}>
              <TooltipTrigger type="button">
                <FaRegCircleQuestion />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  미리보기 상의 이미지는 실제 해상도, 파일 크기와 다를 수
                  있습니다.
                </p>
                <p>* 권장사항</p>
                <p>- 해상도: 500 x 200</p>
                <p>- 파일 형식: PNG, JPEG, GIF</p>
                <p>- 파일 크기: 1MB 이하</p>
              </TooltipContent>
            </Tooltip>
          </Label>
        </TooltipProvider>
        {/* <Label htmlFor="team-uuid">서명</Label> */}
        <SignaturePad />
        <Label className="text-sm text-muted-foreground">
          이 서명은 연구노트에 기록됩니다. 단, 서명을 변경하더라도 이미 생성된
          연구노트에는 영향을 끼치지 않습니다. 서명을 입력하지 않은 경우 유저의
          이메일을 서명으로 사용합니다.
        </Label>
      </div>
    </div>
  );
}
