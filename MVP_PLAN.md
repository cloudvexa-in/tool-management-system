# MVP Plan — Smart Manufacturing Platform (OneScreen)

Living planning doc. Edit this directly as decisions change — it is the
source of truth for scope, not a one-time snapshot. Items marked
**OPEN DECISION** are things we discussed but have not committed to; resolve
them here before/while building the related piece.

---

## 1. Product shape (decided so far)

- **One dashboard, not per-department portals.** Every internal role logs
  into the same shell; the sidebar and route access are filtered by
  RBAC × the modules the org enabled during onboarding. Splitting into
  separate portals would recreate the departmental silos the product exists
  to remove.
- **Modular monolith now, not micro-frontends.** One Next.js app, one deploy.
  Each module (`src/modules/<name>`) is a self-contained vertical slice
  (components/hooks/utils/api/store) that only exposes an `index.tsx` public
  entry, enforced by `eslint-plugin-boundaries`. This keeps the option to
  split a module into its own deployable zone later without a rewrite, but
  we don't pay that operational cost until a module actually needs it
  (separate team, separate release cadence).
- **Nav is dynamic, computed server-side**, not a hardcoded list:
  `visibleModules = ALL_MODULES.filter(enabledForOrg).filter(allowedForRole)`.
  This must also gate the route itself (layout/middleware guard), not just
  hide the sidebar link — otherwise it's cosmetic, not access control.
- **Device/context-based layout variants, not role-based portals.** If/when
  shop-floor terminals are real, machine/tool-crib screens get a leaner
  kiosk layout (no sidebar, one task, big touch targets) reusing the same
  module data — not a separate app.
- **Onboarding _is_ signup — the admin account is created at step 1, not
  deferred to the end of the wizard.** A company's very first session
  creates the `Organization` + first `User` (Owner/Admin role) as soon as
  the first onboarding step is submitted, with a real session established
  immediately after. Every later step (org profile detail, RBAC, workflow
  builder, employee import) then runs authenticated against that org and
  can be saved incrementally — matching the existing "Save & Exit" /
  resume-checklist UI, which today has nothing real to resume into. See
  `PHASE_1_PLAN.md` for the concrete implementation of this.

## 2. OPEN DECISIONS (resolve before/while building)

- [ ] **Is "ERP" its own module, or an umbrella?**
      Option A: a 10th module covering what nothing else owns yet —
      Purchase/Procurement (workflow step 10), Cost Estimation & Quotation
      (step 3). Option B: restructure the nav into two sections — "ERP"
      (Sales, Purchase, Inventory/Warehouse, Work Orders) and "Shop Floor"
      (Tool Room, Presetter, Machine, Quality, Production) — which changes
      `dashboardModules.ts` to need a `category` field and a grouped sidebar.
- [ ] **Sales & CRM UI**: kanban for the pre-PO pipeline (draft → quoted →
      approved) + table for confirmed Sales Orders, toggled over the same
      data. Confirm this is the direction before building it out — includes
      whether quotation/negotiation lives in this platform at all, or stays
      in email/Excel and Sales & CRM only starts at a confirmed PO.
- [ ] **Shop-floor kiosk layout**: are there real tablets/terminals at
      machines/tool crib planned for MVP, or is every role at a desk for
      now? Decides whether the kiosk layout is in-scope or deferred.
- [ ] **Customer-facing portal**: do customers ever get direct login (to
      approve a quotation, see PO/order status)? If yes, this is a genuinely
      separate portal (different trust boundary, different auth) — not part
      of the internal RBAC dashboard. Default assumption: **out of scope**
      for MVP, approval happens outside the platform.
