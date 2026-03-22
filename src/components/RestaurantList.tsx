"use client";

import { useState, useMemo } from "react";
import { categories, restaurants, allTags } from "@/data/config";
import type { Restaurant } from "@/data/config";
import RestaurantCard from "./RestaurantCard";

const priceRanges = ["$", "$$", "$$$"] as const;

export default function RestaurantList({
  initialCategory,
}: {
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || ""
  );
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filtered = useMemo(() => {
    let result: Restaurant[] = restaurants;

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.review.toLowerCase().includes(q) ||
          r.recommended.some((d) => d.toLowerCase().includes(q)) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.address.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((r) => r.category === selectedCategory);
    }
    if (selectedPrice) {
      result = result.filter((r) => r.priceRange === selectedPrice);
    }
    if (selectedTag) {
      result = result.filter((r) => r.tags.includes(selectedTag));
    }

    return result;
  }, [query, selectedCategory, selectedPrice, selectedTag]);

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="搜尋店名、餐點、地址..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-warm-500)] text-sm"
        />
      </div>

      {/* Category chips */}
      <div className="flex gap-2 flex-wrap mb-3">
        <button
          onClick={() => setSelectedCategory("")}
          className={`text-sm px-3 py-1.5 rounded-full border ${
            !selectedCategory
              ? "bg-[var(--color-warm-500)] text-white border-[var(--color-warm-500)]"
              : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--color-warm-500)]"
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)
            }
            className={`text-sm px-3 py-1.5 rounded-full border ${
              selectedCategory === cat.id
                ? "text-white border-transparent"
                : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--color-warm-500)]"
            }`}
            style={
              selectedCategory === cat.id
                ? { backgroundColor: cat.color }
                : undefined
            }
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Price range */}
      <div className="flex gap-2 flex-wrap mb-3">
        <span className="text-sm text-[var(--muted)] py-1">價位：</span>
        {priceRanges.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPrice(selectedPrice === p ? "" : p)}
            className={`text-sm px-3 py-1 rounded-full border font-bold ${
              selectedPrice === p
                ? p === "$"
                  ? "bg-[var(--color-price-cheap)] text-white border-transparent"
                  : p === "$$"
                  ? "bg-[var(--color-price-mid)] text-white border-transparent"
                  : "bg-[var(--color-price-expensive)] text-white border-transparent"
                : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--color-warm-500)]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Tag toggles */}
      <div className="flex gap-2 flex-wrap mb-6">
        <span className="text-sm text-[var(--muted)] py-1">情境：</span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
            className={`text-sm px-3 py-1 rounded-full border ${
              selectedTag === tag
                ? "bg-[var(--color-warm-600)] text-white border-transparent"
                : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--color-warm-500)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--muted)] mb-4">
        找到 {filtered.length} 間餐廳
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[var(--muted)]">
          <p className="text-4xl mb-2">🍽️</p>
          <p>找不到符合條件的餐廳，試試其他關鍵字吧！</p>
        </div>
      )}
    </div>
  );
}
