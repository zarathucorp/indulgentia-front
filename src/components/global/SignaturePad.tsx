import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import { useToast } from "@/components/ui/use-toast";

const SignaturePad = () => {
	const canvasRef = useRef<any>(null);
	const [isSigned, setIsSigned] = useState<boolean>(false);
	const [initialSignatureUrl, setInitialSignatureUrl] = useState<string | null>(null);
	const { toast } = useToast();
	const { data: signatureData } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL + "/user/settings/signature", async (url: string) => {
		const { data } = await axios.get(url, { withCredentials: true });
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
					canvas.width = canvas.parentElement.offsetWidth;
					canvas.height = canvas.parentElement.offsetHeight;
					canvas.style.width = "100%";
					canvas.style.height = "100%";
					context.drawImage(img, 0, 0, canvas.width, canvas.height);
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
			const containerWidth = canvas.parentElement.offsetWidth;
			const containerHeight = canvas.parentElement.offsetHeight;
			canvas.width = containerWidth * ratio;
			canvas.height = containerHeight * ratio;
			canvas.style.width = `${containerWidth}px`;
			canvas.style.height = `${containerHeight}px`;

			context.setTransform(ratio, 0, 0, ratio, 0, 0);

			// Restore the canvas content
			const img = new Image();
			img.src = dataUrl;
			img.onload = () => {
				context.drawImage(img, 0, 0, canvas.width, canvas.height);
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
		const dataUrl = canvas.toDataURL("image/png", 1.0) as string;

		try {
			const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/settings/signature", { file: dataUrl as string }, { withCredentials: true });
			console.log(data);

			toast({
				title: "서명이 저장되었습니다.",
				description: "서명이 성공적으로 저장되었습니다.",
			});
		} catch (error: any) {
			console.error(error);
			toast({
				title: "서명이 저장되지 않았습니다.",
				description: `에러: ${error.message}.`,
			});
		}
	};

	return (
		<div className="flex flex-col items-center px-4">
			<div className="relative border-2 border-gray-500 w-full max-w-[500px] h-[200px] signature-container">
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
			<div className="mt-4 flex items-center w-full max-w-md gap-2">
				<Button
					className="px-4 py-2 bg-red-500 hover:bg-red w-full"
					onClick={(e) => {
						e.preventDefault();
						canvasRef.current.clear(); // 리셋
						setIsSigned(false);
					}}
				>
					서명 초기화
				</Button>
				<Button
					className="px-4 py-2 w-full"
					disabled={!isSigned} // 버튼 disabled
					onClick={(e) => {
						e.preventDefault();
						handleSave();
					}}
				>
					저장
				</Button>
			</div>
		</div>
	);
};

export default SignaturePad;
