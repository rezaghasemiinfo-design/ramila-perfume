import Image from "next/image";

export default function Hero() {
return ( <section className="relative">

```
  {/* Hero Banner */}

  <div className="relative w-full h-auto md:h-[450px] aspect-[4/5] md:aspect-auto">

    {/* Desktop Banner */}

    <Image
      src="/hero-banner.png"
      alt="Ramila Perfume"
      fill
      priority
      sizes="100vw"
      className="hidden md:block object-cover object-center"
    />

    {/* Mobile Banner */}

    <Image
      src="/hero-mobile.png"
      alt="Ramila Perfume"
      fill
      priority
      sizes="100vw"
      className="block md:hidden object-contain object-top"
    />

    {/* Buttons */}

    <div
      className="
        absolute
        bottom-1
        left-[50%]
        -translate-x-1/2
        md:left-[31.5%]
      "
    >

      <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-5">

        {/* مشاهده محصولات */}

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

        {/* واتساپ */}

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

        {/* بله */}

        <a
          href="https://ble.ir/ramillabeautty"
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
          سفارش در بله
        </a>

      </div>

    </div>

  </div>

</section>

);
}
