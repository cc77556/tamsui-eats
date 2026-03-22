import type { Metadata } from "next";
import RestaurantList from "@/components/RestaurantList";

export const metadata: Metadata = {
  title: "所有餐廳 — 淡水美食推薦",
  description: "瀏覽所有淡水美食，依分類、價位、情境篩選，找到你的下一餐。",
};

export default function RestaurantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🔍 所有餐廳</h1>
      <RestaurantList />
    </div>
  );
}
