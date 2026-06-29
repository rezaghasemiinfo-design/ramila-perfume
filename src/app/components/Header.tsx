import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-green-100 shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="Ramila Perfume"
            width={100}
            height={100}
            priority
          />

          <div>
            <h2 className="text-2xl font-bold text-green-900">
              Ramila Perfume
            </h2>

            <p className="text-xs text-gray-500">
              Luxury Fragrance Collection
            </p>
          </div>

        </div>

        {/* Menu */}

        <nav className="hidden md:flex items-center gap-8">

          <a href="#" className="font-semibold text-gray-900 hover:text-green-700 transition">
            خانه
          </a>

          <a href="#products" className="font-semibold text-gray-900 hover:text-green-700 transition">
            محصولات
          </a>

          <a href="#" className="font-semibold text-gray-900 hover:text-green-700 transition">
            درباره ما
          </a>

          <a href="#" className="font-semibold text-gray-900 hover:text-green-700 transition">
            تماس با ما
          </a>

        </nav>

      </div>

    </header>
  );
}