import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "How Moderation Works | Plus",
  description: "Plus never bans without explanation. Transparent moderation, clear rules, human-reviewed appeals within 48 hours. See exactly how we handle reports.",
  alternates: { canonical: "https://meetyourplus.com/moderation" },
  openGraph: {
    title: "How Moderation Works | Plus",
    description: "Transparent moderation with human-reviewed appeals. No silent bans, no AI-only decisions.",
    url: "https://meetyourplus.com/moderation",
    type: "website",
  },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

const moderationFaqs = [
  { q: "Can I get banned for talking about allowances?", a: "No. Discussing arrangement expectations, allowances, and financial support is exactly what this platform is for. You will never be penalized for using Plus as intended." },
  { q: "What happens if I get flagged by mistake?", a: "You receive an email explaining what was flagged and why. You can reply within 7 days with your side of the story. A human reviewer evaluates your appeal and responds within 48 hours." },
  { q: "Do you use AI to moderate?", a: "We use automated tools to detect obvious violations like spam, underage users, and trafficking patterns. But every account action (suspension, warning, ban) is reviewed and approved by a human before it takes effect." },
  { q: "What if my appeal is denied?", a: "We explain why. If new information comes to light, you can submit a second appeal. We would rather over-communicate than leave you guessing." },
  { q: "How long does the appeal process take?", a: "Most appeals are reviewed within 48 hours. Complex cases involving multiple reports may take up to 5 business days. You will receive email updates at every step." },
  { q: "Can I see what was reported about me?", a: "We share the nature of the report and the specific content or behavior that was flagged. We do not reveal the identity of the person who reported you, to protect their privacy." },
  { q: "Do you report users to law enforcement?", a: "Only in cases involving suspected trafficking, exploitation of minors, credible threats of violence, or other criminal activity. Standard ToS violations are handled internally." },
];

