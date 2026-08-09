# Phase 1 — Foundation + Real Signup

Companion to `MVP_PLAN.md` §7. This is the detailed, buildable breakdown of
Phase 1: the first slice of real backend — a database, real auth, and the
onboarding-is-signup bootstrap — everything after this depends on it.

## Definition of done

A new company can:

1. Land on `/onboarding`, fill in admin name/email/password + org name.
2. On submit, a real `Organization` and `User` (Owner role) are created in
   Postgres and the browser has a real authenticated session.
3. Closing the tab and logging back in later resumes onboarding instead of
   losing everything (state lives in the DB, not just `localStorage`).
4. `/onboarding` and `/dashboard` both require a session — no longer open
   to anyone.

RBAC role persistence, workflow-graph → `enabledModules`, employee import,
and any module data screens are **not** part of Phase 1 — see §6.

## Current-state facts (confirmed by reading the code, not assumed)

- `authOptions.ts` exists but has a hardcoded `admin/admin` credentials
  check and is **not wired to a route** — there is no
  `src/app/api/auth/[...nextauth]/route.ts`.
- `sessionProvider.tsx` exists but is not mounted anywhere (root layout has
  no `<SessionProvider>`).
- `/onboarding` and `/dashboard` have zero auth guard today.
- Onboarding's `admin-setup` step collects name/email/recovery-email/2FA —
  **no password field**.
- Onboarding progress lives entirely in `useOnboardingStore`
  (zustand + `localStorage`, key `onescreen-onboarding-storage`) — nothing
  is persisted server-side.
- No `prisma/` directory, no DB client, no `DATABASE_URL` usage anywhere.

## Decisions to lock in for this phase

- **DB/ORM**: PostgreSQL + Prisma (per `MVP_PLAN.md` §2 recommendation —
  flag here again if you want to change it before Phase 1 starts).
- **Password hashing**: `bcrypt` (via `bcryptjs` to avoid native-build pain
  on Windows dev machines).
- **Session strategy**: `next-auth` JWT sessions (no DB session table needed
  for MVP) — `authOptions.callbacks.jwt`/`session` embed `organizationId`
  and `roles`.
- **Providers**: keep `CredentialsProvider`, rewire `authorize()` to hit the
  DB. Drop `GitHubProvider` for MVP unless there's a reason to keep social
  login for internal manufacturing-company users (unlikely) — remove the
  `GITHUB_ID`/`GITHUB_SECRET` env dependency.
- **Local DB for dev**: Postgres via Docker Compose (simplest, no external
  account needed) — a hosted option (Neon/Supabase/Railway) can replace it
  later without changing any application code, only `DATABASE_URL`.

## Task breakdown

### 1. Infra & tooling

- [ ] Add `docker-compose.yml` with a `postgres:16` service for local dev.
- [ ] `npm install prisma @prisma/client bcryptjs` (+ `@types/bcryptjs` dev dep).
- [ ] `npx prisma init` → `prisma/schema.prisma`, `.env` gets `DATABASE_URL`.
- [ ] Add `.env.example` documenting `DATABASE_URL`, `NEXTAUTH_SECRET`,
      `NEXTAUTH_URL` (drop `GITHUB_ID`/`GITHUB_SECRET` if dropping the
      provider).
- [ ] `src/lib/prisma.ts` — singleton `PrismaClient` (Next.js dev
      hot-reload-safe pattern: cache on `globalThis` in non-production).

### 2. Schema (v0 — just enough for signup + session)

```prisma
model Organization {
  id              String   @id @default(cuid())
  name            String
  industry        String?
  size            String?
  region          String?
  onboardingGraph Json?
  enabledModules  String[] @default([])
  createdAt       DateTime @default(now())
  users           User[]
  roles           Role[]
}

model User {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  name           String
  email          String       @unique
  passwordHash   String
  roles          UserRole[]
  createdAt      DateTime     @default(now())
}

model Role {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  name           String
  users          UserRole[]
  permissions    RolePermission[]
}

model UserRole {
  userId String
  roleId String
  user   User @relation(fields: [userId], references: [id])
  role   Role @relation(fields: [roleId], references: [id])

  @@id([userId, roleId])
}

// Global, seeded — not per-organization. One row per module x action.
model Permission {
  id    String @id @default(cuid())
  moduleKey String   // "sales" | "engineering" | ... matches DASHBOARD_MODULES keys
  action    String   // "view" | "manage" for MVP
  key       String   @unique  // "sales.view", "sales.manage"
  label     String            // shown in the RBAC onboarding step
  roles     RolePermission[]
}

model RolePermission {
  roleId       String
  permissionId String
  role         Role       @relation(fields: [roleId], references: [id])
  permission   Permission @relation(fields: [permissionId], references: [id])

  @@id([roleId, permissionId])
}
```

- [ ] Write the schema above (or the agreed adjustment) into
      `prisma/schema.prisma`.
