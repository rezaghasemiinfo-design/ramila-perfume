import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#E6E1D7] shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}

        <a href="/" className="flex items-center gap-4">

          <Image
            src="/logo.png"
            alt="Ramila Perfume"
            width={80}
            height={80}
            priority
          />

          <div>

            <h2 className="text-2xl font-bold text-[#173F2E]">
              RAMILA
            </h2>

            <p className="text-xs tracking-[3px] text-[#7A8F66] uppercase">
              Luxury Perfume
            </p>

          </div>

        </a>

        {/* Menu */}

        <nav className="hidden md:flex items-center gap-8">

          <a
            href="/"
            className="font-semibold text-[#173F2E] hover:text-[#7A8F66] transition"
          >
            خانه
          </a>

          <a
            href="#products"
            className="font-semibold text-[#173F2E] hover:text-[#7A8F66] transition"
          >
            محصولات
          </a>

          <a
            href="#about"
            className="font-semibold text-[#173F2E] hover:text-[#7A8F66] transition"
          >
            درباره ما
          </a>

          <a
            href="#contact"
            className="font-semibold text-[#173F2E] hover:text-[#7A8F66] transition"
          >
            تماس با ما
          </a>

        </nav>

        {/* Action Buttons */}

        <div className="hidden lg:flex items-center gap-3">

          <a
            href="https://ble.ir/ramillabeautty"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-[#173F2E] text-white hover:bg-[#0F2D21] transition"
          >
            سفارش در بله
          </a>

          <a
            href="https://wa.me/989228595633"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition"
          >
            واتساپ
          </a>

        </div>

      </div>

    </header>
  );
}