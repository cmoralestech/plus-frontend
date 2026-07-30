"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import api from "@/lib/api";
import { useVisitorCity } from "@/lib/markets";
import CityAutocomplete from "@/components/CityAutocomplete";

const worthJoiningOptions = [
  "Better people", "Verified profiles", "Established matches",
  "Generous dating", "More intentional dating", "Travel + experiences",
  "Age-gap dating", "LGBTQ+ dating", "Privacy", "Other",
];

const lookingForOptions = [
  "Dating", "Long-term", "Something casual", "Travel partner",
  "Experience partner", "Generous dating", "Mentorship", "Networking",
];

const whatMattersOptions = [
  "Attraction", "Generosity", "Ambition", "Lifestyle", "Chemistry",
  "Success", "Adventure", "Intelligence", "Discretion", "Long-term potential",
];

const bringToTableOptions = [
  "An established lifestyle", "Generosity", "Ambition", "Youth + energy",
  "Experience", "Connections", "Adventure", "Great taste",
  "A full passport", "A point of view",
];

const howHeardOptions = [
  "Google search", "Instagram", "TikTok", "Twitter/X", "Reddit",
  "Friend referral", "Blog post", "Medium article", "Other",
];

const genderOptions = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non_binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

const interestedInOptions = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "everyone", label: "Everyone" },
];

