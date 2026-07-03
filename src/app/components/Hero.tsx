import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">

      {/* Hero Banner */}

      <div className="relative w-full h-[450px] lg:h-[450px]">

        <Image
          src="/hero-banner.png"
          alt="Ramila Perfume"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Buttons */}

        <div className="absolute bottom-3 left-[32%] -translate-x-1/2">

          <div className="flex flex-wrap justify-center gap-5">

            <a
              href="#products"
              className="bg-[#173F2E] hover:bg-[#0F2D21]
text-white
px-3
py-2
text-[13px]
font-semibold
shadow-lg
transition duration-300
rounded-full"
            >
              مشاهده محصولات
            </a>

            <a
              href="https://wa.me/989228595633"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D]
text-white
px-3
py-2
text-[13px]
font-semibold
shadow-lg
transition duration-300
rounded-full"
            >
              سفارش در واتساپ
            </a>

            <a
              href="https://ble.ir/ramillabeautty"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#173F2E] hover:bg-[#0F2D21]
text-white
px-3
py-2
text-[13px]
font-semibold
shadow-lg
transition duration-300
rounded-full"
            >
              سفارش در بله
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}