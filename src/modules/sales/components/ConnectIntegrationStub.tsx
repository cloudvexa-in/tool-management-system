"use client";

import { useState } from "react";
import { Plug, X, Webhook, GitMerge } from "lucide-react";

export default function ConnectIntegrationStub() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
      >
        <Plug className="h-4 w-4" /> Connect Customer System
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Webhook className="h-4 w-4 text-indigo-500" />
                Connect an External System
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-sm text-slate-600">
              <p>
                Customers or partners will be able to push orders directly into
                this pipeline — via a webhook, an EDI feed, or their own
                procurement portal — without a sales rep re-typing them.
              </p>
              <div className="flex items-start gap-2 rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                <GitMerge className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-700">
                  This will be configured as a node in the Visual Builder — wire
                  an external source's output straight into this module's input,
                  the same way modules connect to each other.
                </p>
              </div>
              <p className="text-xs text-slate-400 italic">
                Not yet available — coming with the workflow builder
                integration.
              </p>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
