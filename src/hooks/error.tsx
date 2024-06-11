import Link from "next/link";
const ERROR_CODE = {
	A1: {
		"000": "Unauthorized",

		"100": "Unauthorized user access to User Database",
		"110": "Access to auth.users denied",
		"120": "Access to public.user_setting denied",
		// "121": "User name is not found",
		"121": (
			<>
				유저 이름이 설정되어 있지 않습니다.{" "}
				<Link href="/setting/account" className="text-blue-600">
					설정하기
				</Link>
			</>
		),

		"200": "Unauthorized user access to Project",
		"210": "User is not in this project",
		"220": "User is not this project leader",

		"300": "Unauthorized user access to Bucket",
		"310": "User is not in this bucket",
		"320": "User is not this bucket owner",

		"400": "Unauthorized user access to Note",
		"410": "User is not in this note",
		"420": "User is not this note owner",

		"500": "Unauthorized user access to Team",
		"510": "User is not in this team",
		"520": "User is not this team leader",
		"530": "User is already in team",
		"540": "User is not in any team",
		"550": "Members still exist in this team",

		"600": "Unauthorized user access to Team Invite",
		"610": "User already accepted this team invite",
		"620": "User already rejected this team invite",
		"630": "Team invite request still exists",
	},
	A3: {
		"000": "Forbidden",

		"100": "Forbidden due to abnormal access",
		"110": "Forbidden due to too many requests",
		"111": "Forbidden due to too many requests from the same IP",
		"112": "Forbidden due to too many requests from the same user",

		"120": "Forbidden due to forged request",
		"121": "Forbidden due to forged request header",
		"122": "Forbidden due to forged request body",
		"123": "Forbidden due to forged request method",
		"124": "Forbidden due to forged cookie",

		"200": "Forbidden user access",
		"210": "Forbidden due to cookie",
		"211": "Forbidden due to cookie not found",
		"212": "Forbidden due to cookie expired",
		"213": "Forbidden due to cookie having no user",
	},

	A4: {
		"000": "Not Found",
	},

	A2: {
		"000": "Unprocessable Entity",

		"100": "Invalid Pydantic model",

		"200": "Invalid custom format",
		"210": "Invalid UUID format",
		"220": "Invalid email format",
		"230": "Invalid date format",
		"231": "Start date is later than end date",
		"240": "Invalid file extension",
	},

	B0: {
		"000": "Internal Server Error",

		"100": "Python file system error",
		"110": "Python file write error",
		"120": "Python file read error",
		"130": "Python file delete error",

		"200": "Supabase error",
		"210": "Supabase insert error",
		"220": "Supabase update error",
		"230": "Supabase select error",
		"231": "Supabase single select error",
		"232": "Supabase multiple select error",
		"240": "Supabase delete error",
		"241": "Supabase hard delete error",
		"242": "Supabase soft delete error",
		"250": "Supabase RPC error",

		"300": "Azure Blob error",
		"310": "Azure Blob Storage connection error",
		"311": "Azure Blob Storage upload error",
		"312": "Azure Blob Storage download error",
		"313": "Azure Blob Storage delete error",
		"320": "Azure Confidential Ledger connection error",
		"321": "Azure Confidential Ledger write error",
		"322": "Azure Confidential Ledger read error",
		"323": "Azure Confidential Ledger status error",

		"400": "PDF generation error",
		"410": "Introduction PDF Generation error using FPDF2",
		"420": "Document PDF Generation error using Libreoffice",
		"430": "Image PDF Generation error using Pillow",
		"440": "PDF merge error using pdfmerge",
		"450": "PDF sign error using pyHanko",

		"500": "Payment error",
		"510": "Tosspayments API error",
		"511": "Tosspayments confirm API error",
		"512": "Tosspayments webhook API error",

		"600": "Github API error",
	},

	C0: {
		"000": "Unknown Error",
	},
};

function getErrorMessage(errorObject: any): string {
	const code = errorObject.response.data.detail.slice(0, 5);

	if (code.length !== 5) {
		return "Invalid code length";
	}

	const category = code.slice(0, 2);
	const errorCode = code.slice(2);

	const categoryErrors = ERROR_CODE[category as keyof typeof ERROR_CODE];
	if (categoryErrors) {
		const errorMessage = categoryErrors[errorCode as keyof typeof categoryErrors];
		if (errorMessage) {
			return errorMessage;
		}
	}
	return "Unknown error code";
}

export default getErrorMessage;
