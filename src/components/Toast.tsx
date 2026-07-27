"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart, CheckCircle, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "like" | "match";

interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
}

let toastId = 0;
const listeners: Set<(toast: ToastMessage) => void> = new Set();

export function showToast(type: ToastType, text: string) {
  const toast: ToastMessage = { id: ++toastId, type, text };
  listeners.forEach((fn) => fn(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (toast: ToastMessage) => {
      setToasts((prev) => [...prev.slice(-4), toast]); // Keep max 5
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[80] flex flex-col gap-2 max-w-sm" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle size={18} className="text-success" />,
          error: <AlertCircle size={18} className="text-danger" />,
          like: <Heart size={18} className="text-accent" />,
          match: <Heart size={18} className="text-accent fill-accent" />,
        };
        const bg = toast.type === "match"
          ? "bg-accent text-[#F5EDE4]"
          : "bg-card border border-card-border text-foreground";

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${bg} animate-[slideIn_0.2s_ease-out]`}
          >
            {toast.type !== "match" && icons[toast.type]}
            <p className="text-sm font-medium flex-1">{toast.text}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="p-0.5 opacity-60 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
