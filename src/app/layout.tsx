import Script from "next/script";
import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { siteConfig } from "@/data/config";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — 淡水美食推薦`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — 淡水美食推薦`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={notoSansTC.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
</head>
      <body className="min-h-screen flex flex-col">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3J3QL25L9N" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-3J3QL25L9N");`}
        </Script>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[var(--header-bg)] border-b border-[var(--card-border)] backdrop-blur-sm bg-opacity-90">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-[var(--color-warm-600)] hover:text-[var(--color-warm-700)]"
            >
              🍽️ 淡水覓食
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/restaurants"
                className="text-sm hover:text-[var(--color-warm-600)]"
              >
                所有餐廳
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[var(--card-border)] mt-12">
          <div className="bg-amber-50 dark:bg-amber-900/30 py-2 text-center text-xs text-amber-800 dark:text-amber-200">
            📅 店家資訊更新：2026-03-22 | 營業時間及餐點可能變動，建議出發前電話確認
          </div>
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-[var(--muted)]">
            <p className="mb-2">{siteConfig.disclaimer}</p>
            <div className="flex justify-center gap-4 mb-2">
              <Link href="/terms" className="hover:text-[var(--color-warm-600)]">
                使用條款
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[var(--color-warm-600)]"
              >
                隱私政策
              </Link>
            </div>
            <p>
              &copy; 2026 {siteConfig.name} — {siteConfig.nameEn}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
