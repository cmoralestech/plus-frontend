"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { useVisitorCity } from "@/lib/markets";

const bg = "#141210";
const card = "#1e1b17";
const cardBorder = "#2e2a24";
const fg = "#ede6db";
const accent = "#8B1A1A";
const accentLight = "#A52222";
const muted = "#a8a090";
const mutedBg = "#252219";

// A recurring brand device: standards and intention, shown rather than stated.
// Rotates so the homepage reads differently on a second visit.
const conversations = [
  [
    { text: "He asked what I wanted to do.", time: "9:14 PM", sent: false },
    { text: "And?", time: "9:14 PM", sent: true },
    { text: "Then actually planned it.", time: "9:15 PM", sent: false },
    { text: "Oh. Keep him.", time: "9:15 PM", sent: true },
  ],
  [
    { text: "He's 43.", time: "11:02 PM", sent: false },
    { text: "And?", time: "11:02 PM", sent: true },
    { text: "He has a reservation.", time: "11:03 PM", sent: false },
    { text: "Finally.", time: "11:03 PM", sent: true },
  ],
  [
    { text: "She's younger than my usual type.", time: "8:40 PM", sent: false },
    { text: "And?", time: "8:40 PM", sent: true },
    { text: "She's also smarter than my usual type.", time: "8:41 PM", sent: false },
    { text: "There it is.", time: "8:41 PM", sent: true },
  ],
];

