import Image from "next/image";

const categories = [
  {
    title: "Blue Moon Ginger Dash",
    brand: "By Kilian",
    image: "/images/categories/blue-moon.png",
  },
  {
    title: "California Dream",
    brand: "Louis Vuitton",
    image: "/images/categories/california-dream.png",
  },
  {
    title: "L'Immensité",
    brand: "Louis Vuitton",
    image: "/images/categories/limmensite.png",
  },
  {
    title: "Stellar Times",
    brand: "Louis Vuitton",
    image: "/images/categories/stellar-times.png",
  },
  {
    title: "Still",
    brand: "Jennifer Lopez",
    image: "/images/categories/still.png",
  },
  {
    title: "Paradise Garden",
    brand: "Jean Paul Gaultier",
    image: "/images/categories/paradise-garden.png",
  },
  {
    title: "My Way",
    brand: "Giorgio Armani",
    image: "/images/categories/my-way.png",
  },
  {
    title: "L'Amour",
    brand: "Lalique",
    image: "/images/categories/lamour.png",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-14">

        <p className="uppercase tracking-[5px] text-[#7A8F66] font-semibold">
          RAMILA PERFUME
        </p>

        <h2 className="text-5xl font-bold text-[#173F2E] mt-4">
          عطرهای پرفروش تابستان
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          بهترین انتخاب برای روزهای گرم سال
        </p>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        {categories.map((item) => (

          <div
            key={item.title}
            className="group bg-white rounded-3xl border border-[#E8E2D8] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden"
          >

            <div className="bg-gradient-to-b from-[#F8F6F1] to-white flex justify-center p-6">

              <Image
                src={item.image}
                alt={item.title}
                width={140}
                height={180}
                className="object-contain h-44 group-hover:scale-105 transition duration-300"
              />

            </div>

            <div className="p-5 text-center">

              <h3 className="text-xl font-bold text-[#173F2E]">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-500 text-sm">
                {item.brand}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}