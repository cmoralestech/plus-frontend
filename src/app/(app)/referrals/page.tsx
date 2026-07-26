"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Copy, Check, DollarSign, Users, MousePointer, Link2, Share2, Trophy, ChevronRight, ArrowUp } from "lucide-react";

interface Dashboard {
  referral_link: string | null;
  code: string | null;
  custom_slug: string | null;
  clicks: number;
  total_referrals: number;
  active_paying_referrals: number;
  monthly_earnings: number;
  total_earned: number;
  unpaid_balance: number;
  minimum_payout: number;
  rates: { premium: string; diamond: string };
}

const TIERS = [
  { name: "Starter", min: 0, premium: 5, diamond: 10 },
  { name: "Silver", min: 25, premium: 7.5, diamond: 15 },
  { name: "Gold", min: 100, premium: 10, diamond: 25 },
  { name: "Platinum", min: 500, premium: 12, diamond: 32 },
];

function getCurrentTier(paying: number) {
  let tier = TIERS[0];
  for (const t of TIERS) {
    if (paying >= t.min) tier = t;
  }
  return tier;
}

function getNextTier(paying: number) {
  for (const t of TIERS) {
    if (paying < t.min) return t;
  }
  return null;
}

export default function ReferralsPage() {
  const [dash, setDash] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [slugSaving, setSlugSaving] = useState(false);
  const [slugError, setSlugError] = useState("");

  useEffect(() => {
    document.title = "Refer & Earn, Plus";
    (async () => {
      try {
        await api.get("/api/referrals/my-link");
        const { data } = await api.get("/api/referrals/dashboard");
        setDash(data);
        setCustomSlug(data.custom_slug || "");
      } catch {}
      setLoading(false);
    })();
  }, []);

  const doCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const saveSlug = async () => {
    if (!customSlug.match(/^[a-z0-9-]+$/) || customSlug.length < 3) {
      setSlugError("Lowercase letters, numbers, dashes. Min 3 chars.");
      return;
    }
    setSlugSaving(true);
    setSlugError("");
    try {
      const { data } = await api.post("/api/referrals/custom-slug", { slug: customSlug });
      setDash((prev) => prev ? { ...prev, referral_link: data.url, custom_slug: data.custom_slug } : prev);
    } catch (err: any) {
      setSlugError(err.response?.data?.detail || "Failed to save");
    }
    setSlugSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const link = dash?.referral_link || "https://meetyourplus.com";
  const paying = dash?.active_paying_referrals || 0;
  const currentTier = getCurrentTier(paying);
  const nextTier = getNextTier(paying);

  const toolkitItems = [
    { label: "Twitter / X", text: `The dating app for people who refuse to settle. Free to join 💎\n${link}` },
    { label: "Instagram bio", text: `Luxury dating, free to join ✨ ${link}` },
    { label: "TikTok caption", text: `POV: you find a dating app with verified wealthy members 😏\nLink in bio 👆 #sugardating #luxurydating #plusdating` },
    { label: "DM / text", text: `Have you tried this dating app? It's free and the members are actually verified. ${link}` },
  ];

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-32">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl leading-snug">
          Earn up to <span className="text-accent">${currentTier.diamond}/month</span> per referral
        </h1>
        <p className="text-sm text-muted mt-2 max-w-lg">
          Share your link. When someone signs up and subscribes, you earn recurring monthly income, for as long as they stay. No cap. The more you refer, the higher your rate.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {[
          { value: dash?.clicks || 0, label: "Clicks", icon: MousePointer },
          { value: dash?.total_referrals || 0, label: "Signups", icon: Users },
          { value: `$${(dash?.monthly_earnings || 0).toFixed(0)}`, label: "Monthly", icon: DollarSign, accent: true },
          { value: `$${(dash?.unpaid_balance || 0).toFixed(2)}`, label: "Balance", icon: DollarSign, success: true },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-card-border p-3 text-center">
            <p className={`text-lg md:text-xl font-bold ${s.accent ? "text-accent" : s.success ? "text-success" : ""}`}>{s.value}</p>
            <p className="text-[10px] text-muted uppercase tracking-wide mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ═══ COMMISSION TIERS ═══ */}
      <section className="bg-card rounded-xl border border-card-border p-5 mb-4">
        <h2 className="text-sm font-semibold mb-4">Your commission tier</h2>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {TIERS.map((tier) => {
            const isActive = tier.name === currentTier.name;
            const isLocked = tier.min > paying;
            return (
              <div
                key={tier.name}
                className={`p-3 rounded-lg text-center border transition-colors ${
                  isActive
                    ? "border-accent bg-accent/5"
                    : isLocked
                    ? "border-card-border opacity-40"
                    : "border-card-border"
                }`}
              >
                <p className={`text-[10px] uppercase tracking-wide mb-1 ${isActive ? "text-accent font-bold" : "text-muted"}`}>
                  {tier.name}
                </p>
                <p className={`text-sm font-bold ${isActive ? "text-accent" : ""}`}>${tier.premium}</p>
                <p className="text-[9px] text-muted">per Premium</p>
                <p className={`text-sm font-bold mt-1 ${isActive ? "text-accent" : ""}`}>${tier.diamond}</p>
                <p className="text-[9px] text-muted">per Diamond</p>
                {tier.min > 0 && (
                  <p className="text-[9px] text-muted/50 mt-1.5 border-t border-card-border pt-1">{tier.min}+ paying</p>
                )}
              </div>
            );
          })}
        </div>
        {nextTier && (
          <div className="flex items-center gap-2 px-3 py-2 bg-accent/5 rounded-lg text-xs">
            <ArrowUp size={14} className="text-accent flex-shrink-0" />
            <span className="text-muted">
              <strong className="text-foreground">{nextTier.min - paying} more</strong> paying referrals to reach <strong className="text-accent">{nextTier.name}</strong> (${nextTier.premium}/Premium, ${nextTier.diamond}/Diamond)
            </span>
          </div>
        )}
        {!nextTier && paying > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-accent/5 rounded-lg text-xs">
            <Trophy size={14} className="text-accent flex-shrink-0" />
            <span className="text-accent font-medium">You&apos;re at the highest tier. Maximum earnings unlocked.</span>
          </div>
        )}
      </section>

      {/* ═══ REFERRAL LINK ═══ */}
      <section className="bg-card rounded-xl border border-card-border p-5 mb-4">
        <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm">
          <Link2 size={16} className="text-accent" />
          Your referral link
        </h2>
        <div className="flex gap-2 mb-3">
          <input readOnly value={link} className="flex-1 px-3 py-2.5 bg-background border border-card-border rounded-lg text-sm truncate" />
          <button onClick={() => doCopy(link, "link")}
            className="px-4 py-2.5 bg-accent text-background rounded-lg text-sm font-medium min-h-[44px] flex items-center gap-1.5 flex-shrink-0">
            {copied === "link" ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => {
            const text = `The dating app for people who refuse to settle. Free to join 💎\n${link}`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
          }}
            className="flex items-center gap-1.5 px-3 py-2 bg-muted-bg rounded-lg text-xs font-medium hover:bg-card-border transition-colors">
            <Share2 size={12} /> Tweet
          </button>
          <button onClick={() => {
            if (navigator.share) navigator.share({ title: "Join Plus", text: "Luxury dating, free to join", url: link });
            else doCopy(link, "link");
          }}
            className="flex items-center gap-1.5 px-3 py-2 bg-muted-bg rounded-lg text-xs font-medium hover:bg-card-border transition-colors">
            <Share2 size={12} /> Share
          </button>
        </div>

        {/* Custom slug */}
        <div className="pt-3 border-t border-card-border">
          <label htmlFor="custom-slug" className="block text-xs text-muted mb-1">Custom link (meetyourplus.com/r/your-name)</label>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-muted whitespace-nowrap">/r/</span>
            <input id="custom-slug" value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              className="flex-1 px-3 py-2 bg-background border border-card-border rounded-lg text-sm min-w-0"
              placeholder="your-name" maxLength={30} />
            <button onClick={saveSlug} disabled={slugSaving}
              className="px-3 py-2 border border-card-border rounded-lg text-sm hover:bg-muted-bg min-h-[38px] flex-shrink-0">
              {slugSaving ? "..." : "Save"}
            </button>
          </div>
          {slugError && <p className="text-xs text-danger mt-1">{slugError}</p>}
        </div>
      </section>

      {/* ═══ EARNING CALCULATOR ═══ */}
      <section className="bg-card rounded-xl border border-accent/20 p-5 mb-4">
        <h2 className="font-semibold mb-3 text-sm">Earning potential</h2>
        <div className="space-y-2">
          {[
            { signups: 50, paying: 15, tier: getCurrentTier(15) },
            { signups: 200, paying: 60, tier: getCurrentTier(60) },
            { signups: 1000, paying: 200, tier: getCurrentTier(200) },
          ].map((scenario) => {
            const monthlyLow = scenario.paying * scenario.tier.premium;
            const monthlyHigh = scenario.paying * scenario.tier.diamond;
            return (
              <div key={scenario.signups} className="flex items-center justify-between p-3 bg-muted-bg rounded-lg">
                <div>
                  <p className="text-sm font-medium">{scenario.signups} signups → {scenario.paying} subscribe</p>
                  <p className="text-[10px] text-muted">{scenario.tier.name} tier (${scenario.tier.premium}-${scenario.tier.diamond}/user)</p>
                </div>
                <p className="text-accent font-bold text-sm whitespace-nowrap">${monthlyLow}-${monthlyHigh}/mo</p>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-muted mt-3 text-center">Recurring monthly income. You earn every month they stay subscribed.</p>
      </section>

      {/* ═══ CREATOR TOOLKIT ═══ */}
      <section className="bg-card rounded-xl border border-card-border p-5 mb-4">
        <h2 className="font-semibold mb-1 text-sm">Creator toolkit</h2>
        <p className="text-xs text-muted mb-4">Ready-to-post content. Copy, paste, publish.</p>
        <div className="space-y-2">
          {toolkitItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 bg-muted-bg rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-accent uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="text-xs text-muted whitespace-pre-line leading-relaxed">{item.text}</p>
              </div>
              <button onClick={() => doCopy(item.text, item.label)}
                className="px-2 py-1 border border-card-border rounded text-[10px] hover:bg-card-border transition-colors flex-shrink-0 mt-1">
                {copied === item.label ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-card-border">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-1">Hashtags</p>
          <p className="text-xs text-muted select-all cursor-pointer">#plusdating #luxurydating #sugardating #datingapp #seekingalternative #meetyourplus</p>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-card rounded-xl border border-card-border p-5 mb-4">
        <h2 className="font-semibold mb-3 text-sm">How it works</h2>
        <div className="space-y-3 text-sm">
          {[
            { n: "1", title: "Share your link", desc: "Social media, bio, stories, DMs, blog, videos, anywhere" },
            { n: "2", title: "They sign up free", desc: "No credit card needed. Zero friction for your audience." },
            { n: "3", title: "You earn when they subscribe", desc: `$${currentTier.premium}/mo per Premium, $${currentTier.diamond}/mo per Diamond at your current tier` },
            { n: "4", title: "Get paid monthly", desc: "PayPal payout when your balance reaches $50. No cap on earnings." },
          ].map((s) => (
            <div key={s.n} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center flex-shrink-0 font-bold">{s.n}</span>
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="text-muted text-xs">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PAYOUT INFO ═══ */}
      <section className="bg-card rounded-xl border border-card-border p-5">
        <h2 className="font-semibold mb-2 text-sm">Payouts</h2>
        <div className="text-sm text-muted space-y-1.5">
          <p>Minimum payout: <strong className="text-foreground">$50</strong></p>
          <p>Payout method: <strong className="text-foreground">PayPal</strong></p>
          <p>Your balance: <strong className="text-success">${(dash?.unpaid_balance || 0).toFixed(2)}</strong></p>
          <p>Total earned (all time): <strong className="text-foreground">${(dash?.total_earned || 0).toFixed(2)}</strong></p>
        </div>
      </section>
    </div>
  );
}
