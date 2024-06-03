"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import SignaturePad from "@/components/global/SignaturePad";

export function NoteForm() {
	return (
		<div>
			<SignaturePad />
			<Label className="text-sm text-muted-foreground">이 서명은 연구노트에 기록됩니다. 단, 서명을 변경하더라도 이미 생성된 연구노트에는 영향을 끼치지 않습니다.</Label>
		</div>
	);
}
