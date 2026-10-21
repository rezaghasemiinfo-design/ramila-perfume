import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.BALE_BOT_TOKEN;

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "BALE_BOT_TOKEN is not configured" },
      { status: 500 }
    );
  }

  const webhookUrl = "https://www.ramilaperfume.ir/api/bale-webhook";

  try {
    const response = await fetch(
      `https://tapi.bale.ai/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`,
      { method: "GET", cache: "no-store" }
    );
    const result = await response.json();

    if (!response.ok || result.ok === false) {
      console.error("Bale setWebhook failed:", result);
      return NextResponse.json(
        { ok: false, error: "Bale rejected webhook setup" },
        { status: 502 }
      );
    }

    const infoResponse = await fetch(
      `https://tapi.bale.ai/bot${token}/getWebhookInfo`,
      { method: "GET", cache: "no-store" }
    );
    const info = await infoResponse.json();

    return NextResponse.json({
      ok: true,
      setup: result,
      webhook: info?.result
        ? {
            url: info.result.url,
            pending_update_count: info.result.pending_update_count,
            last_error_date: info.result.last_error_date,
            last_error_message: info.result.last_error_message,
          }
        : info,
    });
  } catch (error) {
    console.error("Bale webhook setup failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not contact Bale API" },
      { status: 502 }
    );
  }
}
