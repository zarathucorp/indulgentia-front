"use client";
import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
const SignaturePad = () => {
	const canvasRef = useRef<any>(null);
	const [isSigned, setIsSigned] = useState<boolean>(false);

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

	return (
		<div className="flex flex-col items-center">
			<div className="relative border-2 border-gray-500" style={{ width: "500px", height: "200px" }}>
				{!isSigned && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">여기에 서명을 해주세요.</div>}
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
					onClick={() => {
						canvasRef.current.clear(); // 리셋
						setIsSigned(false);
					}}
				>
					서명 초기화
				</Button>
				{/* <button
					className={`px-4 py-2 rounded ${isSigned ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"}`}
					disabled={!isSigned} // 버튼 disabled
					onClick={() => save()}
				>
					저장 버튼
				</button> */}
			</div>
		</div>
	);
};

export default SignaturePad;
