"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../components/CartProvider";

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-[#F8F6F1] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#173F2E]">
              سبد خرید
            </h1>

            <p className="mt-2 text-gray-700">
              {itemCount > 0
                ? `${formatPrice(itemCount)} قلم کالا`
                : "سبد خرید شما خالی است"}
            </p>
          </div>

          <Link
            href="/"
            className="text-[#173F2E] font-semibold hover:text-[#9A8456] transition"
          >
            ادامه خرید
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#ECE6DA] p-12 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#173F2E]">
              <span className="text-3xl">🛍</span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#173F2E]">
              سبد خرید شما خالی است
            </h2>

            <p className="mt-3 text-gray-700">
              عطر موردنظرتان را انتخاب کنید و به سبد اضافه کنید.
            </p>

            <Link
              href="/#products"
              className="inline-block mt-7 bg-[#173F2E] hover:bg-[#0F2D21] text-white px-8 py-3 rounded-full font-semibold transition"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_350px] gap-6">
            {/* Items */}

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#ECE6DA] p-5 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-2xl bg-[#F8F6F1]">
                      <Image
                        src={item.perfumeImage}
                        alt={item.perfumeName}
                        fill
                        sizes="128px"
                        className="object-contain p-3"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-[#173F2E]">
                            {item.perfumeName}
                          </h2>

                          <p className="text-[#9A8456] mt-1">
                            {item.perfumeBrand}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="حذف از سبد خرید"
                          className="text-gray-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="mt-4 space-y-1 text-sm text-gray-800">
                        <p>
                          <strong>عطر:</strong>{" "}
                          {formatPrice(item.perfumeGrams)} گرم
                        </p>

                        {item.fixativeId && (
                          <p>
                            <strong>فیکساتیو:</strong>{" "}
                            {formatPrice(item.fixativeGrams)} گرم
                          </p>
                        )}

                        {item.packagingName && (
                          <p>
                            <strong>ظرف:</strong> {item.packagingName}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center border border-[#D8D0C2] rounded-full overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center text-[#173F2E] hover:bg-[#F8F6F1]"
                          >
                            <Plus size={16} />
                          </button>

                          <span className="w-10 text-center font-semibold text-[#173F2E]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center text-[#173F2E] hover:bg-[#F8F6F1]"
                          >
                            <Minus size={16} />
                          </button>
                        </div>

                        <div className="text-left">
                          <p className="text-xs text-gray-600">
                            قیمت فعلی
                          </p>

                          <p className="text-lg font-bold text-[#173F2E]">
                            {formatPrice(item.price * item.quantity)} تومان
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800 transition"
              >
                خالی کردن سبد خرید
              </button>
            </div>

            {/* Summary */}

            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-white rounded-3xl border border-[#ECE6DA] p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#173F2E]">
                  خلاصه سفارش
                </h2>

                <div className="mt-6 flex items-center justify-between text-gray-800">
                  <span>تعداد اقلام</span>
                  <span className="font-semibold">{itemCount}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-800">جمع کالاها</span>

                  <span className="font-bold text-[#173F2E]">
                    {formatPrice(subtotal)} تومان
                  </span>
                </div>

                <div className="border-t border-[#ECE6DA] my-5" />

                <p className="text-xs leading-6 text-gray-600">
                  قیمت نهایی، موجودی و تخفیف‌ها هنگام ثبت سفارش دوباره
                  بررسی می‌شوند.
                </p>

                <Link
                  href="/checkout"
                  className="mt-6 block w-full text-center bg-[#173F2E] hover:bg-[#0F2D21] text-white py-3.5 rounded-full font-semibold transition"
                >
                  ادامه و ثبت سفارش
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}