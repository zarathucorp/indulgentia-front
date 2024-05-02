import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
// const inter = Inter({ subsets: ["latin"] });
import localFont from "next/font/local";

const pretendard = localFont({
	src: "./fonts/PretendardVariable.woff2",
	display: "swap",
	weight: "45 920",
});

export const metadata: Metadata = {
	title: "Indulgentia - Zarathu Corporation",
	description: "Indulgentia - 연구노트 플랫폼",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={pretendard.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
