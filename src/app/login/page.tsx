"use client";

import Link from "next/link";
import {
  ArrowRight,
  LockKeyhole,
  Smartphone,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  function normalizePhone(value: string) {
    return value
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
      .replace(/\s/g, "")
      .trim();
  }

  function changeMode(newMode: "login" | "register") {
    setMode(newMode);
    setError("");
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    const normalizedPhone = normalizePhone(phone);

    if (!normalizedPhone) {
      setError("لطفاً شماره موبایل خود را وارد کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setError("شماره موبایل وارد شده صحیح نیست.");
      return;
    }

    if (!password) {
      setError("لطفاً رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "register") {
        if (!username.trim()) {
          setError("لطفاً نام کاربری را وارد کنید.");
          setLoading(false);
          return;
        }

        if (username.trim().length < 3) {
          setError("نام کاربری باید حداقل ۳ کاراکتر باشد.");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError("رمز عبور و تکرار آن یکسان نیستند.");
          setLoading(false);
          return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          phone: normalizedPhone,
          password,
          options: {
            data: {
              username: username.trim(),
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        if (data.user) {
          if (data.session) {
            const { error: profileError } = await supabase
              .from("profiles")
              .upsert({
                id: data.user.id,
                username: username.trim(),
                phone: normalizedPhone,
              });

            if (profileError) {
              setError(
                "حساب ساخته شد اما ذخیره اطلاعات پروفایل با مشکل مواجه شد."
              );
              setLoading(false);
              return;
            }

            setMessage("حساب کاربری شما با موفقیت ساخته شد.");
          } else {
            setMessage(
              "حساب شما ایجاد شد. تأیید شماره موبایل در مرحله اتصال سرویس پیامکی انجام خواهد شد."
            );
          }
        }
      } else {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            phone: normalizedPhone,
            password,
          });

        if (signInError) {
          setError("شماره موبایل یا رمز عبور صحیح نیست.");
          setLoading(false);
          return;
        }

        if (data.user) {
          setMessage("با موفقیت وارد حساب کاربری شدید.");

          setTimeout(() => {
            window.location.href = "/";
          }, 800);
        }
      }
    } catch {
      setError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F8F6F1] flex items-center justify-center px-4 py-10">
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
              {mode === "login"
                ? "ورود به حساب کاربری"
                : "ساخت حساب کاربری"}
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
              onClick={() => changeMode("login")}
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
              onClick={() => changeMode("register")}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-[#173F2E] text-white shadow"
                  : "text-[#173F2E]"
              }`}
            >
              ثبت‌نام
            </button>

          </div>

          <form onSubmit={handleSubmit}>

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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  autoComplete="tel"
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      autoComplete="username"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full h-12 rounded-2xl border border-[#D8D0C2] bg-white pr-12 pl-4 text-sm text-[#173F2E] outline-none focus:border-[#173F2E] transition"
                    />

                  </div>

                </div>
              </>
            )}

            {/* Login Password */}

            {mode === "login" && (
              <div className="mb-5">

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full h-12 rounded-2xl border border-[#D8D0C2] bg-white pr-12 pl-4 text-sm text-[#173F2E] outline-none focus:border-[#173F2E] transition"
                  />

                </div>

              </div>
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

            {/* Messages */}

            {error && (
              <div className="mb-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 text-center leading-6">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 rounded-2xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-[#173F2E] text-center leading-6">
                {message}
              </div>
            )}

            {/* Main Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-[#173F2E] hover:bg-[#0F2D21] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition shadow-md"
            >
              {loading
                ? "لطفاً صبر کنید..."
                : mode === "login"
                  ? "ورود به حساب"
                  : "ثبت‌نام"}
            </button>

          </form>

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