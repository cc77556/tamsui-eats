@AGENTS.md

# 淡水覓食 TamsuiEats

Next.js 16 + Tailwind 4 + TypeScript, deployed on Vercel (tamsui-eats.com).

## Data

- All data is static JSON in `src/data/` — no API routes, no database
- `restaurants.json` contains 20 restaurants with lat/lng, tags, hours, prices
- `categories.json` defines 8 dining categories
- Data types and helpers in `src/data/config.ts` (search, filter, proximity sort)

## Conventions

- Server components in `page.tsx`, client interactivity in separate components with `"use client"`
- MUST use `config.ts` helpers — NEVER import JSON directly in pages
- NEVER modify `restaurants.json` structure without updating TypeScript interfaces in `config.ts`
- Scenario tags (親子/約會/一人/外帶) drive homepage buttons and filtering
- Google Maps URLs stored per restaurant — NEVER generate or guess map links
