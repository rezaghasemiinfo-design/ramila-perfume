"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#ECE6DA] shadow-sm">

      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-2">

          <Image
            src="/logo.png"
            alt="Ramila Perfume"
            width={140}
            height={140}
            priority
          />

          <div>

            <h2 className="text-xl font-bold tracking-wide text-[#173F2E]">
              Ramila Perfume
            </h2>

            <p className="text-[11px] tracking-[3px] text-[#9A8456] uppercase">
              Luxury Perfume
            </p>

          </div>

        </Link>

        {/* Menu */}

        <nav className="hidden lg:flex items-center gap-8 mr-0">

          <a
            href="#"
            className="font-semibold text-[#173F2E] hover:text-[#9A8456] transition"
          >
            خانه
          </a>

          <a
            href="#products"
            className="font-semibold text-[#173F2E] hover:text-[#9A8456] transition"
          >
            محصولات
          </a>

          <a
            href="#"
            className="font-semibold text-[#173F2E] hover:text-[#9A8456] transition"
          >
            درباره ما
          </a>

          <a
            href="#"
            className="font-semibold text-[#173F2E] hover:text-[#9A8456] transition"
          >
            تماس با ما
          </a>

        </nav>

        {/* Right Icons */}

        <div className="flex items-center gap-6">

          <button className="text-[#173F2E] hover:text-[#9A8456] transition">
            <Search size={26} strokeWidth={1.8} />
          </button>

          <a
            href="https://wa.me/989228595633"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#173F2E] hover:bg-[#25D366] text-white flex items-center justify-center transition"
          >
            <MessageCircle size={22} />
          </a>

        </div>

      </div>

    </header>
  );
}