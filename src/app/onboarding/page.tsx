"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, Photo } from "@/lib/store";
import api from "@/lib/api";
import { trackFunnel } from "@/lib/track";
import AuthGuard from "@/components/AuthGuard";
import PhotoUpload from "@/components/PhotoUpload";
import CityAutocomplete from "@/components/CityAutocomplete";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

const incomeRanges = [
  { value: "under_100k", label: "Under $100K" },
  { value: "100k_250k", label: "$100K\u2013$250K" },
  { value: "250k_500k", label: "$250K\u2013$500K" },
  { value: "500k_1m", label: "$500K\u2013$1M" },
  { value: "1m_5m", label: "$1M\u2013$5M" },
  { value: "5m_10m", label: "$5M\u2013$10M" },
  { value: "over_10m", label: "$10M+" },
];

const lifestyleOptions = [
  { value: "low_key", label: "Low-key" },
  { value: "comfortable", label: "Comfortable" },
  { value: "elevated", label: "Elevated" },
  { value: "luxury", label: "Luxury" },
];

const generosityOptions = [
  { value: "not_important", label: "Not important" },
  { value: "nice_to_have", label: "Nice to have" },
  { value: "important", label: "Important" },
  { value: "essential", label: "Essential" },
];

const openToOptions = [
  { value: "dating", label: "Dating" },
  { value: "long_term", label: "Long-term" },
  { value: "something_casual", label: "Something casual" },
  { value: "travel_companion", label: "Travel partner" },
  { value: "experience_partner", label: "Experience partner" },
  { value: "mentorship", label: "Mentorship" },
  { value: "networking", label: "Networking" },
  { value: "generous_dating", label: "Generous dating" },
  { value: "open_relationship", label: "Open relationship" },
];

const plusTraits = [
  "Ambitious", "Established", "Generous", "Adventurous", "Cultured",
  "Career-driven", "Spontaneous", "Discreet", "Affectionate",
  "Independent", "Well-traveled", "Social", "Intellectual",
];

const currentYear = new Date().getFullYear();
const minYear = currentYear - 80;
const maxYear = currentYear - 18;

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <OnboardingForm />
    </AuthGuard>
  );
}

