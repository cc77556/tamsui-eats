import categoriesData from "./categories.json";
import restaurantsData from "./restaurants.json";

// ─── Types ───────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  address: string;
  googleMapsUrl: string;
  lat: number;
  lng: number;
  priceRange: "$" | "$$" | "$$$";
  avgPrice: number;
  tags: string[];
  hours: string;
  closedOn: string;
  queueStatus: string;
  recommended: string[];
  review: string;
  coverEmoji: string;
  updatedAt: string;
  isSampleData: boolean;
}

// ─── Site Config ─────────────────────────────────────────

export const siteConfig = {
  name: "淡水覓食",
  nameEn: "TamsuiEats",
  tagline: "淡水在地人的口袋名單",
  description:
    "淡水美食推薦指南，收錄在地人推薦的小吃、餐廳、咖啡廳，從老街阿給到河景餐廳一次收錄。",
  url: "https://tamsui-eats.com",
  disclaimer: "本站資訊僅供參考，營業時間及餐點可能變動，請以店家現場公告為準。",
};

// ─── Data ────────────────────────────────────────────────

export const categories: Category[] = categoriesData as Category[];
export const restaurants: Restaurant[] = restaurantsData as Restaurant[];

// ─── Helpers ─────────────────────────────────────────────

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getRestaurantsByCategory(categoryId: string): Restaurant[] {
  return restaurants.filter((r) => r.category === categoryId);
}

export function getRestaurantsByTag(tag: string): Restaurant[] {
  return restaurants.filter((r) => r.tags.includes(tag));
}

export function getRestaurantsByPriceRange(
  priceRange: "$" | "$$" | "$$$"
): Restaurant[] {
  return restaurants.filter((r) => r.priceRange === priceRange);
}

export function searchRestaurants(query: string): Restaurant[] {
  const q = query.toLowerCase().trim();
  if (!q) return restaurants;
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.review.toLowerCase().includes(q) ||
      r.recommended.some((d) => d.toLowerCase().includes(q)) ||
      r.tags.some((t) => t.toLowerCase().includes(q)) ||
      r.address.toLowerCase().includes(q)
  );
}

export function filterRestaurants(options: {
  category?: string;
  priceRange?: string;
  tag?: string;
  query?: string;
}): Restaurant[] {
  let result = restaurants;

  if (options.query) {
    result = searchRestaurants(options.query);
  }
  if (options.category) {
    result = result.filter((r) => r.category === options.category);
  }
  if (options.priceRange) {
    result = result.filter((r) => r.priceRange === options.priceRange);
  }
  if (options.tag) {
    result = result.filter((r) => r.tags.includes(options.tag!));
  }

  return result;
}

export function getNearbyRestaurants(
  id: string,
  limit = 3
): Restaurant[] {
  const current = getRestaurantById(id);
  if (!current) return [];
  return restaurants
    .filter((r) => r.id !== id)
    .map((r) => ({
      ...r,
      distance: Math.sqrt(
        Math.pow(r.lat - current.lat, 2) + Math.pow(r.lng - current.lng, 2)
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// All unique tags across restaurants
export const allTags: string[] = Array.from(
  new Set(restaurants.flatMap((r) => r.tags))
);

// Scenario mappings for the homepage
export const scenarios = [
  { label: "帶小孩吃", tag: "親子", icon: "👶" },
  { label: "約會", tag: "約會", icon: "💑" },
  { label: "一個人吃", tag: "一人", icon: "🧑" },
  { label: "外帶回家", tag: "外帶", icon: "🥡" },
] as const;
