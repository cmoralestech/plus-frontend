"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import { trackFunnel } from "@/lib/track";
import {
  Shield, Lock, Crown, Bell, BellOff, UserX, LogOut, Loader2,
  Search, Image, BookOpen, MessageCircle, Clock, Eye, EyeOff,
  KeyRound, Mail, Heart, Sparkles, ExternalLink, ChevronRight,
  Trash2, AlertTriangle, Check, X,
} from "lucide-react";

interface PrivacySettings {
  hide_profile: boolean;
  hide_online_status: boolean;
  hide_from_search: boolean;
  blur_photos_for_non_matches: boolean;
  hide_income: boolean;
  hide_read_receipts: boolean;
  hide_last_seen: boolean;
  private_browsing: boolean;
}

interface NotifPrefs {
  new_match: boolean;
  new_message: boolean;
  new_like: boolean;
  profile_view: boolean;
  email_matches: boolean;
  email_messages: boolean;
  email_promotions: boolean;
  email_tips: boolean;
}

interface SubInfo {
  tier: string;
  is_active: boolean;
  features: string[];
  can_upgrade: boolean;
}

interface BlockedUser {
  profile_id: number;
  display_name: string;
  city: string | null;
  blocked_at: string;
}

const PREMIUM_FIELDS = new Set([
  "hide_from_search", "blur_photos_for_non_matches", "hide_income",
  "hide_read_receipts", "hide_last_seen", "private_browsing",
]);

const privacyMeta: Record<string, { label: string; desc: string; icon: React.ElementType; tier: string }> = {
  hide_profile: { label: "Hide profile", desc: "Profile won't appear anywhere", icon: EyeOff, tier: "free" },
  hide_online_status: { label: "Hide online status", desc: "Others won't see when you're active", icon: Clock, tier: "free" },
  hide_from_search: { label: "Hide from search", desc: "Don't appear in discover feed", icon: Search, tier: "plus" },
  blur_photos_for_non_matches: { label: "Blur photos", desc: "Only matches see clear photos", icon: Image, tier: "plus" },
  hide_income: { label: "Hide income", desc: "Don't show financial info on profile", icon: BookOpen, tier: "plus" },
  hide_read_receipts: { label: "Hide read receipts", desc: "Others won't know you read their messages", icon: MessageCircle, tier: "plus_plus" },
  hide_last_seen: { label: "Hide last seen", desc: "Your last active time stays private", icon: Clock, tier: "plus_plus" },
  private_browsing: { label: "Private browsing", desc: "Browse profiles without being seen", icon: UserX, tier: "plus_plus" },
};

const notifMeta: Record<string, { label: string; icon: React.ElementType; section: string }> = {
  new_match: { label: "New matches", icon: Heart, section: "push" },
  new_message: { label: "New messages", icon: MessageCircle, section: "push" },
  new_like: { label: "Someone liked you", icon: Sparkles, section: "push" },
  profile_view: { label: "Profile views", icon: Eye, section: "push" },
  email_matches: { label: "Match notifications", icon: Heart, section: "email" },
  email_messages: { label: "Message notifications", icon: MessageCircle, section: "email" },
  email_promotions: { label: "Promotions & offers", icon: Crown, section: "email" },
  email_tips: { label: "Tips & suggestions", icon: Sparkles, section: "email" },
};

