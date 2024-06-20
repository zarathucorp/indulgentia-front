"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyPDF() {
	// const [file, setFile] = useState(null);
	// const [dragging, setDragging] = useState(false);

	// const handleDragEnter = (e) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	setDragging(true);
	// };

	// const handleDragLeave = (e) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	setDragging(false);
	// };

	// const handleDragOver = (e) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// };

	// const handleDrop = (e) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	setDragging(false);
	// 	const files = e.dataTransfer.files;
	// 	if (files && files[0] && files[0].type === "application/pdf") {
	// 		setFile(files[0]);
	// 	} else {
	// 		alert("Only PDF files are allowed");
	// 	}
	// };

	// const handleFileChange = (e) => {
	// 	const files = e.target.files;
	// 	if (files && files[0] && files[0].type === "application/pdf") {
	// 		setFile(files[0]);
	// 	} else {
	// 		alert("Only PDF files are allowed");
	// 	}
	// };

	// const handleButtonClick = () => {
	// 	document.getElementById("fileInput").click();
	// };

	return null;
	// <div className="mx-auto max-w-md space-y-6">
	// 	<div className="space-y-2 text-center">
	// 		<h2 className="text-3xl font-bold">연구노트 검증</h2>
	// 		<p className="text-gray-500 dark:text-gray-400">연구노트를 업로드하면 이를 검증하여 결과를 표시합니다.</p>
	// 	</div>
	// 	<div
	// 		className={`border-2 ${dragging ? "border-blue-500" : "border-gray-300"} border-dashed rounded-md px-6 py-10 space-y-4 text-center`}
	// 		onDragEnter={handleDragEnter}
	// 		onDragLeave={handleDragLeave}
	// 		onDragOver={handleDragOver}
	// 		onDrop={handleDrop}
	// 	>
	// 		<div className="flex items-center justify-center">
	// 			<CloudUploadIcon className="h-12 w-12 text-gray-400" />
	// 		</div>
	// 		<p className="text-gray-500 dark:text-gray-400">
	// 			파일을 드래그하거나{" "}
	// 			<button type="button" className="text-blue-600 font-medium hover:underline" onClick={handleButtonClick}>
	// 				여기를 클릭해
	// 			</button>{" "}
	// 			파일을 선택하세요
	// 		</p>
	// 		<Input id="fileInput" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
	// 	</div>
	// 	{file && (
	// 		<div className="text-center">
	// 			<p className="text-gray-500 dark:text-gray-400">{file.name}</p>
	// 		</div>
	// 	)}
	// </div>
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
			<path d="M12 12v9" />
			<path d="m16 16-4-4-4 4" />
		</svg>
	);
}
