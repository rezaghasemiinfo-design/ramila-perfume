"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import perfumes from "../../data/perfumes";
import summerPerfumes from "../../data/summerPerfumes";
import { createClient } from "../../lib/supabase/client";
import { useCart } from "../../components/CartProvider";

type DbPerfume = {
id: string;
slug: string;
name: string;
brand: string;
};

type Fixative = {
id: string;
name: string;
is_active: boolean;
};

type Packaging = {
id: string;
packaging_type: string;
name: string;
capacity_ml: number | null;
max_fill_grams: number | null;
selling_price: number;
is_active: boolean;
};

type QuoteResult = {
perfume_id: string;
perfume_name: string;
perfume_brand: string;
perfume_grams: number;
perfume_price_per_gram: number;
perfume_total: number;
fixative_id: string | null;
fixative_name: string | null;
fixative_grams: number;
fixative_price_per_gram: number;
fixative_total: number;
packaging_id: string | null;
packaging_name: string | null;
packaging_type: string | null;
packaging_capacity_ml: number | null;
packaging_price: number;
quantity: number;
subtotal: number;
};

function formatPrice(value: number) {
return new Intl.NumberFormat("fa-IR").format(Math.round(value));
}

export default function ProductPage() {
const params = useParams<{ id: string }>();
const productId = params?.id;

const perfume = useMemo(
() =>
[...perfumes, ...summerPerfumes].find(
(item) => item.id === productId
),
[productId]
);

const { addItem } = useCart();

const [fixativeId, setFixativeId] = useState<string | null>(null);
const [fixativeName, setFixativeName] = useState<string | null>(null);
const [fixativeAvailable, setFixativeAvailable] = useState(false);

const [packagingOptions, setPackagingOptions] = useState<Packaging[]>([]);
const [optionsError, setOptionsError] = useState("");

// رشته نگه می‌داریم تا هنگام تایپ، عدد قبلی مزاحم نشود.
const [perfumeGramsInput, setPerfumeGramsInput] = useState("8");
const [fixativeGramsInput, setFixativeGramsInput] = useState("0");

const [selectedPackagingId, setSelectedPackagingId] = useState<
string | null

> (null);

const [quantity, setQuantity] = useState(1);

const [quote, setQuote] = useState<QuoteResult | null>(null);
const [loadingOptions, setLoadingOptions] = useState(true);
const [loadingQuote, setLoadingQuote] = useState(false);
const [message, setMessage] = useState("");
const [addedMessage, setAddedMessage] = useState("");

const selectedPerfumeGrams =
perfumeGramsInput === "" ? 0 : Number(perfumeGramsInput);

const selectedFixativeGrams =
fixativeGramsInput === "" ? 0 : Number(fixativeGramsInput);

useEffect(() => {
async function loadOptions() {
setLoadingOptions(true);
setOptionsError("");

  const supabase = createClient();

  const [fixativeResult, packagingResult] = await Promise.all([
    supabase
      .from("fixatives")
      .select("id,name,is_active")
      .eq("is_active", true)
      .order("name")
      .limit(1),

    supabase
      .from("packaging_options")
      .select(
        "id,packaging_type,name,capacity_ml,max_fill_grams,selling_price,is_active"
      )
      .eq("is_active", true)
      .order("capacity_ml", {
        ascending: true,
        nullsFirst: false,
      }),
  ]);

  if (fixativeResult.error) {
    setOptionsError(
      "امکان دریافت اطلاعات فیکساتور از سیستم وجود ندارد."
    );
  } else if (fixativeResult.data?.length) {
    const firstFixative = fixativeResult.data[0] as Fixative;

    setFixativeId(firstFixative.id);
    setFixativeName(firstFixative.name);
    setFixativeAvailable(true);
  } else {
    setFixativeId(null);
    setFixativeName(null);
    setFixativeAvailable(false);
  }

  if (packagingResult.error) {
    setOptionsError(
      "امکان دریافت اطلاعات شیشه‌ها از سیستم وجود ندارد."
    );
    setPackagingOptions([]);
  } else {
    const options = packagingResult.data as Packaging[];

    setPackagingOptions(options);

    // عمداً هیچ شیشه‌ای به صورت خودکار انتخاب نمی‌شود.
    setSelectedPackagingId(null);
  }

  setLoadingOptions(false);
}

loadOptions();

}, []);

useEffect(() => {
if (!perfume || loadingOptions) return;

const currentPerfume = perfume;

async function getQuote() {
  setLoadingQuote(true);
  setMessage("");

  const perfumeGrams = Number(perfumeGramsInput);
  const fixativeGrams = Number(fixativeGramsInput);

  if (
    !Number.isInteger(perfumeGrams) ||
    perfumeGrams < 8 ||
    perfumeGrams > 1000
  ) {
    setQuote(null);
    setLoadingQuote(false);
    return;
  }

  if (
    !Number.isInteger(fixativeGrams) ||
    fixativeGrams < 0 ||
    fixativeGrams > 1000
  ) {
    setQuote(null);
    setLoadingQuote(false);
    return;
  }

  if (!selectedPackagingId) {
    setQuote(null);
    setLoadingQuote(false);
    return;
  }

  if (fixativeGrams > 0 && !fixativeId) {
    setQuote(null);
    setMessage("فیکساتور در حال حاضر در سیستم فروش موجود نیست.");
    setLoadingQuote(false);
    return;
  }

  const supabase = createClient();

  const { data: dbPerfume, error: perfumeError } = await supabase
    .from("perfume_products")
    .select("id,slug,name,brand")
    .eq("slug", currentPerfume.id)
    .eq("is_active", true)
    .maybeSingle<DbPerfume>();

  if (perfumeError || !dbPerfume) {
    setQuote(null);
    setMessage("این عطر هنوز در سیستم فروش ثبت نشده است.");
    setLoadingQuote(false);
    return;
  }

  const { data, error } = await supabase.rpc(
    "calculate_order_item_quote",
    {
      p_perfume_id: dbPerfume.id,
      p_perfume_grams: perfumeGrams,
      p_fixative_id: fixativeGrams > 0 ? fixativeId : null,
      p_fixative_grams: fixativeGrams,
      p_packaging_id: selectedPackagingId,
      p_quantity: 1,
    }
  );

  if (error) {
    setQuote(null);
    setMessage(error.message || "امکان محاسبه قیمت وجود ندارد.");
  } else {
    setQuote(data as QuoteResult);
  }

  setLoadingQuote(false);
}

getQuote();

}, [
perfume,
loadingOptions,
perfumeGramsInput,
fixativeGramsInput,
selectedPackagingId,
fixativeId,
]);

if (!perfume) {
return (
  <main
    dir="rtl"
    className="min-h-screen bg-[#F8F6F1] px-4 py-10"
  >
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-[#173F2E]">
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

const selectedPackaging = packagingOptions.find(
(item) => item.id === selectedPackagingId
);

const perfumeGramsNumber = Number(perfumeGramsInput) || 0;
const fixativeGramsNumber = Number(fixativeGramsInput) || 0;

const fillGrams = perfumeGramsNumber + fixativeGramsNumber;

const packagingCapacityError =
selectedPackaging?.max_fill_grams != null &&
fillGrams > selectedPackaging.max_fill_grams;

const totalPrice = quote ? quote.subtotal * quantity : 0;

function handlePerfumeGramsChange(value: string) {
if (!/^\d*$/.test(value)) return;

setPerfumeGramsInput(value);
setQuote(null);

}

function handlePerfumeGramsBlur() {
if (perfumeGramsInput === "") {
setPerfumeGramsInput("8");
return;
}

const parsed = Number(perfumeGramsInput);

if (!Number.isInteger(parsed) || parsed < 8) {
  setPerfumeGramsInput("8");
  return;
}

if (parsed > 1000) {
  setPerfumeGramsInput("1000");
}

}

function handleFixativeGramsChange(value: string) {
if (!/^\d*$/.test(value)) return;

setFixativeGramsInput(value);
setQuote(null);

}

function handleFixativeGramsBlur() {
if (fixativeGramsInput === "") {
setFixativeGramsInput("0");
return;
}

const parsed = Number(fixativeGramsInput);

if (!Number.isInteger(parsed) || parsed < 0) {
  setFixativeGramsInput("0");
  return;
}

if (parsed > 1000) {
  setFixativeGramsInput("1000");
}

}

function handleQuantityChange(nextQuantity: number) {
setQuantity(Math.max(1, nextQuantity));
}

function handleAddToCart() {
  if (!perfume) return;
const perfumeGrams = Number(perfumeGramsInput);
const fixativeGrams = Number(fixativeGramsInput);

if (
  !quote ||
  packagingCapacityError ||
  !Number.isInteger(perfumeGrams) ||
  perfumeGrams < 8 ||
  perfumeGrams > 1000 ||
  !Number.isInteger(fixativeGrams) ||
  fixativeGrams < 0 ||
  fixativeGrams > 1000 ||
  !selectedPackagingId ||
  quantity < 1
) {
  return;
}

addItem({
  perfumeId: quote.perfume_id,
  perfumeName: quote.perfume_name,
  perfumeBrand: quote.perfume_brand,
  perfumeImage: perfume.image ?? "",
  perfumeGrams: quote.perfume_grams,
  fixativeId: quote.fixative_id,
  fixativeName: quote.fixative_name,
  fixativeGrams: quote.fixative_grams,
  packagingId: quote.packaging_id,
  packagingName: quote.packaging_name,
  quantity,
  price: quote.subtotal,
});

setAddedMessage("این ترکیب به سبد خرید اضافه شد.");

setTimeout(() => {
  setAddedMessage("");
}, 3000);

}

const sortedPackagingOptions = [...packagingOptions].sort((a, b) => {
// شیشه‌های دارای ظرفیت ابتدا بر اساس ظرفیت مرتب می‌شوند.
// پت که ظرفیت عددی ندارد، همیشه آخر قرار می‌گیرد.
if (a.capacity_ml == null && b.capacity_ml == null) return 0;
if (a.capacity_ml == null) return 1;
if (b.capacity_ml == null) return -1;

return a.capacity_ml - b.capacity_ml;

});

return (
<main
   dir="rtl"
   className="min-h-screen bg-[#F8F6F1] px-3 py-4 lg:px-6 lg:py-6"
>
  <div className="max-w-6xl mx-auto">
    <Link
      href="/"
      className="inline-block mb-3 text-[#173F2E] font-semibold hover:text-[#9A8456] transition text-sm"
    >
      ← بازگشت به محصولات
    </Link>

    <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-[#ECE6DA]">
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 p-4 lg:p-5">
        <div className="flex items-center justify-center bg-gradient-to-b from-green-50 to-white rounded-3xl min-h-[300px] lg:min-h-[440px]">
          <Image
            src={perfume.image}
            alt={`${perfume.persianName} | ${perfume.name}`}
            width={380}
            height={380}
            className="max-h-[350px] lg:max-h-[390px] w-auto object-contain"
            priority
          />
        </div>

        <div className="flex flex-col text-right">
          <p className="text-[#9A8456] font-semibold tracking-wider text-sm">
            {perfume.brand}
          </p>

          <h1 className="mt-1 text-2xl lg:text-3xl font-bold text-[#173F2E]">
            {perfume.name}
          </h1>

          <p className="mt-0.5 text-base lg:text-lg font-semibold text-gray-700">
            {perfume.persianName}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs lg:text-sm text-gray-900">
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

          <p className="mt-3 text-xs lg:text-sm leading-6 text-gray-800">
            {perfume.description}
          </p>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <div className="bg-[#F8F6F1] rounded-xl p-2.5">
              <p className="font-bold text-xs text-[#173F2E]">
                نت‌های ابتدایی
              </p>

              <p className="mt-1 text-[11px] leading-4 text-gray-900">
                {perfume.top}
              </p>
            </div>

            <div className="bg-[#F8F6F1] rounded-xl p-2.5">
              <p className="font-bold text-xs text-[#173F2E]">
                نت‌های میانی
              </p>

              <p className="mt-1 text-[11px] leading-4 text-gray-900">
                {perfume.middle}
              </p>
            </div>

            <div className="bg-[#F8F6F1] rounded-xl p-2.5">
              <p className="font-bold text-xs text-[#173F2E]">
                نت‌های پایه
              </p>

              <p className="mt-1 text-[11px] leading-4 text-gray-900">
                {perfume.base}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="pt-5 pt-[2.5rem] lg:pt-5">
              <h2 className="text-sm font-bold text-[#173F2E]">
                مقدار عطر
              </h2>

              <input
                type="text"
                inputMode="numeric"
                minLength={1}
                value={perfumeGramsInput}
                onFocus={(event) => event.currentTarget.select()}
                onChange={(event) =>
                  handlePerfumeGramsChange(event.target.value)
                }
                onBlur={handlePerfumeGramsBlur}
                className="mt-2 w-full rounded-xl border border-[#D9D4C8] bg-white px-3 py-2.5 text-center text-gray-900 font-bold outline-none focus:border-[#173F2E]"
              />

              <span className="block mt-1 text-[11px] text-gray-600 text-center">
                گرم | ۸ تا ۱۰۰۰
              </span>
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#173F2E]">
                فیکساتور (برای پخش بو و خط بو بیشتر - نسبت پیشنهادی 4 به 1)
              </h2>

              <input
                type="text"
                inputMode="numeric"
                minLength={1}
                value={fixativeGramsInput}
                onFocus={(event) => event.currentTarget.select()}
                onChange={(event) =>
                  handleFixativeGramsChange(event.target.value)
                }
                onBlur={handleFixativeGramsBlur}
                className="mt-2 w-full rounded-xl border border-[#D9D4C8] bg-white px-3 py-2.5 text-center text-gray-900 font-bold outline-none focus:border-[#173F2E]"
              />

              <span className="block mt-1 text-[11px] text-gray-600 text-center">
                گرم | صفر یعنی بدون فیکساتور
              </span>

            </div>
          </div>

          <div className="mt-3">
            <h2 className="text-sm font-bold text-[#173F2E]">
              انتخاب شیشه عطر
            </h2>

            <select
              value={selectedPackagingId ?? ""}
              onChange={(event) => {
                setSelectedPackagingId(
                  event.target.value || null
                );
                setQuote(null);
                setMessage("");
              }}
              disabled={
                loadingOptions ||
                sortedPackagingOptions.length === 0
              }
              className="mt-2 w-full rounded-xl border border-[#D9D4C8] bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#173F2E] disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <option value="" disabled>
                انتخاب شیشه عطر
              </option>

              {sortedPackagingOptions.map((packaging) => (
                <option
                  key={packaging.id}
                  value={packaging.id}
                >
                  {packaging.capacity_ml != null
                    ? `${packaging.capacity_ml}`
                    : "پت"}
                </option>
              ))}
            </select>

            {packagingOptions.length === 0 && !loadingOptions && (
              <p className="mt-1 text-red-600 text-xs font-semibold">
                در حال حاضر شیشه فعالی برای انتخاب در سیستم وجود ندارد.
              </p>
            )}

            {packagingCapacityError && (
              <p className="mt-1 text-red-600 text-xs font-semibold">
                مقدار عطر و فیکساتور از ظرفیت این شیشه بیشتر است.
              </p>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#F8F6F1] px-4 py-2.5">
            <span className="font-bold text-sm text-gray-900">
              تعداد
            </span>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(quantity - 1)
                }
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full border border-[#D9D4C8] bg-white text-[#173F2E] text-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#173F2E] transition"
                aria-label="کاهش تعداد"
              >
                −
              </button>

              <span className="min-w-[24px] text-center font-bold text-[#173F2E]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(quantity + 1)
                }
                className="w-8 h-8 rounded-full border border-[#D9D4C8] bg-white text-[#173F2E] text-lg font-bold hover:border-[#173F2E] transition"
                aria-label="افزایش تعداد"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-[#F8F6F1] p-3">
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold text-gray-900">
                قیمت کل:
              </span>

              <span className="text-xl font-bold text-[#173F2E]">
                {loadingQuote
                  ? "در حال محاسبه..."
                  : quote
                    ? `${formatPrice(totalPrice)} تومان`
                    : "—"}
              </span>
            </div>

            {quote && (
              <div className="mt-2 text-xs text-gray-800">
                <div className="flex justify-between gap-3">
                  <span>
                    عطر ({quote.perfume_grams} گرم)
                  </span>

                  <span>
                    {formatPrice(quote.perfume_total)} تومان
                  </span>
                </div>

                {quote.fixative_id &&
                  quote.fixative_grams > 0 && (
                    <div className="mt-1 flex justify-between gap-3">
                      <span>
                        فیکساتور ({quote.fixative_grams} گرم)
                      </span>

                      <span>
                        {formatPrice(quote.fixative_total)} تومان
                      </span>
                    </div>
                  )}

                {quote.packaging_id && (
                  <div className="mt-1 flex justify-between gap-3">
                    <span>
                      {quote.packaging_name}
                    </span>

                    <span>
                      {formatPrice(quote.packaging_price)} تومان
                    </span>
                  </div>
                )}

                {quantity > 1 && (
                  <p className="mt-2 pt-2 border-t border-[#DDD6C8] text-[#173F2E] font-bold">
                    {quantity} عدد از این ترکیب
                  </p>
                )}
              </div>
            )}
          </div>

          {message && (
            <p className="mt-2 text-red-600 text-xs font-semibold">
              {message}
            </p>
          )}

          {optionsError && (
            <p className="mt-2 text-orange-700 text-xs font-semibold">
              {optionsError}
            </p>
          )}

          {addedMessage && (
            <div className="mt-2 rounded-xl bg-green-50 border border-green-200 px-3 py-2 text-green-800 text-xs font-semibold">
              {addedMessage}
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={
              !quote ||
              loadingQuote ||
              loadingOptions ||
              packagingCapacityError ||
              !selectedPackagingId ||
              !Number.isInteger(Number(perfumeGramsInput)) ||
              Number(perfumeGramsInput) < 8 ||
              Number(perfumeGramsInput) > 1000 ||
              !Number.isInteger(Number(fixativeGramsInput)) ||
              Number(fixativeGramsInput) < 0 ||
              Number(fixativeGramsInput) > 1000 ||
              quantity < 1
            }
            className="mt-3 w-full rounded-full bg-[#173F2E] hover:bg-[#245C45] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 font-bold transition"
          >
            افزودن به سبد خرید
          </button>

          <Link
            href="/cart"
            className="mt-2 w-full rounded-full border-2 border-[#173F2E] text-[#173F2E] hover:bg-[#173F2E] hover:text-white py-2.5 text-center text-sm font-bold transition"
          >
            مشاهده سبد خرید
          </Link>

          <a
            href="https://wa.me/989228595633"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 rounded-full text-sm font-semibold transition"
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