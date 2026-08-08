"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  X,
  CheckCircle2,
  ClipboardList,
  Building2,
  Package,
  Sparkles,
} from "lucide-react";

type UploadedFile = {
  name: string;
  size: number;
  type: string;
};

export default function WorkOrderPage() {
  const [customer, setCustomer] = useState("");
  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [cadFiles, setCadFiles] = useState<UploadedFile[]>([]);
  const [specFiles, setSpecFiles] = useState<UploadedFile[]>([]);
  const [generated, setGenerated] = useState(false);

  // Generate the ID only on the client to prevent hydration errors.
  const [workOrderId, setWorkOrderId] = useState("");

  useEffect(() => {
    const id = `WO-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    setWorkOrderId(id);
  }, []);

  const handleFiles = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "cad" | "spec",
  ) => {
    const files = Array.from(event.target.files || []);

    const formattedFiles = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    if (type === "cad") {
      setCadFiles((prev) => [...prev, ...formattedFiles]);
    } else {
      setSpecFiles((prev) => [...prev, ...formattedFiles]);
    }

    event.target.value = "";
  };

  const removeFile = (index: number, type: "cad" | "spec") => {
    if (type === "cad") {
      setCadFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSpecFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const generateWorkOrder = () => {
    if (!customer || !partName || !partNumber || !quantity) {
      alert("Please complete all required fields.");
      return;
    }

    setGenerated(true);
  };

  const submitForEngineering = () => {
    window.location.href = "/engineering-review";
  };

  return (
    <main className="min-h-screen bg-blue-50">
      {/* ================= HEADER ================= */}
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <ClipboardList size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-950">
                Work Order Creation
              </h1>

              <p className="text-sm text-slate-500">
                Order Creation &amp; Feasibility
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>
      </header>

      {/* ================= PROGRESS ================= */}
      <div className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
              1
            </span>
            Work Order Creation
          </div>

          <div className="h-px w-16 bg-blue-100" />

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
              2
            </span>
            Engineering Review
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* PAGE HEADING */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={17} className="text-blue-600" />

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Phase 2
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-blue-950">
            Work Order Creation Portal
          </h2>

          <p className="mt-2 max-w-3xl text-slate-500">
            Create a manufacturing work order, upload CAD files and customer
            specifications, then submit it for engineering feasibility review.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ================= LEFT SIDE ================= */}
          <section className="space-y-8 lg:col-span-2">
            {/* CUSTOMER DETAILS */}
            <div className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Building2 size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-blue-950">
                    Customer &amp; Order Details
                  </h3>

                  <p className="text-sm text-slate-500">
                    Enter the basic work order information.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* CUSTOMER */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Customer Name *
                  </label>

                  <input
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Enter customer name"
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* QUANTITY */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Quantity *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* PART NAME */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Part / Product Name *
                  </label>

                  <input
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    placeholder="Example: Hydraulic Housing"
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* PART NUMBER */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Part Number *
                  </label>

                  <input
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                    placeholder="Example: HH-001"
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Customer / Part Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Enter additional manufacturing requirements..."
                  className="w-full resize-none rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* CAD FILES */}
            <UploadSection
              title="CAD Files"
              description="Upload the customer's CAD models for engineering review."
              files={cadFiles}
              accept=".step,.stp,.iges,.igs,.dwg,.dxf,.sldprt,.stl"
              onChange={(e) => handleFiles(e, "cad")}
              onRemove={(index) => removeFile(index, "cad")}
            />

            {/* CUSTOMER SPECIFICATIONS */}
            <UploadSection
              title="Customer Specifications"
              description="Upload drawings, specifications, PDFs or supporting documents."
              files={specFiles}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
              onChange={(e) => handleFiles(e, "spec")}
              onRemove={(index) => removeFile(index, "spec")}
            />

            {/* GENERATE */}
            <div className="flex justify-end">
              <button
                onClick={generateWorkOrder}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Generate Work Order Card
                <ArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* ================= RIGHT SIDE ================= */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Package size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-blue-950">
                    Work Order Preview
                  </h3>

                  <p className="text-xs text-slate-500">
                    Generated information
                  </p>
                </div>
              </div>

              {generated ? (
                <div className="space-y-5">
                  {/* WORK ORDER ID */}
                  <div className="rounded-xl bg-blue-600 p-5 text-white shadow-sm">
                    <p className="text-xs uppercase tracking-wider text-blue-100">
                      Work Order ID
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {workOrderId || "Generating..."}
                    </p>
                  </div>

                  <SummaryRow label="Customer" value={customer} />

                  <SummaryRow label="Part" value={partName} />

                  <SummaryRow label="Part Number" value={partNumber} />

                  <SummaryRow label="Quantity" value={quantity} />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      CAD Files
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {cadFiles.length} file(s)
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Specifications
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {specFiles.length} file(s)
                    </p>
                  </div>

                  {/* SUCCESS */}
                  <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm font-medium text-blue-700">
                    <CheckCircle2 size={17} />
                    Work order generated
                  </div>

                  {/* ENGINEERING REVIEW */}
                  <button
                    onClick={submitForEngineering}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                  >
                    Submit for Engineering Review
                    <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-blue-100 bg-blue-50/50 p-7 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
                    <ClipboardList size={25} />
                  </div>

                  <p className="mt-4 font-semibold text-blue-950">
                    No work order generated
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Complete the required information and generate the work
                    order card.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   UPLOAD SECTION
============================================================ */

function UploadSection({
  title,
  description,
  files,
  accept,
  onChange,
  onRemove,
}: {
  title: string;
  description: string;
  files: UploadedFile[];
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
      <h3 className="font-semibold text-blue-950">{title}</h3>

      <p className="mt-1 text-sm text-slate-500">{description}</p>

      {/* UPLOAD AREA */}
      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
          <Upload size={24} />
        </div>

        <p className="mt-4 font-semibold text-blue-900">
          Click to upload files
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Select one or multiple files
        </p>

        <p className="mt-2 text-xs text-blue-500">
          Supported file types available
        </p>

        <input
          type="file"
          multiple
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </label>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div className="mt-5 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/50 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600">
                  <FileText size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {file.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemove(index)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-red-500"
                aria-label={`Remove ${file.name}`}
              >
                <X size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SUMMARY ROW
============================================================ */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
