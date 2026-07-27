import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Plus — Verified Dating for Successful Professionals",
  description:
    "Meet verified, ambitious partners who know what they want. Income-verified profiles, photo verification, 50+ cities. Free to join.",
  alternates: { canonical: "https://meetyourplus.com/join" },
  openGraph: {
    title: "Plus — Verified Dating for Successful Professionals",
    description:
      "Meet verified, ambitious partners who know what they want. Income-verified profiles, photo verification, 50+ cities. Free to join.",
    url: "https://meetyourplus.com/join",
    type: "website",
    images: [
      { url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630 },
    ],
  },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const dark3 = "#FAF5F0";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

export default function JoinPage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="px-6 md:px-12 pt-16 md:pt-28 pb-16 md:pb-24 max-w-4xl">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: gold }}
        >
          Verified luxury dating
        </p>
        <h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] font-normal mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Dating at a Higher Standard
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          style={{ color: creamMuted }}
        >
          Plus connects verified, successful people with attractive,
          ambitious partners. Clear expectations. Real connections. No games.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all hover:brightness-110"
          style={{ background: gold, color: dark1 }}
        >
          Create your free profile
        </Link>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ VALUE PROPS ═══ */}
      <section
        className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: dark2 }}
      >
        <div className="max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="p-6 md:p-8 border"
              style={{ borderColor: line, background: dark3 }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: gold }}
              >
                Every member is verified
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Income verification for successful members, photo verification
                for everyone. You know who you&apos;re talking to.
              </p>
            </div>

            <div
              className="p-6 md:p-8 border"
              style={{ borderColor: line, background: dark3 }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: gold }}
              >
                Clear about expectations
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Both sides state what they&apos;re looking for upfront. No
                guessing, no wasted time.
              </p>
            </div>

            <div
              className="p-6 md:p-8 border"
              style={{ borderColor: line, background: dark3 }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: gold }}
              >
                Privacy-first
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Discreet billing, profile visibility controls, no app store
                listing. Your dating life stays yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <h2
          className="text-2xl md:text-3xl font-normal mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          How it works
        </h2>
        <p className="text-sm mb-12" style={{ color: creamMuted }}>
          Three steps. Two minutes. No surveys.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="p-6 border"
            style={{ borderColor: line, background: dark3 }}
          >
            <p
              className="text-xs tracking-[0.2em] mb-4"
              style={{ color: gold }}
            >
              01
            </p>
            <h3 className="text-base font-medium mb-2">Create your profile</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Two minutes, free. Add your photos, say what you&apos;re looking
              for, and you&apos;re live.
            </p>
          </div>

          <div
            className="p-6 border"
            style={{ borderColor: line, background: dark3 }}
          >
            <p
              className="text-xs tracking-[0.2em] mb-4"
              style={{ color: gold }}
            >
              02
            </p>
            <h3 className="text-base font-medium mb-2">
              Browse verified members in your city
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Every profile shows verification status upfront. Filter by
              location, age, and what they&apos;re looking for.
            </p>
          </div>

          <div
            className="p-6 border"
            style={{ borderColor: line, background: dark3 }}
          >
            <p
              className="text-xs tracking-[0.2em] mb-4"
              style={{ color: gold }}
            >
              03
            </p>
            <h3 className="text-base font-medium mb-2">
              Connect and meet on your terms
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              No waiting for a mutual match. If you like someone, say hello.
              Then take it offline.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ COMPARISON ═══ */}
      <section
        className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: dark2 }}
      >
        <div className="max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A different approach to premium dating
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: creamMuted }}
          >
            Most premium dating apps charge $150+ per month with optional
            verification. Plus charges $99.99 with required verification.
            You get fewer profiles, but every single one is real.
          </p>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <h2
          className="text-2xl md:text-3xl font-normal mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Active in 50+ cities worldwide
        </h2>
        <p
          className="text-base leading-relaxed"
          style={{ color: creamMuted }}
        >
          Members in New York, Miami, Los Angeles, London, Dallas, and more.
          Verified professionals connecting with ambitious partners in every
          major city.
        </p>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ PRICING ═══ */}
      <section
        className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: dark2 }}
      >
        <div className="max-w-5xl">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Simple pricing
          </h2>
          <p className="text-sm mb-12" style={{ color: creamMuted }}>
            Two tiers. No hidden fees.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            {/* Free tier */}
            <div
              className="p-6 md:p-8 border"
              style={{ borderColor: line, background: dark3 }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: creamMuted }}
              >
                Free
              </p>
              <p
                className="text-3xl font-light mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $0
              </p>
              <p className="text-sm mb-6" style={{ color: creamMuted }}>
                Free for attractive members, always
              </p>
              <ul
                className="space-y-2.5 text-sm"
                style={{ color: creamMuted }}
              >
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Create your profile
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Browse verified members
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Like and match
                </li>
              </ul>
            </div>

            {/* Diamond tier */}
            <div
              className="p-6 md:p-8 border relative"
              style={{ borderColor: gold, background: dark3 }}
            >
              <span
                className="absolute -top-3 left-8 px-3 py-0.5 text-[10px] tracking-[0.15em] uppercase"
                style={{ background: gold, color: dark1 }}
              >
                All features
              </span>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: gold }}
              >
                Diamond
              </p>
              <p
                className="text-3xl font-light mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $99.99
              </p>
              <p className="text-sm mb-6" style={{ color: creamMuted }}>
                per month &mdash; or $999/year
              </p>
              <ul
                className="space-y-2.5 text-sm"
                style={{ color: creamMuted }}
              >
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Unlimited messaging
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> See who liked you
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Income verification badge
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> All privacy controls
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Priority placement
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ FINAL CTA ═══ */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center">
        <h2
          className="text-3xl md:text-4xl font-normal mb-6 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Join free &mdash; no credit card required
        </h2>
        <p
          className="text-sm mb-10 max-w-md mx-auto"
          style={{ color: creamMuted }}
        >
          Two minutes to set up. Browse verified members for free. Upgrade when
          you&apos;re ready.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-flex items-center justify-center px-12 py-4 text-sm tracking-wide font-medium transition-all hover:brightness-110"
          style={{ background: gold, color: dark1 }}
        >
          Create your free profile
        </Link>
      </section>

      <PublicFooter />
    </div>
  );
}