function OnboardingForm() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [acquisitionSource, setAcquisitionSource] = useState("");

  const [form, setForm] = useState({
    display_name: "",
    date_of_birth: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    looking_for: "",
    income_range: "",
    lifestyle_expectation: "",
    arrangement_types: [] as string[],
    headline: "",
    bio: "",
    body_type: "",
    generosity: "",
    plus_traits: [] as string[],
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleOpenTo = (value: string) => {
    setForm((prev) => {
      const arr = prev.arrangement_types;
      if (arr.includes(value)) return { ...prev, arrangement_types: arr.filter((v) => v !== value) };
      if (arr.length >= 5) return prev;
      return { ...prev, arrangement_types: [...arr, value] };
    });
  };

  const toggleTrait = (trait: string) => {
    setForm((prev) => {
      const arr = prev.plus_traits;
      if (arr.includes(trait)) return { ...prev, plus_traits: arr.filter((t) => t !== trait) };
      if (arr.length >= 5) return prev;
      return { ...prev, plus_traits: [...arr, trait] };
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const addr = data.address || {};
          setForm((prev) => ({
            ...prev,
            city: addr.city || addr.town || addr.village || prev.city,
            state: addr.state || prev.state,
            country: addr.country || prev.country,
          }));
        } catch {}
        setDetectingLocation(false);
      },
      () => setDetectingLocation(false)
    );
  };

  const isSugar = user?.user_type === "sugar";

  const handleCreateProfile = async () => {
    setError("");
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        display_name: form.display_name,
        date_of_birth: (user as any)?.date_of_birth || form.date_of_birth,
        gender: form.gender,
        city: form.city || null,
        state: form.state || null,
        country: form.country || null,
        looking_for: form.looking_for || null,
        arrangement_types: form.arrangement_types.length ? form.arrangement_types : null,
        headline: form.headline || null,
        bio: form.bio || null,
        body_type: form.body_type || null,
      };
      if (isSugar && form.income_range) payload.income_range = form.income_range;
      if (form.lifestyle_expectation) payload.lifestyle_expectation = form.lifestyle_expectation;

      await api.post("/api/profiles/", payload);
      if (user) {
        useAuthStore.getState().setAuth({ ...user, has_profile: true }, localStorage.getItem("token") || "");
      }
      setProfileCreated(true);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create profile");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchPhotos = useCallback(async () => {
    try {
      const { data } = await api.get("/api/profiles/me");
      setPhotos(data.photos || []);
    } catch {}
  }, []);

  useEffect(() => {
    if (profileCreated) fetchPhotos();
  }, [profileCreated, fetchPhotos]);

  const canProceed = () => {
    if (step === 0) return form.display_name && form.gender && form.city.trim();
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      handleCreateProfile();
    } else {
      setStep(step + 1);
    }
  };

  const stepTitles = [
    "Let\u2019s get started",
    "What matters to you?",
    "Add your photos",
    "You\u2019re in!",
  ];

  const stepSubtitles = [
    "",
    "Be specific. Better alignment starts with being honest about what you want.",
    "",
    "",
  ];

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center px-4 py-8 md:py-12 bg-background">
      <div className="w-full max-w-md md:max-w-xl">
        {step < 3 && (
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold">{stepTitles[step]}</h1>
            {stepSubtitles[step] && (
              <p className="text-sm text-muted mt-1">{stepSubtitles[step]}</p>
            )}
            {!stepSubtitles[step] && (
              <p className="text-sm text-muted mt-1">Step {step + 1} of 3</p>
            )}
            <div className="flex gap-1.5 mt-4 max-w-[200px] mx-auto">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-accent" : "bg-card-border"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-card rounded-2xl border border-card-border p-6 md:p-8 shadow-sm">

          {/* Step 0: Essentials — name, city, DOB, gender in one clean screen */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="ob-name" className="block text-sm font-medium mb-1.5">First name or nickname</label>
                <input
                  id="ob-name"
                  value={form.display_name}
                  onChange={(e) => update("display_name", e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="How others will see you"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Where are you?</label>
                <CityAutocomplete
                  value={form.city}
                  onChange={(city, state, country) => setForm((prev) => ({ ...prev, city, state, country }))}
                  placeholder="Search for a city..."
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={detectingLocation}
                  className="text-xs text-accent hover:text-accent-dark transition-colors mt-1.5 disabled:opacity-50"
                >
                  {detectingLocation ? "Detecting..." : "Use my location"}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Gender</label>
                <div className="flex gap-1.5">
                  {genders.map((g) => (
                    <button key={g.value} type="button" onClick={() => update("gender", g.value)}
                      className={`flex-1 py-3 rounded-lg border text-xs font-medium transition-colors ${
                        form.gender === g.value ? "border-accent bg-accent/5 text-accent" : "border-card-border hover:border-muted"
                      }`}>{g.label}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: What matters to you */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="ob-headline" className="block text-sm font-medium mb-1.5">Your headline</label>
                <input
                  id="ob-headline"
                  value={form.headline}
                  onChange={(e) => update("headline", e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Built a life I love. Looking for someone who adds to it."
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="ob-bio" className="block text-sm font-medium mb-1.5">A little more about you</label>
                <textarea
                  id="ob-bio"
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  rows={3}
                  placeholder="What are you into? What does your life look like? And what kind of person would make it better?"
                  maxLength={500}
                />
                <p className="text-[11px] text-muted mt-1">The good profiles have a point of view.</p>
              </div>

              <fieldset>
                <legend className="block text-sm font-medium mb-1">
                  What are you open to?
                  <span className="text-xs text-muted font-normal ml-1">({form.arrangement_types.length}/5)</span>
                </legend>
                <p className="text-[11px] text-muted mb-2">Choose up to 5.</p>
                <div className="flex flex-wrap gap-2">
                  {openToOptions.map((a) => {
                    const selected = form.arrangement_types.includes(a.value);
                    const atMax = form.arrangement_types.length >= 5 && !selected;
                    return (
                      <button key={a.value} type="button" onClick={() => toggleOpenTo(a.value)}
                        disabled={atMax}
                        className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                          selected ? "border-accent bg-accent/10 text-accent" : atMax ? "border-card-border text-muted/40 cursor-not-allowed" : "border-card-border hover:border-muted"
                        }`}>{a.label}</button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="block text-sm font-medium mb-1">Build <span className="text-xs text-muted font-normal">(optional)</span></legend>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { value: "slim", label: "Slim" },
                    { value: "athletic", label: "Athletic" },
                    { value: "average", label: "Average" },
                    { value: "curvy", label: "Curvy" },
                    { value: "full_figured", label: "Full-figured" },
                    { value: "other", label: "Other" },
                  ].map((bt) => (
                    <button key={bt.value} type="button" onClick={() => update("body_type", form.body_type === bt.value ? "" : bt.value)}
                      className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                        form.body_type === bt.value ? "border-accent bg-accent/5 text-accent" : "border-card-border hover:border-muted"
                      }`}>{bt.label}</button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="block text-sm font-medium mb-2">Your lifestyle</legend>
                <div className="grid grid-cols-2 gap-2">
                  {lifestyleOptions.map((l) => (
                    <button key={l.value} type="button" onClick={() => update("lifestyle_expectation", l.value)}
                      className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        form.lifestyle_expectation === l.value ? "border-accent bg-accent/5 text-accent" : "border-card-border hover:border-muted"
                      }`}>{l.label}</button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="block text-sm font-medium mb-1">Generosity</legend>
                <p className="text-[11px] text-muted mb-2">How important is generosity in the relationship you&apos;re looking for?</p>
                <div className="grid grid-cols-2 gap-2">
                  {generosityOptions.map((g) => (
                    <button key={g.value} type="button" onClick={() => update("generosity", g.value)}
                      className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        form.generosity === g.value ? "border-accent bg-accent/5 text-accent" : "border-card-border hover:border-muted"
                      }`}>{g.label}</button>
                  ))}
                </div>
              </fieldset>

              {isSugar && (
                <fieldset>
                  <legend className="block text-sm font-medium mb-2">Annual income</legend>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {incomeRanges.map((r) => (
                      <button key={r.value} type="button" onClick={() => update("income_range", r.value)}
                        className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                          form.income_range === r.value ? "border-accent bg-accent/5 text-accent" : "border-card-border hover:border-muted"
                        }`}>{r.label}</button>
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset>
                <legend className="block text-sm font-medium mb-1">
                  What are you looking for in your +?
                  <span className="text-xs text-muted font-normal ml-1">({form.plus_traits.length}/5)</span>
                </legend>
                <p className="text-[11px] text-muted mb-2">Choose what matters most.</p>
                <div className="flex flex-wrap gap-2">
                  {plusTraits.map((trait) => {
                    const selected = form.plus_traits.includes(trait);
                    const atMax = form.plus_traits.length >= 5 && !selected;
                    return (
                      <button key={trait} type="button" onClick={() => toggleTrait(trait)}
                        disabled={atMax}
                        className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                          selected ? "border-accent bg-accent/10 text-accent" : atMax ? "border-card-border text-muted/40 cursor-not-allowed" : "border-card-border hover:border-muted"
                        }`}>{trait}</button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted">
                Add at least one photo. Profiles with photos get 10x more matches.
              </p>
              <PhotoUpload photos={photos} onUpdate={fetchPhotos} />
            </div>
          )}

          {/* Step 3: Celebration */}
          {step === 3 && (
            <div className="text-center space-y-6">
              {/* Acquisition source — optional, shown for all user types */}
              <div className="text-left">
                <label className="block text-sm font-medium mb-2 text-center">How did you find Plus?</label>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {[
                    { value: "Google search", label: "Google search" },
                    { value: "Reddit", label: "Reddit" },
                    { value: "Medium article", label: "Medium article" },
                    { value: "Friend referral", label: "Friend referral" },
                    { value: "TikTok", label: "TikTok" },
                    { value: "Instagram", label: "Instagram" },
                    { value: "Twitter/X", label: "Twitter/X" },
                    { value: "Blog post", label: "Blog post" },
                    { value: "Other", label: "Other" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setAcquisitionSource(opt.value);
                        trackFunnel("acquisition_source", { source: opt.value });
                      }}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                        acquisitionSource === opt.value
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-card-border hover:border-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">&#10003;</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">You&apos;re in!</h2>
                <p className="text-sm text-muted">
                  Your profile is live. Verified members in your area are ready to connect.
                </p>
              </div>

              <button
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "onboarding_complete", { user_type: user?.user_type || "unknown" });
                  }
                  router.push("/discover");
                }}
                className="w-full py-3.5 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors text-sm"
              >
                Find my +
              </button>

              <p className="text-xs text-muted text-center">
                <Link href="/community" className="text-accent hover:underline">Join our community</Link> for dating tips and advice.
              </p>

              {isSugar && (
                <div className="border border-card-border rounded-xl p-5 text-left">
                  <p className="text-sm font-medium mb-2">Want full access?</p>
                  <p className="text-xs text-muted mb-3">
                    Plus+ members get priority placement, unlimited messaging, travel mode, and read receipts.
                  </p>
                  <button
                    onClick={() => router.push("/settings?tab=subscription")}
                    className="w-full py-2.5 border border-accent text-accent rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors"
                  >
                    Upgrade to Plus+ &mdash; $99.99/mo
                  </button>
                  <p className="text-[11px] text-muted mt-2 text-center">Cancel anytime. No commitment.</p>
                </div>
              )}
            </div>
          )}

          {error && (
            <p className="text-danger text-sm bg-danger/10 border border-danger/20 px-4 py-3 rounded-lg mt-4" role="alert">{error}</p>
          )}

          {step < 3 && (
            <div className="flex gap-3 mt-6">
              {step > 0 && step < 2 && (
                <button onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors">
                  Back
                </button>
              )}
              {step < 1 ? (
                <button onClick={handleNext} disabled={!canProceed()}
                  className="flex-1 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50">
                  Continue
                </button>
              ) : step === 1 ? (
                <button onClick={handleNext} disabled={submitting}
                  className="flex-1 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50">
                  {submitting ? "Creating profile..." : "Find my +"}
                </button>
              ) : (
                <div className="flex-1 space-y-2">
                  <button onClick={() => setStep(3)}
                    className="w-full py-3 rounded-lg font-semibold transition-colors text-sm bg-accent text-background hover:bg-accent-dark">
                    {photos.length > 0 ? "Continue" : "Continue without photos"}
                  </button>
                  {photos.length === 0 && (
                    <p className="text-xs text-muted text-center">Profiles with photos get 10x more matches. You can add them later.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
