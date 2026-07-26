"use client";

import { useState } from "react";
import api from "@/lib/api";

interface Props {
  source?: string;
  compact?: boolean;
}

export default function NewsletterCapture({ source = "blog", compact }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError("");
    setSubmitting(true);
    try {
      await api.post("/api/newsletter/subscribe", { email, source });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className={compact ? "py-3" : "bg-card border border-card-border rounded-xl p-6 my-8"}>
        <p className="text-sm text-success font-medium">You&apos;re in. We&apos;ll send you the good stuff.</p>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 my-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="flex-1 px-4 py-2.5 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 bg-accent text-background text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "..." : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <div className="bg-card border border-card-border rounded-xl p-6 my-8">
      <h3 className="text-base font-semibold mb-1">Get sugar dating tips in your inbox</h3>
      <p className="text-sm text-muted mb-4">
        No spam, no fluff. Just guides, safety tips, and platform updates worth reading.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="flex-1 px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-accent text-background text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {submitting ? "Subscribing..." : "Subscribe free"}
        </button>
      </form>
      {error && <p className="text-danger text-xs mt-2">{error}</p>}
      <p className="text-[11px] text-muted mt-2">Unsubscribe anytime. We don&apos;t share your email.</p>
    </div>
  );
}