function Toggle({ checked, onChange, disabled, label }: {
  checked: boolean; onChange: () => void; disabled?: boolean; label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      disabled={disabled}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      } ${checked ? "bg-accent" : "bg-card-border"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function SettingsPage() {
  return <Suspense><SettingsContent /></Suspense>;
}

function SettingsContent() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "subscription" ? "subscription" as const : "account" as const;
  const [tab, setTab] = useState<"account" | "privacy" | "notifications" | "subscription" | "blocked">(initialTab);
  const [privacy, setPrivacy] = useState<PrivacySettings | null>(null);
  const [notifs, setNotifs] = useState<NotifPrefs | null>(null);
  const [sub, setSub] = useState<SubInfo | null>(null);
  const [blocked, setBlocked] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password change
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // Deactivation
  const [showDeactivate, setShowDeactivate] = useState(false);

  // Deletion
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Billing cycle toggle
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Cancel subscription — multi-step save flow
  const [cancelStep, setCancelStep] = useState<0 | 1 | 2>(0); // 0=closed, 1=sorry/what you'll lose, 2=reason+cancel
  const [cancellingSubscription, setCancellingSubscription] = useState(false);
  const [cancelledUntil, setCancelledUntil] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    (async () => {
      // If returning from Stripe checkout, verify and activate subscription
      const status = searchParams.get("status");
      if (status === "success") {
        try {
          await api.post("/api/billing/verify-checkout");
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'purchase', {
              value: 99.99,
              currency: 'USD',
              transaction_id: 'sub_' + Date.now(),
            });
          }
          // Meta Pixel: Purchase
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {value: 99.99, currency: 'USD'});
          }
        } catch {}
      } else if (status === "cancelled") {
        trackFunnel("checkout_cancelled", { source: "stripe_return" });
      }

      try {
        const [privRes, subRes, notifRes] = await Promise.all([
          api.get("/api/subscription/privacy"),
          api.get("/api/subscription/"),
          api.get("/api/account/notifications"),
        ]);
        setPrivacy(privRes.data);
        setSub(subRes.data);
        setNotifs(notifRes.data);
        if (status === "success") {
          setTab("subscription");
          setSuccess("Subscription activated!");
        }
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load settings");
      }
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBlocked = async () => {
    try {
      const { data } = await api.get("/api/account/blocked");
      setBlocked(data);
    } catch {}
  };

  useEffect(() => {
    if (tab === "blocked") loadBlocked();
    if (tab === "subscription") trackFunnel("subscription_tab_viewed");
  }, [tab]);

  const handlePrivacyToggle = async (field: keyof PrivacySettings) => {
    if (!privacy) return;
    setSaving(field);
    setError("");
    try {
      const { data } = await api.patch("/api/subscription/privacy", { [field]: !privacy[field] });
      setPrivacy(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update");
    }
    setSaving(null);
  };

  const handleNotifToggle = async (field: keyof NotifPrefs) => {
    if (!notifs) return;
    setSaving(field);
    try {
      const { data } = await api.patch("/api/account/notifications", { [field]: !notifs[field] });
      setNotifs(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update");
    }
    setSaving(null);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      setError("Passwords don't match");
      return;
    }
    setError("");
    setSaving("password");
    try {
      await api.post("/api/account/change-password", {
        current_password: currentPw,
        new_password: newPw,
      });
      setSuccess("Password changed successfully");
      setShowPasswordForm(false);
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to change password");
    }
    setSaving(null);
  };

  const handleUnblock = async (profileId: number) => {
    try {
      await api.delete(`/api/safety/block/${profileId}`);
      setBlocked((prev) => prev.filter((b) => b.profile_id !== profileId));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to unblock");
    }
  };

  const handleDeactivate = async () => {
    try {
      await api.post("/api/account/deactivate");
      logout();
      router.push("/auth");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to deactivate");
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setError("");
    try {
      await api.delete("/api/account/delete-account");
      logout();
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete account");
      setDeleting(false);
    }
  };

  const handleCancelSubscription = async (reason: string) => {
    setCancellingSubscription(true);
    setError("");
    try {
      const { data } = await api.post("/api/billing/cancel");
      trackFunnel("subscription_cancelled", { reason });
      setCancelledUntil(data.access_until || null);
      setSuccess(
        data.access_until
          ? `Your subscription has been cancelled. You'll have access until ${data.access_until}.`
          : "Your subscription has been cancelled. You'll have access until the end of your billing period."
      );
      setCancelStep(0);
      setCancelReason("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to cancel subscription");
    }
    setCancellingSubscription(false);
  };

  const tierLabel = (t: string) => t === "plus_plus" ? "Plus+" : t === "plus" ? "Plus" : "Free";
  const tierColor = (t: string) => t === "plus_plus" ? "text-accent" : t === "plus" ? "text-accent" : "text-muted";

  const tabs = [
    { id: "account" as const, label: "Account", icon: Shield },
    { id: "privacy" as const, label: "Privacy", icon: Lock },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "subscription" as const, label: "Subscription", icon: Crown },
    { id: "blocked" as const, label: "Blocked", icon: UserX },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Mobile: stacked list navigation */}
      <div className="md:hidden mb-4">
        <div className="bg-card rounded-xl border border-card-border overflow-hidden divide-y divide-card-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setError(""); setSuccess(""); }}
              className={`flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium transition-colors ${
                tab === t.id ? "bg-accent/5 text-accent" : "text-foreground"
              }`}
            >
              <t.icon size={18} className={tab === t.id ? "text-accent" : "text-muted"} />
              <span className="flex-1 text-left">{t.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal tabs */}
      <div className="hidden md:flex gap-1.5 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setError(""); setSuccess(""); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors min-h-[44px] ${
              tab === t.id ? "bg-accent/10 text-accent" : "text-muted hover:bg-muted-bg"
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="text-danger text-sm bg-danger/5 px-3 py-2 rounded-lg mb-4" role="alert">{error}</p>}
      {success && <p className="text-success text-sm bg-success/5 px-3 py-2 rounded-lg mb-4" role="status">{success}</p>}

      {/* Account tab */}
      {tab === "account" && (
        <div className="space-y-4">
          <section className="bg-card rounded-xl border border-card-border p-5">
            <h2 className="font-semibold mb-4">Account details</h2>
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted">Email</dt>
                <dd className="font-medium">{user?.email}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">Account type</dt>
                <dd className="font-medium capitalize">
                  {user?.user_type === "sugar" ? "Successful member" : "Attractive member"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">Member since</dt>
                <dd className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "\u2014"}</dd>
              </div>
            </dl>
          </section>

          {/* Password */}
          <section className="bg-card rounded-xl border border-card-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <KeyRound size={16} className="text-accent" aria-hidden="true" />
                Password
              </h2>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="text-sm text-accent font-medium hover:underline focus-visible:underline px-3 py-2 -mr-3 min-h-[44px] flex items-center"
                >
                  Change password
                </button>
              )}
            </div>

            {showPasswordForm ? (
              <form onSubmit={handlePasswordChange} className="space-y-3">
                <div>
                  <label htmlFor="current-pw" className="block text-xs font-medium text-muted mb-1">Current password</label>
                  <input id="current-pw" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                    required autoComplete="current-password"
                    className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div>
                  <label htmlFor="new-pw" className="block text-xs font-medium text-muted mb-1">New password</label>
                  <input id="new-pw" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)}
                    required minLength={8} autoComplete="new-password"
                    className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div>
                  <label htmlFor="confirm-pw" className="block text-xs font-medium text-muted mb-1">Confirm new password</label>
                  <input id="confirm-pw" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                    required minLength={8} autoComplete="new-password"
                    className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={saving === "password"}
                    className="px-4 py-2 bg-accent text-[#141210] rounded-lg text-sm font-medium hover:bg-accent-dark disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent">
                    {saving === "password" ? "Saving..." : "Update password"}
                  </button>
                  <button type="button" onClick={() => { setShowPasswordForm(false); setCurrentPw(""); setNewPw(""); setConfirmPw(""); }}
                    className="px-4 py-2 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-muted">Last changed: Never</p>
            )}
          </section>

          {/* Community */}
          <section className="bg-card rounded-xl border border-card-border p-5">
            <h2 className="font-semibold mb-2">Join our community</h2>
            <p className="text-sm text-muted mb-3">Get dating tips, safety alerts, and real talk from 500+ verified members in our private Telegram group.</p>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
            >
              Join the community <ChevronRight size={14} />
            </Link>
          </section>

          {/* Support */}
          <section className="bg-card rounded-xl border border-card-border p-5">
            <h2 className="font-semibold mb-2">Need help?</h2>
            <p className="text-sm text-muted mb-3">Questions, feedback, or issues? We're here.</p>
            <a
              href="mailto:support@meetyourplus.com"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
            >
              support@meetyourplus.com
            </a>
          </section>

          {/* Sign out + deactivate */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => { logout(); router.push("/auth"); }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-card border border-card-border rounded-xl text-sm font-medium text-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>

            {!showDeactivate ? (
              <button
                onClick={() => setShowDeactivate(true)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted hover:text-danger transition-colors"
              >
                <Trash2 size={16} aria-hidden="true" />
                Deactivate account
              </button>
            ) : (
              <div className="bg-danger/5 border border-danger/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-danger flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-danger">Deactivate your account?</p>
                    <p className="text-xs text-muted mt-1">Your profile will be hidden and you won&apos;t appear in search. You can reactivate by logging back in.</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={handleDeactivate}
                        className="px-4 py-1.5 bg-danger text-white rounded-lg text-xs font-medium hover:bg-danger/90">
                        Yes, deactivate
                      </button>
                      <button onClick={() => setShowDeactivate(false)}
                        className="px-4 py-1.5 border border-card-border rounded-lg text-xs font-medium hover:bg-muted-bg">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!showDelete ? (
              <button
                onClick={() => setShowDelete(true)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted hover:text-danger transition-colors"
              >
                <Trash2 size={16} aria-hidden="true" />
                Delete account permanently
              </button>
            ) : (
              <div className="bg-danger/5 border border-danger/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-danger flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-danger">Delete your account permanently?</p>
                    <p className="text-xs text-muted mt-1">This action is irreversible. All your data, matches, messages, and photos will be permanently deleted and cannot be recovered.</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={handleDeleteAccount} disabled={deleting}
                        className="px-4 py-1.5 bg-danger text-white rounded-lg text-xs font-medium hover:bg-danger/90 disabled:opacity-50">
                        {deleting ? "Deleting..." : "Yes, delete permanently"}
                      </button>
                      <button onClick={() => setShowDelete(false)}
                        className="px-4 py-1.5 border border-card-border rounded-lg text-xs font-medium hover:bg-muted-bg">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy tab */}
      {tab === "privacy" && !privacy && (
        <div className="bg-card rounded-xl border border-card-border p-8 text-center">
          <p className="text-sm text-muted mb-3">Failed to load privacy settings</p>
          <button onClick={() => window.location.reload()} className="text-sm text-accent hover:underline">Retry</button>
        </div>
      )}
      {tab === "privacy" && privacy && (
        <section className="bg-card rounded-xl border border-card-border divide-y divide-card-border/50">
          {Object.entries(privacyMeta).map(([key, meta]) => {
            const field = key as keyof PrivacySettings;
            const isOn = privacy[field];
            const isPremium = PREMIUM_FIELDS.has(key);
            const isLocked = isPremium && !sub?.features.includes(key);

            return (
              <div key={key} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-start gap-3 min-w-0">
                  <meta.icon size={16} className="text-muted mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium">{meta.label}</p>
                      {isPremium && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                          meta.tier === "plus_plus" ? "bg-accent/10 text-accent" : "bg-gold-bg text-gold"
                        }`}>{meta.tier === "plus_plus" ? "Plus+" : meta.tier === "plus" ? "Plus" : meta.tier}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted">{meta.desc}</p>
                    {isLocked && (
                      <Link href="/settings" onClick={() => setTab("subscription")}
                        className="text-xs text-accent hover:underline mt-0.5 inline-block">
                        Upgrade to unlock
                      </Link>
                    )}
                  </div>
                </div>
                <Toggle
                  checked={isOn}
                  onChange={() => handlePrivacyToggle(field)}
                  disabled={saving === key || isLocked}
                  label={meta.label}
                />
              </div>
            );
          })}
        </section>
      )}

      {/* Notifications tab */}
      {tab === "notifications" && !notifs && (
        <div className="bg-card rounded-xl border border-card-border p-8 text-center">
          <p className="text-sm text-muted mb-3">Failed to load notification settings</p>
          <button onClick={() => window.location.reload()} className="text-sm text-accent hover:underline">Retry</button>
        </div>
      )}
      {tab === "notifications" && notifs && (
        <div className="space-y-4">
          <section className="bg-card rounded-xl border border-card-border">
            <h2 className="px-5 pt-4 pb-2 text-xs font-bold uppercase text-muted tracking-wider">Push notifications</h2>
            <div className="divide-y divide-card-border/50">
              {Object.entries(notifMeta).filter(([, m]) => m.section === "push").map(([key, meta]) => (
                <div key={key} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <meta.icon size={16} className="text-muted" aria-hidden="true" />
                    <p className="text-sm font-medium">{meta.label}</p>
                  </div>
                  <Toggle
                    checked={notifs[key as keyof NotifPrefs]}
                    onChange={() => handleNotifToggle(key as keyof NotifPrefs)}
                    disabled={saving === key}
                    label={meta.label}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-xl border border-card-border">
            <h2 className="px-5 pt-4 pb-2 text-xs font-bold uppercase text-muted tracking-wider">Email notifications</h2>
            <div className="divide-y divide-card-border/50">
              {Object.entries(notifMeta).filter(([, m]) => m.section === "email").map(([key, meta]) => (
                <div key={key} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <meta.icon size={16} className="text-muted" aria-hidden="true" />
                    <p className="text-sm font-medium">{meta.label}</p>
                  </div>
                  <Toggle
                    checked={notifs[key as keyof NotifPrefs]}
                    onChange={() => handleNotifToggle(key as keyof NotifPrefs)}
                    disabled={saving === key}
                    label={meta.label}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Subscription tab */}
      {tab === "subscription" && !sub && (
        <div className="bg-card rounded-xl border border-card-border p-8 text-center">
          <p className="text-sm text-muted mb-3">Failed to load subscription info</p>
          <button onClick={() => window.location.reload()} className="text-sm text-accent hover:underline">Retry</button>
        </div>
      )}
      {tab === "subscription" && sub && (
        <div className="space-y-4">
          {/* Current plan */}
          <section className="bg-card rounded-xl border border-card-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted uppercase tracking-wider font-medium">Current plan</p>
                <p className={`text-2xl font-bold mt-1 ${tierColor(sub.tier)}`}>
                  {tierLabel(sub.tier)}
                </p>
                {sub.tier === "free" && (
                  <p className="text-xs text-muted mt-1">Photos are blurred. Upgrade to see profiles and message freely.</p>
                )}
              </div>
              <Crown size={32} className={tierColor(sub.tier)} />
            </div>
            {sub.features.length > 0 && (
              <div className="mt-4 pt-4 border-t border-card-border">
                <p className="text-xs font-medium text-muted mb-2">Active features</p>
                <div className="flex flex-wrap gap-1.5">
                  {sub.features.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/5 text-accent text-xs rounded-full">
                      <Check size={10} /> {f.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Billing cycle toggle */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted"}`}>Monthly</span>
            <button
              role="switch"
              aria-checked={billingCycle === "annual"}
              aria-label="Toggle annual billing"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer ${
                billingCycle === "annual" ? "bg-accent" : "bg-card-border"
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${billingCycle === "annual" ? "translate-x-5" : ""}`} />
            </button>
            <span className={`text-sm font-medium ${billingCycle === "annual" ? "text-foreground" : "text-muted"}`}>
              Annual
              <span className="ml-1.5 text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-sm">Save 17%</span>
            </span>
          </div>

          {/* Pricing tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: "free", name: "Free", price: "$0", period: "forever",
                features: ["Browse profiles", "Like & match", "5 messages per day", "Basic privacy"],
                current: sub.tier === "free",
                cta: "Current plan",
              },
              {
                id: "plus", name: "Plus",
                price: billingCycle === "annual" ? "$499" : "$49.99",
                period: billingCycle === "annual" ? "/year" : "/month",
                perMonth: billingCycle === "annual" ? "$41.58/mo" : undefined,
                features: ["Unlimited messaging", "See who liked you", "Verified badge", "Hide from search", "Blur photos for non-matches"],
                current: sub.tier === "plus",
                cta: billingCycle === "annual" ? "Go Plus \u2014 $499/year" : "Go Plus \u2014 $49.99/mo",
              },
              {
                id: "plus_plus", name: "Plus+",
                price: billingCycle === "annual" ? "$999" : "$99.99",
                period: billingCycle === "annual" ? "/year" : "/month",
                perMonth: billingCycle === "annual" ? "$83.25/mo" : undefined,
                features: ["Everything in Plus", "Priority in discover", "Travel mode", "Read receipts", "Profile boost", "Unlimited likes"],
                current: sub.tier === "plus_plus", highlight: true,
                cta: billingCycle === "annual" ? "Go Plus+ \u2014 $999/year" : "Go Plus+ \u2014 $99.99/mo",
              },
            ].map((tier) => (
              <div key={tier.id} className={`bg-card rounded-xl border p-5 flex flex-col ${
                tier.highlight ? "border-accent shadow-sm shadow-accent/10" : "border-card-border"
              }`}>
                {tier.highlight && (
                  <span className="text-[10px] font-bold uppercase text-accent mb-2 tracking-wider">All features</span>
                )}
                <h3 className="font-bold text-lg">{tier.name}</h3>
                <p className="mt-1">
                  <span className="text-2xl font-bold">{tier.price}</span>
                  <span className="text-xs text-muted">{tier.period}</span>
                </p>
                {"perMonth" in tier && tier.perMonth && (
                  <p className="text-xs text-accent mt-0.5">{tier.perMonth}</p>
                )}
                <ul className="mt-4 space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  disabled={tier.current || saving === `upgrade-${tier.id}`}
                  onClick={async () => {
                    if (tier.current || tier.id === "free") return;
                    setSaving(`upgrade-${tier.id}`);
                    trackFunnel("checkout_started", { tier: tier.id });
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'begin_checkout', { plan: tier.id });
                    }
                    // Meta Pixel: InitiateCheckout
                    const checkoutValue = tier.id === "plus_plus"
                      ? (billingCycle === "annual" ? 999 : 99.99)
                      : (billingCycle === "annual" ? 499 : 49.99);
                    if (typeof window !== 'undefined' && (window as any).fbq) {
                      (window as any).fbq('track', 'InitiateCheckout', {value: checkoutValue, currency: 'USD'});
                    }
                    try {
                      const { data } = await api.post(`/api/billing/checkout?tier=${tier.id}&billing=${billingCycle}`);
                      if (data.checkout_url) {
                        window.location.href = data.checkout_url;
                      }
                    } catch (err: any) {
                      setError(err.response?.data?.detail || "Failed to start checkout");
                    }
                    setSaving(null);
                  }}
                  className={`mt-5 w-full py-3 rounded-lg text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent min-h-[48px] ${
                    tier.current
                      ? "bg-muted-bg text-muted cursor-default"
                      : tier.highlight
                      ? "bg-accent text-[#141210] hover:bg-accent-dark"
                      : "border border-card-border hover:bg-muted-bg"
                  }`}
                >
                  {saving === `upgrade-${tier.id}` ? "Redirecting to checkout..." : tier.current ? "Current plan" : tier.cta}
                </button>
                {tier.id === "free" && (
                  <p className="text-[11px] text-muted text-center mt-2">Seeking charges $274.99/mo. Plus starts at $49.99.</p>
                )}
                {tier.highlight && !tier.current && (
                  <>
                    <p className="text-[11px] text-muted text-center mt-2">Cancel anytime. No commitment.</p>
                    <p className="text-[11px] text-accent text-center mt-1 font-medium">Join verified members</p>
                  </>
                )}
              </div>
            ))}
          </div>

          {sub.tier !== "free" && (
            <section className="bg-card rounded-xl border border-card-border p-5">
              <h2 className="font-semibold mb-3">Manage subscription</h2>

              {cancelledUntil ? (
                <p className="text-sm text-muted">
                  Your subscription has been cancelled. You&apos;ll have access until{" "}
                  <span className="font-medium text-foreground">{cancelledUntil}</span>.
                </p>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                    onClick={async () => {
                      try {
                        const { data } = await api.post("/api/billing/portal");
                        if (data.portal_url) window.location.href = data.portal_url;
                      } catch (err: any) {
                        setError(err.response?.data?.detail || "Failed to open billing portal");
                      }
                    }}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    Manage billing
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-danger/30 text-danger rounded-lg text-sm font-medium hover:bg-danger/5 transition-colors focus-visible:ring-2 focus-visible:ring-danger min-h-[44px]"
                    onClick={() => setCancelStep(1)}
                  >
                    <X size={14} aria-hidden="true" />
                    Cancel subscription
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Cancellation save modal */}
          {cancelStep > 0 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => { setCancelStep(0); setCancelReason(""); }}>
              <div className="relative bg-card rounded-2xl border border-card-border shadow-2xl max-w-sm w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => { setCancelStep(0); setCancelReason(""); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                {/* Step 1: Sorry to see you go */}
                {cancelStep === 1 && (
                  <div className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart size={24} className="text-accent" />
                    </div>
                    <h2 className="text-lg font-bold text-center">We&apos;re sorry to see you go</h2>
                    <p className="text-sm text-muted text-center mt-2">If you cancel, you&apos;ll lose access to:</p>
                    <ul className="mt-4 space-y-2.5">
                      <li className="flex items-center gap-2.5 text-sm">
                        <Eye size={16} className="text-accent flex-shrink-0" />
                        Unblurred photos
                      </li>
                      <li className="flex items-center gap-2.5 text-sm">
                        <MessageCircle size={16} className="text-accent flex-shrink-0" />
                        Unlimited messaging
                      </li>
                      <li className="flex items-center gap-2.5 text-sm">
                        <Sparkles size={16} className="text-accent flex-shrink-0" />
                        See who liked you
                      </li>
                      <li className="flex items-center gap-2.5 text-sm">
                        <Lock size={16} className="text-accent flex-shrink-0" />
                        Privacy controls
                      </li>
                    </ul>
                    <div className="mt-6 space-y-2">
                      <button
                        onClick={() => { setCancelStep(0); setCancelReason(""); }}
                        className="w-full py-3 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors"
                      >
                        Keep my subscription
                      </button>
                      <button
                        onClick={() => setCancelStep(2)}
                        className="w-full py-2.5 border border-card-border rounded-lg text-sm font-medium text-muted hover:bg-muted-bg transition-colors"
                      >
                        Continue cancelling
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Reason + final cancel */}
                {cancelStep === 2 && (
                  <div className="p-6">
                    <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle size={24} className="text-danger" />
                    </div>
                    <h2 className="text-lg font-bold text-center">One last thing</h2>
                    <p className="text-sm text-muted text-center mt-2">Why are you leaving? This helps us improve.</p>
                    <fieldset className="mt-4 space-y-2">
                      <legend className="sr-only">Cancellation reason</legend>
                      {[
                        { value: "not_enough_members", label: "Not enough members in my area" },
                        { value: "too_expensive", label: "Too expensive" },
                        { value: "found_someone", label: "Found someone" },
                        { value: "prefer_another", label: "Prefer another platform" },
                        { value: "other", label: "Other" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                            cancelReason === opt.value
                              ? "border-accent bg-accent/5"
                              : "border-card-border hover:bg-muted-bg"
                          }`}
                        >
                          <input
                            type="radio"
                            name="cancel-reason"
                            value={opt.value}
                            checked={cancelReason === opt.value}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="sr-only"
                          />
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            cancelReason === opt.value ? "border-accent" : "border-card-border"
                          }`}>
                            {cancelReason === opt.value && <span className="w-2 h-2 rounded-full bg-accent" />}
                          </span>
                          <span className="text-sm">{opt.label}</span>
                        </label>
                      ))}
                    </fieldset>
                    <div className="mt-6 space-y-2">
                      <button
                        onClick={() => handleCancelSubscription(cancelReason || "not_specified")}
                        disabled={cancellingSubscription}
                        className="w-full py-3 bg-danger text-white rounded-lg text-sm font-semibold hover:bg-danger/90 transition-colors disabled:opacity-50"
                      >
                        {cancellingSubscription ? "Cancelling..." : "Cancel my subscription"}
                      </button>
                      <button
                        onClick={() => { setCancelStep(0); setCancelReason(""); }}
                        className="w-full py-2.5 border border-card-border rounded-lg text-sm font-medium text-muted hover:bg-muted-bg transition-colors"
                      >
                        Never mind, keep it
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Blocked users tab */}
      {tab === "blocked" && (
        <div>
          {blocked.length === 0 ? (
            <div className="bg-card rounded-xl border border-card-border p-8 text-center">
              <UserX size={32} className="text-muted mx-auto mb-3" />
              <p className="text-sm text-muted">You haven&apos;t blocked anyone</p>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-card-border divide-y divide-card-border/50">
              {blocked.map((b) => (
                <div key={b.profile_id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium">{b.display_name}</p>
                    <p className="text-xs text-muted">{b.city || "Unknown location"}</p>
                  </div>
                  <button
                    onClick={() => handleUnblock(b.profile_id)}
                    className="px-3 py-1.5 border border-card-border rounded-lg text-xs font-medium hover:bg-muted-bg transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
