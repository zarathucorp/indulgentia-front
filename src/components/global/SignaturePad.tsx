import { useRef, useState, MouseEvent } from "react";

interface SignaturePadProps {
	onSave: (signatureImage: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
		const ctx = canvasRef.current?.getContext("2d");
		if (ctx) {
			const { offsetX, offsetY } = nativeEvent;
			ctx.beginPath();
			ctx.moveTo(offsetX, offsetY);
			setIsDrawing(true);
		}
	};

	const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing || !canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");
		if (ctx) {
			const { offsetX, offsetY } = nativeEvent;
			ctx.lineTo(offsetX, offsetY);
			ctx.stroke();
		}
	};

	const endDrawing = () => {
		canvasRef.current?.getContext("2d")?.closePath();
		setIsDrawing(false);
	};

	const clearCanvas = () => {
		const ctx = canvasRef.current?.getContext("2d");
		if (ctx && canvasRef.current) {
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		}
	};

	const saveSignature = () => {
		if (canvasRef.current) {
			const dataUrl = canvasRef.current.toDataURL("image/png");
			onSave(dataUrl);
		}
	};

	return (
		<div>
			<canvas ref={canvasRef} width={500} height={200} onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseMove={draw} onMouseLeave={endDrawing} style={{ border: "1px solid black" }} />
			<button onClick={saveSignature}>Save</button>
			<button onClick={clearCanvas}>Clear</button>
		</div>
	);
};

export default SignaturePad;
