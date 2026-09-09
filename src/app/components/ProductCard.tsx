import Image from "next/image";

export default function ProductCard({ perfume }: any) {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-[#E8E2D8] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Product Image */}

      <div className="h-48 flex items-center justify-center bg-gradient-to-b from-[#F8F6F1] to-white px-5 pt-5">

        <Image
          src={perfume.image}
          alt={perfume.name}
          width={160}
          height={160}
          className="h-40 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />

      </div>

      {/* Card Content */}

      <div className="flex flex-col flex-1 px-5 pb-5 text-center">

        {/* Badge */}

        <span className="self-center mt-3 text-[10px] font-semibold tracking-[2px] text-[#8A7447] border border-[#D9CFB7] rounded-full px-3 py-1">
          PREMIUM ESSENCE
        </span>

        {/* Name */}

        <h3 className="mt-3 text-xl font-bold text-[#173F2E] leading-6">
          {perfume.name}
        </h3>

        {/* Brand */}

        <p className="mt-1 text-sm text-gray-600">
          {perfume.brand}
        </p>

        {/* Variable Information */}

        <div
          dir="rtl"
          className="mt-4 space-y-1.5 text-[13px] leading-6 text-gray-800 text-right"
        >

          <p>
            <span className="font-bold">
              مناسب برای:
            </span>{" "}
            {perfume.gender}
          </p>

          <p>
            <span className="font-bold">
              نت آغازین:
            </span>{" "}
            {perfume.top}
          </p>

          <p>
            <span className="font-bold">
              نت میانی:
            </span>{" "}
            {perfume.middle}
          </p>

          <p>
            <span className="font-bold">
              نت پایه:
            </span>{" "}
            {perfume.base}
          </p>

        </div>

        {/* Fixed Bottom Area */}

        <div className="mt-auto pt-5">

          {/* Ratings */}

          <div className="space-y-1.5 text-[13px]">

            <div className="flex items-center justify-between">

              <span className="text-gray-700">
                ماندگاری
              </span>

              <span className="text-[#C99A18] tracking-[1px]">
                {perfume.longevity}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-700">
                پخش بو
              </span>

              <span className="text-[#C99A18] tracking-[1px]">
                {perfume.sillage}
              </span>

            </div>

          </div>

          {/* Volumes */}

          <div className="mt-4 flex flex-wrap justify-center gap-1.5">

            {perfume.volume.map((size: string) => (

              <span
                key={size}
                className="bg-[#F4F1EA] text-[#173F2E] rounded-full px-2.5 py-1 text-[11px]"
              >
                {size}
              </span>

            ))}

          </div>

          {/* Details Button */}

          <button className="mt-5 w-full bg-[#173F2E] hover:bg-[#0F2D21] text-white text-sm font-medium py-2.5 rounded-xl transition">

            مشاهده جزئیات

          </button>

        </div>

      </div>

    </div>
  );
}