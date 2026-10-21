import { NextRequest, NextResponse } from "next/server";

const CHANNEL_URL = "https://ble.ir/ramillabeauty";
const SUPPORT_URL = "https://ble.ir/RAMILLAbeautty";
const WEBSITE_URL = "https://www.ramilaperfume.ir";

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
      incoming === "🔄 شروع مجدد" ||
      incoming === "سلام" ||
      incoming === "سلام!"
    ) {
      reply =
        "سلام، به رامیلـا پرفیوم خوش آمدید 🌿\n\n" +
        "اینجا کمک می‌کنم رایحه دلخواهت رو پیدا کنی یا عطر خاص خودتو به نام خودت بسازی ✨\n\n" +
        "برای شروع روی «🔎 عطریاب» یا «🧪 عطرساز» بزن.";
    } else if (
      incoming === "🔎 عطریاب" ||
      incoming === "عطریاب" ||
      incoming === "🔎 عطر‌یاب"
    ) {
      reply =
        "🔎 عطریاب رامیلـا 🌿\n\n" +
        "دوست داری چه رایحه‌ای پیدا کنی؟\n\n" +
        "بخش عطریاب در حال آماده‌سازی است و به‌زودی می‌توانی همین‌جا عطر مناسب سلیقه‌ات را پیدا کنی.";
    } else if (incoming === "🧪 عطرساز" || incoming === "عطرساز") {
      reply =
        "🧪 عطرساز رامیلـا ✨\n\n" +
        "به‌زودی می‌توانی رایحه اختصاصی خودت را انتخاب کنی و عطر خاص خودت را به نام خودت بسازی.\n\n" +
        "این بخش در حال آماده‌سازی است.";
    } else if (
      incoming === "📦 پیگیری سفارش" ||
      incoming === "پیگیری سفارش"
    ) {
      reply =
        "📦 پیگیری سفارش رامیلـا\n\n" +
        "برای پیگیری سفارش، لطفاً از طریق پشتیبانی پیام بده تا راهنمایی‌ات کنیم:\n" +
        SUPPORT_URL;
    } else if (
      incoming === "☎️ پشتیبانی" ||
      incoming === "پشتیبانی"
    ) {
      reply =
        "☎️ پشتیبانی رامیلـا 🌿\n\n" +
        "برای ارتباط با پشتیبانی روی لینک زیر بزن:\n" +
        SUPPORT_URL;
    } else if (
      incoming === "📢 ورود به کانال" ||
      incoming === "ورود به کانال"
    ) {
      reply =
        "📢 برای ورود به کانال بله رامیلـا روی لینک زیر بزن:\n" +
        CHANNEL_URL;
    } else if (
      incoming === "🌐 سایت رامیلا پرفیوم" ||
      incoming === "سایت رامیلا پرفیوم" ||
      incoming === "سایت"
    ) {
      reply =
        "🌐 ورود به سایت رامیلا پرفیوم:\n" +
        WEBSITE_URL;
    } else {
      reply =
        "پیامت دریافت شد 🌿\n\n" +
        "برای شروع از گزینه «🔎 عطریاب» یا «🧪 عطرساز» استفاده کن؛ یا «شروع مجدد» را بزن.";
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
              [{ text: "🔎 عطریاب" }, { text: "🧪 عطرساز" }],
              [{ text: "📦 پیگیری سفارش" }, { text: "☎️ پشتیبانی" }],
              [{ text: "📢 ورود به کانال" }, { text: "🌐 سایت رامیلا پرفیوم" }],
              [{ text: "🔄 شروع مجدد" }],
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
