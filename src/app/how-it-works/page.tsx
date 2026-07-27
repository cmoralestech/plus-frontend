import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

/* ─── Metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "How Plus Works | Private Dating Made Simple",
  description:
    "Learn how Plus works, from creating your free profile to meeting verified members. Private dating made simple, safe, and transparent.",
  alternates: { canonical: "https://meetyourplus.com/how-it-works" },
  openGraph: {
    title: "How Plus Works | Private Dating Made Simple",
    description:
      "From profile creation to your first connection, here's exactly how Plus works.",
    url: "https://meetyourplus.com/how-it-works",
    siteName: "Plus",
    type: "website",
  },
};

/* ─── Steps data ───────────────────────────────────────────────── */

const STEPS = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Sign up for free in under two minutes. Choose whether you're joining as a successful member or an attractive member, add your best photos, write a short bio that shows your personality, and define your dating preferences — mentorship, travel companion, long-term relationship, or open to anything. Your profile is your first impression, so be honest about what you're looking for. The best connections start with clarity.",
    bullets: [
      "Always free to create, no credit card required",
      "Choose your member type and dating preferences upfront",
      "Add up to 6 photos — public or private, you control visibility",
    ],
  },
  {
    number: "02",
    title: "Get verified",
    description:
      "Verification is what separates Plus from every other platform. Photo verification uses AI-powered facial recognition to confirm you are who your photos say you are — take a quick selfie and our system matches it in seconds. Successful members can also complete income verification by securely uploading tax documents, pay stubs, or bank statements through our third-party verification partner. Verified members earn a badge that builds instant trust and dramatically increases messages received.",
    bullets: [
      "Photo verification takes under 60 seconds",
      "Income verification is optional but highly recommended — verified profiles get 3x more messages",
      "All documents are processed by a secure third-party partner and never stored on our servers",
    ],
  },
  {
    number: "03",
    title: "Discover members",
    description:
      "Once your profile is live, our relevancy engine surfaces the best matches based on your preferences, location, dating type, and activity. Browse members in your city or use Travel Mode to connect in any city before you even arrive. Filter by lifestyle expectations, dating preferences, verification status, and more. The discovery feed is designed to show you people who actually match what you're looking for — not just everyone with a pulse.",
    bullets: [
      "Relevancy-ranked feed that improves the more you use it",
      "Travel Mode lets you set your location to any city in advance (Plus+)",
      "Advanced filters: dating type, age, lifestyle, verification status",
    ],
  },
  {
    number: "04",
    title: "Start a conversation",
    description:
      "There's no matching gate on Plus. If someone catches your eye, reach out directly. Free members get 5 messages per day. Plus members unlock unlimited messaging. We've found that the best connections start with a genuine, personal message — not a generic 'hey.'",
    bullets: [
      "No matching required — message anyone directly",
      "Free tier includes 5 messages per day",
      "Plus ($49.99/mo) or Plus+ ($99.99/mo) unlocks unlimited messaging",
    ],
  },
  {
    number: "05",
    title: "Define your connection",
    description:
      "This is the conversation that matters most. Once you've connected with someone, discuss what you're each looking for openly. Connections vary widely — some people want mentorship and travel, others prefer regular dates with clear expectations. Plus encourages you to have this conversation early and honestly. Define the frequency of dates, expectations around exclusivity, and what the relationship looks like. The clearer you are upfront, the better the experience will be for both sides.",
    bullets: [
      "Define what you're looking for: mentorship, travel, companionship, or long-term",
      "Set expectations for frequency, exclusivity, and communication style",
      "Use in-app messaging to keep early conversations on-platform for safety",
    ],
  },
  {
    number: "06",
    title: "Meet safely",
    description:
      "When you're ready to meet in person, safety comes first. Always choose a public place for your first date — an upscale restaurant, a hotel bar, or a well-known venue. Share your plans with a trusted friend. Trust your instincts: if something feels off, end the date. Plus provides block and report tools that are available at every stage, and our trust and safety team reviews reports within 24 hours. A great relationship is built on mutual respect and genuine connection — and that starts with feeling safe.",
    bullets: [
      "Always meet in public for the first few dates",
      "Use block and report tools if anything feels wrong — our team responds within 24 hours",
      "Share your date plans with a friend and keep your phone charged",
    ],
  },
];

/* ─── Page ─────────────────────────────────────────────────────── */

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="px-5 md:px-10 lg:px-16 pt-10 md:pt-24 lg:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-8 md:mb-10">
            How Plus works
          </p>
          <h1 className="font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-tight max-w-5xl mb-0">
            Intentional dating,<br />step by step.
          </h1>
          <p className="mt-8 text-muted text-base md:text-lg leading-relaxed max-w-xl">
            From creating your profile to meeting someone extraordinary,
            here&apos;s exactly how Plus works. No ambiguity. No games. Just
            a better way to date.
          </p>
        </div>
      </section>

      {/* ═══ STEPS ═══ */}
      <section className="px-5 md:px-10 lg:px-16 pb-14 md:pb-28">
        <div className="max-w-5xl space-y-0">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`grid lg:grid-cols-[120px_1fr] gap-6 lg:gap-12 py-12 md:py-16 ${
                i < STEPS.length - 1 ? "border-b border-card-border" : ""
              }`}
            >
              <div>
                <span className="text-accent text-xs tracking-[0.3em] block mb-2 lg:mb-0">
                  Step {step.number}
                </span>
              </div>

              <div>
                <h2 className="font-display text-xl md:text-2xl leading-snug mb-5">
                  {step.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-6 max-w-2xl">
                  {step.description}
                </p>
                <ul className="space-y-3 text-sm text-muted">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="w-5 h-px bg-accent mt-2.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-card border-y border-card-border">
        <div className="px-5 md:px-10 lg:px-16 py-16 md:py-28 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-md mb-8">
            Two minutes to create your profile. Zero cost to join.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
            >
              Create your free profile
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-10 py-4 text-sm text-muted hover:text-foreground transition-colors"
            >
              See pricing &rarr;
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
