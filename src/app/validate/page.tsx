"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState, useCallback } from "react";
import { Spinner } from "@/components/global/Spinner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileUploaderDrag } from "@/components/global/FileUploader";
export default function ValidatePDF() {
	// 상태 관리
	const [file, setFile] = useState<File | null>(null);
	const [result, setResult] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [validateResult, setValidateResult] = useState<boolean | null>(null);
	const [blockchainInfo, setBlockchainInfo] = useState<BlockchainInfo>({ entry: {}, receipt: {} });

	// 블록체인 정보 인터페이스 정의
	interface BlockchainInfo {
		entry: Record<string, any>;
		receipt: Record<string, any>;
	}

	// 파일 선택 핸들러
	const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files?.[0] || null);
	}, []);

	// 폼 제출 핸들러
	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!file) return;

			setValidateResult(null);
			setResult("");
			setIsLoading(true);
			setBlockchainInfo({ entry: {}, receipt: {} });

			const formData = new FormData();
			formData.append("file", file);

			try {
				const { data } = await axios.post<{ data: { is_verified: boolean; message?: string; entry: Record<string, any>; receipt: Record<string, any> } }>(
					`${process.env.NEXT_PUBLIC_API_URL}/dashboard/note/verify`,
					formData
				);

				if (!data.data.is_verified) {
					throw new Error(data.data.message || "검증에 실패했습니다");
				}

				setBlockchainInfo({
					entry: data.data.entry,
					receipt: data.data.receipt,
				});
				setValidateResult(true);
			} catch (error) {
				setValidateResult(false);
				setResult(
					error instanceof Error && error.message === "PDF is modified"
						? "PDF가 변조되었습니다."
						: axios.isAxiosError(error)
						? (error.response?.data as string) || "알 수 없는 오류가 발생했습니다."
						: "알 수 없는 오류가 발생했습니다."
				);
			} finally {
				setIsLoading(false);
			}
		},
		[file]
	);

	// 결과 메시지 렌더링 함수
	const renderResultMessage = () => {
		if (validateResult === null) return null;

		return validateResult ? (
			<div className="rounded-md border border-green-500 bg-green-50 p-4">
				<div className="flex items-center space-x-3">
					<CircleCheckIcon className="h-5 w-5 text-green-500" />
					<h4 className="text-sm font-semibold text-green-900">연구실록에서 인증된 파일입니다.</h4>
				</div>
				<p className="mt-2 text-sm text-green-700">업로드된 파일은 연구실록에서 서명했으며, 변조되지 않았습니다. 자세한 사항은 아래 블록체인 Entry/Receipt를 확인하여 주시기 바랍니다.</p>
				<p className="mt-2 text-sm text-green-700">작성시각: </p>
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="entry">
						<AccordionTrigger className="font-mono text-sm text-green-900">Entry 보기</AccordionTrigger>
						<AccordionContent>
							<pre className="whitespace-pre-wrap break-words max-w-full overflow-auto mt-4 rounded-md bg-green-100 p-4 font-mono text-sm text-green-900 max-h-60">
								{JSON.stringify(blockchainInfo.entry, null, 2)}
							</pre>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="receipt">
						<AccordionTrigger className="font-mono text-sm text-green-900">Receipt 보기</AccordionTrigger>
						<AccordionContent>
							<pre className="whitespace-pre-wrap break-words max-w-full overflow-auto mt-4 rounded-md bg-green-100 p-4 font-mono text-sm text-green-900 max-h-60">
								{JSON.stringify(blockchainInfo.receipt, null, 2)}
							</pre>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		) : (
			<div className="rounded-md border border-red-500 bg-red-50 p-4">
				<div className="flex items-center space-x-3">
					<CircleAlertIcon className="h-5 w-5 text-red-500" />
					<h4 className="text-sm font-semibold text-red-900">연구실록에서 인증하지 않은 파일입니다.</h4>
				</div>
				<p className="mt-2 text-sm text-red-700">{result}</p>
			</div>
		);
	};

	return (
		<div className="flex items-center justify-center h-screen-minus-navbar">
			<Card className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
				<CardHeader>
					<CardTitle>연구노트 검증</CardTitle>
					<CardDescription>검증할 연구노트 파일을 업로드하세요.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="mt-4">
						<FileUploaderDrag maxFiles={1} allowedFileTypes={["application/pdf"]} onFilesChange={(files: File[]) => setFile(files[0] ? files[0] : null)} />
						{/* <Label htmlFor="file">PDF 파일</Label>
						<Input
							id="file"
							type="file"
							accept="application/pdf"
							onChange={handleFileChange}
							className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
						/> */}
						<Button type="submit" className="w-full mt-4 text-white font-bold py-2 px-4 rounded" disabled={isLoading || file === null}>
							{isLoading ? (
								<>
									<Spinner />
									&nbsp;
								</>
							) : null}
							검증
						</Button>
					</form>
				</CardContent>
				<div className="mt-auto space-y-4">{renderResultMessage()}</div>
			</Card>
		</div>
	);
}

// SVG 아이콘 컴포넌트 타입 정의
type IconProps = React.SVGProps<SVGSVGElement>;

// SVG 아이콘 컴포넌트들
const CircleAlertIcon: React.FC<IconProps> = (props) => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="12" r="10" />
		<line x1="12" x2="12" y1="8" y2="12" />
		<line x1="12" x2="12.01" y1="16" y2="16" />
	</svg>
);

const CircleCheckIcon: React.FC<IconProps> = (props) => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="12" r="10" />
		<path d="m9 12 2 2 4-4" />
	</svg>
);
