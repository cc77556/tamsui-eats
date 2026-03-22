import type { Metadata } from "next";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "隱私政策",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">隱私政策</h1>

      <div className="prose prose-stone dark:prose-invert max-w-none space-y-4 text-[var(--foreground)]">
        <p>
          {siteConfig.name}（以下簡稱「本站」）尊重您的隱私權。以下說明本站如何處理您的資訊。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">1. 資料收集</h2>
        <p>
          本站為靜態網站，不主動收集個人資料。本站不要求使用者註冊帳號或提供個人資訊。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">2. Cookie 使用</h2>
        <p>
          本站僅使用 localStorage 儲存您的主題偏好（淺色/深色模式），不使用追蹤型 Cookie。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">3. 第三方服務</h2>
        <p>
          本站連結至 Google Maps 等第三方服務，這些服務有各自的隱私政策，本站不對其資料處理方式負責。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">4. 資料安全</h2>
        <p>
          本站以 HTTPS 傳輸加密保護連線安全。由於本站不收集個人資料，不存在資料外洩之風險。
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">5. 政策修訂</h2>
        <p>
          本站保留隨時修訂隱私政策之權利，修訂後將公布於本頁面。
        </p>

        <p className="text-sm text-[var(--muted)] mt-8">
          最後更新日期：2026 年 3 月 22 日
        </p>
      </div>
    </div>
  );
}
