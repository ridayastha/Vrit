This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




# 🛍️ Vrit Ecommerce Dashboard

A production-style e-commerce admin dashboard built with **Next.js 15 (App Router)** and **TypeScript**, integrating the [Fake Store API](https://fakestoreapi.com/docs). Built to demonstrate server-side rendering, clean API abstraction, and scalable component architecture.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/State-Zustand-orange)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-black)

---

## ✨ Overview

Vrit is an e-commerce catalog and cart dashboard that fetches product data server-side, lets users filter/search/sort on the client, and manages a fully persistent shopping cart — all without a single unnecessary client-server round trip.

It was built as a technical assessment covering:
- ✅ Server-Side Rendering (SSR)
- ✅ API handling & abstraction
- ✅ Client + persisted state management
- ✅ Component architecture & reusability
- ✅ End-to-end TypeScript
- ✅ Clean, maintainable code practices

---

## 🚀 Features

### Dashboard
- Live stats pulled server-side: total products, categories, average price
- Quick-access CTA into the product catalog

### Product Catalog (`/products`)
- **Server-rendered** product listing — no client-side loading spinner on first paint
- **Server-side sorting** via the API's native `?sort=asc|desc` param (dispatched through a URL navigation so the Server Component re-fetches)
- **Client-side filtering** layered on top of the server-fetched data: search by name, filter by category, filter by price range
- Client-side pagination over the filtered result set
- Responsive card grid with image, title, category badge, star rating, and price

### Product Detail (`/products/[id]`)
- Fully server-rendered dynamic route
- Per-product `generateMetadata` for SEO-friendly titles/descriptions
- Graceful `not-found` page for invalid product IDs

### Shopping Cart (`/cart`)
- Add to cart with quantity selection, update quantities, remove items
- Order summary with itemized total, shipping threshold logic, and grand total
- **Persisted to `localStorage`** — cart survives page refreshes and browser restarts
- Hydration-safe rendering (no mismatch flicker between server and persisted client state)

### Resilience
- **Custom API interceptor** (`lib/api/client.ts`) wraps every request: timeout handling (`AbortController`), consistent JSON parsing, and a typed `ApiError` for every failure mode
- **Automatic mock-data fallback** — if the Fake Store API is unreachable (5xx, network error, or timeout), the app transparently serves local fallback data instead of crashing, so the UI stays usable
- Route-level `loading.tsx` and `error.tsx` boundaries throughout, plus a top-level React `ErrorBoundary` for render-time failures

---

## 🧱 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Native Server Components for true SSR |
| Language | TypeScript | Fully typed API responses, props, and store state |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration, consistent design tokens |
| UI Primitives | shadcn/ui | Accessible, unstyled-by-default components (Button, Card, Sidebar, Pagination, InputGroup) |
| Icons | Remix Icon (`@remixicon/react`) | Single consistent icon set across the app |
| State (cart) | Zustand + `persist` middleware | Minimal boilerplate, built-in localStorage persistence, no Context re-render overhead |
| Data fetching | Native `fetch` (no Axios) | Leverages Next.js's built-in request caching/revalidation |

---

## 📁 Project Structure
