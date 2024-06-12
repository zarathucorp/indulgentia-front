import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputHTMLAttributes } from "react";
interface FileUploaderProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
	typeString?: string;
	isFileSelected: boolean;
	fileUnselectHandling?: () => void;
}

import React, { useRef } from "react";

const FileUploader: React.FC<FileUploaderProps> = ({ typeString = "File", isFileSelected, fileUnselectHandling, ...props }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUnselect = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
		if (fileUnselectHandling) {
			fileUnselectHandling();
		}
	};

	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="file">{typeString}</Label>
			<div className="flex items-center gap-1.5">
				<Input id="file" type="file" accept="image/*,.txt,.pdf,text/*,.hwp,.hwpx,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint" ref={fileInputRef} {...props} />
				{isFileSelected && (
					<Button type="button" onClick={handleFileUnselect} className="text-red-500 hover:text-red-700">
						파일 삭제
					</Button>
				)}
			</div>
		</div>
	);
};

export default FileUploader;
