type Product = {
  name: string;
  brand: string;
};

export default function ProductCard({ name, brand }: Product) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center border border-gray-100">

      <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center text-4xl">
        🧴
      </div>

      <h3 className="mt-5 text-xl font-bold text-green-900">
        {name}
      </h3>

      <p className="text-gray-500 mt-2">
        {brand}
      </p>

      <a
        href="https://wa.me/989228595633"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-full transition"
      >
        سفارش
      </a>

    </div>
  );
}