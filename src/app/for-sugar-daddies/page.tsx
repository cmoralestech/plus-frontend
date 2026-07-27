import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import ProfilePreviewStatic from "./ProfilePreviewStatic";

export const metadata: Metadata = {
  title: "Sugar Daddy Dating App — Verified, Private, $99.99/mo | Plus",
  description:
    "The verified sugar daddy dating app for successful men who value privacy. Income-verified profiles, discreet billing, $99.99/mo vs Seeking's $150+. No app store listing.",
  keywords:
    "sugar daddy app, sugar daddy dating, sugar daddy website, sugar daddy dating app, arrangement dating, seeking alternative for men",
  alternates: { canonical: "https://meetyourplus.com/for-sugar-daddies" },
  openGraph: {
    title: "Sugar Daddy Dating App — Verified, Private, $99.99/mo | Plus",
    description:
      "The verified platform for successful men who value their time, privacy, and quality connections.",
    url: "https://meetyourplus.com/for-sugar-daddies",
    type: "website",
    images: [
      { url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630 },
    ],
  },
};

const gold = "#C87F6E";
const goldHover = "#D4937E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const dark3 = "#FAF5F0";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

export default function ForSugarDaddiesPage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="px-6 md:px-12 pt-16 md:pt-28 pb-16 md:pb-24 max-w-4xl">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: gold }}
        >
          For successful men
        </p>
        <h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] font-normal mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Dating, on your terms.
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          style={{ color: creamMuted }}
        >
          Plus is the verified platform for successful men who value their
          time, privacy, and quality connections. No games, no fakes, no
          $275/month fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/auth?mode=register"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all hover:brightness-110"
            style={{ background: gold, color: dark1 }}
          >
            Create your free profile
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide transition-colors"
            style={{ color: creamMuted }}
          >
            See pricing &rarr;
          </Link>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ WHAT YOU GET ═══ */}
      <section
        className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: dark2 }}
      >
        <div className="max-w-5xl">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What you actually get
          </h2>
          <p className="text-sm mb-12" style={{ color: creamMuted }}>
            No vague promises. Here is exactly why Plus works for men who
            have options.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-6 md:p-8 border"
              style={{ borderColor: line, background: dark3 }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: gold }}
              >
                Income-verified means she knows you are real
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Verify your income once and every woman you connect with sees
                your badge before the first message. No explaining yourself. No
                "prove it" conversations. Your verification does the talking.
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
                Photo-verified means you know she is real
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Every member can verify their photos with a live selfie match.
                Verified badges are visible on every profile. You will never
                waste a dinner reservation on a catfish again.
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
                $99.99/month, not $150
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Seeking charges $109.99 for Premium and up to $274.99 for
                Diamond. Plus Diamond is $99.99/month with unlimited
                messaging, all privacy controls, private browsing, and
                everything you actually need. One plan, all features.
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
                Cancel anytime. No contracts.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Monthly billing. Cancel from your settings in two clicks. No
                annual commitments, no cancellation fees, no "contact support to
                cancel" games. You keep access through the end of your billing
                period.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ THE SEEKING COMPARISON ═══ */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <h2
          className="text-2xl md:text-3xl font-normal mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          How Plus compares to Seeking
        </h2>
        <p className="text-sm mb-10" style={{ color: creamMuted }}>
          Seeking charges $150&ndash;375/month. We charge $99.99. Same concept,
          better execution, verified members.
        </p>

        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ borderBottom: `2px solid ${line}` }}>
                <th
                  className="text-left py-3 pr-4 font-medium"
                  style={{ color: cream }}
                >
                  &nbsp;
                </th>
                <th
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: gold }}
                >
                  Plus
                </th>
                <th
                  className="text-left py-3 pl-4 font-medium"
                  style={{ color: creamMuted }}
                >
                  Seeking
                </th>
              </tr>
            </thead>
            <tbody style={{ color: creamMuted }}>
              {[
                ["Full access price", "$99.99/mo", "$109.99/mo"],
                ["Top-tier price", "$99.99/mo (Diamond)", "$274.99/mo (Diamond)"],
                ["Income verification", "Built-in, verified badge", "Optional, rarely used"],
                ["Photo verification", "Live selfie match", "Basic"],
                ["Privacy controls", "All tiers", "Diamond only ($274.99)"],
                ["Travel mode", "Yes, any city", "No"],
                ["Mobile experience", "Built for phones", "Desktop-first"],
                ["iOS app", "PWA (works on iPhone)", "Removed from App Store"],
                ["Contracts", "None, cancel anytime", "Annual plans pushed"],
              ].map(([feature, arranged, seeking]) => (
                <tr key={feature} style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4" style={{ color: cream }}>
                    {feature}
                  </td>
                  <td className="py-3 px-4">{arranged}</td>
                  <td className="py-3 pl-4">{seeking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ PRIVACY ═══ */}
      <section
        className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: dark2 }}
      >
        <div className="max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your privacy is not an add-on
          </h2>
          <p className="text-sm mb-12" style={{ color: creamMuted }}>
            Discretion matters. Plus was built with that assumption, not as
            an upsell.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${gold}15`, color: gold }}
              >
                <span className="text-xs font-medium">1</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Hidden from search engines</p>
                <p className="text-xs leading-relaxed" style={{ color: creamMuted }}>
                  Your profile is never indexed by Google. Nobody finds you
                  unless they are logged in on Plus.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${gold}15`, color: gold }}
              >
                <span className="text-xs font-medium">2</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Discreet billing</p>
                <p className="text-xs leading-relaxed" style={{ color: creamMuted }}>
                  Your card statement shows a generic company name. No mention
                  of dating, sugar, or Plus.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${gold}15`, color: gold }}
              >
                <span className="text-xs font-medium">3</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Profile visibility controls</p>
                <p className="text-xs leading-relaxed" style={{ color: creamMuted }}>
                  Hide from search, blur your photos for non-matches, hide your
                  income details, hide read receipts and last seen. All in your
                  settings.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${gold}15`, color: gold }}
              >
                <span className="text-xs font-medium">4</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">No app store listing</p>
                <p className="text-xs leading-relaxed" style={{ color: creamMuted }}>
                  Plus is a web app. No download in your app library. No
                  icon on your home screen unless you choose to add it. Nobody
                  finds it on your phone by accident.
                </p>
              </div>
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
          Three steps. Two minutes.
        </h2>
        <p className="text-sm mb-12" style={{ color: creamMuted }}>
          No 40-question surveys. No algorithms deciding who you can talk to.
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
              Name, photos, what you are looking for. Takes two minutes. Verify
              your income once and your badge appears on every conversation.
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
              Browse verified members
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Filter by city, age, arrangement type, lifestyle. Every profile
              shows verification status upfront. Travel mode lets you connect
              before you arrive.
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
            <h3 className="text-base font-medium mb-2">Message and meet</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              No waiting for a mutual match. If you like someone, say hello.
              Real-time messaging with typing indicators and read receipts.
              Then take it offline.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ PREVIEW PROFILES ═══ */}
      <section style={{ background: dark2 }}>
        <ProfilePreviewStatic />
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ PRICING ═══ */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-5xl">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Simple pricing. No surprises.
          </h2>
          <p className="text-sm mb-12" style={{ color: creamMuted }}>
            Start free. Upgrade when you want unlimited messaging.
          </p>

          <div className="max-w-md mx-auto">
            {/* Diamond */}
            <div
              className="p-8 border relative"
              style={{ borderColor: gold, background: dark3 }}
            >
              <span
                className="absolute -top-3 left-8 px-3 py-0.5 text-[10px] tracking-[0.15em] uppercase"
                style={{ background: gold, color: dark1 }}
              >
                All features
              </span>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-6"
                style={{ color: gold }}
              >
                Diamond
              </p>
              <p
                className="text-4xl font-light mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $99.99
              </p>
              <p className="text-sm mb-8" style={{ color: creamMuted }}>
                per month &mdash; or $999/year
              </p>
              <ul
                className="space-y-3 text-sm mb-10"
                style={{ color: creamMuted }}
              >
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Unlimited messaging
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> See who liked you
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Income verification
                  badge
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Hide from search
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Private browsing mode
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Hidden read receipts
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Priority placement in
                  feed
                </li>
                <li className="flex gap-3">
                  <span style={{ color: gold }}>+</span> Featured profile badge
                </li>
              </ul>
              <Link
                href="/auth?mode=register"
                className="block text-center py-3 text-sm tracking-wide font-medium transition-all hover:brightness-110"
                style={{ background: gold, color: dark1 }}
              >
                Get started
              </Link>
            </div>
          </div>

          <p className="text-xs mt-8" style={{ color: creamMuted }}>
            For context: Seeking charges $109.99/month for their base Premium and
            $274.99/month for Diamond.{" "}
            <Link href="/pricing" style={{ color: gold }}>
              Full pricing breakdown &rarr;
            </Link>
          </p>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* ═══ FINAL CTA ═══ */}
      <section
        className="px-6 md:px-12 py-20 md:py-28 text-center"
        style={{ background: dark2 }}
      >
        <h2
          className="text-3xl md:text-4xl font-normal mb-6 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Create your free profile
        </h2>
        <p
          className="text-sm mb-10 max-w-md mx-auto"
          style={{ color: creamMuted }}
        >
          Two minutes to set up. Browse for free. Upgrade when you are ready.
          Cancel anytime.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-flex items-center justify-center px-12 py-4 text-sm tracking-wide font-medium transition-all hover:brightness-110"
          style={{ background: gold, color: dark1 }}
        >
          Get started free
        </Link>
        <p className="text-xs mt-4" style={{ color: creamMuted }}>
          No credit card required to sign up.
        </p>
      </section>

      <PublicFooter />
    </div>
  );
}
