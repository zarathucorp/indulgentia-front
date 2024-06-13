import { Button } from "@/components/ui/button";
import Link from "next/link";
const ERROR_CODE = {
	A1: {
		// "000":{message:"Unauthorized"},
		"000": {
			message: "Unauthorized",
			toast: <>dummy</>,
			screen: <></>,
		},

		"100": { message: "Unauthorized user access to User Database" },
		"110": { message: "Access to auth.users denied" },
		"120": { message: "Access to public.user_setting denied" },
		// "121":{message:"User name is not found"},
		"121": {
			message: "User name is not found",
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

		"200": { message: "Unauthorized user access to Project" },
		"210": { message: "User is not in this project" },
		"220": { message: "User is not this project leader" },

		"300": { message: "Unauthorized user access to Bucket" },
		"310": { message: "User is not in this bucket" },
		"320": { message: "User is not this bucket owner" },

		"400": { message: "Unauthorized user access to Note" },
		"410": { message: "User is not in this note" },
		"420": { message: "User is not this note owner" },

		"500": { message: "Unauthorized user access to Team" },
		"510": { message: "User is not in this team" },
		"520": { message: "User is not this team leader" },
		"530": { message: "User is already in team" },
		"540": {
			message: "User is not in any team",
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
		"550": { message: "Members still exist in this team" },

		"600": { message: "Unauthorized user access to Team Invite" },
		"610": { message: "User already accepted this team invite" },
		"620": { message: "User already rejected this team invite" },
		"630": { message: "Team invite request still exists" },
	},
	A3: {
		"000": { message: "Forbidden" },

		"100": { message: "Forbidden due to abnormal access" },
		"110": { message: "Forbidden due to too many requests" },
		"111": { message: "Forbidden due to too many requests from the same IP" },
		"112": { message: "Forbidden due to too many requests from the same user" },

		"120": { message: "Forbidden due to forged request" },
		"121": { message: "Forbidden due to forged request header" },
		"122": { message: "Forbidden due to forged request body" },
		"123": { message: "Forbidden due to forged request method" },
		"124": { message: "Forbidden due to forged cookie" },

		"200": { message: "Forbidden user access" },
		"210": { message: "Forbidden due to cookie" },
		"211": { message: "Forbidden due to cookie not found" },
		"212": { message: "Forbidden due to cookie expired" },
		"213": { message: "Forbidden due to cookie having no user" },
	},

	A4: {
		"000": { message: "Not Found" },
	},

	A2: {
		"000": { message: "Unprocessable Entity" },

		"100": { message: "Invalid Pydantic model" },

		"200": { message: "Invalid custom format" },
		"210": { message: "Invalid UUID format" },
		"220": { message: "Invalid email format" },
		"230": { message: "Invalid date format" },
		"231": { message: "Start date is later than end date" },
		"240": { message: "Invalid file extension" },
	},

	B0: {
		"000": { message: "Internal Server Error" },

		"100": { message: "Python file system error" },
		"110": { message: "Python file write error" },
		"120": { message: "Python file read error" },
		"130": { message: "Python file delete error" },

		"200": { message: "Supabase error" },
		"210": { message: "Supabase insert error" },
		"220": { message: "Supabase update error" },
		"230": { message: "Supabase select error" },
		"231": { message: "Supabase single select error" },
		"232": { message: "Supabase multiple select error" },
		"240": { message: "Supabase delete error" },
		"241": { message: "Supabase hard delete error" },
		"242": { message: "Supabase soft delete error" },
		"250": { message: "Supabase RPC error" },

		"300": { message: "Azure Blob error" },
		"310": { message: "Azure Blob Storage connection error" },
		"311": { message: "Azure Blob Storage upload error" },
		"312": { message: "Azure Blob Storage download error" },
		"313": { message: "Azure Blob Storage delete error" },
		"320": { message: "Azure Confidential Ledger connection error" },
		"321": { message: "Azure Confidential Ledger write error" },
		"322": { message: "Azure Confidential Ledger read error" },
		"323": { message: "Azure Confidential Ledger status error" },

		"400": { message: "PDF generation error" },
		"410": { message: "Introduction PDF Generation error using FPDF2" },
		"420": { message: "Document PDF Generation error using Libreoffice" },
		"430": { message: "Image PDF Generation error using Pillow" },
		"440": { message: "PDF merge error using pdfmerge" },
		"450": { message: "PDF sign error using pyHanko" },

		"500": { message: "Payment error" },
		"510": { message: "Tosspayments API error" },
		"511": { message: "Tosspayments confirm API error" },
		"512": { message: "Tosspayments webhook API error" },

		"600": { message: "Github API error" },
	},

	C0: {
		"000": { message: "Unknown Error" },
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
