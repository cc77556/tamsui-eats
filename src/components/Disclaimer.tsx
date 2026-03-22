import { siteConfig } from "@/data/config";

export default function Disclaimer() {
  return (
    <p className="text-xs text-[var(--muted)] mt-4 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] inline-block">
      {siteConfig.disclaimer}
    </p>
  );
}
