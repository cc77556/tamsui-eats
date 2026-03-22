import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  restaurants,
  getRestaurantById,
  getCategoryById,
  getNearbyRestaurants,
  siteConfig,
} from "@/data/config";
import RestaurantCard from "@/components/RestaurantCard";
import Disclaimer from "@/components/Disclaimer";

export async function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const r = getRestaurantById(id);
  if (!r) return { title: "找不到餐廳" };

  return {
    title: `${r.name} — 淡水美食推薦`,
    description: `${r.name}：${r.review}。地址：${r.address}，推薦餐點：${r.recommended.join("、")}`,
  };
}

const priceColor: Record<string, string> = {
  $: "bg-[var(--color-price-cheap)] text-white",
  $$: "bg-[var(--color-price-mid)] text-white",
  $$$: "bg-[var(--color-price-expensive)] text-white",
};

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = getRestaurantById(id);
  if (!r) notFound();

  const cat = getCategoryById(r.category);
  const nearby = getNearbyRestaurants(r.id, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.address,
      addressLocality: "淡水區",
      addressRegion: "新北市",
      addressCountry: "TW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: r.lat,
      longitude: r.lng,
    },
    priceRange: r.priceRange,
    servesCuisine: cat?.name || "台灣料理",
    openingHours: r.hours,
    url: `${siteConfig.url}/restaurant/${r.id}`,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-warm-600)]">
          首頁
        </Link>
        {" / "}
        {cat && (
          <>
            <Link
              href={`/category/${cat.id}`}
              className="hover:text-[var(--color-warm-600)]"
            >
              {cat.icon} {cat.name}
            </Link>
            {" / "}
          </>
        )}
        <span>{r.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <span className="text-6xl">{r.coverEmoji}</span>
        <div>
          <h1 className="text-3xl font-bold mb-2">{r.name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            {cat && (
              <span
                className="text-sm px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon} {cat.name}
              </span>
            )}
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${priceColor[r.priceRange]}`}
            >
              {r.priceRange} 均消 NT${r.avgPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Review quote */}
      <blockquote className="border-l-4 border-[var(--color-warm-500)] pl-4 py-2 mb-6 text-lg italic text-[var(--muted)]">
        &ldquo;{r.review}&rdquo;
      </blockquote>

      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Address */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
          <p className="text-sm text-[var(--muted)] mb-1">地址</p>
          <p className="font-medium mb-2">{r.address}</p>
          <a
            href={r.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-full bg-[var(--color-warm-500)] text-white hover:bg-[var(--color-warm-600)]"
          >
            📍 開啟地圖
          </a>
        </div>

        {/* Hours */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
          <p className="text-sm text-[var(--muted)] mb-1">營業時間</p>
          <p className="font-medium">{r.hours}</p>
          {r.closedOn !== "無" && (
            <p className="text-sm text-[var(--color-price-expensive)] mt-1">
              公休日：{r.closedOn}
            </p>
          )}
        </div>

        {/* Queue */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
          <p className="text-sm text-[var(--muted)] mb-1">排隊狀況</p>
          <p className="font-medium">{r.queueStatus}</p>
        </div>

        {/* Tags */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
          <p className="text-sm text-[var(--muted)] mb-1">適合情境</p>
          <div className="flex gap-2 flex-wrap">
            {r.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-[var(--color-warm-100)] dark:bg-[var(--color-warm-800)] text-[var(--color-warm-700)] dark:text-[var(--color-warm-200)] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended dishes */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">推薦餐點</h2>
        <div className="flex gap-3 flex-wrap">
          {r.recommended.map((dish, i) => {
            const colors = [
              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800",
              "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800",
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800",
              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800",
              "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800",
            ];
            return (
              <span
                key={dish}
                className={`px-4 py-2 rounded-xl text-sm font-medium border ${colors[i % colors.length]}`}
              >
                {dish}
              </span>
            );
          })}
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">附近的店</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nearby.map((nr) => (
              <RestaurantCard key={nr.id} r={nr} />
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <Disclaimer />
    </div>
  );
}
