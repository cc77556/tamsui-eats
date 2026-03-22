import type { Metadata } from "next";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "使用條款",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">使用條款</h1>

      <div className="prose prose-stone dark:prose-invert max-w-none space-y-4 text-[var(--foreground)]">
        <p>歡迎使用{siteConfig.name}（以下簡稱「本站」）。</p>

        <h2 className="text-xl font-bold mt-8 mb-3">1. 服務說明</h2>
        <p>
          本站為淡水美食資訊整理平台，提供餐廳資訊、推薦餐點及評價等內容，僅供參考使用。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">2. 免責聲明</h2>
        <p>{siteConfig.disclaimer}</p>
        <p>
          本站不對餐廳品質、衛生狀況、服務態度或任何消費糾紛負責。使用者應自行判斷並承擔風險。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">3. 智慧財產權</h2>
        <p>
          本站之設計、文字內容及編排方式受著作權法保護。未經授權，不得擅自複製、轉載或用於商業目的。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">4. 外部連結</h2>
        <p>
          本站提供之 Google Maps 連結及其他外部連結，僅為使用者便利而設，本站不對外部網站內容負責。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">5. 條款修訂</h2>
        <p>
          本站保留隨時修訂使用條款之權利，修訂後將公布於本頁面。繼續使用本站即表示同意修訂後之條款。
        </p>

        <p className="text-sm text-[var(--muted)] mt-8">
          最後更新日期：2026 年 3 月 22 日
        </p>
      </div>
    </div>
  );
}
