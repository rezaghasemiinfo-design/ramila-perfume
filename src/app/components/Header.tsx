import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ramila Perfume"
            width={50}
            height={50}
          />

          <div>
            <h1 className="text-xl font-bold text-green-900">
              Ramila Perfume
            </h1>

            <p className="text-xs text-gray-500">
              Luxury Fragrance
            </p>
          </div>
        </div>

        <nav className="hidden md:flex gap-8">
          <a href="#" className="hover:text-green-700">خانه</a>
          <a href="#" className="hover:text-green-700">محصولات</a>
          <a href="#" className="hover:text-green-700">درباره ما</a>
          <a href="#" className="hover:text-green-700">تماس با ما</a>
        </nav>

      </div>
    </header>
  );
}