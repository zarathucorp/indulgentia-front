import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WelcomePage from "./Welcone";
export default function Home() {
	return (
		<main className="">
			{/* flex min-h-screen flex-col items-center justify-between p-24
			main classname 구버전 */}
			<WelcomePage />
			{/* <div className="">
				<div className="text-5xl">Indulgentia - ELN</div>
				<Link href="/dashboard">
					<Button>시작하기</Button>
				</Link>
			</div> */}
		</main>
	);
}
