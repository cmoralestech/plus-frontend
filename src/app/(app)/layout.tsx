"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "@/components/Toast";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import { Mail, X, Crown, UserCircle } from "lucide-react";

function VerificationBanner() {
  const { user } = useAuthStore();
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!user || user.is_verified || dismissed) return null;

  const resend = async () => {
    setSending(true);
    try {
      await api.post("/api/auth/resend-verification");
      setSent(true);
    } catch {}
    setSending(false);
  };

  return (
    <div className="bg-accent/10 border-b border-accent/20 px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <Mail size={16} className="text-accent flex-shrink-0" />
        <p className="text-xs text-foreground">
          {sent ? (
            "Verification email sent! Check your inbox."
          ) : (
            <>
              Verify your email to unlock all features.{" "}
              <button onClick={resend} disabled={sending} className="text-accent font-medium hover:underline">
                {sending ? "Sending..." : "Resend email"}
              </button>
            </>
          )}
        </p>
      </div>
      <button onClick={() => setDismissed(true)} className="text-muted p-1 flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}

function UpgradeNudgeBanner() {
  const { user } = useAuthStore();
  const [dismissed, setDismissed] = useState(true); // default hidden until checked
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    if (!user || user.user_type !== "sugar") return;

    // Check if account is 3+ days old
    const createdAt = new Date(user.created_at);
    const daysSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceCreation < 3) return;

    // Check localStorage dismissal (7-day cooldown)
    const dismissedAt = localStorage.getItem("upgrade_nudge_dismissed");
    if (dismissedAt) {
      const daysSinceDismiss = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 7) return;
    }

    // Fetch subscription tier
    (async () => {
      try {
        const { data } = await api.get("/api/subscription/");
        const tier = data.tier || "free";
        setSubscriptionTier(tier);
        if (tier === "free") {
          setEligible(true);
          setDismissed(false);
        }
      } catch {
        setSubscriptionTier("free");
        setEligible(true);
        setDismissed(false);
      }
    })();
  }, [user]);

  if (!eligible || dismissed) return null;

  // Don't show if verification banner is visible (unverified user)
  if (user && !user.is_verified) return null;

  const handleDismiss = () => {
    localStorage.setItem("upgrade_nudge_dismissed", Date.now().toString());
    setDismissed(true);
  };

  return (
    <div className="px-4 py-2.5 flex items-center justify-between gap-3" style={{ background: "rgba(212, 184, 150, 0.08)", borderBottom: "1px solid rgba(212, 184, 150, 0.12)" }}>
      <div className="flex items-center gap-2 min-w-0">
        <Crown size={14} className="text-accent flex-shrink-0 opacity-70" />
        <p className="text-xs text-muted">
          Unlock unlimited messaging and see who liked you{" "}
          <a href="/settings?tab=subscription" className="text-accent font-medium hover:underline">
            — Upgrade to Premium
          </a>
        </p>
      </div>
      <button onClick={handleDismiss} className="text-muted p-1 flex-shrink-0 hover:text-foreground transition-colors">
        <X size={12} />
      </button>
    </div>
  );
}

function ProfileCompletionBanner() {
  const { user } = useAuthStore();
  const [dismissed, setDismissed] = useState(true);
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user || !user.has_profile) return;

    // Session-only dismissal: use sessionStorage
    const wasDismissed = sessionStorage.getItem("profile_completion_dismissed");
    if (wasDismissed) return;

    (async () => {
      try {
        const { data } = await api.get("/api/profiles/me");
        const hasPhotos = data.photos && data.photos.length > 0;
        const hasBio = !!data.bio;
        const hasHeadline = !!data.headline;

        if (hasPhotos && hasBio && hasHeadline) return; // Profile is complete enough

        // Pick the most impactful missing item
        if (!hasPhotos) setMessage("Add a photo to get 10x more attention");
        else if (!hasBio) setMessage("Write a bio so members know who you are");
        else if (!hasHeadline) setMessage("Add a headline to stand out");

        setDismissed(false);
        setLoaded(true);
      } catch {}
    })();
  }, [user]);

  if (dismissed || !loaded) return null;

  // Don't stack on top of verification banner
  if (user && !user.is_verified) return null;

  const handleDismiss = () => {
    sessionStorage.setItem("profile_completion_dismissed", "1");
    setDismissed(true);
  };

  return (
    <div className="px-4 py-2.5 flex items-center justify-between gap-3" style={{ background: "rgba(234, 179, 8, 0.06)", borderBottom: "1px solid rgba(234, 179, 8, 0.12)" }}>
      <div className="flex items-center gap-2 min-w-0">
        <UserCircle size={14} className="text-yellow-500 flex-shrink-0 opacity-80" />
        <p className="text-xs text-muted">
          {message}{" "}
          <Link href="/profile" className="text-yellow-500 font-medium hover:underline">
            — Complete your profile
          </Link>
        </p>
      </div>
      <button onClick={handleDismiss} className="text-muted p-1 flex-shrink-0 hover:text-foreground transition-colors">
        <X size={12} />
      </button>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div style={{
        "--background": "#141210",
        "--foreground": "#ede6db",
        "--accent": "#d4b896",
        "--accent-light": "#e0c8a8",
        "--accent-dark": "#c4a882",
        "--card": "#1e1b17",
        "--card-border": "#2e2a24",
        "--muted": "#a8a090",
        "--muted-bg": "#252219",
        "--gold": "#d4b896",
        background: "#141210",
        color: "#ede6db",
        minHeight: "100vh",
      } as React.CSSProperties}>
      <NavBar />
      <main className="md:ml-64 pb-24 md:pb-0 min-h-screen">
        <VerificationBanner />
        <UpgradeNudgeBanner />
        <ProfileCompletionBanner />
        {children}
      </main>
      <ToastContainer />
      </div>
    </AuthGuard>
  );
}
