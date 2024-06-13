import { Button } from "@/components/ui/button";
import Link from "next/link";
const ERROR_CODE = {
	A1: {
		// "000":{message:"Unauthorized"},
		"000": {
			message: "권한이 없습니다",
			toast: <>더미</>,
			screen: <></>,
		},

		"100": { message: "사용자 데이터베이스에 대한 권한이 없습니다" },
		"110": { message: "auth.users 접근이 거부되었습니다" },
		"120": { message: "public.user_setting 접근이 거부되었습니다" },
		// "121":{message:"User name is not found"},
		"121": {
			message: "사용자 이름을 찾을 수 없습니다",
			toast: (
				<>
					유저 이름이 설정되어 있지 않습니다.{" "}
					<Link href="/setting/account" className="text-blue-600">
						설정하기
					</Link>
				</>
			),
			screen: <></>,
		},

		"200": { message: "프로젝트에 대한 권한이 없습니다" },
		"210": { message: "해당 프로젝트에 소속되어 있지 않습니다" },
		"220": { message: "해당 프로젝트 리더가 아닙니다" },

		"300": { message: "버킷에 대한 권한이 없습니다" },
		"310": { message: "해당 버킷에 소속되어 있지 않습니다" },
		"320": { message: "해당 버킷 소유자가 아닙니다" },

		"400": { message: "노트에 대한 권한이 없습니다" },
		"410": { message: "해당 노트에 소속되어 있지 않습니다" },
		"420": { message: "해당 노트 소유자가 아닙니다" },

		"500": { message: "팀에 대한 권한이 없습니다" },
		"510": { message: "해당 팀에 소속되어 있지 않습니다" },
		"520": { message: "해당 팀 리더가 아닙니다" },
		"530": { message: "이미 팀에 소속되어 있습니다" },
		"540": {
			message: "어떤 팀에도 소속되어 있지 않습니다",
			screen: (
				<>
					<div>
						<p>현재 소속된 팀이 없습니다.</p>
						<p>&quot;설정 - 팀&quot; 에서 팀을 생성하거나, 팀 초대 요청을 수락할 수 있습니다.</p>
						<Link href="/setting/team">
							<Button className="px-8 text-sm font-medium">팀 설정 바로가기</Button>
						</Link>
					</div>
				</>
			),
		},
		"550": { message: "팀에 아직 멤버가 남아 있습니다" },

		"600": { message: "팀 초대에 대한 권한이 없습니다" },
		"610": { message: "이미 팀 초대를 수락하였습니다" },
		"620": { message: "이미 팀 초대를 거절하였습니다" },
		"630": { message: "팀 초대 요청이 아직 남아 있습니다" },
	},
	A3: {
		"000": { message: "접근이 제한되었습니다" },

		"100": { message: "비정상적인 접근으로 제한되었습니다" },
		"110": { message: "요청이 너무 많아 제한되었습니다" },
		"111": { message: "같은 IP에서 요청이 너무 많아 제한되었습니다" },
		"112": { message: "같은 사용자로부터 요청이 너무 많아 제한되었습니다" },

		"120": { message: "위조된 요청으로 제한되었습니다" },
		"121": { message: "위조된 요청 헤더로 제한되었습니다" },
		"122": { message: "위조된 요청 본문으로 제한되었습니다" },
		"123": { message: "위조된 요청 방법으로 제한되었습니다" },
		"124": { message: "위조된 쿠키로 제한되었습니다" },

		"200": { message: "사용자 접근이 제한되었습니다" },
		"210": { message: "쿠키로 인해 제한되었습니다" },
		"211": { message: "쿠키를 찾을 수 없어 제한되었습니다" },
		"212": { message: "쿠키가 만료되어 제한되었습니다" },
		"213": { message: "쿠키에 사용자가 없어 제한되었습니다" },
	},

	A4: {
		"000": { message: "찾을 수 없습니다" },
	},

	A2: {
		"000": { message: "처리할 수 없습니다" },

		"100": { message: "유효하지 않은 Pydantic 모델입니다" },

		"200": { message: "유효하지 않은 사용자 정의 형식입니다" },
		"210": { message: "유효하지 않은 UUID 형식입니다" },
		"220": { message: "유효하지 않은 이메일 형식입니다" },
		"230": { message: "유효하지 않은 날짜 형식입니다" },
		"231": { message: "시작 날짜가 종료 날짜보다 늦습니다" },
		"240": { message: "유효하지 않은 파일 확장자입니다" },
	},

	B0: {
		"000": { message: "내부 서버 오류입니다" },

		"100": { message: "Python 파일 시스템 오류입니다" },
		"110": { message: "Python 파일 쓰기 오류입니다" },
		"120": { message: "Python 파일 읽기 오류입니다" },
		"130": { message: "Python 파일 삭제 오류입니다" },

		"200": { message: "Supabase 오류입니다" },
		"210": { message: "Supabase 삽입 오류입니다" },
		"220": { message: "Supabase 업데이트 오류입니다" },
		"230": { message: "Supabase 선택 오류입니다" },
		"231": { message: "Supabase 단일 선택 오류입니다" },
		"232": { message: "Supabase 다중 선택 오류입니다" },
		"240": { message: "Supabase 삭제 오류입니다" },
		"241": { message: "Supabase 하드 삭제 오류입니다" },
		"242": { message: "Supabase 소프트 삭제 오류입니다" },
		"250": { message: "Supabase RPC 오류입니다" },

		"300": { message: "Azure Blob 오류입니다" },
		"310": { message: "Azure Blob Storage 연결 오류입니다" },
		"311": { message: "Azure Blob Storage 업로드 오류입니다" },
		"312": { message: "Azure Blob Storage 다운로드 오류입니다" },
		"313": { message: "Azure Blob Storage 삭제 오류입니다" },
		"320": { message: "Azure Confidential Ledger 연결 오류입니다" },
		"321": { message: "Azure Confidential Ledger 쓰기 오류입니다" },
		"322": { message: "Azure Confidential Ledger 읽기 오류입니다" },
		"323": { message: "Azure Confidential Ledger 상태 오류입니다" },

		"400": { message: "PDF 생성 오류입니다" },
		"410": { message: "FPDF2를 사용한 소개 PDF 생성 오류입니다" },
		"420": { message: "Libreoffice를 사용한 문서 PDF 생성 오류입니다" },
		"430": { message: "Pillow를 사용한 이미지 PDF 생성 오류입니다" },
		"440": { message: "pdfmerge를 사용한 PDF 병합 오류입니다" },
		"450": { message: "pyHanko를 사용한 PDF 서명 오류입니다" },

		"500": { message: "결제 오류입니다" },
		"510": { message: "Tosspayments API 오류입니다" },
		"511": { message: "Tosspayments 확인 API 오류입니다" },
		"512": { message: "Tosspayments 웹훅 API 오류입니다" },

		"600": { message: "Github API 오류입니다" },
	},

	C0: {
		"000": { message: "알 수 없는 오류입니다" },
	},
};
function getErrorMessageToast(errorObject: any): string | JSX.Element {
	const code = errorObject.response.data.detail.slice(0, 5);

	if (code.length !== 5) {
		return "Invalid code length";
	}

	const category = code.slice(0, 2);
	const errorCode = code.slice(2);

	const categoryErrors = ERROR_CODE[category as keyof typeof ERROR_CODE];
	if (categoryErrors) {
		const errorMessage = categoryErrors[errorCode as keyof typeof categoryErrors];
		if ("toast" in errorMessage) {
			return errorMessage.toast;
		} else {
			return errorMessage.message;
		}
	}
	return "Unknown error code";
}

function getErrorMessageJSX(errorObject: any): string | JSX.Element {
	const code = errorObject.response.data.detail.slice(0, 5);

	if (code.length !== 5) {
		return "Invalid code length";
	}

	const category = code.slice(0, 2);
	const errorCode = code.slice(2);

	const categoryErrors = ERROR_CODE[category as keyof typeof ERROR_CODE];
	if (categoryErrors) {
		const errorMessage = categoryErrors[errorCode as keyof typeof categoryErrors];
		if ("screen" in errorMessage) {
			return errorMessage.screen;
		} else {
			return errorMessage.message;
		}
	}
	return "Unknown error code";
}

export { ERROR_CODE };
export { getErrorMessageToast, getErrorMessageJSX };
