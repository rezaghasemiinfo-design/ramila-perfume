import Image from "next/image";

export default function Hero() {
return ( <section className="relative">

  {/* Desktop Hero */}

  <div className="hidden md:block relative w-full aspect-[2171/724]">

    <Image
      src="/hero-banner.png"
      alt="Ramila Perfume"
      fill
      priority
      sizes="100vw"
      className="object-contain object-center"
    />

    {/* Desktop Buttons */}

    <div className="absolute bottom-3 left-[34.5%] -translate-x-1/2">

      <div className="flex flex-nowrap items-center justify-center gap-5">

        <a
          href="#products"
          className="
            bg-[#173F2E]
            hover:bg-[#0F2D21]
            text-white
            px-3
            py-2
            text-[13px]
            font-semibold
            shadow-lg
            transition
            duration-300
            rounded-full
            whitespace-nowrap
          "
        >
          مشاهده محصولات
        </a>

        <a
          href="https://wa.me/989228595633"
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-[#25D366]
            hover:bg-[#1EBE5D]
            text-white
            px-3
            py-2
            text-[13px]
            font-semibold
            shadow-lg
            transition
            duration-300
            rounded-full
            whitespace-nowrap
          "
        >
          سفارش در واتساپ
        </a>

        <a
          href="https://ble.ir/ramillabeauty"
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-[#173F2E]
            hover:bg-[#0F2D21]
            text-white
            px-3
            py-2
            text-[13px]
            font-semibold
            shadow-lg
            transition
            duration-300
            rounded-full
            whitespace-nowrap
          "
        >
          مشاهده کانال بله
        </a>

      </div>

    </div>

  </div>

  {/* Mobile Hero */}

  <div className="block md:hidden relative w-full aspect-[4/5]">

    <Image
      src="/hero-mobile.png"
      alt="Ramila Perfume"
      fill
      priority
      sizes="100vw"
      className="object-contain object-top"
    />

    {/* Mobile Buttons */}

    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">

      <div className="flex flex-nowrap items-center justify-center gap-2">

        <a
          href="#products"
          className="
            bg-[#173F2E]
            hover:bg-[#0F2D21]
            text-white
            px-3
            py-2
            text-[12px]
            font-semibold
            shadow-lg
            transition
            duration-300
            rounded-full
            whitespace-nowrap
          "
        >
          مشاهده محصولات
        </a>

        <a
          href="https://wa.me/989228595633"
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-[#25D366]
            hover:bg-[#1EBE5D]
            text-white
            px-3
            py-2
            text-[12px]
            font-semibold
            shadow-lg
            transition
            duration-300
            rounded-full
            whitespace-nowrap
          "
        >
          سفارش در واتساپ
        </a>

        <a
          href="https://ble.ir/ramillabeauty"
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-[#173F2E]
            hover:bg-[#0F2D21]
            text-white
            px-3
            py-2
            text-[12px]
            font-semibold
            shadow-lg
            transition
            duration-300
            rounded-full
            whitespace-nowrap
          "
        >
          مشاهده کانال بله
        </a>

      </div>

    </div>

  </div>

</section>

);
}
