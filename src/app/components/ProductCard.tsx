import Image from "next/image";

export default function ProductCard({ perfume }: any) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-green-100">

      <div className="flex justify-center bg-gradient-to-b from-green-50 to-white p-6">
        <Image
          src={perfume.image}
          alt={perfume.name}
          width={180}
          height={180}
          className="object-contain h-56 hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5 text-center">

        <h3 className="text-2xl font-bold text-green-900">
          {perfume.name}
        </h3>

        <p className="text-gray-800 font-medium mt-1">
          {perfume.brand}
        </p>

        <div className="mt-4 space-y-2 text-base text-gray-900">

          <p>
            <span className="font-bold">مناسب برای:</span> {perfume.gender}
          </p>

          <p>
            <span className="font-bold">ماندگاری:</span> {perfume.longevity}
          </p>

          <p>
            <span className="font-bold">پخش بو:</span> {perfume.sillage}
          </p>

        </div>

        <button className="mt-6 w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-xl transition">
          مشاهده جزئیات
        </button>

      </div>

    </div>
  );
}