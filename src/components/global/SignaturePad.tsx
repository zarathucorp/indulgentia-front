"use client";
import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useVariable } from "@/hooks/useVariable";
import useSWRImmutable from "swr/immutable";
const SignaturePad = () => {
	const canvasRef = useRef<any>(null);
	const [isSigned, setIsSigned] = useState<boolean>(false);
	const [initialSignatureUrl, setInitialSignatureUrl] = useVariable<string | null>(null);

	const { data: signatureData } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/settings/signature", async (url: string) => {
		const { data } = await axios.get(url);
		setInitialSignatureUrl(data.url);
	});

	useEffect(() => {
		if (initialSignatureUrl) {
			const loadInitialSignature = () => {
				const canvas = canvasRef.current.getCanvas();
				const context = canvas.getContext("2d");
				const img = new Image();
				img.src = initialSignatureUrl;
				img.crossOrigin = "Anonymous";
				img.onload = () => {
					context.drawImage(img, 0, 0, img.width / 2, img.height / 2);
					setIsSigned(true);
				};
			};

			loadInitialSignature();
		}
	}, [initialSignatureUrl]);

	useEffect(() => {
		const scaleCanvas = () => {
			const canvas = canvasRef.current.getCanvas();
			const context = canvas.getContext("2d");
			const ratio = Math.max(window.devicePixelRatio || 1, 1);

			// Save the canvas content
			const dataUrl = canvas.toDataURL();

			// Scale the canvas
			canvas.width = 500 * ratio;
			canvas.height = 200 * ratio;
			canvas.style.width = "500px";
			canvas.style.height = "200px";

			context.scale(ratio, ratio);

			// Restore the canvas content
			const img = new Image();
			img.src = dataUrl;
			img.onload = () => {
				context.drawImage(img, 0, 0);
			};
		};

		scaleCanvas();
		window.addEventListener("resize", scaleCanvas);

		return () => {
			window.removeEventListener("resize", scaleCanvas);
		};
	}, []);

	const handleSave = async () => {
		const canvas = canvasRef.current.getCanvas();
		const dataUrl = canvas.toDataURL("image/png") as string;

		try {
			const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/settings/signature", { file: dataUrl as string });
			console.log(data);
		} catch (error) {
			console.error(error);
		}
		// dataUrl에 이미지 데이터가 들어있음. 백엔드로 보내면 됨.
	};

	return (
		<div className="flex flex-col items-center">
			<div className="relative border-2 border-gray-500" style={{ width: "500px", height: "200px" }}>
				{!isSigned && (
					<div
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black not-selectable"
						style={{
							WebkitTouchCallout: "none",
							WebkitUserSelect: "none",
							KhtmlUserSelect: "none",
							MozUserSelect: "none",
							msUserSelect: "none",
							userSelect: "none",
						}}
					>
						여기에 서명을 해주세요.
					</div>
				)}
				<SignatureCanvas
					ref={canvasRef}
					onBegin={() => {
						setIsSigned(true);
					}}
					canvasProps={{ className: "signature-canvas w-full h-full" }}
				/>
			</div>
			<div className="mt-4">
				<Button
					className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded mr-2"
					onClick={(e) => {
						e.preventDefault();
						canvasRef.current.clear(); // 리셋
						setIsSigned(false);
					}}
				>
					서명 초기화
				</Button>
				<Button
					className={`px-4 py-2 rounded ${isSigned ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"}`}
					disabled={!isSigned} // 버튼 disabled
					onClick={(e) => {
						e.preventDefault();
						handleSave();
					}}
				>
					저장 버튼
				</Button>
			</div>
		</div>
	);
};

export default SignaturePad;
