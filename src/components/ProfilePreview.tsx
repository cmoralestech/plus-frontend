"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, BadgeCheck, Sparkles } from "lucide-react";

interface PreviewProfile {
  display_name: string;
  age: number;
  city: string;
  occupation: string;
  photo_url: string | null;
  is_verified: boolean;
  badge?: "Verified" | "New";
  gradient: string;
}

const STATIC_PROFILES: PreviewProfile[] = [
  { display_name: "Sofia", age: 24, city: "Miami", occupation: "Model", photo_url: null, is_verified: true, badge: "Verified", gradient: "from-rose-900/60 via-amber-900/40 to-stone-900" },
  { display_name: "Emma", age: 26, city: "New York", occupation: "PR Executive", photo_url: null, is_verified: true, badge: "Verified", gradient: "from-violet-900/50 via-slate-800/50 to-stone-900" },
  { display_name: "Isabella", age: 23, city: "Los Angeles", occupation: "Actress", photo_url: null, is_verified: true, badge: "New", gradient: "from-amber-900/50 via-rose-900/30 to-stone-900" },
  { display_name: "Olivia", age: 27, city: "Chicago", occupation: "Fashion Buyer", photo_url: null, is_verified: true, badge: "Verified", gradient: "from-teal-900/40 via-slate-800/50 to-stone-900" },
  { display_name: "Valentina", age: 22, city: "Houston", occupation: "Student", photo_url: null, is_verified: true, badge: "New", gradient: "from-pink-900/40 via-amber-900/30 to-stone-900" },
  { display_name: "Ava", age: 25, city: "Las Vegas", occupation: "Entrepreneur", photo_url: null, is_verified: true, badge: "Verified", gradient: "from-indigo-900/40 via-purple-900/30 to-stone-900" },
  { display_name: "Mia", age: 28, city: "San Francisco", occupation: "Designer", photo_url: null, is_verified: true, badge: "Verified", gradient: "from-emerald-900/40 via-teal-900/30 to-stone-900" },
  { display_name: "Charlotte", age: 24, city: "Miami", occupation: "Nurse", photo_url: null, is_verified: true, badge: "New", gradient: "from-rose-900/40 via-violet-900/30 to-stone-900" },
];

interface ProfilePreviewProps {
  heading?: string;
  subheading?: string;
}

export default function ProfilePreview({ heading, subheading }: ProfilePreviewProps) {
  const [profiles, setProfiles] = useState<PreviewProfile[]>(STATIC_PROFILES);
  const [detectedCity, setDetectedCity] = useState<string>("");
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    // Try to fetch real preview profiles from API
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${apiBase}/api/discover/preview`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProfiles(
            data.slice(0, 8).map((p: any, i: number) => ({
              ...p,
              badge: p.is_verified ? "Verified" : "New",
              gradient: STATIC_PROFILES[i % STATIC_PROFILES.length].gradient,
            }))
          );
          setApiLoaded(true);
        }
      })
      .catch(() => {
        // Keep static profiles
      });

    // Detect city
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
              { headers: { "Accept-Language": "en" } }
            );
            const data = await res.json();
            setDetectedCity(data.address?.city || data.address?.town || "");
          } catch {}
        },
        () => {}
      );
    }
  }, []);

  const displayHeading =
    heading ||
    (detectedCity ? `Members near ${detectedCity}` : "Members waiting to meet you");

  const displaySubheading =
    subheading || "Sign up free to see full profiles and start connecting.";

  return (
    <section className="px-5 md:px-10 lg:px-16 py-14 md:py-20 border-b border-card-border">
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-xl md:text-2xl leading-snug">
              {displayHeading}
            </h2>
            <p className="text-sm text-muted mt-1">{displaySubheading}</p>
          </div>
          <Link
            href="/auth?mode=register"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-accent text-background text-sm font-medium hover:bg-accent-light transition-colors rounded-lg"
          >
            Join free
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {profiles.map((p, i) => (
            <Link
              key={i}
              href="/auth?mode=register"
              className="bg-card rounded-xl border border-card-border overflow-hidden hover:border-accent/30 transition-all group"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                {/* Gradient background -- no real photos */}
                {p.photo_url && apiLoaded ? (
                  <img
                    src={p.photo_url}
                    alt=""
                    className="w-full h-full object-cover blur-xl scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${p.gradient}`}
                  >
                    {/* Subtle animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-white/[0.06] to-transparent" />
                  </div>
                )}

                {/* Frosted glass overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.08] flex items-center justify-center mb-3">
                    <span className="text-2xl md:text-3xl font-display text-white/40">
                      {p.display_name[0]}
                    </span>
                  </div>
                  <Sparkles size={14} className="text-accent/60 mb-1" />
                  <span className="text-[10px] text-white/30 tracking-wide">
                    Sign up to view
                  </span>
                </div>

                {/* Badge */}
                {p.badge && (
                  <div className="absolute top-2.5 right-2.5">
                    {p.badge === "Verified" ? (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 backdrop-blur-md border border-accent/20">
                        <BadgeCheck size={10} className="text-accent" />
                        <span className="text-[9px] text-accent font-medium tracking-wide">
                          Verified
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-500/20">
                        <span className="text-[9px] text-emerald-400 font-medium tracking-wide">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card info */}
              <div className="p-3">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm truncate">
                    {p.display_name}
                  </h3>
                  <span className="text-muted text-xs">{p.age}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted">
                  <MapPin size={11} />
                  <span>{p.city}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA overlay bar */}
        <div className="relative mt-6">
          <div className="text-center py-5 rounded-xl bg-card border border-card-border">
            <p className="text-sm text-muted mb-3">
              Sign up to see full profiles, photos, and start messaging.
            </p>
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-background text-sm font-medium hover:bg-accent-light transition-colors rounded-lg"
            >
              Create your free profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
