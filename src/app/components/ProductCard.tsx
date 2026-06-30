import Image from "next/image";

export default function ProductCard({ perfume }: any) {
  return (
    <div className="bg-white rounded-[30px] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-[#E8E3D8]">

      {/* Image */}

      <div className="bg-gradient-to-b from-[#F8F6F1] to-white flex justify-center p-8">

        <Image
          src={perfume.image}
          alt={perfume.name}
          width={220}
          height={220}
          className="object-contain h-64 transition duration-300 hover:scale-105"
        />

      </div>

      {/* Content */}

      <div className="p-6 text-center">

        <span className="inline-block text-xs font-semibold tracking-widest text-[#7A8F66] uppercase border border-[#D9D2C3] rounded-full px-4 py-1 mb-4">
          Premium Essence
        </span>

        <h3 className="text-2xl font-bold text-[#173F2E]">
          {perfume.name}
        </h3>

        <p className="text-gray-700 mt-2 font-medium">
          {perfume.brand}
        </p>

        <div className="mt-6 space-y-3 text-[15px] text-gray-800 text-right">

          <p>
            <strong>مناسب برای:</strong> {perfume.gender}
          </p>

          <p>
            <strong>نت آغازین:</strong> {perfume.top}
          </p>

          <p>
            <strong>نت میانی:</strong> {perfume.middle}
          </p>

          <p>
            <strong>نت پایه:</strong> {perfume.base}
          </p>

        </div>

        {/* Rating */}

        <div className="mt-6 space-y-3">

          <div className="flex justify-between items-center">

            <span className="text-gray-700">
              ماندگاری
            </span>

            <span className="text-[#C9A227] text-xl">
              ★★★★★
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-700">
              پخش بو
            </span>

            <span className="text-[#C9A227] text-xl">
              ★★★★★
            </span>

          </div>

        </div>

        {/* Sizes */}

        <div className="mt-6 flex flex-wrap justify-center gap-2">

          {["10ml","20ml","30ml","50ml","100ml"].map((size) => (

            <span
              key={size}
              className="px-3 py-1 rounded-full bg-[#F4F1EA] text-[#173F2E] text-sm"
            >
              {size}
            </span>

          ))}

        </div>

        <button className="mt-8 w-full bg-[#173F2E] hover:bg-[#0F2D21] text-white py-3 rounded-2xl transition">

          مشاهده جزئیات

        </button>

      </div>

    </div>
  );
}