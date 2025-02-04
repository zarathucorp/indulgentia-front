import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const enablePayment = process.env.ENABLE_PAYMENT === "true";
  console.log("GET /next-api/site-config", { enablePayment });
  return NextResponse.json({ enablePayment });
}
