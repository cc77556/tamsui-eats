import Link from "next/link";
import { categories, restaurants, scenarios } from "@/data/config";
import RestaurantCard from "@/components/RestaurantCard";
import Disclaimer from "@/components/Disclaimer";

export default function HomePage() {
  const featured = restaurants.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🍽️ 淡水覓食
        </h1>
        <p className="text-xl md:text-2xl text-[var(--muted)] mb-2">
          淡水在地人的口袋名單
        </p>
        <p className="text-sm text-[var(--muted)]">
          收錄 {restaurants.length} 間淡水美食，從老街小吃到河景餐廳
        </p>
      </section>

      {/* Quick scenarios */}
      <section className="mb-12">
        <h2 className="text-lg font-bold mb-4 text-center">你今天想怎麼吃？</h2>
        <div className="flex justify-center gap-3 flex-wrap">
          {scenarios.map((s) => (
            <Link
              key={s.tag}
              href={`/restaurants?tag=${encodeURIComponent(s.tag)}`}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--color-warm-500)] hover:shadow-md text-sm font-medium"
            >
              <span className="text-2xl">{s.icon}</span>
              <span>{s.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Category grid */}
      <section className="mb-12">
        <h2 className="text-lg font-bold mb-4">依分類探索</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--color-warm-500)] hover:shadow-md"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured restaurants */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">精選推薦</h2>
          <Link
            href="/restaurants"
            className="text-sm text-[var(--color-warm-600)] hover:underline"
          >
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-center mb-8">
        <Disclaimer />
      </section>
    </div>
  );
}
