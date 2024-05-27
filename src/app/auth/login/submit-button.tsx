"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/global/Spinner";
type Props = ComponentProps<"button"> & {
	pendingText?: string;
};

export default function SubmitButton({ children, pendingText, ...props }: Props) {
	const { pending, action } = useFormStatus();

	const isPending = pending && action === props.formAction;

	return (
		<Button {...props} type="submit" aria-disabled={pending}>
			{isPending ? (
				<>
					<Spinner />
					&nbsp;{children}
				</>
			) : (
				children
			)}
		</Button>
	);
}
