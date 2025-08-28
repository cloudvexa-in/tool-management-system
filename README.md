# 🚀 Next.js Project Template

This repository provides a **scalable Next.js starter template** with production-ready configurations, common utilities, and conventions for faster development.

## 📂 Project Structure

```
/app
  /[routes]       → App Router pages
  /layout.tsx     → Root layout
  /page.tsx       → Default page
/auth             → Next auth
/components       → Reusable components
/hooks            → Custom React hooks
/react-query      → React Query
/seo              → SEO for default page
/state            → Store (Zustand / Redux / Context)
/tests            → Unit and integration tests
/types            → Global TypeScript definitions
/utils            → Helper utilities
```

- **Path aliases** are configured (`@/components`, `@/state`, etc.) for clean imports.
- **Environment variables** managed with `.env.local`.

---

## ⚙️ Core Config

- **TypeScript** (strict mode enabled)
- **ESLint + Prettier** (linting, formatting, import sorting, unused import cleanup)
- **Husky + lint-staged** (pre-commit hooks)
- **Dockerfile** included for containerized deployments

---

## 📡 Data Fetching

- **React Query (TanStack Query)**
  For client-side data fetching, caching, and sync.
  → `lib/queryClient.ts` preconfigured

- **Next.js Server Actions & API Routes**
  Use for server-driven actions and backend endpoints. and use either actions or api route

---

## 🔐 Authentication

- **NextAuth.js** configured with common providers (Google, GitHub, Credentials).
- Supports **custom auth** integration if required.

---

## 🗂️ State Management

- **Lightweight apps** → Zustand or Context Providers.
- **Complex apps** → Redux Toolkit.

---

## 📋 Forms

- **Formik** (with Yup/Zod for schema validation).

---

## 🎨 Styling & UI

- **TailwindCSS** preconfigured.
- **Custom Component Library** → we use our own components, not external UI libs like shadcn.
- **Color configuration** managed via `./tailwind.config.js` + theme tokens.

---

## 🎬 Animations

- **GSAP** → High-performance, complex animations.
- **Motion** → Lightweight component-level animations.

---

## 🔍 SEO

- **next-seo** for meta tags, structured data, and social previews.
- Default configuration in `./src/seo/next-seo.config.ts`.

---

## 🧪 Testing

- **Unit / Integration Tests** → Jest + ts-jest + React Testing Library in `./src/tests`.
- **E2E Tests** → Playwright preconfigured in `./e2e`.

Run tests:

```bash
npm run test        # unit/integration
npm run test:e2e    # end-to-end
```

---

## 🛠️ Developer Experience

- **Error boundaries** and reusable loading states included.
- **API client wrapper** (`fetch`) with interceptors for auth & error handling.
- **Bundle Analyzer** (`@next/bundle-analyzer`) to inspect bundle size.
- **Env validation** → `.env` schema check with Zod.

---

## 📦 Deployment

- Works on **Vercel** out of the box.
- Docker setup available for custom hosting:

```bash
docker build -t nextjs-template .
docker run -p 3000:3000 nextjs-template
```

---

## 📌 Optional Additions

- 🔹 i18n support with `next-intl`
- 🔹 Analytics (PostHog / Plausible / GA4)
- 🔹 Error tracking (Sentry / Axiom)
- 🔹 Performance profiling setup
