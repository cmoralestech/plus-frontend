"use client";

import { useState } from "react";
import api from "@/lib/api";
import { CheckCircle } from "lucide-react";

const categories = [
  { value: "", label: "Select a topic..." },
  { value: "general", label: "General question" },
  { value: "account", label: "Account issue" },
  { value: "billing", label: "Billing & subscription" },
  { value: "safety", label: "Safety concern" },
  { value: "bug", label: "Bug report" },
  { value: "press", label: "Press inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email || !category || message.trim().length < 20) {
      setError("Please fill out all fields. Message must be at least 20 characters.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      await api.post("/api/contact", { name: name.trim(), email, category, message: message.trim() });
      setSubmitted(true);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (err.response?.status === 429) {
        setError("You've sent too many messages. Please try again in an hour, or email us directly at support@meetyourplus.com.");
      } else if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map((d: any) => d.msg).join(". "));
      } else {
        setError("Something went wrong. Please try emailing support@meetyourplus.com directly.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Message sent</h3>
        <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
          We&apos;ve sent a confirmation to <strong className="text-foreground">{email}</strong>.
          Expect a reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setCategory("");
            setMessage("");
          }}
          className="mt-6 text-sm text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-category" className="block text-sm font-medium mb-1.5">
          Topic
        </label>
        <select
          id="contact-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent appearance-none"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value} disabled={c.value === ""}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          maxLength={5000}
          className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-y min-h-[120px]"
          placeholder="Tell us what's going on..."
        />
        <p className="text-xs text-muted mt-1">
          {message.length < 20 && message.length > 0
            ? `${20 - message.length} more characters needed`
            : "\u00A0"}
        </p>
      </div>

      {error && (
        <p className="text-danger text-sm bg-danger/10 border border-danger/20 px-4 py-3 rounded-lg" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-8 py-3.5 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 flex items-center gap-2 min-h-[48px]"
      >
        {submitting && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
