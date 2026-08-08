"use client";

import { useState } from "react";
import Link from "next/link";

export default function EngineeringReviewPage() {
  const [status, setStatus] = useState<"pending" | "approved" | "changes">(
    "pending",
  );

  const [comments, setComments] = useState("");

  const approveFeasibility = () => {
    setStatus("approved");
  };

  const requestChanges = () => {
    setStatus("changes");
  };

  return (
    <main className="min-h-screen bg-blue-50">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white shadow-sm">
              ⚙
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-950">
                Engineering Review
              </h1>

              <p className="text-sm text-slate-500">
                Order Creation &amp; Feasibility
              </p>
            </div>
          </div>

          <Link
            href="/work-orders"
            className="flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            ← Back to Work Order
          </Link>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ===================================================== */}
      <div className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          {/* Step 1 */}
          <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              ✓
            </span>
            Work Order Creation
          </div>

          <div className="h-px w-16 bg-blue-300" />

          {/* Step 2 */}
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              2
            </span>
            Engineering Review
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Phase 2
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-blue-950">
            Engineering Review
          </h2>

          <p className="mt-2 max-w-3xl text-slate-500">
            Review the customer CAD model, tooling specifications and
            manufacturing requirements before approving production feasibility.
          </p>
        </div>

        {/* =====================================================
            WORK ORDER SUMMARY
        ===================================================== */}
        <section className="mb-8 rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-950">
                Work Order Summary
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Information received from the Work Order Creation Portal.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              WO-2026-5832
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <InfoCard label="Customer" value="ABC Manufacturing" />

            <InfoCard label="Part Name" value="Hydraulic Housing" />

            <InfoCard label="Part Number" value="HH-001" />

            <InfoCard label="Quantity" value="500 Units" />
          </div>
        </section>

        {/* =====================================================
            CAD + TOOLING
        ===================================================== */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* =================================================
              CAD PREVIEW
          ================================================= */}
          <section className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-blue-950">
                3D CAD Preview
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Preview the uploaded CAD model before feasibility approval.
              </p>
            </div>

            {/* CAD Preview Placeholder */}
            <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  ◇
                </div>

                <h4 className="mt-4 font-semibold text-blue-900">
                  CAD Model Preview
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  hydraulic-housing.step
                </p>

                <p className="mt-3 text-xs text-blue-500">
                  3D viewer integration can be connected here.
                </p>
              </div>
            </div>

            {/* File Information */}
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-950">
                    hydraulic-housing.step
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    STEP CAD File • Uploaded by Sales
                  </p>
                </div>

                <span className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-blue-600">
                  CAD
                </span>
              </div>
            </div>
          </section>

          {/* =================================================
              TOOLING SPECIFICATIONS
          ================================================= */}
          <section className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-blue-950">
                Tooling Specifications
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Review the required manufacturing and tooling parameters.
              </p>
            </div>

            <div className="space-y-4">
              <SpecificationRow label="Material" value="Aluminium 6061-T6" />

              <SpecificationRow
                label="Machine Type"
                value="5-Axis CNC Machine"
              />

              <SpecificationRow
                label="Required Tool"
                value="Carbide End Mill"
              />

              <SpecificationRow label="Tool Diameter" value="10 mm" />

              <SpecificationRow label="Surface Finish" value="Ra 1.6 μm" />

              <SpecificationRow label="Tolerance" value="±0.02 mm" />
            </div>

            {/* Manufacturing Notes */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Manufacturing Notes
              </p>

              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm leading-6 text-slate-600">
                Component requires precision machining on critical mounting
                surfaces. Verify tool accessibility and fixture requirements
                before production.
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            FEASIBILITY CHECKS
        ===================================================== */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-950">
              Feasibility Assessment
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Confirm that the order can be manufactured according to the
              submitted requirements.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FeasibilityCheck
              title="CAD Geometry"
              description="Part geometry is suitable for manufacturing."
            />

            <FeasibilityCheck
              title="Machine Capability"
              description="Required machine capability is available."
            />

            <FeasibilityCheck
              title="Tool Availability"
              description="Required cutting tools are available."
            />

            <FeasibilityCheck
              title="Material Availability"
              description="Required material can be sourced."
            />
          </div>
        </section>

        {/* =====================================================
            ENGINEERING COMMENTS
        ===================================================== */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-950">
            Engineering Comments
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add any notes or conditions before making the feasibility decision.
          </p>

          <textarea
            value={comments}
            onChange={(event) => setComments(event.target.value)}
            rows={5}
            placeholder="Enter engineering comments, manufacturing concerns or approval conditions..."
            className="mt-5 w-full resize-none rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </section>

        {/* =====================================================
            STATUS
        ===================================================== */}
        {status === "approved" && (
          <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
                ✓
              </div>

              <div>
                <h3 className="font-semibold text-blue-950">
                  Feasibility Approved
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Work order WO-2026-5832 has been approved by Engineering and
                  can proceed to the next manufacturing stage.
                </p>
              </div>
            </div>
          </section>
        )}

        {status === "changes" && (
          <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xl text-white">
                !
              </div>

              <div>
                <h3 className="font-semibold text-amber-900">
                  Changes Requested
                </h3>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Engineering has requested changes before the work order can
                  proceed to production.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            ACTIONS
        ===================================================== */}
        <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-blue-950">Engineering Decision</p>

            <p className="mt-1 text-sm text-slate-500">
              Approve feasibility or request changes from the customer/sales
              team.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={requestChanges}
              className="rounded-xl border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Request Changes
            </button>

            <button
              type="button"
              onClick={approveFeasibility}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Approve Feasibility →
            </button>
          </div>
        </section>

        {/* =====================================================
            NEXT PHASE INDICATOR
        ===================================================== */}
        {status === "approved" && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Feasibility approved. This order can now proceed to the next
              manufacturing workflow stage.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

/* =============================================================
   INFO CARD
============================================================= */

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-semibold text-blue-950">{value}</p>
    </div>
  );
}

/* =============================================================
   SPECIFICATION ROW
============================================================= */

function SpecificationRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-sm font-semibold text-blue-950">{value}</span>
    </div>
  );
}

/* =============================================================
   FEASIBILITY CHECK
============================================================= */

function FeasibilityCheck({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-white p-4">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
        ✓
      </div>

      <div>
        <p className="font-semibold text-blue-950">{title}</p>

        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}
