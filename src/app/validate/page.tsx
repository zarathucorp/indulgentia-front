"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState, useCallback } from "react";
import { Spinner } from "@/components/global/Spinner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileUploaderDrag } from "@/components/global/FileUploader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useToast } from "@/components/ui/use-toast";
export default function ValidatePDF() {
	// 상태 관리
	const [file, setFile] = useState<File | null>(null);
	const [result, setResult] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [validateResult, setValidateResult] = useState<boolean | null>(null);
	const [blockchainInfo, setBlockchainInfo] = useState<BlockchainInfo>({ entry: {}, receipt: {} });
	const { toast } = useToast();

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
							<Tabs className="w-full" defaultValue="general">
								<TabsList className="grid grid-cols-2 gap-4 mb-8 font-mono text-sm text-green-900 bg-green-50">
									<TabsTrigger className="data-[state=active]:bg-green-100" value="general">주요 항목</TabsTrigger>
									<TabsTrigger className="data-[state=active]:bg-green-100" value="raw">Raw Data</TabsTrigger>
								</TabsList>
								<TabsContent value="general">
									{Object.keys(blockchainInfo.entry).map((key: string) => {
										// 'collectionId' 필드는 숨김 처리
										if (key === 'collectionId') return null;

										const value = blockchainInfo.entry[key];

										// 'contents' 필드 내부 값들을 개별적으로 표시
										const entries = key === 'contents' && typeof value === 'object' && value !== null
											? Object.entries(value)
											: [[key, value]];

										const tooltipTitle: Record<string, string> = {
											"id": "노트 ID",
											"hash": "해시 값",
											"timestamp": "타임스탬프",
											"transactionId": "거래 ID",
										};
										const tooltipContent: Record<string, string> = {
											"id": "연구실록 노트 고유 식별자입니다. UUID 형식으로, 노트를 식별하는 데 사용됩니다.",
											"hash": "연구실록 노트 데이터의 해시 값으로, 무결성 검증에 사용됩니다.",
											"timestamp": "연구실록 노트가 시점 완료된 시간입니다. Unix time으로 기록되며, KST 기준으로 변환하여 표시하고 있습니다.",
											"transactionId": "블록체인 네트워크에서 생성된 거래 ID입니다. 이 값은 블록체인 네트워크에서 노트의 무결성을 증명하는 데 사용됩니다.",
										};

										return entries.map(([subKey, subValue]) => {
											let displayValue = subValue;
								
											// timestamp 필드를 KST로 변환
											if (subKey === 'timestamp' && typeof subValue === 'number') {
												const date = new Date(subValue * 1000); // 밀리초로 변환
												displayValue = date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
											} else if (typeof subValue === 'object' && subValue !== null) {
												displayValue = JSON.stringify(subValue, null, 2);
											}

											const handleCopy = () => {
												navigator.clipboard.writeText(displayValue);
												toast({
													title: "복사 성공",
													description: "클립보드에 복사되었습니다.",
												});
											};

											return (
												<div className="grid w-full gap-1.5 py-1" key={subKey}>
													<TooltipProvider>
														<Label className="flex text-green-900 gap-1.5" htmlFor="message">
															{tooltipTitle[subKey] ?? subKey}
															<Tooltip delayDuration={100}>
																<TooltipTrigger>
																	<FaRegCircleQuestion />
																</TooltipTrigger>
																<TooltipContent>
																	<p>{tooltipContent[subKey]}</p>
																</TooltipContent>
															</Tooltip>
														</Label>
													</TooltipProvider>
													<Textarea
														readOnly
														placeholder={displayValue}
														id="message"
														className="text-green-700 placeholder:text-green-700 bg-green-100 cursor-pointer whitespace-pre-wrap"
														onClick={handleCopy}
													/>
												</div>
											);
										});
									})}
								</TabsContent>
								<TabsContent value="raw">
									<pre
										className="whitespace-pre-wrap break-words max-w-full overflow-auto mt-4 rounded-md bg-green-100 p-4 font-mono text-sm text-green-900 max-h-60 cursor-pointer"
										onClick={() => {
											navigator.clipboard.writeText(JSON.stringify(blockchainInfo.entry, null, 2));
											toast({
												title: "복사 성공",
												description: "클립보드에 복사되었습니다.",
											});
										}}
									>
										{JSON.stringify(blockchainInfo.entry, null, 2)}
									</pre>
								</TabsContent>
							</Tabs>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="receipt">
						<AccordionTrigger className="font-mono text-sm text-green-900">Receipt 보기</AccordionTrigger>
						<AccordionContent>
							<Tabs className="w-full" defaultValue="general">
								<TabsList className="grid grid-cols-2 gap-4 mb-8 font-mono text-sm text-green-900 bg-green-50">
									<TabsTrigger className="data-[state=active]:bg-green-100" value="general">주요 항목</TabsTrigger>
									<TabsTrigger className="data-[state=active]:bg-green-100" value="raw">Raw Data</TabsTrigger>
								</TabsList>
								<TabsContent value="general">
									{Object.keys(blockchainInfo.receipt).map((key: string) => {
										const value = blockchainInfo.receipt[key];
										const displayValue = typeof value === 'object' && value !== null
											? JSON.stringify(value, null, 2)
											: value;
										const tooltipTitle: Record<string, string> = {
											"cert": "인증서",
											"leafComponents": "리프 컴포넌트",
											"nodeId": "노드 ID",
											"proof": "머클 트리 증명",
											"signature": "디지털 서명",
										}
										const tooltipContent: Record<string, string> = {
											"cert": "이 필드는 PEM 형식으로 인코딩된 인증서입니다. 해당 데이터의 서명 및 신뢰성을 증명하는 데 사용되며, 일반적으로 인증 기관에서 발급됩니다.",
											"leafComponents": "데이터를 처리하는 단계에서 검증에 필요한 해시 값을 제공합니다.",
											"nodeId": "이 데이터가 저장된 노드의 고유 식별자입니다.",
											"proof": "머클 트리 검증을 위한 경로를 제공합니다. 이 값들은 각 단계에서의 해시 값으로, 원본 데이터의 무결성을 증명하기 위해 사용됩니다.",
											"signature": "데이터와 관련된 디지털 서명입니다. 이 서명은 cert 필드의 인증서로 서명된 것이며, 데이터의 신뢰성을 증명합니다.",
										}

										const handleCopy = () => {
											navigator.clipboard.writeText(displayValue);
											toast({
												title: "복사 성공",
												description: "클립보드에 복사되었습니다.",
											});
										};

										return (
											<div className="grid w-full gap-1.5 py-1" key={key}>
												<TooltipProvider>
													<Label className="flex text-green-900 gap-1.5" htmlFor="message">
														{tooltipTitle[key]}&nbsp;{" "}
														<Tooltip delayDuration={100}>
															<TooltipTrigger>
																<FaRegCircleQuestion />
															</TooltipTrigger>
															<TooltipContent>
																<p>
																	{tooltipContent[key]}
																</p>
															</TooltipContent>
														</Tooltip>
													</Label>
												</TooltipProvider>
												<Textarea
													readOnly
													placeholder={displayValue}
													id="message"
													className="text-green-700 placeholder:text-green-700 bg-green-100 cursor-pointer whitespace-pre-wrap" // 커서 모양 변경
													onClick={handleCopy} // 클릭 시 복사
												/>
											</div>
										);
									})}
								</TabsContent>
								<TabsContent value="raw">
									<pre
										onClick={() => {
											navigator.clipboard.writeText(JSON.stringify(blockchainInfo.receipt, null, 2));
											toast({
												title: "복사 성공",
												description: "클립보드에 복사되었습니다.",
											});
										}}
										className="whitespace-pre-wrap break-words max-w-full overflow-auto mt-4 rounded-md bg-green-100 p-4 font-mono text-sm text-green-900 max-h-60 cursor-pointer"
									>
										{JSON.stringify(blockchainInfo.receipt, null, 2)}
									</pre>
								</TabsContent>
							</Tabs>
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
					{/* <CardTitle>연구노트 검증</CardTitle> */}
					{/* <CardDescription>검증할 연구노트 파일을 업로드하세요.</CardDescription> */}
					<TooltipProvider>
						<CardTitle>
							연구노트 검증&nbsp;{" "}
							<Tooltip delayDuration={100}>
								<TooltipTrigger>
									<FaRegCircleQuestion size={16} />
								</TooltipTrigger>
								<TooltipContent>
									<p>
										검증할 연구노트 파일을 업로드하세요.
									</p>
									<p>
										연구실록에서 만든 연구 노트만 검증할 수 있습니다. 파일 형식은 PDF 만 지원합니다.
									</p>
								</TooltipContent>
							</Tooltip>
						</CardTitle>
					</TooltipProvider>
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
