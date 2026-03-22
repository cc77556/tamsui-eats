import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryById,
  getRestaurantsByCategory,
} from "@/data/config";
import RestaurantCard from "@/components/RestaurantCard";

export async function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cat = getCategoryById(id);
  if (!cat) return { title: "找不到分類" };

  return {
    title: `${cat.icon} ${cat.name} — 淡水美食推薦`,
    description: `淡水${cat.name}推薦，精選在地人口袋名單。`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = getCategoryById(id);
  if (!cat) notFound();

  const list = getRestaurantsByCategory(cat.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-warm-600)]">
          首頁
        </Link>
        {" / "}
        <span>
          {cat.icon} {cat.name}
        </span>
      </nav>

      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-5xl mb-2 block">{cat.icon}</span>
        <h1 className="text-3xl font-bold mb-1">{cat.name}</h1>
        <p className="text-[var(--muted)]">
          共 {list.length} 間{cat.name}
        </p>
      </div>

      {/* Restaurant grid */}
      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[var(--muted)]">
          <p>這個分類還沒有餐廳</p>
        </div>
      )}
    </div>
  );
}