- [ ] `npx prisma migrate dev --name init`.
- [ ] Seed script (`prisma/seed.ts`) is **required** in this phase (not
      optional, unlike the earlier draft) — it must insert the global
      `Permission` rows: one `<moduleKey>.view` and one `<moduleKey>.manage`
      per entry in `DASHBOARD_MODULES`, so the signup flow has permissions
      to attach to the default Owner role. Finer per-module actions
      (approve, export, etc.) get added later as specific screens need
      them, not upfront.

### 3. Onboarding UI change

- [ ] Add a `password` (and `confirmPassword`) field to the `admin-setup`
      step form in `src/app/onboarding/page.tsx` (`AdminSetupForm`).
- [ ] Decide + implement the actual submit trigger: does completing
      `admin-setup` (step 2) immediately create the account, or does step 1
      (`org-profile`) + step 2 need to both be filled before the first real
      write happens? Recommendation: fire the create-account call when
      `admin-setup` is completed, since that's the first point both an org
      name (from step 1's in-memory `orgData`) and admin credentials exist
      together.
- [ ] On success, treat the rest of the wizard (`rbac-setup`,
      `workflow-builder`, `employee-setup`) as authenticated — no schema
      changes needed for those steps yet, they still only touch
      `useOnboardingStore` until Phase 2, but the route itself now requires
      a session.

### 4. Signup + auth wiring

- [ ] `src/app/api/organizations/route.ts` (or a Server Action) —
      `POST` handler: validate input, `bcrypt.hash` the password, create
      `Organization` + `User` + a default `Role` named "Owner" linked via
      `RolePermission` to **every** seeded `Permission` row (owner sees and
      manages everything by default) — all in one Prisma transaction,
      return success.
- [ ] `src/app/api/auth/[...nextauth]/route.ts` — the missing route wiring
      `authOptions` (`GET`/`POST` handlers per next-auth v4 App Router
      convention).
- [ ] Rewrite `authOptions.ts`:
  - Remove `GitHubProvider` (per decision above) or keep if wanted.
  - `CredentialsProvider.authorize`: look up `User` by email, `bcrypt.compare`
    against `passwordHash`, return `{ id, name, email, organizationId }` or
    `null`.
  - `callbacks.jwt`: on first sign-in, copy `organizationId` and resolved
    permissions (flatten the user's `Role.permissions`) onto the token.
  - `callbacks.session`: copy those fields from the token onto
    `session.user` so server components/route handlers can read them.
- [ ] Mount `<SessionProvider>` (`src/auth/sessionProvider.tsx`) in
      `src/app/layout.tsx`, inside/around the existing `ReactQueryProvider`.
- [ ] Wire the onboarding `admin-setup` submit to call
      `next-auth/react`'s `signIn("credentials", {...})` right after the
      organization/user is created, so the session exists before continuing
      to the next step.

### 5. Route guards

- [ ] Add a guard so `/onboarding` and `/dashboard/**` require a session —
      simplest for MVP is a check at the top of `dashboard/layout.tsx` and
      `onboarding/page.tsx` (`getServerSession(authOptions)`, redirect to
      `/login` if absent), or a `middleware.ts` matcher over both paths.
      A `middleware.ts` is preferable once there's more than one protected
      area, since it centralizes the check instead of repeating it per
      layout.
- [ ] Add a minimal `/login` page (email + password form, calls
      `signIn("credentials", ...)`) — currently `authOptions.pages.signIn`
      points at `/auth/signin`, which doesn't exist yet either; pick one
      path and make it consistent.

### 6. Explicitly NOT in Phase 1

- Custom RBAC roles beyond the single default "Owner" role created at
  signup — building roles from the `rbac-setup` step (and letting an admin
  pick which seeded `Permission`s each custom role gets) is Phase 2. The
  global `Permission` table itself is seeded in Phase 1 since it's cheap to
  get right in the first migration; _using_ it to build custom roles is not.
- Persisting `enabledModules` from the workflow-builder graph — Phase 2.
- Employee import creating real invited `User` rows — Phase 2 (and needs
  its own invite/set-password flow, not just an admin-created password).
- `getVisibleModules(session)` / RBAC-filtered sidebar — Phase 3, though
  Phase 1's session shape (`organizationId` + permissions on the JWT) is
  what makes Phase 3 possible without another auth rework.
- Any module data APIs (Sales orders, etc.) — Phase 4.

## Acceptance checklist

- [ ] Fresh Postgres, run migrations, app boots with no manual DB setup
      beyond `docker compose up` + `prisma migrate dev`.
- [ ] Submitting `org-profile` + `admin-setup` with a new email creates one
      `Organization` row and one `User` row (verify via `prisma studio` or
      a quick query).
- [ ] Submitting `admin-setup` with an email that already exists fails with
      a clear error, no duplicate rows.
- [ ] After submitting `admin-setup`, the browser has a session (check
      `useSession()` or the `next-auth.session-token` cookie) without a
      separate manual login step.
- [ ] Logging out and back in with the created credentials works and lands
      back in onboarding (not a fresh unauthenticated state).
- [ ] Visiting `/dashboard` or `/onboarding` with no session redirects to
      `/login` instead of rendering.
