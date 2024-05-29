import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1>Welcome to GitHub App</h1>
			<Link href="/next-api/github/login">Login with GitHub</Link>
		</div>
	);
}
