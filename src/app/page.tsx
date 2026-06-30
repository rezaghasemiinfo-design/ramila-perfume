import Image from "next/image";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import perfumes from "./data/perfumes";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8F6F1]">

        {/* Hero */}

        <section className="bg-[#F8F6F1] border-b border-[#E6E1D7]">

          <div className="max-w-7xl mx-auto px-6 py-24">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Text */}

              <div className="text-center lg:text-right">

                <Image
                  src="/logo.png"
                  alt="Ramila Perfume"
                  width={170}
                  height={170}
                  priority
                  className="mx-auto lg:mx-0 mb-8"
                />

                <p className="uppercase tracking-[6px] text-[#7A8F66] font-semibold">
                  Luxury Fragrance Collection
                </p>

                <h1 className="mt-6 text-5xl lg:text-6xl font-bold text-[#173F2E] leading-tight">
                  رایحه‌ای ماندگار
                  <br />
                  برای خاص‌ترین سلیقه‌ها
                </h1>

                <p className="mt-8 text-lg text-gray-700 leading-9 max-w-xl mx-auto lg:mx-0">
                  مجموعه‌ای از محبوب‌ترین عطرهای جهان با اسانس‌های باکیفیت
                  از شرکت‌های معتبر Luzi و Givaudan، مناسب برای استفاده روزانه
                  و هدیه‌ای ماندگار.
                </p>

                <p className="mt-5 text-[#7A8F66] font-semibold">
                  Luzi • Givaudan
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">

                  <a
                    href="#products"
                    className="bg-[#173F2E] hover:bg-[#0F2D21] text-white px-8 py-3 rounded-full transition"
                  >
                    مشاهده محصولات
                  </a>

                  <a
                    href="https://wa.me/989228595633"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-3 rounded-full transition"
                  >
                    سفارش در واتساپ
                  </a>

                  <a
                    href="https://ble.ir/ramillabeautty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#173F2E] hover:bg-[#0F2D21] text-white px-8 py-3 rounded-full transition"
                  >
                    سفارش در بله
                  </a>

                </div>

              </div>

              {/* Hero Image */}

              <div className="flex justify-center">

                <Image
                  src="/hero-perfume.png"
                  alt="Ramila Perfume"
                  width={520}
                  height={650}
                  priority
                />

              </div>

            </div>

          </div>

        </section>

        {/* Products */}

        <section
          id="products"
          className="py-24"
        >

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-5xl font-bold text-center text-[#173F2E]">
              محصولات منتخب
            </h2>

            <p className="text-center text-gray-600 mt-5 mb-16 text-lg">
              منتخب محبوب‌ترین رایحه‌های دنیا
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

              {perfumes.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                />
              ))}

            </div>

          </div>

        </section>

      </main>
    </>
  );
}