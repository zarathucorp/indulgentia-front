"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DatePicker(props: { field: any }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !props.field.value && "text-muted-foreground")}>
						{props.field.value ? format(props.field.value, "PPP") : <span>날짜를 선택하세요.</span>}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar mode="single" selected={props.field.value} onSelect={props.field.onChange} initialFocus />
				{/* disabled={(date) => date > new Date() || date < new Date("1900-01-01")} */}
			</PopoverContent>
		</Popover>
	);
}
