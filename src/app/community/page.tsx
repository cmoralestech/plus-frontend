import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Sugar Dating Community — Free & Private | Plus",
  description:
    "Join 500+ verified sugar daters sharing tips, safety advice, and real talk. Free, private, moderated Telegram community from Plus.",
  keywords:
    "sugar dating community, sugar dating forum, sugar dating group, sugar dating advice, sugar dating tips",
  alternates: { canonical: "https://meetyourplus.com/community" },
  openGraph: {
    title: "Sugar Dating Community — Free & Private | Plus",
    description:
      "Join 500+ verified members sharing tips, safety advice, and real talk about sugar dating. Free, private, moderated.",
    url: "https://meetyourplus.com/community",
    type: "website",
    images: [
      { url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630 },
    ],
  },
};

const gold = "#d4b896";
const dark1 = "#141210";
const dark2 = "#1a1714";
const dark3 = "#201d18";
const cream = "#ede6db";
const creamMuted = "#a8a090";
const line = "#2e2a24";

export default function CommunityPage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      {/* HERO */}
      <section className="px-6 md:px-12 pt-16 md:pt-28 pb-16 md:pb-24 max-w-4xl">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: gold }}
        >
          Private community
        </p>
        <h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] font-normal mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Dating Community Nobody Else Has
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          style={{ color: creamMuted }}
        >
          Join 500+ verified members sharing tips, safety advice, and real talk
          about dating. Free, private, moderated.
        </p>
        <a
          href="https://t.me/arrangedcommunity"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all hover:brightness-110"
          style={{ background: gold, color: dark1 }}
        >
          Join the Community
        </a>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* WHY JOIN */}
      <section
        className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: dark2 }}
      >
        <div className="max-w-5xl">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Why join
          </h2>
          <p className="text-sm mb-12" style={{ color: creamMuted }}>
            Four reasons this community is different from anything else online.
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
                Real advice from real members
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Not Reddit anonymous posts. A curated community of verified
                members who share what actually works — from first messages to
                long-term arrangements.
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
                Safety alerts
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Members warn each other about scammers, share verification tips,
                and keep the community safe. Real-time alerts you won&apos;t find
                anywhere else.
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
                Arrangement advice
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Allowance negotiations, profile reviews, first date tips. The
                conversations that make the difference between a great
                arrangement and a wasted evening.
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
                Direct access to the Plus team
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: creamMuted }}
              >
                Founders answer questions, take feedback, and share upcoming
                features before anyone else sees them. You shape the product.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* WHAT YOU'LL FIND INSIDE */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <h2
          className="text-2xl md:text-3xl font-normal mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What you&apos;ll find inside
        </h2>
        <p className="text-sm mb-12" style={{ color: creamMuted }}>
          Channels and threads designed for members, by members.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Weekly Q&A threads",
            "Anonymous success stories",
            "Profile review channel",
            "City-specific channels (NYC, Miami, DFW, LA, London)",
            "Safety alerts and scam warnings",
            "Exclusive Plus updates and early access to features",
          ].map((item) => (
            <div key={item} className="flex gap-3">
              <span style={{ color: gold }} className="text-sm mt-0.5 flex-shrink-0">+</span>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* RULES */}
      <section
        className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: dark2 }}
      >
        <div className="max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Community rules
          </h2>
          <p className="text-sm mb-12" style={{ color: creamMuted }}>
            We keep it tight so you can trust what you read.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { num: "1", title: "18+ only", desc: "All members must be at least 18 years old." },
              { num: "2", title: "No soliciting arrangements", desc: "This is a community for advice, not a marketplace." },
              { num: "3", title: "No sharing personal info", desc: "Don't share personal information of other members." },
              { num: "4", title: "Respectful discourse", desc: "Disagree constructively. No personal attacks." },
              { num: "5", title: "Zero tolerance for exploitation", desc: "Any form of exploitation results in an immediate ban." },
            ].map((rule) => (
              <div key={rule.num} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${gold}15`, color: gold }}
                >
                  <span className="text-xs font-medium">{rule.num}</span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">{rule.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: creamMuted }}>
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* FINAL CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center">
        <h2
          className="text-3xl md:text-4xl font-normal mb-6 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Join the community
        </h2>
        <p
          className="text-sm mb-10 max-w-md mx-auto"
          style={{ color: creamMuted }}
        >
          Free. Private. Moderated. Real advice from people who actually do this.
        </p>
        <a
          href="https://t.me/arrangedcommunity"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-12 py-4 text-sm tracking-wide font-medium transition-all hover:brightness-110"
          style={{ background: gold, color: dark1 }}
        >
          Join the Community
        </a>
        <p className="text-xs mt-4" style={{ color: creamMuted }}>
          Free to join. No spam. Leave anytime.
        </p>
      </section>

      <PublicFooter />
    </div>
  );
}
