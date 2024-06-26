"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputHTMLAttributes, useEffect } from "react";
interface FileUploaderProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
	typeString?: string;
	isFileSelected: boolean;
	fileUnselectHandling?: () => void;
}

import React, { useRef } from "react";

const FileUploader: React.FC<FileUploaderProps> = ({ typeString = "File", isFileSelected, fileUnselectHandling, accept, ...props }) => {
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
				<Input id="file" type="file" accept={accept} ref={fileInputRef} {...props} />
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

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Accept } from "react-dropzone";

import { useMemo } from "react";

interface FileUploadFormProps {
	maxFiles: number;
	allowedFileTypes?: string[];
	onFilesChange: (files: File[]) => void;
}

const FileUploaderDrag: React.FC<FileUploadFormProps> = ({ maxFiles = 1, allowedFileTypes = ["application/pdf"], onFilesChange }) => {
	const [files, setFiles] = useState<File[]>([]);

	useEffect(() => {
		onFilesChange(files);
	}, [files]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setFiles((prevFiles) => {
				const newFiles = acceptedFiles.filter((file) => !prevFiles.some((prevFile) => prevFile.name === file.name && prevFile.size === file.size));
				const updatedFiles = [...prevFiles, ...newFiles.map((file) => Object.assign(file))];
				return updatedFiles.slice(0, maxFiles);
			});
		},
		[maxFiles]
	);

	const acceptFile: Accept = useMemo(() => {
		return allowedFileTypes.reduce((acc, type) => {
			acc[type] = [];
			return acc;
		}, {} as Accept);
	}, [allowedFileTypes]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: maxFiles,
		accept: acceptFile,
	});

	const removeFile = (file: File) => {
		const newFiles = files.filter((f) => f !== file);
		setFiles(newFiles);
	};

	return (
		<div className="max-w-md mx-auto">
			<div {...getRootProps()} className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p className="text-[#055F60]">파일을 여기에 드래그하세요</p>
				) : (
					<>
						<p className="text-[#073F40]">파일을 여기에 드래그하거나 클릭하세요</p>
						<p className="text-xs">(최대 파일 {maxFiles}개)</p>
					</>
				)}
			</div>
			<div className="mt-4">
				{files.map((file) => (
					<div key={file.name} className="flex items-center mt-2">
						<div className="flex-grow">
							<p className="text-sm font-medium">{file.name}</p>
							<p className="text-xs text-gray-500">{Math.round((file.size / 1024 / 1024) * 10) / 10} MB</p>
						</div>
						<button onClick={() => removeFile(file)} className="ml-2 px-2 py-1 text-xs text-red-500 hover:text-red-700">
							삭제
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export { FileUploaderDrag };
