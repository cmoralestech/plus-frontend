import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "About Plus: Why We Built a Better Private Dating Platform",
  description: "We built Plus because Seeking stopped caring. Our story, our values, and why private dating shouldn't cost $110/month.",
  alternates: { canonical: "https://meetyourplus.com/about" },
  openGraph: {
    title: "About Plus | Private Dating for People With More to Offer",
    description: "Why we built Plus, how it works, and what makes it different from Seeking Arrangement.",
    url: "https://meetyourplus.com/about",
    type: "website",
  },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      <section className="px-6 md:px-12 pt-12 md:pt-20 pb-20 md:pb-28 max-w-4xl">
        <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>About</p>
        <h1 className="text-4xl md:text-5xl font-normal mb-8" style={{ fontFamily: "var(--font-display)" }}>
          Dating should be honest about what it is.
        </h1>

        <div className="space-y-6 text-base leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Every relationship involves an exchange. Time, attention, energy, resources — we all bring
            something to the table and we all have expectations. Most dating platforms pretend this
            isn&apos;t true. Plus doesn&apos;t.
          </p>
          <p>
            We built Plus because the existing platforms in this space had grown stale. Outdated
            interfaces, rampant fake profiles, poor privacy, and a general lack of respect for the
            people who use them. The private dating community deserved better.
          </p>
          <p>
            Plus is a platform for adults who know what they want. Established members — people
            who&apos;ve built wealth, careers, and lifestyles worth sharing — connect with attractive
            members who bring charm, ambition, and companionship. The terms are defined upfront.
            The expectations are clear. No games.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20" style={{ borderTop: `1px solid ${line}` }}>
        <div className="max-w-4xl space-y-6 text-base leading-relaxed" style={{ color: creamMuted }}>
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)", color: cream }}>
            Why we built Plus
          </h2>
          <p>
            The private dating space had been dominated by a single platform for over a decade. That
            platform raised prices year after year — from $70 to $109 to $274 per month — while the
            experience deteriorated. Fake profiles multiplied. Bots flooded inboxes. Verification
            became optional, which meant anyone could claim any income level. The iOS app was removed.
            And then they started banning users for using everyday dating language.
          </p>
          <p>
            We saw a community of millions of people who knew what they wanted from dating — clarity,
            generosity, honesty about expectations — being poorly served by a platform that no longer
            respected them. So we built something new. Not a slight improvement. A fundamentally
            different approach.
          </p>
          <p>
            Plus launched in 2024 with three convictions: that verification should be mandatory
            (not optional), that pricing should be fair (not extractive), and that the people who use
            this platform deserve a modern, respectful experience. Every design decision, every feature,
            every policy traces back to those beliefs.
          </p>
          <p>
            We are a small team. We are not venture-funded. We grow through word of mouth, because
            the product is genuinely better. And we plan to keep it that way — a platform built for
            its members, not for investors chasing growth metrics.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20" style={{ borderTop: `1px solid ${line}` }}>
        <div className="max-w-4xl space-y-6 text-base leading-relaxed" style={{ color: creamMuted }}>
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)", color: cream }}>
            How Plus is different
          </h2>
          <p>
            We charge $49.99/month for Plus and $99.99/month for Plus+ — not $109.99 or $274.99. Everyone starts
            with a Free tier that includes browsing, likes, matching, and 5 messages per day. We verify
            profiles instead of letting bots and fakes run wild. We built real privacy controls
            (hidden profiles, photo blurring, private browsing) because discretion actually matters in this space.
          </p>
          <p>
            Our moderation team reviews flagged content within hours, not days. Every message
            that matches known trafficking or solicitation patterns is flagged automatically.
            We cooperate with law enforcement and maintain a complete audit trail. Safety is
            not a marketing bullet point for us. It is the infrastructure the platform is built on.
          </p>
          <p>
            Beyond safety and pricing, we obsess over the details that make daily use pleasant.
            The app loads fast. Notifications work reliably. Search filters are genuinely useful —
            filter by dating type, lifestyle preferences, location radius, and verified
            income bracket. Profiles show what matters: what someone is looking for, what they
            offer, and what kind of connection they prefer. No games, no ambiguity, no guessing.
          </p>
          <p>
            We also believe privacy is non-negotiable in this space. Many of our members are
            public-facing professionals — executives, entrepreneurs, creatives — who need absolute
            discretion. That is why we built hide-from-search, photo blurring for non-matches,
            private browsing mode, hidden income display, and hidden read receipts. These are
            not premium upsells. They are core to how the platform works.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-28" style={{ borderTop: `1px solid ${line}`, background: dark2 }}>
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-12" style={{ fontFamily: "var(--font-display)" }}>What we believe</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: "Honesty over pretense", desc: "Traditional dating apps gamify attraction. We encourage people to be upfront about what they want and what they offer. Clarity is kindness." },
              { title: "Privacy is a right", desc: "Discretion matters, especially in this space. Every privacy feature we build exists because someone needed it. Your personal life is yours." },
              { title: "Safety without compromise", desc: "Verification, blocking, reporting, and community guidelines aren't afterthoughts. They're the foundation everything else is built on." },
              { title: "Respect goes both ways", desc: "Every member, regardless of their role or financial status, deserves to be treated with dignity. Our platform enforces this through design and policy." },
            ].map((value) => (
              <div key={value.title}>
                <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20" style={{ borderTop: `1px solid ${line}` }}>
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Questions? Reach out.
          </h2>
          <p className="text-sm mb-6" style={{ color: creamMuted }}>
            Whether you have a question about the platform, want to report an issue,
            or are interested in press or partnerships — we&apos;re here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium transition-colors"
              style={{ background: gold, color: dark1 }}
            >
              Contact us
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium border transition-colors"
              style={{ borderColor: line, color: cream }}
            >
              Read the FAQ
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 text-sm" style={{ color: creamMuted }}>
            <span>Press: <a href="mailto:press@meetyourplus.com" style={{ color: gold }}>press@meetyourplus.com</a></span>
            <span>Safety: <a href="mailto:safety@meetyourplus.com" style={{ color: gold }}>safety@meetyourplus.com</a></span>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
