"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/lib/api";
import { X } from "lucide-react";

const reasons = [
  { value: "fake_profile", label: "Fake profile" },
  { value: "harassment", label: "Harassment" },
  { value: "inappropriate_content", label: "Inappropriate content" },
  { value: "scam", label: "Scam / fraud" },
  { value: "underage", label: "Underage user" },
  { value: "human_trafficking", label: "Human trafficking / exploitation" },
  { value: "other", label: "Other" },
];

interface ReportModalProps {
  profileId: number;
  profileName: string;
  onClose: () => void;
  onDone: () => void;
}

export default function ReportModal({
  profileId,
  profileName,
  onClose,
  onDone,
}: ReportModalProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async () => {
    if (!reason) {
      setError("Please select a reason");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/api/safety/report/${profileId}`, null, {
        params: { reason, details: details || undefined },
      });
      onDone();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to submit report");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Report ${profileName}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div ref={modalRef} className="bg-card rounded-2xl border border-card-border w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Report {profileName}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close report dialog"
            className="p-2 hover:bg-muted-bg rounded-lg focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-muted mb-4">
          Help us keep the community safe. Select a reason for your report.
        </p>

        <fieldset className="space-y-2 mb-4">
          <legend className="sr-only">Report reason</legend>
          {reasons.map((r) => (
            <button
              key={r.value}
              onClick={() => setReason(r.value)}
              aria-pressed={reason === r.value}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-left font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
                reason === r.value
                  ? "border-danger bg-danger/5 text-danger"
                  : "border-card-border hover:border-muted"
              }`}
            >
              {r.label}
            </button>
          ))}
        </fieldset>

        {reason === "human_trafficking" && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs leading-relaxed">
            <p className="font-semibold text-danger mb-1.5">If someone is in immediate danger, call 911.</p>
            <p className="text-foreground/80 mb-1">You can also contact:</p>
            <ul className="space-y-1 text-foreground/70">
              <li><strong>National Human Trafficking Hotline:</strong>{" "}
                <a href="tel:1-888-373-7888" className="text-accent underline">1-888-373-7888</a>
              </li>
              <li><strong>FBI Tips:</strong>{" "}
                <a href="https://tips.fbi.gov" target="_blank" rel="noopener noreferrer" className="text-accent underline">tips.fbi.gov</a>
              </li>
              <li><strong>Text:</strong> &quot;HELP&quot; to <strong>233733</strong> (BeFree)</li>
            </ul>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="report-details" className="block text-sm font-medium mb-1">
            Additional details (optional)
          </label>
          <textarea
            id="report-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            rows={3}
            maxLength={1000}
            placeholder="Provide more context..."
          />
        </div>

        {error && (
          <p className="text-danger text-sm bg-danger/5 px-3 py-2 rounded-lg mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || !reason}
            className="flex-1 py-2.5 bg-danger text-white rounded-lg text-sm font-semibold hover:bg-danger/90 transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-danger"
          >
            {submitting ? "Submitting..." : "Submit report"}
          </button>
        </div>
      </div>
    </div>
  );
}
