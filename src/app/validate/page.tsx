"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const [hash, setHash] = useState("");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files ? e.target.files[0] : null;
		setFile(selectedFile);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/validate/pdf", {
			method: "POST",
			body: formData,
		});

		const data = await res.json();
		setHash(data.hash);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
				<CardHeader>
					<CardTitle>연구노트 검증</CardTitle>
					<CardDescription>검증할 연구노트 파일을 업로드하세요.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="mt-4">
						<Label htmlFor="file">PDF 파일</Label>
						<Input id="file" type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none" />
						<Button type="submit" className="w-full mt-4 text-white font-bold py-2 px-4 rounded">
							검증
						</Button>
					</form>
				</CardContent>
				{hash && (
					<Card className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
						<div className="">검증 결과: {hash}</div>
					</Card>
				)}
			</Card>
			{/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
				<Card className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
					<form onSubmit={handleSubmit} className="mt-4">
						<Input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none" />
						<Button type="submit" className="w-full mt-4 text-white font-bold py-2 px-4 rounded">
							검증
						</Button>
					</form>
					{hash && <div className="mt-4">{hash}</div>}
				</Card>
			</div> */}
		</div>
	);
}
