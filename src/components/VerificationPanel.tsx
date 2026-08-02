"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { BadgeCheck, Lock, ShieldCheck, Loader2 } from "lucide-react";

interface VerificationState {
  identity_verified: boolean;
  financially_verified: boolean;
  financial_verification_method: string | null;
  qualification_result: string;
  expires_at: string | null;
  is_expired: boolean;
  declared_qualifies: boolean;
  declared_basis: string | null;
  provider_configured: boolean;
}

function Step({
  index,
  title,
  body,
  done,
  children,
}: {
  index: number;
  title: string;
  body: string;
  done: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
          done ? "bg-accent text-white" : "bg-muted-bg text-muted"
        }`}
      >
        {done ? <BadgeCheck size={15} /> : String(index).padStart(2, "0")}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted mt-0.5 leading-relaxed">{body}</p>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}

export default function VerificationPanel({ isEstablished }: { isEstablished: boolean }) {
  const [state, setState] = useState<VerificationState | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/api/verification/me");
      setState(data);
    } catch {
      setState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const start = async (which: "identity" | "financial") => {
    setBusy(which);
    setNotice("");
    try {
      const { data } = await api.post(`/api/verification/${which}/start`);
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
        return;
      }
      setNotice(data.reason || "Verification isn't available yet — we'll be in touch.");
    } catch (err: unknown) {
      const detail = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setNotice(detail || "Couldn't start verification. Try again shortly.");
    } finally {
      setBusy(null);
      load();
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-card-border bg-card p-5">
        <Loader2 size={16} className="animate-spin text-muted" />
      </div>
    );
  }
  if (!state) return null;

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5">
      <div className="flex items-center gap-2 mb-1">
        <ShieldCheck size={16} className="text-accent" />
        <h2 className="text-sm font-semibold">Verification</h2>
      </div>
      <p className="text-xs text-muted mb-5 leading-relaxed inline-flex items-start gap-1.5">
        <Lock size={12} className="mt-0.5 flex-shrink-0" />
        <span>
          Private. Your exact financial information is never displayed publicly —
          other members only ever see that you were verified.
        </span>
      </p>

      <div className="space-y-4">
        <Step
          index={1}
          title="Verify your identity"
          body="Government-issued ID and a quick liveness check."
          done={state.identity_verified}
        >
          {!state.identity_verified && (
            <button
              onClick={() => start("identity")}
              disabled={busy === "identity"}
              className="px-3 py-1.5 rounded-full bg-accent text-white text-xs font-medium disabled:opacity-60"
            >
              {busy === "identity" ? "Starting…" : "Start"}
            </button>
          )}
        </Step>

        {isEstablished && (
          <Step
            index={2}
            title="Financial verification — optional"
            body="Entirely up to you. Some members verify income or assets to add a second badge; plenty never do, and it changes nothing else about your account."
            done={state.financially_verified}
          >
            {!state.financially_verified && (
              <>
                <button
                  onClick={() => start("financial")}
                  disabled={busy === "financial" || !state.identity_verified}
                  className="px-3 py-1.5 rounded-full border border-card-border text-xs font-medium hover:border-muted transition-colors disabled:opacity-40"
                >
                  {busy === "financial" ? "Starting…" : "Verify if you want to"}
                </button>
                {!state.identity_verified && (
                  <p className="text-[11px] text-muted mt-1.5">
                    Identity verification comes first.
                  </p>
                )}
              </>
            )}
          </Step>
        )}
      </div>

      {state.financially_verified && state.expires_at && (
        <p className="text-[11px] text-muted mt-4 pt-4 border-t border-card-border">
          Verified until {new Date(state.expires_at).toLocaleDateString()}. We&apos;ll
          ask you to confirm again after that.
        </p>
      )}

      {notice && <p className="text-[11px] text-muted mt-3">{notice}</p>}
    </div>
  );
}
