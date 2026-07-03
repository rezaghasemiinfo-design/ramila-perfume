import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#173F2E] text-white mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}

          <div>

            <Image
              src="/logo.png"
              alt="Ramila Perfume"
              width={90}
              height={90}
            />

            <h3 className="text-2xl font-bold mt-4">
              RAMILA
            </h3>

            <p className="text-[#D8E2D1] mt-4 leading-8">
              ارائه رایحه‌های خاص از محبوب‌ترین برندهای جهان با اسانس‌های
              باکیفیت Luzi و Givaudan.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h4 className="text-xl font-semibold mb-5">
              دسترسی سریع
            </h4>

            <ul className="space-y-3 text-[#D8E2D1]">

              <li>
                <a href="/">خانه</a>
              </li>

              <li>
                <a href="#products">محصولات</a>
              </li>

              <li>
                <a href="#about">درباره ما</a>
              </li>

              <li>
                <a href="#contact">تماس با ما</a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h4 className="text-xl font-semibold mb-5">
              ارتباط با ما
            </h4>

            <div className="space-y-4">

              <a
                href="https://wa.me/989228595633"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#25D366] text-center py-3 rounded-full hover:opacity-90 transition"
              >
                سفارش در واتساپ
              </a>

              <a
                href="https://ble.ir/ramillabeautty"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#0A7CFF] text-center py-3 rounded-full hover:opacity-90 transition"
              >
                سفارش در بله
              </a>

              <p className="text-[#D8E2D1] pt-2">
                📞 09228595633
              </p>

            </div>

          </div>

        </div>

        <div className="border-t border-[#315744] mt-14 pt-8 text-center text-[#D8E2D1] text-sm">

          © 2025 Ramila Perfume — تمامی حقوق محفوظ است.

        </div>

      </div>
    </footer>
  );
}