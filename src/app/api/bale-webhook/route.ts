
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Ramila Bale bot webhook is ready",
  });
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.BALE_BOT_TOKEN;

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Bot token is not configured" },
        { status: 500 }
      );
    }

    const update = await request.json();
    const message = update.message;

    if (!message?.chat?.id || typeof message.text !== "string") {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const incoming = message.text.trim();
    const normalized = incoming.toLowerCase();

    let reply: string;

    if (
      normalized === "/start" ||
      normalized === "/start@ramilaperfumebot" ||
      incoming === "شروع مجدد" ||
      incoming === "سلام" ||
      incoming === "سلام!"
    ) {
      reply =
        "سلام، به رامیلـا پرفیوم خوش آمدید 🌿\n\n" +
        "اینجا کمک می‌کنم رایحه مناسب سلیقه‌تان را پیدا کنید.\n\n" +
        "برای شروع، روی «🔎 عطر‌یاب» بزنید.";
    } else if (
      incoming === "🔎 عطر‌یاب" ||
      incoming === "عطریاب"
    ) {
      reply =
        "🔎 عطر‌یاب رامیلـا\n\n" +
        "دوست دارید چه نوع رایحه‌ای داشته باشید؟\n\n" +
        "فعلاً این بخش در حال آماده‌سازی است؛ به‌زودی می‌توانید رایحه دلخواهتان را همین‌جا انتخاب کنید.";
    } else if (incoming === "🛍 سفارش عطر") {
      reply =
        "🛍 برای سفارش عطر از طریق بله، لطفاً رایحه موردنظرتان را بنویسید.\n\n" +
        "به‌زودی امکان انتخاب عطر و حجم در همین ربات اضافه می‌شود.";
    } else if (
      incoming === "پشتیبانی" ||
      incoming === "☎️ پشتیبانی"
    ) {
      reply =
        "برای پشتیبانی رامیلـا می‌توانید به این نشانی پیام دهید:\n" +
        "https://ble.ir/ramillabeauty";
    } else {
      reply =
        "پیامتان دریافت شد 🌿\n\n" +
        "برای شروع از گزینه «🔎 عطر‌یاب» استفاده کنید یا /start را بفرستید.";
    }

    const response = await fetch(
      `https://tapi.bale.ai/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply,
          reply_markup: {
            keyboard: [
              [{ text: "🔎 عطر‌یاب" }],
              [{ text: "🛍 سفارش عطر" }, { text: "☎️ پشتیبانی" }],
              [{ text: "شروع مجدد" }],
            ],
            resize_keyboard: true,
          },
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || result.ok === false) {
      console.error("Bale sendMessage failed:", result);
      return NextResponse.json(
        { ok: false, error: "Bale message delivery failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Bale webhook error:", error);
    return NextResponse.json(
      { ok: false, error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
