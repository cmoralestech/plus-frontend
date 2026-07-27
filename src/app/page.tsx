"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";

const accent = "#C87F6E";
const cream = "#F5EDE4";
const dark = "#1A1A1A";
const muted = "#8A7E76";
const cardBg = "#FFFBF7";
const divider = "#E8DDD2";

const conversations = [
  { text: "He invited me over at 11.", time: "11:02 PM", sent: false },
  { text: "And?", time: "11:02 PM", sent: true },
  { text: "I went to Pacha instead.", time: "11:03 PM", sent: false },
  { text: "That's the energy.", time: "11:03 PM", sent: true },
];

const values = [
  { icon: "✦", title: "UPFRONT", desc: "Everyone's upfront about what they want." },
  { icon: "♡", title: "VERIFIED", desc: "Real people. Verified photos and income." },
  { icon: "◇", title: "GENEROUS", desc: "Meet people who have more to offer." },
  { icon: "▣", title: "PRIVATE", desc: "Your privacy is always in your control." },
];

const profiles = [
  { name: "MIA", age: 25, city: "Miami", online: true, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=533&fit=crop&q=80" },
  { name: "ALEX", age: 33, city: "New York", online: true, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=533&fit=crop&q=80" },
  { name: "LILY", age: 24, city: "London", online: true, img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=533&fit=crop&q=80" },
  { name: "ADAM", age: 36, city: "Dallas", online: false, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop&q=80" },
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
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
        <Link href="/" className="flex items-baseline gap-0">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 400, letterSpacing: "-0.02em", color: dark }}>
            PLUS
          </span>
          <span style={{ color: accent, fontSize: "1.6rem", fontWeight: 600 }}>+</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["DISCOVER", "ABOUT", "SAFETY", "JOURNAL"].map((item) => (
            <Link
              key={item}
              href={item === "JOURNAL" ? "/blog" : `/${item.toLowerCase()}`}
              className="text-xs tracking-[0.15em] transition-colors"
              style={{ color: muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = dark)}
              onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="hidden md:block text-sm" style={{ color: muted }}>
            SIGN IN
          </Link>
          <Link
            href="/auth?mode=register"
            className="px-5 py-2.5 text-sm tracking-wide transition-all"
            style={{ background: dark, color: cream, fontWeight: 500 }}
          >
            JOIN PLUS+
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1fr] min-h-[85vh]">
          {/* Left — copy */}
          <div className="flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-20 pt-16 lg:pt-0 relative z-10">
            <h1
              className="leading-[0.95] tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 400,
                color: dark,
              }}
            >
              Your plus
              <br />
              is out there.
              <span style={{ color: accent }}>+</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-md mb-10" style={{ color: muted }}>
              Dating, travel, generosity, fun + whatever comes next. Meet people who are upfront about what they want.
            </p>
            <div className="flex gap-3">
              <Link
                href="/auth?mode=register"
                className="px-8 py-4 text-sm tracking-wide font-medium transition-all"
                style={{ background: dark, color: cream }}
              >
                JOIN PLUS+
              </Link>
              <Link
                href="/discover"
                className="px-8 py-4 text-sm tracking-wide font-medium transition-all"
                style={{ border: `1px solid ${dark}`, color: dark }}
              >
                SEE WHO&apos;S ON
              </Link>
            </div>
          </div>

          {/* Right — hero image area */}
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80&auto=format&fit=crop"
              alt="Stylish woman in the city"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(245,237,228,1) 0%, rgba(245,237,228,0.3) 15%, transparent 40%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%)" }} />

            {/* Real Conversations floating panel */}
            <div
              className="absolute top-16 right-8 w-72"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            >
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4" style={{ color: "#fff" }}>
                REAL CONVERSATIONS
              </p>
              <div className="flex flex-col gap-2.5">
                {conversations.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(10px)",
                      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + i * 0.15}s`,
                    }}
                  >
                    <div
                      className="px-4 py-2.5 max-w-[200px]"
                      style={{
                        background: msg.sent ? accent : cardBg,
                        color: msg.sent ? "#fff" : dark,
                        borderRadius: msg.sent ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      }}
                    >
                      <p className="text-sm leading-snug">{msg.text}</p>
                      <p className="text-[10px] mt-1" style={{ color: msg.sent ? "rgba(255,255,255,0.7)" : muted }}>
                        {msg.time} {msg.sent && "✓✓"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/blog" className="flex items-center gap-1 mt-4 text-xs tracking-wide" style={{ color: "#fff" }}>
                READ MORE STORIES <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUE PROPS ═══ */}
      <section style={{ borderTop: `1px solid ${divider}`, borderBottom: `1px solid ${divider}` }}>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="px-6 md:px-10 py-10 md:py-14"
              style={{ borderRight: i < 3 ? `1px solid ${divider}` : "none" }}
            >
              <span className="text-2xl block mb-4" style={{ color: muted }}>{v.icon}</span>
              <h3 className="text-xs tracking-[0.2em] font-medium mb-3" style={{ color: dark }}>
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>
                {v.desc}
              </p>
              <span className="block mt-4 text-sm font-medium" style={{ color: accent }}>+</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DISCOVER YOUR PLUS ═══ */}
      <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: muted }}>
              DISCOVER YOUR PLUS
            </p>
            <h2
              className="leading-[1.1] mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 400,
              }}
            >
              Miami today,
              <br />
              who&apos;s taking
              <br />
              you <span style={{ color: accent }}>tonight</span>?
            </h2>
            <Link href="/auth?mode=register" className="inline-flex items-center gap-2 text-sm" style={{ color: dark }}>
              See who&apos;s in town <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {profiles.map((p) => (
              <div
                key={p.name}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "3/4", borderRadius: "4px" }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium">
                    {p.name}, {p.age} <span style={{ color: accent }}>+</span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-white/70 text-xs">{p.city}</span>
                    {p.online && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-green-400 text-[10px]">Online</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHONE MOCKUP — WHAT'S YOUR PLUS? ═══ */}
      <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24" style={{ background: "#EDE4D9" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: muted }}>
              THE APP
            </p>
            <h2
              className="leading-[1.1] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
              }}
            >
              WHAT&apos;S YOUR <span style={{ color: accent }}>PLUS</span>?
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: muted }}>
              Tell us what you&apos;re looking for. Dating, travel, dinner, experiences — or all of the above. Your Plus is whatever you want it to be.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["Dating", "Travel", "Dinner", "Experiences", "Ongoing", "Tonight"].map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 text-sm transition-all cursor-pointer"
                  style={{
                    border: `1px solid ${divider}`,
                    borderRadius: "24px",
                    color: dark,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = dark;
                    e.currentTarget.style.borderColor = divider;
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
              className="w-[280px] rounded-[36px] overflow-hidden shadow-2xl"
              style={{ background: "#0A0A0A", padding: "12px" }}
            >
              <div className="rounded-[28px] overflow-hidden" style={{ background: "#111" }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-2">
                  <span className="text-white/50 text-[10px]">9:41</span>
                  <span className="text-white/50 text-[10px]">●●●</span>
                </div>
                {/* App header */}
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-white/40 text-lg">☰</span>
                  <span className="text-white text-lg" style={{ fontFamily: "var(--font-display)" }}>
                    PLUS<span style={{ color: accent }}>+</span>
                  </span>
                  <div className="flex gap-2">
                    <span className="text-white/40 text-sm">♡</span>
                    <span className="text-white/40 text-sm">⚙</span>
                  </div>
                </div>
                {/* Content */}
                <div className="px-5 pb-6 pt-4">
                  <h3 className="text-white text-2xl font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    WHAT&apos;S
                    <br />
                    YOUR <span style={{ color: accent }}>PLUS</span>?
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Dating", "Travel", "Dinner", "Experiences", "Ongoing", "Tonight"].map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1.5 text-xs text-white/80 rounded-full"
                        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        + {cat}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Bottom nav */}
                <div className="flex items-center justify-around px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Discover", "Likes", "Messages", "Plans", "Profile"].map((tab) => (
                    <span key={tab} className="text-[9px] text-white/30">{tab}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          <div>
          <div className="flex items-start gap-4 mb-2">
            <span className="text-5xl leading-none" style={{ fontFamily: "var(--font-display)", color: accent }}>
              &ldquo;
            </span>
          </div>
          <blockquote
            className="leading-[1.2] mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400,
            }}
          >
            Finally, a place where
            <br />
            people are <span style={{ color: accent }}>honest</span>.
          </blockquote>
          <p className="text-sm" style={{ color: muted }}>
            — Sarah, Miami
          </p>
          </div>
          {/* Lifestyle photo grid */}
          <div className="hidden lg:grid grid-cols-4 gap-2">
            {[
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&q=80",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&q=80",
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&q=80",
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&q=80",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden" style={{ aspectRatio: "4/5", borderRadius: "4px" }}>
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        className="px-6 md:px-12 lg:px-16 py-20 md:py-32 text-center"
        style={{ background: dark, color: cream }}
      >
        <h2
          className="leading-[1.05] mb-6 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
          }}
        >
          Your <span style={{ color: accent }}>plus</span> is waiting.
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: "rgba(245,237,228,0.6)" }}>
          Free for attractive members. Always. Create your profile in two minutes and see who&apos;s near you.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: accent, color: "#fff" }}
        >
          JOIN PLUS+
        </Link>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 md:px-12 lg:px-16 py-12" style={{ borderTop: `1px solid ${divider}` }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline gap-0">
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, color: dark }}>
              PLUS
            </span>
            <span style={{ color: accent, fontSize: "1.2rem", fontWeight: 600 }}>+</span>
          </Link>

          <div className="flex items-center gap-6">
            {["ABOUT", "SAFETY", "BLOG", "TERMS", "PRIVACY", "CONTACT"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs tracking-[0.1em]"
                style={{ color: muted }}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {["IG", "TT", "X", "✉"].map((icon) => (
              <span key={icon} className="text-sm cursor-pointer" style={{ color: muted }}>
                {icon}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
