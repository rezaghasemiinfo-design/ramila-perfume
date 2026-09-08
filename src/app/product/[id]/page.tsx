import perfumes from "../../data/perfumes";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const perfume = perfumes.find((item) => item.id === id);

  if (!perfume) {
    return (
      <main className="min-h-screen bg-[#F8F6F1] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#173F2E]">
            عطر پیدا نشد
          </h1>

          <Link
            href="/"
            className="inline-block mt-6 bg-[#173F2E] text-white px-6 py-3 rounded-full"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F1] py-20 px-6">

      <div className="max-w-6xl mx-auto">

        <Link
          href="/"
          className="inline-block mb-10 text-[#173F2E] font-semibold hover:text-[#9A8456] transition"
        >
          ← بازگشت به محصولات
        </Link>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-[#ECE6DA]">

          <div className="grid lg:grid-cols-2 gap-10 p-8 lg:p-12">

            {/* Product Image */}

            <div className="flex items-center justify-center bg-gradient-to-b from-green-50 to-white rounded-3xl min-h-[450px]">

              <Image
                src={perfume.image}
                alt={perfume.name}
                width={450}
                height={450}
                className="object-contain"
              />

            </div>

            {/* Product Information */}

            <div className="flex flex-col justify-center text-right">

              <p className="text-[#9A8456] font-semibold tracking-wider">
                {perfume.brand}
              </p>

              <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-[#173F2E]">
                {perfume.name}
              </h1>

              <div className="mt-6 space-y-3 text-gray-800">

                <p>
                  <span className="font-bold">مناسب برای:</span>{" "}
                  {perfume.gender}
                </p>

                <p>
                  <span className="font-bold">فصل:</span>{" "}
                  {perfume.season}
                </p>

                <p>
                  <span className="font-bold">ماندگاری:</span>{" "}
                  {perfume.longevity}
                </p>

                <p>
                  <span className="font-bold">پخش بو:</span>{" "}
                  {perfume.sillage}
                </p>

              </div>

              <div className="mt-8">

                <p className="text-lg leading-9 text-gray-700">
                  {perfume.description}
                </p>

              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-[#F8F6F1] rounded-2xl p-4">
                  <p className="font-bold text-[#173F2E]">نت‌های ابتدایی</p>
                  <p className="mt-2 text-gray-700">
                    {perfume.top}
                  </p>
                </div>

                <div className="bg-[#F8F6F1] rounded-2xl p-4">
                  <p className="font-bold text-[#173F2E]">نت‌های میانی</p>
                  <p className="mt-2 text-gray-700">
                    {perfume.middle}
                  </p>
                </div>

                <div className="bg-[#F8F6F1] rounded-2xl p-4">
                  <p className="font-bold text-[#173F2E]">نت‌های پایه</p>
                  <p className="mt-2 text-gray-700">
                    {perfume.base}
                  </p>
                </div>

              </div>

              <a
                href="https://wa.me/989228595633"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 text-center bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 rounded-full font-semibold transition"
              >
                سفارش این عطر در واتساپ
              </a>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}