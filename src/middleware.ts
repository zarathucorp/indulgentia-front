import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

// 사용자 정보를 가져오는 함수
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

// 팀 정보를 가져오는 함수
const fetchTeamInfo = async (token: string, cookies: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_API_URL + "/user/team",
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
		console.error("Error fetching team info:", error);
		return null;
	}
};

// 미들웨어 함수
export default async function middleware(request: NextRequest) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const token = request.cookies.get("token")?.value || "";
	const cookies = request.headers.get("cookie") || "";

	// 루트 경로로 접근하는 경우
	if (request.nextUrl.pathname === "/") {
		if (user) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	// auth 페이지로 접근하는 경우
	if (request.nextUrl.pathname.startsWith("/auth")) {
		if (
			request.nextUrl.pathname === "/auth/login" ||
			request.nextUrl.pathname === "/auth/signup"
		) {
			if (user) {
				return NextResponse.redirect(new URL("/dashboard", request.url));
			}
		}
	}

	// Dashboard 페이지로 접근하는 경우
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		if (!user) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}

		const userInfo = await fetchUserInfo(token, cookies);
		console.log(userInfo);
		if (!userInfo.team_id) {
			return NextResponse.redirect(new URL("/setting/team", request.url));
		}

		const teamInfo = await fetchTeamInfo(token, cookies);
		console.log(teamInfo);
		if (!teamInfo.is_premium) {
			return NextResponse.redirect(new URL("/setting/payment", request.url));
		}
	}

	// /setting 페이지로 접근하는 경우
	if (request.nextUrl.pathname.endsWith("/setting")) {
		const userInfo = await fetchUserInfo(token, cookies);
		console.log(userInfo);
		if (!userInfo || !userInfo.is_leader) {
			const redirectPathname = request.nextUrl.pathname.replace("/setting", "");
			return NextResponse.redirect(new URL(redirectPathname, request.url));
		}
	}

	// Admin 페이지로 접근하는 경우
	if (request.nextUrl.pathname.startsWith("/admin")) {
		const userInfo = await fetchUserInfo(token, cookies);
		console.log(userInfo);
		if (!userInfo || !userInfo.is_admin) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return await updateSession(request);
}

// 미들웨어 설정
export const config = {
	matcher: [
		/*
		 * 다음 경로를 제외한 모든 요청 경로와 일치:
		 * - _next/static (정적 파일)
		 * - _next/image (이미지 최적화 파일)
		 * - favicon.ico (파비콘 파일)
		 * - 이미지 파일 - .svg, .png, .jpg, .jpeg, .gif, .webp
		 * 더 많은 경로를 포함하도록 이 패턴을 수정할 수 있습니다.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		"/",
	],
};
