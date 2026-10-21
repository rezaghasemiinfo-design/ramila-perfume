import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: unknown };
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text || text.length > 4000) {
      return NextResponse.json(
        { error: "متن سفارش نامعتبر است." },
        { status: 400 }
      );
    }

    const token = process.env.BALE_BOT_TOKEN;
    const chatId = process.env.BALE_CHAT_ID;

    if (!token || !chatId) {
      console.error("Bale order bot environment variables are missing.");
      return NextResponse.json(
        { error: "اتصال ربات بله هنوز تنظیم نشده است." },
        { status: 503 }
      );
    }

    const response = await fetch(
      `https://tapi.bale.ai/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
        cache: "no-store",
      }
    );

    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; description?: string }
      | null;

    if (!response.ok || result?.ok === false) {
      console.error("Bale API rejected an order message:", result?.description);
      return NextResponse.json(
        { error: "ارسال سفارش به بله ناموفق بود. کمی بعد دوباره تلاش کنید." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "در ارسال سفارش مشکلی پیش آمد. دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}
