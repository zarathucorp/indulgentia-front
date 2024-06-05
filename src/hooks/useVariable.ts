import { useState } from "react";

export const useVariable = <T extends string | number>(initialValue: T) => {
	const [value, setValue] = useState<T>(initialValue);

	const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Type assertion is done properly based on the generic type
		setValue(e.target.value as T);
	};

	return [value, setValue, handleValue] as const;
};