export default function ModerationPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: moderationFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PublicNav />

      {/* Hero */}
      <section className="px-6 md:px-12 pt-12 md:pt-20 pb-16 max-w-4xl">
        <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>Moderation</p>
        <h1 className="text-4xl md:text-5xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          How moderation works at Plus.
        </h1>
        <p className="text-lg" style={{ color: creamMuted }}>
          No silent bans. No mystery suspensions. If we take action on your account, you&apos;ll know exactly why &mdash; and you&apos;ll always have a chance to respond.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-4xl">
        <div className="space-y-16">

          {/* Our promise */}
          <div>
            <h2 className="text-2xl font-normal mb-8" style={{ fontFamily: "var(--font-display)" }}>Our promise to every member</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "We never ban without telling you why",
                  desc: "Every warning, suspension, or ban comes with a clear explanation of what triggered it. No vague \"terms of service violation\" emails. You get specifics.",
                },
                {
                  title: "You always get a chance to appeal",
                  desc: "Made a mistake? Context was misunderstood? You have 7 days to reply with your side. Every appeal is read by a real person.",
                },
                {
                  title: "We respond within 48 hours",
                  desc: "No weeks of silence wondering what happened to your account. Our moderation team commits to a 48-hour response window on all appeals.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 border" style={{ borderColor: line, background: dark2 }}>
                  <h3 className="text-base font-medium mb-3" style={{ color: cream }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What can get you flagged */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>What can get you flagged</h2>
            <p className="text-sm mb-6" style={{ color: creamMuted }}>
              These behaviors violate our terms of service and will result in a warning, suspension, or permanent ban depending on severity:
            </p>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#c9675a" }}>&times;</span>
                <div><strong style={{ color: cream }}>Explicit transactional language.</strong> Exchanging specific dollar amounts for specific acts. There is a clear line between discussing arrangement expectations and solicitation &mdash; crossing it puts the entire platform at legal risk.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#c9675a" }}>&times;</span>
                <div><strong style={{ color: cream }}>Harassment, threats, or abusive messages.</strong> Includes sexual harassment, racial slurs, doxxing threats, or any behavior designed to intimidate or demean another member.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#c9675a" }}>&times;</span>
                <div><strong style={{ color: cream }}>Fake photos or impersonation.</strong> Using someone else&apos;s photos, catfishing, or misrepresenting your identity. Our verification system catches most of this, but reported cases are investigated immediately.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#c9675a" }}>&times;</span>
                <div><strong style={{ color: cream }}>Underage users.</strong> You must be 18 or older to use Plus. Suspected minors are immediately suspended pending age verification, and reported to authorities if confirmed.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#c9675a" }}>&times;</span>
                <div><strong style={{ color: cream }}>Spam or commercial solicitation.</strong> Promoting external services, crypto schemes, OnlyFans pages, or any commercial activity unrelated to forming genuine connections.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#c9675a" }}>&times;</span>
                <div><strong style={{ color: cream }}>Escort or sex work advertising.</strong> Plus is a dating platform, not a marketplace. Content that explicitly advertises sexual services for payment is prohibited under our terms and under federal law (FOSTA-SESTA).</div>
              </div>
            </div>
          </div>

          {/* What WON'T get you flagged */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>What won&apos;t get you flagged</h2>
            <p className="text-sm mb-6" style={{ color: creamMuted }}>
              We know why you&apos;re here. Sugar dating involves conversations that mainstream platforms would censor. Plus won&apos;t punish you for being honest about what you want.
            </p>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#6abf8a" }}>&check;</span>
                <div><strong style={{ color: cream }}>Discussing arrangement expectations.</strong> Talking about what you&apos;re looking for in an arrangement &mdash; companionship, travel, mentorship, experiences &mdash; is the entire point of this platform.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#6abf8a" }}>&check;</span>
                <div><strong style={{ color: cream }}>Mentioning allowances or financial support.</strong> Conversations about financial dynamics, allowances, gifts, and support are normal and expected. We built this platform for exactly these conversations.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#6abf8a" }}>&check;</span>
                <div><strong style={{ color: cream }}>Being direct about what you&apos;re looking for.</strong> Whether you want a weekly dinner companion, a travel partner, or a long-term relationship with financial support &mdash; say so. Clarity is a feature, not a violation.</div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#6abf8a" }}>&check;</span>
                <div><strong style={{ color: cream }}>Using the platform as intended.</strong> If you&apos;re here to form a mutually beneficial relationship between consenting adults, you have nothing to worry about. Full stop.</div>
              </div>
            </div>
          </div>

          {/* The appeal process */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>The appeal process</h2>
            <p className="text-sm mb-8" style={{ color: creamMuted }}>
              If your account is flagged, warned, or suspended, here is exactly what happens:
            </p>
            <div className="space-y-6">
              {[
                { step: "01", title: "You receive an email", desc: "We send you an email explaining what was flagged, what rule it violated, and what action was taken on your account." },
                { step: "02", title: "Reply with your side", desc: "You have 7 days to respond. Explain the context, provide additional information, or acknowledge the issue. Every response is read." },
                { step: "03", title: "A human reviews your appeal", desc: "Not an AI. Not an algorithm. A member of our moderation team reads your appeal, reviews the original report, and makes a decision." },
                { step: "04", title: "Decision within 48 hours", desc: "You receive a follow-up email with our decision and the reasoning behind it. No black boxes." },
                { step: "05", title: "If overturned, full restoration", desc: "If we got it wrong, your account is fully restored with no marks on your record. We would rather reverse a mistake than lose a good member." },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <span className="text-2xl font-light shrink-0 w-8" style={{ color: gold, fontFamily: "var(--font-display)" }}>{item.step}</span>
                  <div>
                    <h3 className="text-base font-medium mb-1" style={{ color: cream }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How we're different */}
          <div className="p-8 md:p-10" style={{ borderTop: `1px solid ${line}`, background: dark2, marginTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>How we&apos;re different from the rest of the industry</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
              <p>
                Most platforms in this space use AI to auto-ban users with no explanation. You wake up one morning, your account is gone, and there&apos;s no one to email, no form to fill out, no appeal. Thousands of paying members have experienced this &mdash; many of them for doing nothing wrong.
              </p>
              <p>
                We think that&apos;s a terrible way to treat people, especially people who are paying you money every month.
              </p>
              <p>
                Plus takes a different approach. Automated tools flag potential violations, but a human being reviews every case before any action is taken. If we make a mistake, we own it, reverse it, and apologize. Transparency is not a marketing line for us. It is how our moderation system actually works.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-12" style={{ fontFamily: "var(--font-display)" }}>Frequently asked questions</h2>
            <div className="space-y-8">
              {moderationFaqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-base font-medium mb-2">{faq.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Ready to join a platform that treats you like an adult?
            </h2>
            <p className="text-sm mb-8" style={{ color: creamMuted }}>
              Transparent rules, human moderation, and a real appeal process. That&apos;s how dating platforms should work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth?mode=register"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium transition-colors"
                style={{ background: gold, color: dark1 }}
              >
                Create your profile
              </Link>
              <Link
                href="/safety"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium border transition-colors"
                style={{ borderColor: line, color: cream }}
              >
                Read our safety policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
