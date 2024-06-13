"use client";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
	fileUrl: string;
	className?: any;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, className }) => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	return (
		<div className={className}>
			<Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
				<Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
			</Worker>
		</div>
	);
};

export default PDFViewer;