const profiles = [
  { name: "MIA", age: 27, work: "Art Director", city: "Miami", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=533&fit=crop&q=80" },
  { name: "ALEX", age: 38, work: "Founder", city: "New York", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=533&fit=crop&q=80" },
  { name: "LILY", age: 26, work: "Stylist", city: "London", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=533&fit=crop&q=80" },
  { name: "ADAM", age: 44, work: "Hospitality", city: "Houston", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop&q=80" },
];

const plusTags = ["Dating", "Long-term", "Travel", "Experiences", "Generous dating", "Something casual"];

export default function LandingPage() {
  const { user, loading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [convoIndex, setConvoIndex] = useState(0);
  const { city: visitorCity, resolved: cityResolved, isActive: inActiveMarket } = useVisitorCity();

  useEffect(() => { checkAuth(); setMounted(true); }, [checkAuth]);
  useEffect(() => {
    if (!loading && user) router.push(user.has_profile ? "/discover" : "/onboarding");
  }, [loading, user, router]);

  // Rotation starts after mount so server and client render the same first frame.
  useEffect(() => {
    const id = setInterval(
      () => setConvoIndex((i) => (i + 1) % conversations.length),
      7000
    );
    return () => clearInterval(id);
  }, []);

  // Someone outside a launch market shouldn't be sent to a signup they can't
  // use. Only divert once detection has actually placed them somewhere.
  const outOfMarket = cityResolved && Boolean(visitorCity) && !inActiveMarket;
  const joinHref = outOfMarket ? "/waitlist" : "/auth?mode=register";
  const joinLabel = outOfMarket ? "Join the waitlist" : "Find your +";
  const activeConvo = conversations[convoIndex];

  return (
    <div className="min-h-screen" style={{ background: bg, color: fg }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Plus",
          url: "https://meetyourplus.com",
          description: "Private dating for people with more to offer. Verified profiles, real privacy, free for Plus members.",
          contactPoint: { "@type": "ContactPoint", email: "support@meetyourplus.com", contactType: "customer service" },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Plus",
          url: "https://meetyourplus.com",
        },
      ]) }} />

      {/* ═══ HERO ═══ */}
      <div className="relative min-h-[90vh] md:min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Couple enjoying luxury dating on a yacht"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(20,18,16,0.7) 0%, rgba(20,18,16,0.5) 50%, ${bg} 100%)` }} />
        </div>

        <div className="relative z-10">
          <PublicNav transparent />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-end px-5 md:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-7xl w-full grid lg:grid-cols-[1.5fr_1fr] gap-12 items-end">
            <div>
              <h1
                className="leading-[0.92] tracking-tight mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 400,
                  color: "#fff",
                }}
              >
                Your plus<br />
                is out there.<span style={{ color: accent }}>+</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                Dating for people who know what they want — and what they bring.
                Better alignment. Real people. No pretending.
                <span className="block mt-2 text-white/40">
                  Now accepting members in Miami + Houston.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={joinHref}
                  className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-colors hover:opacity-90"
                  style={{ background: accent, color: "#fff" }}
                >
                  {joinLabel}
                </Link>
                <Link
                  href="/discover"
                  className="inline-flex items-center justify-center px-10 py-4 text-sm text-white/50 hover:text-white transition-colors"
                >
                  See who&apos;s here &rarr;
                </Link>
              </div>
              {outOfMarket ? (
                <p className="text-[13px] text-white/50 mt-5">
                  Plus isn&apos;t in {visitorCity} yet.{" "}
                  <Link href="/waitlist" className="underline" style={{ color: "#fff" }}>
                    Help change that. <span style={{ color: accent }}>+</span>
                  </Link>
                </p>
              ) : (
                <p className="text-[13px] text-white/40 mt-5">
                  Not in Miami or Houston?{" "}
                  <Link href="/waitlist" className="underline hover:text-white transition-colors">
                    Join the waitlist &rarr;
                  </Link>
                </p>
              )}
            </div>

            {/* Chat bubbles */}
            <div
              className="hidden lg:block"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-4 text-white/40">
                Real Conversations
              </p>
              <div className="flex flex-col gap-2">
                {activeConvo.map((msg, i) => (
                  <div
                    key={`${convoIndex}-${i}`}
                    className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(8px)",
                      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.12}s`,
                    }}
                  >
                    <div
                      className="px-4 py-2.5 max-w-[200px]"
                      style={{
                        background: msg.sent ? "#007AFF" : "#E9E9EB",
                        color: msg.sent ? "#fff" : "#1A1A1A",
                        borderRadius: msg.sent ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      }}
                    >
                      <p className="text-[13px] leading-snug">{msg.text}</p>
                      <p className="text-[10px] mt-1" style={{ color: msg.sent ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.35)" }}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ═══ WHAT MAKES PLUS DIFFERENT ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28">
        <div className="max-w-7xl">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl md:text-4xl leading-snug max-w-2xl mb-16 md:mb-20">
            Chemistry can&apos;t be verified. Fortunately, some things can.<span style={{ color: accent }}> +</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: accent }}>
                Real people. Actually verified.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>
                Identity verification helps keep fake profiles, impersonators, and
                bots out of the community.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: accent }}>
                Success shouldn&apos;t be self-reported.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>
                Established members complete financial verification before receiving
                verified status. Exact financial information stays private.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: accent }}>
                Say what you actually want.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>
                Lifestyle. Generosity. Chemistry. Ambition. Something serious — or
                something less serious. Plus makes room for the things that actually
                matter to you.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ TWO AUDIENCES ═══ */}
      <section style={{ background: "#F5EDE4", color: "#1A1A1A" }}>
        <div className="grid md:grid-cols-2">
          {/* Generous */}
          <div className="px-5 md:px-10 lg:px-16 py-14 md:py-24" style={{ borderBottom: "1px solid #E8DDD2", borderRight: "1px solid #E8DDD2" }}>
            <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: "#8A7E76" }}>For established members</p>
            <h3 style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }} className="text-xl md:text-2xl leading-snug mb-4">
              You&apos;ve built the life. Find someone who adds to it.
              <span style={{ color: accent }}> +</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: "#6B5E54" }}>
              Meet ambitious, attractive people who are upfront about what
              they&apos;re looking for — and interested in what you bring to the
              table.
            </p>
            <Link
              href={joinHref}
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium transition-colors hover:opacity-90"
              style={{ background: "#1A1A1A", color: "#F5EDE4" }}
            >
              {joinLabel}
            </Link>
          </div>

          {/* Attractive */}
          <div className="px-5 md:px-10 lg:px-16 py-14 md:py-24">
            <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: "#8A7E76" }}>For Plus members</p>
            <h3 style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }} className="text-xl md:text-2xl leading-snug mb-4">
              Your standards aren&apos;t a personality flaw.
              <span style={{ color: accent }}> +</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: "#6B5E54" }}>
              Meet established, verified people who value generosity, chemistry,
              and actually making a plan.
            </p>
            <Link
              href={joinHref}
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium transition-colors"
              style={{ border: "1px solid #1A1A1A", color: "#1A1A1A" }}
            >
              {outOfMarket ? "Join the waitlist" : "Join free — it stays free"}
            </Link>
          </div>
        </div>
      </section>


      {/* ═══ DISCOVER YOUR PLUS — profile cards ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28">
        <div className="max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: muted }}>
                Discover Your Plus
              </p>
              <h2
                className="leading-[1.08] mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 400,
                }}
              >
                Miami tonight.<br />
                Who&apos;s your <span style={{ color: accent }}>+</span>?
              </h2>
              <Link href="/discover" className="inline-flex items-center gap-2 text-[13px] group" style={{ color: accent }}>
                See who&apos;s here <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
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
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 60%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <p className="text-white text-[13px] font-medium">
                      {p.name}, {p.age}<span style={{ color: accent }}> +</span>
                    </p>
                    <p className="text-white/50 text-[11px] mt-0.5">
                      {p.work} &middot; {p.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ background: card, borderTop: `1px solid ${cardBorder}`, borderBottom: `1px solid ${cardBorder}` }}>
        <div className="px-5 md:px-10 lg:px-16 py-16 md:py-28 max-w-7xl">
          <div className="max-w-lg mb-12 md:mb-16">
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl md:text-3xl leading-snug mb-4">
              Two minutes. Tell us what matters.<span style={{ color: accent }}> +</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              No personality test. No endless questionnaire. Create your profile,
              set your preferences, verify, and start discovering people.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Say what you want", desc: "Tell us what you're looking for, what you value, and what kind of relationship fits your life." },
              { step: "02", title: "Get verified", desc: "Identity verification for members. Financial verification for established members." },
              { step: "03", title: "Discover your +", desc: "Browse freely. If someone interests you, say hello. No waiting for an algorithm to decide you're compatible." },
              { step: "04", title: "Going somewhere? +", desc: "Find someone worth taking with you. Art Week in Miami. F1 in Monaco. Cannes. Wimbledon. Ibiza. Aspen. Capri. Add where you're headed — or where you want to go — and find a + who wants to be there too." },
            ].map((s) => (
              <div key={s.step}>
                <p className="text-xs tracking-[0.2em] mb-3" style={{ color: accent }}>{s.step}</p>
                <h3 className="text-sm font-medium mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ PHONE MOCKUP — WHAT'S YOUR PLUS? ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: muted }}>
              The App
            </p>
            <h2
              className="leading-[1.08] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 400,
              }}
            >
              WHAT&apos;S YOUR <span style={{ color: accent }}>PLUS</span>?
            </h2>
            <p className="text-[15px] leading-[1.7] mb-10" style={{ color: muted }}>
              There isn&apos;t one right kind of relationship. Tell us what
              you&apos;re actually looking for and find someone looking for
              something compatible.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {plusTags.map((cat) => (
                <span
                  key={cat}
                  className="px-5 py-2.5 text-[13px] transition-all cursor-pointer"
                  style={{
                    border: `1px solid ${cardBorder}`,
                    borderRadius: "24px",
                    color: muted,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = muted;
                    e.currentTarget.style.borderColor = cardBorder;
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
              style={{ background: "#0A0908", padding: "10px", boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)" }}
            >
              <div className="rounded-[32px] overflow-hidden" style={{ background: bg }}>
                <div className="flex items-center justify-between px-6 pt-3 pb-1">
                  <span className="text-white/40 text-[10px] font-medium">9:41</span>
                  <div className="w-20 h-5 rounded-full bg-black/80" />
                  <span className="text-white/40 text-[10px]">●●●</span>
                </div>
                <div className="flex items-center justify-center px-5 py-4">
                  <span className="text-white text-[17px] tracking-[-0.01em]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                    PLUS<span style={{ color: accent }}>+</span>
                  </span>
                </div>
                <div className="px-5 pb-8 pt-4">
                  <h3 className="text-white text-[22px] font-medium leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    WHAT&apos;S YOUR<br />
                    <span style={{ color: accent }}>PLUS</span>?
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {plusTags.map((cat) => (
                      <span
                        key={cat}
                        className="px-3.5 py-1.5 text-[11px] text-white/60 rounded-full"
                        style={{ border: `1px solid ${cardBorder}` }}
                      >
                        + {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-around px-4 py-3.5" style={{ borderTop: `1px solid ${cardBorder}` }}>
                  {["Discover", "Likes", "Chat", "Profile"].map((tab) => (
                    <span key={tab} className="text-[10px] text-white/25">{tab}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ PRICING ═══ */}
      <section style={{ background: card, borderTop: `1px solid ${cardBorder}`, borderBottom: `1px solid ${cardBorder}` }}>
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-24 max-w-7xl">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-center">
            <div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl md:text-3xl leading-snug mb-4">
                Pay for access. Not attention.<span style={{ color: accent }}> +</span>
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: muted }}>
                Plus members use Plus completely free — no trial, no catch.
                Established members start free too and upgrade when they want
                unlimited messaging. No boosts, no credits, nothing that charges
                you to be seen.
              </p>
              <Link href="/pricing" className="inline-block mt-6 text-sm transition-colors" style={{ color: accent }}>
                Full pricing breakdown &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-lg overflow-hidden" style={{ background: cardBorder }}>
              {[
                { name: "Free", price: "$0", note: "Browse, match, 5 messages/day" },
                { name: "Plus", price: "$49.99", note: "Unlimited messaging, verified badge" },
                { name: "Plus+", price: "$99.99", note: "Priority, travel mode, boost" },
              ].map((plan) => (
                <div key={plan.name} className="p-5 md:p-6 text-center" style={{ background: mutedBg }}>
                  <p className="text-xs mb-2" style={{ color: muted }}>{plan.name}</p>
                  <p className="text-xl md:text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>{plan.price}<span className="text-xs" style={{ color: muted }}>/mo</span></p>
                  <p className="text-[11px] leading-snug" style={{ color: muted }}>{plan.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══ TESTIMONIAL ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28" style={{ background: "#F5EDE4", color: "#1A1A1A" }}>
        <div className="grid lg:grid-cols-[1.2fr_1.5fr] gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div>
            <span className="text-5xl leading-none block mb-4" style={{ fontFamily: "var(--font-display)", color: accent }}>
              &ldquo;
            </span>
            <blockquote
              className="leading-[1.15] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 400,
                color: "#1A1A1A",
              }}
            >
              The best part of getting ready? Knowing the date is actually <span style={{ color: accent }}>worth it</span>.<span style={{ color: accent }}> +</span>
            </blockquote>
          </div>

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


      {/* ═══ EXPANSION FUNNEL ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28 text-center">
        <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: muted }}>
          Where should Plus go next?<span style={{ color: accent }}> +</span>
        </p>
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-5xl leading-snug mb-4">
          Miami <span style={{ color: accent }}>+</span> Houston are open.
        </h2>
        <p className="text-sm mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: muted }}>
          Tell us where you are — and what you&apos;re looking for. We&apos;ll use
          member demand to decide where Plus opens next.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-colors hover:opacity-90"
            style={{ background: accent, color: "#fff" }}
          >
            PUT MY CITY ON THE LIST
          </Link>
          {!outOfMarket && (
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-colors"
              style={{ border: `1px solid ${cardBorder}`, color: fg }}
            >
              Find your + &rarr;
            </Link>
          )}
        </div>
      </section>


      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-20 md:py-32" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="absolute inset-0" style={{ background: mutedBg }} />
        <div className="relative z-10 px-5 md:px-10 lg:px-16 max-w-3xl mx-auto text-center">
          <h2
            className="leading-[1.05] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 400,
            }}
          >
            Your <span style={{ color: accent }}>plus</span> is waiting.
          </h2>
          <p className="text-[14px] leading-[1.7] mb-12" style={{ color: muted }}>
            Free for Plus members. Always. Create your profile in two minutes and see who&apos;s near you.
          </p>
          <Link
            href={joinHref}
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-colors hover:opacity-90"
            style={{ background: accent, color: "#fff" }}
          >
            {joinLabel}
          </Link>
        </div>
      </section>


      <PublicFooter />
    </div>
  );
}
