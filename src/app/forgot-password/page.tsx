"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    document.title = token ? "Set New Password | Plus" : "Reset Password | Plus";
  }, [token]);

  if (token) {
    return <ResetPasswordForm token={token} />;
  }
  return <RequestResetForm />;
}

function RequestResetForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-sm">
        <h1>
          <Link
            href="/"
            className="text-lg tracking-[0.2em] uppercase font-display text-accent block mb-10 text-center"
          >
            Plus
          </Link>
        </h1>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-success mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">Check your email</h2>
            <p className="text-sm text-muted leading-relaxed">
              If an account exists for <strong className="text-foreground">{email}</strong>,
              we&apos;ve sent a password reset link. It expires in 1 hour.
            </p>
            <p className="text-xs text-muted mt-3">
              Didn&apos;t get it? Check your spam folder or{" "}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-accent hover:underline"
              >
                try again
              </button>
              .
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 mt-6 text-sm text-accent font-medium hover:underline"
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-1">Reset your password</h2>
              <p className="text-sm text-muted">
                Enter your email and we&apos;ll send you a link to create a new password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                  className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <p className="text-danger text-sm bg-danger/10 border border-danger/20 px-4 py-3 rounded-lg" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-h-[48px]"
              >
                {submitting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {submitting ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <Link
              href="/auth"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const passwordStrength = (() => {
    if (!password) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: "Weak", color: "bg-danger", width: "w-1/4" };
    if (score <= 2) return { label: "Fair", color: "bg-orange-400", width: "w-2/4" };
    if (score <= 3) return { label: "Good", color: "bg-accent", width: "w-3/4" };
    return { label: "Strong", color: "bg-success", width: "w-full" };
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await api.post("/api/auth/reset-password", { token, new_password: password });
      setSuccess(true);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string" && detail.toLowerCase().includes("expired")) {
        setError("This reset link has expired. Please request a new one.");
      } else if (typeof detail === "string" && detail.toLowerCase().includes("invalid")) {
        setError("This reset link is invalid or has already been used. Please request a new one.");
      } else {
        setError(detail || "Something went wrong. Please try again.");
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-sm">
        <h1>
          <Link
            href="/"
            className="text-lg tracking-[0.2em] uppercase font-display text-accent block mb-10 text-center"
          >
            Plus
          </Link>
        </h1>

        {success ? (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-success mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">Password updated</h2>
            <p className="text-sm text-muted">
              Your password has been reset. You can now sign in with your new password.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center w-full py-3.5 mt-6 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-1">Set your new password</h2>
              <p className="text-sm text-muted">
                Choose a strong password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    autoFocus
                    className="w-full px-4 py-3 pr-12 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password.length > 0 && passwordStrength && (
                  <div className="mt-2">
                    <div className="h-1 bg-card-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                      />
                    </div>
                    <p className="text-[11px] text-muted mt-1">{passwordStrength.label} password</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-1.5">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                    confirmPassword && confirmPassword !== password
                      ? "border-danger"
                      : "border-card-border"
                  }`}
                  placeholder="Type your password again"
                />
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-danger text-xs mt-1">Passwords don&apos;t match</p>
                )}
              </div>

              {error && (
                <div className="text-danger text-sm bg-danger/10 border border-danger/20 px-4 py-3 rounded-lg" role="alert">
                  <p>{error}</p>
                  {error.includes("request a new one") && (
                    <Link href="/forgot-password" className="text-accent text-xs hover:underline block mt-1">
                      Request a new reset link
                    </Link>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || (!!confirmPassword && confirmPassword !== password)}
                className="w-full py-3.5 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-h-[48px]"
              >
                {submitting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {submitting ? "Updating..." : "Update password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
