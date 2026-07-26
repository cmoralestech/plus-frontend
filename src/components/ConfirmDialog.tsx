"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  destructive = false,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="bg-card rounded-2xl border border-card-border w-full max-w-sm p-6 shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            destructive ? "bg-danger/10" : "bg-accent/10"
          }`}>
            <AlertTriangle size={20} className={destructive ? "text-danger" : "text-accent"} />
          </div>
          <div>
            <h2 className="font-bold">{title}</h2>
            <p className="text-sm text-muted mt-1">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="flex-1 py-2.5 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors focus-visible:ring-2 min-h-[44px] ${
              destructive
                ? "bg-danger hover:bg-danger/90 focus-visible:ring-danger"
                : "bg-accent hover:bg-accent-dark focus-visible:ring-accent"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
