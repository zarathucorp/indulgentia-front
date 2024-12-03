import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

const fetchUserInfo = async (token: string, cookies: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_API_URL + "/user/settings/info",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Cookie: cookies,
				},
			},
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching user info:", error);
		return null;
	}
};

export default async function middleware(request: NextRequest) {
	// 루트 경로로 접근하는 경우
	if (request.nextUrl.pathname === "/") {
		const supabase = createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}
	// auth 페이지로 접근하는 경우
	if (request.nextUrl.pathname.startsWith("/auth")) {
		const supabase = createClient();
		if (
			request.nextUrl.pathname === "/auth/login" ||
			request.nextUrl.pathname === "/auth/signup"
		) {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				return NextResponse.redirect(new URL("/dashboard", request.url));
			}
		}
	}

	// Dashboard 페이지로 접근하는 경우
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		const supabase = createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	}

	// /setting 페이지로 접근하는 경우
	if (request.nextUrl.pathname.endsWith("/setting")) {
		const token = request.cookies.get("token")?.value || "";
		const cookies = request.headers.get("cookie") || "";
		const userInfo = await fetchUserInfo(token, cookies);
		console.log(userInfo);
		if (!userInfo || !userInfo.is_leader) {
			const redirectPathname = request.nextUrl.pathname.replace("/setting", "");
			return NextResponse.redirect(new URL(redirectPathname, request.url));
		}
	}

	// Admin 페이지로 접근하는 경우
	if (request.nextUrl.pathname.startsWith("/admin")) {
		const token = request.cookies.get("token")?.value || "";
		const cookies = request.headers.get("cookie") || "";
		const userInfo = await fetchUserInfo(token, cookies);
		console.log(userInfo);
		if (!userInfo || !userInfo.is_admin) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}
	return await updateSession(request);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		"/",
	],
};
