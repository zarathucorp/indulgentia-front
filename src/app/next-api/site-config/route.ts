export async function GET() {
  const enablePayment = process.env.ENABLE_PAYMENT === "true";

  console.log("GET /next-api/site-config", { enablePayment });
  return new Response(
    JSON.stringify({
      status: "succeed",
      enablePayment,
    }),
  );
}
