import { useState } from "react";

export const useVariable = <T>(initialValue: T) => {
	const [value, setValue] = useState<T>(initialValue);

	const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value as unknown as T);
	};

	return [value, setValue, handleValue] as const;
};
