"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import perfumes from "../data/perfumes";

export default function Header() {
const [searchOpen, setSearchOpen] = useState(false);
const [searchText, setSearchText] = useState("");

const normalizedSearch = searchText.trim().toLowerCase();

const searchResults =
normalizedSearch.length > 0
? perfumes.filter((perfume) => {
const searchableText = [
perfume.name,
perfume.brand,
perfume.gender,
perfume.season,
perfume.top,
perfume.middle,
perfume.base,
perfume.description,
]
.join(" ")
.toLowerCase();


      return searchableText.includes(normalizedSearch);
    })
  : [];


return ( <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#ECE6DA] shadow-sm">

  <div className="max-w-7xl mx-auto h-20 px-4 md:px-8 flex items-center justify-between">

    {/* Logo */}

    <Link href="/" className="flex items-center gap-2 shrink-0">

      <Image
        src="/logo.png"
        alt="Ramila Perfume"
        width={140}
        height={140}
        priority
      />

      <div className="hidden sm:block">

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

      <Link
        href="/"
        className="font-semibold text-[#173F2E] hover:text-[#9A8456] transition"
      >
        خانه
      </Link>

      <Link
        href="/#products"
        className="font-semibold text-[#173F2E] hover:text-[#9A8456] transition"
      >
        محصولات
      </Link>

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

    <div className="flex items-center gap-4 md:gap-6">

      {/* Search */}

      <button
        type="button"
        onClick={() => {
          setSearchOpen((prev) => !prev);
          setSearchText("");
        }}
        aria-label="جستجوی عطر"
        className="text-[#173F2E] hover:text-[#9A8456] transition"
      >
        {searchOpen ? (
          <X size={26} strokeWidth={1.8} />
        ) : (
          <Search size={26} strokeWidth={1.8} />
        )}
      </button>

      {/* WhatsApp */}

      <a
        href="https://wa.me/989228595633"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="سفارش در واتساپ"
        className="w-10 h-10 rounded-full bg-[#173F2E] hover:bg-[#25D366] text-white flex items-center justify-center transition"
      >
        <MessageCircle size={22} />
      </a>

    </div>

  </div>

  {/* Search Box */}

  {searchOpen && (
    <div className="absolute top-20 left-0 right-0 bg-white border-b border-[#ECE6DA] shadow-lg">

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-5">

        <div className="relative">

          <Search
            size={21}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#173F2E]"
          />

          <input
            type="text"
            autoFocus
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="جستجوی عطر یا برند..."
            dir="auto"
            className="w-full h-12 rounded-full border border-[#D8D0C2] bg-[#F8F6F1] pr-12 pl-5 text-sm text-[#173F2E] outline-none focus:border-[#173F2E] transition"
          />

        </div>

        {/* Results */}

        {normalizedSearch.length > 0 && (
          <div className="mt-3 max-h-80 overflow-y-auto rounded-2xl border border-[#ECE6DA] bg-white">

            {searchResults.length > 0 ? (
              searchResults.map((perfume) => (

                <Link
                  key={perfume.id}
                  href={`/product/${perfume.id}`}
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchText("");
                  }}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-[#F8F6F1] transition border-b last:border-b-0 border-[#F0ECE5]"
                >

                  <div className="relative w-14 h-14 shrink-0">

                    <Image
                      src={perfume.image}
                      alt={perfume.name}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="font-semibold text-[#173F2E] truncate">
                      {perfume.name}
                    </p>

                    <p className="text-sm text-[#9A8456] mt-1 truncate">
                      {perfume.brand}
                    </p>

                  </div>

                </Link>

              ))
            ) : (

              <div className="px-5 py-6 text-center text-gray-500 text-sm">
                عطری با این مشخصات پیدا نشد.
              </div>

            )}

          </div>
        )}

      </div>

    </div>
  )}

</header>

);
}
