import Link from "next/link";
import type { Restaurant } from "@/data/config";
import { getCategoryById } from "@/data/config";

const priceColor: Record<string, string> = {
  $: "bg-[var(--color-price-cheap)] text-white",
  $$: "bg-[var(--color-price-mid)] text-white",
  $$$: "bg-[var(--color-price-expensive)] text-white",
};

function QueueBadge({ status }: { status: string }) {
  let color = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  if (status.includes("15")) {
    color = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  } else if (status.includes("30") || status.includes("訂位")) {
    color = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>
      {status}
    </span>
  );
}

export default function RestaurantCard({ r }: { r: Restaurant }) {
  const cat = getCategoryById(r.category);
  return (
    <Link
      href={`/restaurant/${r.id}`}
      className="block rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 hover:shadow-lg hover:border-[var(--color-warm-500)] group"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-4xl leading-none">{r.coverEmoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg leading-tight group-hover:text-[var(--color-warm-600)]">
            {r.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {cat && (
              <span
                className="text-xs px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon} {cat.name}
              </span>
            )}
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${priceColor[r.priceRange]}`}
            >
              {r.priceRange} 均消 NT${r.avgPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended dishes */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {r.recommended.slice(0, 2).map((dish) => (
          <span
            key={dish}
            className="text-xs bg-[var(--color-warm-50)] dark:bg-[var(--color-warm-900)] text-[var(--color-warm-700)] dark:text-[var(--color-warm-200)] px-2 py-1 rounded-lg"
          >
            {dish}
          </span>
        ))}
      </div>

      {/* Review */}
      <p className="text-sm text-[var(--muted)] line-clamp-2 mb-2">
        {r.review}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1 flex-wrap">
          {r.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[var(--color-warm-100)] dark:bg-[var(--color-warm-800)] text-[var(--color-warm-700)] dark:text-[var(--color-warm-200)] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <QueueBadge status={r.queueStatus} />
      </div>
    </Link>
  );
}