export default function WaitlistPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { city: detectedCity, isActive: inActiveMarket } = useVisitorCity();
  const [shareCode, setShareCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [attribution, setAttribution] = useState<{
    referred_by_code?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }>({});

  // Read from window rather than useSearchParams so this page doesn't need a
  // Suspense boundary just to see the inbound referral code.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, string> = {};

    const ref = params.get("ref");
    if (ref) next.referred_by_code = ref;

    // UTMCapture stores first-touch attribution; prefer it over the current URL
    // so a referral shared into a campaign still credits the original source.
    try {
      const stored = JSON.parse(localStorage.getItem("utm_data") || "{}");
      for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
        const value = params.get(key) || stored[key];
        if (value) next[key] = value;
      }
      if (!next.referred_by_code && stored.ref) next.referred_by_code = stored.ref;
    } catch {
      // Malformed localStorage shouldn't block someone joining the waitlist.
    }

    setAttribution(next);
  }, []);

  const [form, setForm] = useState({
    city: "",
    state: "",
    country: "",
    zip_code: "",
    worth_joining: [] as string[],
    gender: "",
    interested_in: "",
    age: "",
    desired_age_min: "",
    desired_age_max: "",
    looking_for: [] as string[],
    what_matters: [] as string[],
    bring_to_table: [] as string[],
    first_name: "",
    email: "",
    phone: "",
    instagram: "",
    how_heard: "",
  });

  // Prefill the city so screen 1 is usually a confirmation, not a typing task.
  // Never overwrites a city the visitor already chose.
  useEffect(() => {
    if (!detectedCity) return;
    setForm((prev) => (prev.city ? prev : { ...prev, city: detectedCity }));
  }, [detectedCity]);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleMulti = (field: string, value: string, max: number) => {
    setForm((prev) => {
      const arr = (prev as any)[field] as string[];
      if (arr.includes(value)) return { ...prev, [field]: arr.filter((v: string) => v !== value) };
      if (arr.length >= max) return prev;
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const canProceed = () => {
    if (step === 0) return form.city.trim().length > 0;
    if (step === 5) return form.email.trim().length > 0 && form.first_name.trim().length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/api/waitlist/", {
        ...attribution,
        city: form.city,
        state: form.state || null,
        country: form.country || null,
        zip_code: form.zip_code || null,
        worth_joining: form.worth_joining.length ? form.worth_joining : null,
        gender: form.gender || null,
        interested_in: form.interested_in || null,
        age: form.age ? parseInt(form.age) : null,
        desired_age_min: form.desired_age_min ? parseInt(form.desired_age_min) : null,
        desired_age_max: form.desired_age_max ? parseInt(form.desired_age_max) : null,
        looking_for: form.looking_for.length ? form.looking_for : null,
        what_matters: form.what_matters.length ? form.what_matters : null,
        bring_to_table: form.bring_to_table.length ? form.bring_to_table : null,
        first_name: form.first_name,
        email: form.email,
        phone: form.phone || null,
        instagram: form.instagram || null,
        how_heard: form.how_heard || null,
      });
      setShareCode(res.data?.share_code || "");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const next = () => {
    if (step === 5) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const totalSteps = 6;

  if (submitted) {
    // Falls back to the plain waitlist URL if the API didn't return a code, so
    // the success screen never renders a broken or identifying link.
    const shareUrl = shareCode
      ? `https://meetyourplus.com/waitlist?ref=${shareCode}`
      : "https://meetyourplus.com/waitlist";
    const shareMessage = `Plus isn't in ${form.city} yet. I just joined the waitlist to help change that — you should too: ${shareUrl}`;

    const copyShareUrl = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard can be blocked; the input is selectable as a fallback.
      }
    };

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <PublicNav />
        <div className="flex-1 flex items-center justify-center px-5 py-20">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "var(--accent)" }}>
              <span className="text-2xl text-white font-bold">+</span>
            </div>
            <h1 className="font-display text-3xl mb-3">
              You&apos;re on the list.<span className="text-accent"> +</span>
            </h1>
            <p className="text-muted text-sm leading-relaxed mb-8">
              We&apos;ll let you know when Plus is ready for {form.city}. You&apos;re early — that matters.
            </p>

            <div className="bg-card border border-card-border rounded-xl p-6 text-left mb-6">
              <h2 className="font-display text-lg mb-2">
                Want to move {form.city} up the list?
              </h2>
              <p className="text-muted text-sm mb-4">
                Invite people you&apos;d actually want to see here. The more people who join the waitlist in your city, the sooner we launch there.
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  aria-label="Your referral link"
                  value={shareUrl.replace("https://", "")}
                  className="flex-1 px-3 py-2.5 bg-background border border-card-border rounded-lg text-sm text-muted"
                />
                <button
                  onClick={copyShareUrl}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg transition-colors shrink-0"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href={`sms:?&body=${encodeURIComponent(shareMessage)}`}
                  className="px-3 py-1.5 rounded-full border border-card-border text-xs font-medium hover:border-muted transition-colors"
                >
                  Text it
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-card-border text-xs font-medium hover:border-muted transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(`Plus is coming to ${form.city}`)}&body=${encodeURIComponent(shareMessage)}`}
                  className="px-3 py-1.5 rounded-full border border-card-border text-xs font-medium hover:border-muted transition-colors"
                >
                  Email
                </a>
              </div>
            </div>

            <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
              Back to homepage
            </Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicNav />
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-3xl mb-2">
              {detectedCity
                ? `Plus isn't in ${detectedCity} yet.`
                : "Plus isn't in your city yet."}
              <br />
              <span className="text-accent">Help change that. +</span>
            </h1>
            {inActiveMarket && (
              <p className="text-sm text-muted mt-3">
                Actually — Plus is already live in {detectedCity}.{" "}
                <Link href="/auth?mode=register" className="text-accent hover:underline">
                  Skip the list and join now →
                </Link>
              </p>
            )}
            <p className="text-muted text-sm">
              Join the waitlist. We launch where demand is real.
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1 mb-8 max-w-[240px] mx-auto">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-accent" : "bg-card-border"
                }`}
              />
            ))}
          </div>

          <div className="bg-card rounded-2xl border border-card-border p-6 md:p-8">

            {/* Step 0: Where are you? */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg">Where are you?</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1.5">City</label>
                    {/* Autocomplete rather than free text: city is the key the
                        whole demand model groups on, and "Austin" / "austin" /
                        "Austin, TX" would each become their own market. */}
                    <CityAutocomplete
                      value={form.city}
                      onChange={(city, state, country) =>
                        setForm((prev) => ({ ...prev, city, state, country }))
                      }
                      placeholder="Austin, Chicago, Dallas..."
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1.5">ZIP code <span className="text-muted font-normal">(optional)</span></label>
                    <input
                      value={form.zip_code}
                      onChange={(e) => update("zip_code", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="78701"
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: What would make PLUS worth joining? */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-lg">What would make Plus worth joining?</h2>
                  <p className="text-muted text-sm mt-1">Pick up to 3.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {worthJoiningOptions.map((opt) => {
                    const selected = form.worth_joining.includes(opt);
                    const atMax = form.worth_joining.length >= 3 && !selected;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleMulti("worth_joining", opt, 3)}
                        disabled={atMax}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          selected ? "border-accent bg-accent/10 text-accent" : atMax ? "border-card-border text-muted/40 cursor-not-allowed" : "border-card-border hover:border-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Who's your +? */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg">Who&apos;s your +?</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">I am a</label>
                  <div className="flex flex-wrap gap-2">
                    {genderOptions.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => update("gender", g.value)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          form.gender === g.value ? "border-accent bg-accent/10 text-accent" : "border-card-border hover:border-muted"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interested in</label>
                  <div className="flex flex-wrap gap-2">
                    {interestedInOptions.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => update("interested_in", g.value)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          form.interested_in === g.value ? "border-accent bg-accent/10 text-accent" : "border-card-border hover:border-muted"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your age</label>
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => update("age", e.target.value)}
                      className="w-full px-3 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="28"
                      min={18}
                      max={99}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Age range min</label>
                    <input
                      type="number"
                      value={form.desired_age_min}
                      onChange={(e) => update("desired_age_min", e.target.value)}
                      className="w-full px-3 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="21"
                      min={18}
                      max={99}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Age range max</label>
                    <input
                      type="number"
                      value={form.desired_age_max}
                      onChange={(e) => update("desired_age_max", e.target.value)}
                      className="w-full px-3 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="45"
                      min={18}
                      max={99}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: What are you looking for? */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-lg">What are you looking for?</h2>
                  <p className="text-muted text-sm mt-1">Select all that apply.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lookingForOptions.map((opt) => {
                    const selected = form.looking_for.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleMulti("looking_for", opt, 8)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          selected ? "border-accent bg-accent/10 text-accent" : "border-card-border hover:border-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">What matters most?</h3>
                  <p className="text-muted text-[11px] mb-2">Pick up to 5.</p>
                  <div className="flex flex-wrap gap-2">
                    {whatMattersOptions.map((opt) => {
                      const selected = form.what_matters.includes(opt);
                      const atMax = form.what_matters.length >= 5 && !selected;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleMulti("what_matters", opt, 5)}
                          disabled={atMax}
                          className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                            selected ? "border-accent bg-accent/10 text-accent" : atMax ? "border-card-border text-muted/40 cursor-not-allowed" : "border-card-border hover:border-muted"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: What do you bring to the table? */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-lg">What do you bring to the table? <span className="text-accent">+</span></h2>
                  <p className="text-muted text-sm mt-1">Pick up to 4.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bringToTableOptions.map((opt) => {
                    const selected = form.bring_to_table.includes(opt);
                    const atMax = form.bring_to_table.length >= 4 && !selected;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleMulti("bring_to_table", opt, 4)}
                        disabled={atMax}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          selected ? "border-accent bg-accent/10 text-accent" : atMax ? "border-card-border text-muted/40 cursor-not-allowed" : "border-card-border hover:border-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Contact info */}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg">Almost there.</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1.5">First name</label>
                    <input
                      value={form.first_name}
                      onChange={(e) => update("first_name", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1.5">Phone <span className="text-muted font-normal">(optional)</span></label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1.5">Instagram <span className="text-muted font-normal">(optional)</span></label>
                    <input
                      value={form.instagram}
                      onChange={(e) => update("instagram", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="@handle"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How did you hear about Plus?</label>
                  <div className="flex flex-wrap gap-2">
                    {howHeardOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("how_heard", opt)}
                        className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                          form.how_heard === opt ? "border-accent bg-accent/10 text-accent" : "border-card-border hover:border-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p className="text-danger text-sm bg-danger/10 border border-danger/20 px-4 py-3 rounded-lg mt-4">{error}</p>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={next}
                disabled={!canProceed() || submitting}
                className="flex-1 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 text-sm"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                {submitting ? "Submitting..." : step === 5 ? "Join the waitlist" : "Continue"}
              </button>
            </div>

            {/* Skip option for optional steps */}
            {step > 0 && step < 5 && (
              <button
                onClick={() => setStep(step + 1)}
                className="w-full text-center text-xs text-muted hover:text-foreground transition-colors mt-3 py-2"
              >
                Skip this step
              </button>
            )}
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
