"use client";

import { X } from "lucide-react";

export default function DetailDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]"
      />
      <div className="relative h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex-none px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="min-w-0">
            {subtitle && (
              <p className="text-xs text-slate-400 truncate">{subtitle}</p>
            )}
            <h3 className="font-semibold text-slate-900 truncate">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 flex-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">{children}</div>
      </div>
    </div>
  );
}
