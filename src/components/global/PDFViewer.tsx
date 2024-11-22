"use client";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toolbarPlugin, ToolbarSlot, TransformToolbarSlot, ToolbarPlugin } from '@react-pdf-viewer/toolbar';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
	fileUrl: string;
	className?: any;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, className }) => {
	const toolbarPluginInstance = toolbarPlugin();
	const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

	const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
		...slot,
		Download: () => <></>,
		Open: () => <></>,
	});
	const renderToolbar = (ToolbarComponent: typeof Toolbar) => <ToolbarComponent>{renderDefaultToolbar(transform)}</ToolbarComponent>;
	const defaultLayoutPluginInstance = defaultLayoutPlugin({
		renderToolbar,
	});
	return (
		<div className={className}>
			<Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
				<Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
			</Worker>
		</div>
	);
};

export default PDFViewer;
