import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export default async function middleware(request: NextRequest) {
	// Dashboard로 접근하는 경우
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		const supabase = createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	}

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
