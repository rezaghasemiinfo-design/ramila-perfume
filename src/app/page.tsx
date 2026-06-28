import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import perfumes from "./data/perfumes";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <section className="flex flex-col items-center justify-center text-center px-6 py-24">

          <h1 className="text-6xl font-bold text-green-900 tracking-widest">
            RAMILA
          </h1>

          <h2 className="text-3xl italic text-green-700 mt-2">
            Perfume
          </h2>

          <p className="max-w-xl mt-8 text-gray-600 text-lg">
            رایحه‌ای ماندگار از برترین عطرسازهای جهان
          </p>

          <div className="flex gap-4 mt-10">

            <button className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full transition">
              مشاهده محصولات
            </button>

            <a
              href="https://wa.me/989228595633"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-8 py-3 rounded-full transition"
            >
              سفارش واتساپ
            </a>

          </div>

        </section>
        <section className="max-w-7xl mx-auto px-6 py-20">

  <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
    محصولات منتخب
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

    {perfumes.map((perfume) => (
      <ProductCard
        key={perfume.id}
        name={perfume.name}
        brand={perfume.brand}
      />
    ))}

  </div>

</section>
      </main>
    </>
  );
}