- [ ] **Backend runtime**: REQUIREMENT.md lists "Spring Boot / Node.js" as
      an option. Recommendation below assumes **Next.js Route Handlers /
      Server Actions in this same repo** for MVP (matches the modular
      monolith decision, avoids standing up + auth'ing a second service
      before there's a reason to). Confirm, or say if a separate backend
      service is wanted from day one.
- [ ] **ORM/DB driver**: recommendation is **Prisma + PostgreSQL**
      (matches REQUIREMENT.md's Postgres choice, good multi-tenant DX,
      typed client). Confirm, or name a preferred alternative (Drizzle,
      raw SQL, etc).

## 3. Non-goals for MVP (explicitly deferred)

Call these out so they don't creep in mid-build:

- Real CAD/CAM/CNC/Tool-Presetter/ERP system integrations (Zoller, Siemens
  NX, SAP, etc.) — modules ship with our own data model first; integration
  adapters come later per REQUIREMENT.md's "Future Enhancements."
- Real-time machine telemetry / WebSocket live dashboards — stub with
  polling or static data; wire up real streams post-MVP.
- AI prediction (tool failure, downtime, rejection probability).
- Shop-floor kiosk layout and customer portal — unless the open decisions
  above say otherwise.
- Mobile apps, multi-language.
- Fine-grained per-tenant configurable screens (see prior discussion —
  premature before a second customer tells us what actually varies).

## 4. Data model (v0 sketch)

Multi-tenant: every domain row hangs off an `Organization`. This is the
core scaffolding everything else (auth, RBAC, module gating, onboarding)
depends on — build this first.

```
Organization
  id, name, industry, size, region, createdAt
  onboardingGraph      Json        // raw React Flow graph from the visual builder
  enabledModules       String[]    // module keys derived from onboardingGraph, e.g. ["sales","engineering",...]

User
  id, organizationId (FK), name, email, passwordHash, createdAt

Role
  id, organizationId (FK), name          // e.g. "Manager", "Operator" — created in onboarding RBAC step

UserRole                                  // join table, supports multiple roles per user later
  userId (FK), roleId (FK)

Permission                                // global, seeded — not per-organization
  id, moduleKey   // "sales" | "engineering" | ... — matches DASHBOARD_MODULES keys
  action          // "view" | "manage" for MVP (finer per-module actions added later, not upfront)
  key             // unique slug, e.g. "sales.view", "sales.manage" — checked in code
  label           // human-readable, shown in the RBAC onboarding step

RolePermission                            // join table: which permissions a role grants
  roleId (FK), permissionId (FK)
```

`Permission` is a **global, seeded** table (one row per module × action,
shipped with the platform) — organizations don't define their own
permissions, they only compose them into `Role`s via `RolePermission`. This
replaces the earlier idea of a static in-code `ModulePermission` map: module
access is now a real relation (`Role → RolePermission → Permission`), so
"can this role view/manage module X" is a join, not a lookup against a
hardcoded list — and the onboarding RBAC step's permission checkboxes
render directly from this table instead of the currently-hardcoded
`PREDEFINED_PERMISSIONS` array in `onboarding/page.tsx`.

Per-module domain tables (e.g. `SalesOrder`, `WorkOrder`, `Tool`,
`MachineLog`) get added module-by-module as each is built, not all upfront.
`src/modules/sales/types.ts` already has a `SalesOrder` shape to start from.

## 5. Auth & RBAC plan

- Current state (confirmed in code): `authOptions.ts` has a hardcoded
  `admin/admin` credentials check and a GitHub provider, but **isn't even
  wired to a route** — there's no `src/app/api/auth/[...nextauth]/route.ts`
  yet, and `sessionProvider.tsx` isn't mounted in the root layout. `/onboarding`
  and `/dashboard` are open to anyone, no session required. This is all
  replaced in Phase 1 — see `PHASE_1_PLAN.md`.
- Signup/bootstrap order (decided): the first onboarding step collects admin
  name + email + **password** (missing today) + org name, and submitting it
  creates the `Organization` + first `User` (Owner role) and a real session
  — not deferred to the end of the wizard. Rest of onboarding runs
  authenticated from that point on.
- Session/JWT payload needs: `userId`, `organizationId`, resolved `roles`
  (or permissions) — computed once at sign-in, refreshed on role change.
- `getVisibleModules(session)` reads `session.organizationId` →
  `Organization.enabledModules`, and intersects it with whichever
  `moduleKey`s the session's roles hold a `<moduleKey>.view` `Permission`
  for (via `Role → RolePermission → Permission`). Used in both
  `DashboardSidebar` (render) and `dashboard/layout.tsx` (guard: redirect
  away from a module route the session can't reach).
- Onboarding's RBAC step (`rbac-setup`) currently only writes to the
  client-only `useOnboardingStore` (zustand + localStorage). It needs a
  real submit step that persists `Role` rows (and the org's
  `enabledModules`, derived from the visual builder graph) to the database
  — onboarding output becomes server-side fact, not just client state.
  This lands in Phase 2 once the org/user bootstrap from Phase 1 exists.

## 6. Module-by-module MVP scope

Keep each module's first cut intentionally thin — a working vertical slice
end-to-end (DB → API → UI) beats a polished UI with no backend.

| Module                | MVP screen                                                        | Notes                                                                     |
| --------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Sales & CRM           | Kanban (pipeline) + table (orders), toggle                        | see open decision above                                                   |
| Engineering & PLM     | Table of BOMs/process plans, detail view                          | CAD/CAM stays external link/upload for MVP, no live integration           |
| PPC                   | Table of work orders with schedule/status                         | Gantt/calendar view is a fast-follow, not MVP                             |
| Tool Room / Tool Crib | Table: tool inventory + stock level + issue/return log            | Threshold alert banner using existing min-stock logic from REQUIREMENT.md |
| Tool Presetter        | Simple form + table of recorded offsets per tool                  | No live device integration in MVP                                         |
| Machine (IoT)         | Table: machine list + status (manual/stubbed, not live telemetry) | Real IoT ingestion deferred                                               |
| Production            | Table: shift log + job status                                     |                                                                           |
| Quality               | Table: inspection records + pass/fail                             |                                                                           |
| Warehouse             | Table: stock levels + movements                                   |                                                                           |

All "table" screens share one pattern: a data table component + detail
drawer/page, backed by a Route Handler doing `select * from <table> where
organization_id = ?`. Build that pattern once (in `modules/shared`) and
reuse it, rather than one-off tables per module.

## 7. Phased roadmap

- [x] **Phase 0 — done**: dashboard shell, per-module route/lazy-load
      scaffold, module isolation lint rule, static `DASHBOARD_MODULES` list.
- [ ] **Phase 1 — foundation + real signup**: Postgres + Prisma wired up,
      `Organization` / `User` / `Role` schema, real auth (replace stubbed
      credentials provider), and the onboarding-is-signup bootstrap (admin +
      org created for real at step 1, session established). Full breakdown
      in `PHASE_1_PLAN.md`.
- [ ] **Phase 2 — rest of onboarding writes real data**: RBAC step persists
      `Role` rows, workflow-builder step persists `enabledModules` (derived
      from the visual builder graph), employee import persists invited
      `User` rows — all authenticated against the org created in Phase 1.
- [ ] **Phase 3 — dynamic nav**: replace the static module list with
      `getVisibleModules(session)`; add the route-level guard in
      `dashboard/layout.tsx`.
- [ ] **Phase 4 — module backends**: one module at a time, starting with
      Sales & CRM (already has a `SalesOrder` type and a stubbed
      `useSalesOrdersQuery` to wire up to a real Route Handler + DB table).
- [ ] **Phase 5 — resolve open decisions**: ERP module/umbrella call,
      shop-floor kiosk layout (if needed), ModulePermission table if the
      static map stops being enough.

---

### How to use this file

Check items off as they land, edit scope inline as decisions change, and
add new open decisions under §2 as they come up rather than deciding them
silently mid-implementation.
