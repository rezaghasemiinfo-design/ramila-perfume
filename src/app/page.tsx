import Image from "next/image";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import perfumes from "./data/perfumes";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">

        {/* Hero */}

        <section className="flex flex-col items-center justify-center text-center px-6 py-20">

          <Image
            src="/logo.png"
            alt="Ramila Perfume"
            width={400}
            height={400}
            priority
            className="mb-8"
          />

          <p className="max-w-2xl text-xl text-gray-800 leading-9">
            رایحه‌هایی ماندگار از برترین شرکت های عطرسازی جهان
          </p>

          <p className="text-green-700 mt-3 font-semibold">
           Luzi • Givaudan
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">

  <button className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full transition">
    مشاهده محصولات
  </button>

  <a
    href="https://wa.me/989228595633"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition"
  >
    📱 سفارش در واتساپ
  </a>

  <a
    href="https://ble.ir/ramillabeautty"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition"
  >
    💬 سفارش در بله
  </a>

</div>

        </section>

        {/* Products */}

        <section
  id="products"
  className="max-w-7xl mx-auto px-6 py-20"
>

          <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
            محصولات منتخب
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {perfumes.map((perfume) => (
              <ProductCard
                key={perfume.id}
                perfume={perfume}
              />
            ))}

          </div>

        </section>

      </main>
    </>
  );
}