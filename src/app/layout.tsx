import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
// const inter = Inter({ subsets: ["latin"] });
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import ChannelTalk from "@/components/global/ChannelTalk";
import { Onborda, OnbordaProvider } from "onborda";
import { steps } from "@/lib/tours";
import CustomCard from "@/components/global/CustomCard";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "연구실록 - Zarathu Corporation",
  description: "연구실록 - 연구노트 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <OnbordaProvider>
          <Onborda steps={steps} cardComponent={CustomCard} shadowOpacity="0.8">
            <Navbar />
            {children}
            <Toaster />
            <ChannelTalk />
          </Onborda>
        </OnbordaProvider>
      </body>
    </html>
  );
}
