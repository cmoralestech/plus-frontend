"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";

const accent = "#C87F6E";
const cream = "#F5EDE4";
const warmWhite = "#FAF6F1";
const dark = "#1A1A1A";
const muted = "#6B5E54";
const mutedLight = "#9A8E84";
const divider = "#DDD4C9";
const sectionDark = "#2C2622";

const conversations = [
  { text: "He invited me over at 11.", time: "11:02 PM", sent: false },
  { text: "And?", time: "11:02 PM", sent: true },
  { text: "I went to Pacha instead.", time: "11:03 PM", sent: false },
  { text: "That's the energy.", time: "11:03 PM", sent: true },
];

const values = [
  { title: "UPFRONT", desc: "Everyone's upfront about what they want." },
  { title: "VERIFIED", desc: "Real people. Verified photos and income." },
  { title: "GENEROUS", desc: "Meet people who have more to offer." },
  { title: "PRIVATE", desc: "Your privacy is always in your control." },
];

const profiles = [
  { name: "MIA", age: 25, city: "Miami", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=533&fit=crop&q=80" },
  { name: "ALEX", age: 33, city: "New York", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=533&fit=crop&q=80" },
  { name: "LILY", age: 24, city: "London", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=533&fit=crop&q=80" },
  { name: "ADAM", age: 36, city: "Dallas", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop&q=80" },
];

export default function LandingPage() {
  const { user, loading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { checkAuth(); setMounted(true); }, [checkAuth]);
  useEffect(() => {
    if (!loading && user) router.push(user.has_profile ? "/discover" : "/onboarding");
  }, [loading, user, router]);

  return (
    <div className="min-h-screen" style={{ background: cream, color: dark }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Plus",
          url: "https://meetyourplus.com",
          description: "The dating app where ambitious people meet generous, verified partners.",
          contactPoint: { "@type": "ContactPoint", email: "support@meetyourplus.com", contactType: "customer service" },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Plus",
          url: "https://meetyourplus.com",
        },
      ]) }} />

      {/* ═══ NAV ═══ */}
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5" style={{ borderBottom: `1px solid ${divider}` }}>
        <Link href="/" className="flex items-baseline">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-0.02em", color: dark }}>
            PLUS
          </span>
          <span style={{ color: accent, fontSize: "1.5rem", fontWeight: 700 }}>+</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["Discover", "About", "Safety", "Journal"].map((item) => (
            <Link
              key={item}
              href={item === "Journal" ? "/blog" : `/${item.toLowerCase()}`}
              className="text-[13px] tracking-[0.04em] transition-colors hover:text-[#1A1A1A]"
              style={{ color: mutedLight }}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link href="/auth" className="hidden md:block text-[13px] tracking-[0.02em]" style={{ color: muted }}>
            Sign In
          </Link>
          <Link
            href="/auth?mode=register"
            className="px-5 py-2.5 text-[13px] tracking-[0.04em] font-medium transition-all hover:opacity-90"
            style={{ background: dark, color: warmWhite }}
          >
            JOIN PLUS+
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden" style={{ background: cream }}>
        <div className="grid lg:grid-cols-2 min-h-[88vh]">
          {/* Left — copy */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 lg:py-0 relative z-10">
            <h1
              className="leading-[0.92] tracking-[-0.02em] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 6.5vw, 5.2rem)",
                fontWeight: 400,
                color: dark,
              }}
            >
              Your plus
              <br />
              is out there.<span style={{ color: accent }}>+</span>
            </h1>
            <p className="text-[15px] md:text-[17px] leading-[1.7] max-w-[420px] mb-12" style={{ color: muted }}>
              Dating, travel, generosity, fun + whatever comes next. Meet people who are upfront about what they want.
            </p>
            <div className="flex gap-3">
              <Link
                href="/auth?mode=register"
                className="px-8 py-4 text-[13px] tracking-[0.06em] font-medium transition-all hover:opacity-90"
                style={{ background: dark, color: warmWhite }}
              >
                JOIN PLUS+
              </Link>
              <Link
                href="/discover"
                className="px-8 py-4 text-[13px] tracking-[0.06em] font-medium transition-all hover:bg-[#1A1A1A] hover:text-[#FAF6F1]"
                style={{ border: `1.5px solid ${dark}`, color: dark }}
              >
                SEE WHO&apos;S ON
              </Link>
            </div>
          </div>

          {/* Right — hero image + chat bubbles */}
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80&auto=format&fit=crop"
              alt="Stylish woman in the city"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(245,237,228,1) 0%, rgba(245,237,228,0.4) 12%, transparent 35%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,22,18,0.35) 0%, transparent 50%)" }} />

            {/* Real Conversations floating panel */}
            <div
              className="absolute top-20 right-10 w-[280px]"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
                Real Conversations
              </p>
              <div className="flex flex-col gap-2">
                {conversations.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(8px)",
                      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.12}s`,
                    }}
                  >
                    <div
                      className="px-4 py-2.5 max-w-[190px]"
                      style={{
                        background: msg.sent ? accent : "rgba(255,255,255,0.95)",
                        color: msg.sent ? "#fff" : dark,
                        borderRadius: msg.sent ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      <p className="text-[13px] leading-snug">{msg.text}</p>
                      <p className="text-[10px] mt-1" style={{ color: msg.sent ? "rgba(255,255,255,0.65)" : mutedLight }}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUE PROPS ═══ */}
      <section style={{ background: warmWhite, borderTop: `1px solid ${divider}`, borderBottom: `1px solid ${divider}` }}>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="px-6 md:px-10 py-12 md:py-16 relative"
              style={{ borderRight: i < 3 ? `1px solid ${divider}` : "none" }}
            >
              <span className="block text-[13px] font-medium mb-1" style={{ color: accent }}>+</span>
              <h3 className="text-[11px] tracking-[0.18em] font-semibold mb-3" style={{ color: dark }}>
                {v.title}
              </h3>
              <p className="text-[13px] leading-[1.6]" style={{ color: muted }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DISCOVER YOUR PLUS ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ background: cream }}>
        <div className="grid lg:grid-cols-[1fr_2.2fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-20">
            <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5" style={{ color: mutedLight }}>
              Discover Your Plus
            </p>
            <h2
              className="leading-[1.08] mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: dark,
              }}
            >
              Miami today,<br />
              who&apos;s taking<br />
              you <span style={{ color: accent }}>tonight</span>?
            </h2>
            <Link href="/auth?mode=register" className="inline-flex items-center gap-2 text-[13px] font-medium group" style={{ color: dark }}>
              See who&apos;s in town <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {profiles.map((p) => (
              <div
                key={p.name}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "3/4", borderRadius: "3px" }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 40%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <p className="text-white text-[13px] font-medium tracking-[0.02em]">
                    {p.name}, {p.age}<span style={{ color: accent }}> +</span>
                  </p>
                  <p className="text-white/60 text-[11px] mt-0.5">{p.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHONE MOCKUP — WHAT'S YOUR PLUS? ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ background: sectionDark }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-6" style={{ color: "rgba(245,237,228,0.5)" }}>
              The App
            </p>
            <h2
              className="leading-[1.08] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: warmWhite,
              }}
            >
              WHAT&apos;S YOUR <span style={{ color: accent }}>PLUS</span>?
            </h2>
            <p className="text-[15px] leading-[1.7] mb-10" style={{ color: "rgba(245,237,228,0.6)" }}>
              Tell us what you&apos;re looking for. Dating, travel, dinner, experiences — or all of the above. Your Plus is whatever you want it to be.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["Dating", "Travel", "Dinner", "Experiences", "Ongoing", "Tonight"].map((cat) => (
                <span
                  key={cat}
                  className="px-5 py-2.5 text-[13px] transition-all cursor-pointer"
                  style={{
                    border: "1px solid rgba(245,237,228,0.2)",
                    borderRadius: "24px",
                    color: "rgba(245,237,228,0.8)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(245,237,228,0.8)";
                    e.currentTarget.style.borderColor = "rgba(245,237,228,0.2)";
                  }}
                >
                  + {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div
              className="w-[280px] rounded-[40px] overflow-hidden"
              style={{ background: "#0A0908", padding: "10px", boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)" }}
            >
              <div className="rounded-[32px] overflow-hidden" style={{ background: "#141210" }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1">
                  <span className="text-white/40 text-[10px] font-medium">9:41</span>
                  <div className="w-20 h-5 rounded-full bg-black/80" />
                  <span className="text-white/40 text-[10px]">●●●</span>
                </div>
                {/* App header */}
                <div className="flex items-center justify-center px-5 py-4">
                  <span className="text-white text-[17px] tracking-[-0.01em]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                    PLUS<span style={{ color: accent }}>+</span>
                  </span>
                </div>
                {/* Content */}
                <div className="px-5 pb-8 pt-4">
                  <h3 className="text-white text-[22px] font-medium leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    WHAT&apos;S YOUR
                    <br />
                    <span style={{ color: accent }}>PLUS</span>?
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Dating", "Travel", "Dinner", "Experiences", "Ongoing", "Tonight"].map((cat) => (
                      <span
                        key={cat}
                        className="px-3.5 py-1.5 text-[11px] text-white/70 rounded-full"
                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        + {cat}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Bottom nav */}
                <div className="flex items-center justify-around px-4 py-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Discover", "Likes", "Chat", "Profile"].map((tab) => (
                    <span key={tab} className="text-[10px] text-white/25">{tab}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ background: warmWhite }}>
        <div className="grid lg:grid-cols-[1.2fr_1.5fr] gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div>
            <span className="text-6xl leading-none block mb-4" style={{ fontFamily: "var(--font-display)", color: accent }}>
              &ldquo;
            </span>
            <blockquote
              className="leading-[1.15] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: dark,
              }}
            >
              Finally, a place where people are <span style={{ color: accent }}>honest</span>.
            </blockquote>
            <p className="text-[13px] tracking-[0.02em]" style={{ color: mutedLight }}>
              — Sarah, 26, Miami
            </p>
          </div>

          {/* Lifestyle photo grid */}
          <div className="hidden lg:grid grid-cols-3 gap-2.5">
            {[
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=550&fit=crop&q=80",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=550&fit=crop&q=80",
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=550&fit=crop&q=80",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden" style={{ aspectRatio: "3/4", borderRadius: "3px" }}>
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        className="px-6 md:px-12 lg:px-20 py-24 md:py-36 text-center"
        style={{ background: dark, color: warmWhite }}
      >
        <h2
          className="leading-[1.05] mb-6 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 400,
          }}
        >
          Your <span style={{ color: accent }}>plus</span> is waiting.
        </h2>
        <p className="text-[14px] leading-[1.7] mb-12 max-w-md mx-auto" style={{ color: "rgba(245,237,228,0.5)" }}>
          Free for attractive members. Always. Create your profile in two minutes and see who&apos;s near you.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.06em] font-medium transition-all hover:opacity-90"
          style={{ background: accent, color: "#fff" }}
        >
          JOIN PLUS+
        </Link>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 md:px-12 lg:px-20 py-10" style={{ background: cream, borderTop: `1px solid ${divider}` }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline">
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 500, color: dark }}>
              PLUS
            </span>
            <span style={{ color: accent, fontSize: "1.1rem", fontWeight: 700 }}>+</span>
          </Link>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {["About", "Safety", "Blog", "Terms", "Privacy", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-[12px] tracking-[0.04em] transition-colors hover:text-[#1A1A1A]"
                style={{ color: mutedLight }}
              >
                {item}
              </Link>
            ))}
          </div>

          <p className="text-[11px]" style={{ color: mutedLight }}>
            &copy; 2026 Plus
          </p>
        </div>
      </footer>
    </div>
  );
}
