import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button, buttonVariants, ButtonProps } from "@/components/ui/button"; // Adjust the import path as necessary
import { Spinner } from "../global/Spinner";

const ActionButton = React.forwardRef<HTMLButtonElement, ButtonProps & { onClick: () => void | Promise<void> }>(({ children, onClick, className, variant, size, asChild = false, ...props }, ref) => {
	const [loading, setLoading] = React.useState(false);

	const handleClick = async () => {
		setLoading(true);
		try {
			const result = onClick();
			if (result instanceof Promise) {
				await result;
			}
		} finally {
			setLoading(false);
		}
	};

	const Comp = asChild ? Slot : "button";
	return (
		<Button className={cn(buttonVariants({ variant, size, className }))} ref={ref} onClick={handleClick} {...props}>
			{loading ? (
				<>
					<Spinner />
					&nbsp;{children}
				</>
			) : (
				children
			)}
		</Button>
	);
});
ActionButton.displayName = "ActionButton";

export { ActionButton };
