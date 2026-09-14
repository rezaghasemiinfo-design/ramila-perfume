"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole, Smartphone, UserRound } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
const [mode, setMode] = useState<"login" | "register">("login");

return ( <main className="min-h-screen bg-[#F8F6F1] flex items-center justify-center px-4 py-10">

  <div className="w-full max-w-md">

    {/* Back */}

    <Link
      href="/"
      className="inline-flex items-center gap-2 text-[#173F2E] font-semibold text-sm mb-6 hover:text-[#9A8456] transition"
    >
      <ArrowRight size={18} />
      بازگشت به سایت
    </Link>

    {/* Card */}

    <div className="bg-white rounded-3xl shadow-lg border border-[#ECE6DA] p-6 sm:p-8">

      {/* Logo */}

      <div className="flex justify-center mb-5">

        <img
          src="/logo.png"
          alt="Ramila Perfume"
          className="w-24 h-24 object-contain"
        />

      </div>

      <div className="text-center mb-7">

        <h1 className="text-2xl font-bold text-[#173F2E]">
          {mode === "login" ? "ورود به حساب کاربری" : "ساخت حساب کاربری"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {mode === "login"
            ? "برای ادامه وارد حساب رامیلا شوید"
            : "حساب خود را در رامیلا ایجاد کنید"}
        </p>

      </div>

      {/* Mode Buttons */}

      <div className="flex bg-[#F8F6F1] rounded-full p-1 mb-6">

        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${
            mode === "login"
              ? "bg-[#173F2E] text-white shadow"
              : "text-[#173F2E]"
          }`}
        >
          ورود
        </button>

        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${
            mode === "register"
              ? "bg-[#173F2E] text-white shadow"
              : "text-[#173F2E]"
          }`}
        >
          ثبت‌نام
        </button>

      </div>

      {/* Phone */}

      <div className="mb-4">

        <label className="block text-sm font-semibold text-[#173F2E] mb-2">
          شماره موبایل
        </label>

        <div className="relative">

          <Smartphone
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8456]"
          />

          <input
            type="tel"
            inputMode="tel"
            dir="ltr"
            placeholder="09123456789"
            className="w-full h-12 rounded-2xl border border-[#D8D0C2] bg-white pr-12 pl-4 text-sm text-[#173F2E] outline-none focus:border-[#173F2E] transition"
          />

        </div>

      </div>

      {/* Register Fields */}

      {mode === "register" && (
        <>
          <div className="mb-4">

            <label className="block text-sm font-semibold text-[#173F2E] mb-2">
              نام کاربری
            </label>

            <div className="relative">

              <UserRound
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8456]"
              />

              <input
                type="text"
                dir="ltr"
                placeholder="username"
                className="w-full h-12 rounded-2xl border border-[#D8D0C2] bg-white pr-12 pl-4 text-sm text-[#173F2E] outline-none focus:border-[#173F2E] transition"
              />

            </div>

          </div>

          <div className="mb-4">

            <label className="block text-sm font-semibold text-[#173F2E] mb-2">
              رمز عبور
            </label>

            <div className="relative">

              <LockKeyhole
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8456]"
              />

              <input
                type="password"
                dir="ltr"
                placeholder="••••••••"
                className="w-full h-12 rounded-2xl border border-[#D8D0C2] bg-white pr-12 pl-4 text-sm text-[#173F2E] outline-none focus:border-[#173F2E] transition"
              />

            </div>

          </div>

          <div className="mb-5">

            <label className="block text-sm font-semibold text-[#173F2E] mb-2">
              تکرار رمز عبور
            </label>

            <div className="relative">

              <LockKeyhole
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8456]"
              />

              <input
                type="password"
                dir="ltr"
                placeholder="••••••••"
                className="w-full h-12 rounded-2xl border border-[#D8D0C2] bg-white pr-12 pl-4 text-sm text-[#173F2E] outline-none focus:border-[#173F2E] transition"
              />

            </div>

          </div>
        </>
      )}

      {/* OTP Placeholder */}

      <div className="hidden">

        <label className="block text-sm font-semibold text-[#173F2E] mb-2">
          کد تأیید پیامکی
        </label>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          dir="ltr"
          placeholder="123456"
          className="w-full h-12 rounded-2xl border border-[#D8D0C2] bg-white px-4 text-center tracking-[8px] text-[#173F2E] outline-none"
        />

      </div>

      {/* Main Button */}

      <button
        type="button"
        className="w-full h-12 rounded-full bg-[#173F2E] hover:bg-[#0F2D21] text-white font-semibold transition shadow-md"
      >
        {mode === "login" ? "ورود به حساب" : "ثبت‌نام"}
      </button>

      {/* SMS Notice */}

      {mode === "register" && (
        <p className="text-center text-xs leading-6 text-gray-500 mt-4">
          پس از اتصال سرویس پیامکی، برای تأیید شماره موبایل یک کد برای شما ارسال خواهد شد.
        </p>
      )}

    </div>

  </div>

</main>

);
}
