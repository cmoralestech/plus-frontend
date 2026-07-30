import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Best Seeking Arrangement Alternative 2026 | Plus",
  description: "Looking for a Seeking Arrangement alternative? Plus has verified profiles, travel mode, and starts at $49.99/month vs Seeking's $274.99. Free tier available.",
  alternates: { canonical: "https://meetyourplus.com/seeking-arrangement-alternative" },
  keywords: "seeking arrangement alternative, seeking alternative, private dating app, seeking arrangement replacement, best dating site 2026, dating for professionals",
  openGraph: {
    title: "Best Seeking Arrangement Alternative 2026 | Plus",
    description: "The modern private dating platform with better privacy, verified profiles, and a mobile-first experience.",
    url: "https://meetyourplus.com/seeking-arrangement-alternative",
    type: "website",
    images: [{ url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630 }],
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

const faqItems = [
  { q: "Is Plus really a better alternative to Seeking Arrangement?", a: "For most users, yes. Plus offers better privacy controls, a modern mobile experience, verified profiles, travel mode, and significantly lower pricing. The main advantage of Seeking is its larger established user base, but Plus is growing quickly." },
  { q: "Can I use Plus if I'm currently on Seeking?", a: "Absolutely. Many members use both platforms during the transition. Your Plus profile is completely separate — nobody on Seeking will know you're also on Plus." },
  { q: "Is Plus free?", a: "Plus has a Free tier that includes profile creation, browsing, likes, matching, and 5 messages per day. Plus ($49.99/mo or $499/yr) unlocks unlimited messaging and privacy features. Plus+ ($99.99/mo or $999/yr) adds priority placement, travel mode, and more." },
  { q: "How does Plus protect my privacy compared to Seeking?", a: "Plus offers photo blurring for non-matches, private browsing mode, hide from search, hide income details, hide read receipts, and hide last seen. Seeking offers basic profile hiding but lacks most of these granular controls." },
  { q: "What is travel mode and does Seeking have it?", a: "Travel mode lets you set your discover location to any city before you travel there, so you can match and chat with people before you arrive. Seeking does not offer this feature. Travel mode is available on Plus+." },
  { q: "Are the profiles on Plus real?", a: "Plus uses photo verification, income verification, and a relevancy algorithm that prioritizes active, verified profiles. Inactive and unverified profiles naturally sink to the bottom of the feed, so you're always seeing real, engaged members first." },
  { q: "How do I switch from Seeking to Plus?", a: "Simply create a free account at meetyourplus.com. There's no migration process — start fresh with a new profile. Many members find that the improved features lead to better matches right away." },
  { q: "How much does Plus cost compared to Seeking?", a: "Seeking charges $109.99/month for Premium and $274.99/month for Diamond. Plus starts at $49.99/month and Plus+ is $99.99/month — both less than Seeking's base Premium tier. There's also a Free tier with 5 messages per day." },
  { q: "Does Plus have an app?", a: "Plus is a mobile-first web app that works on any phone browser — no download required. It's designed to feel like a native app with swipe gestures, instant messaging, and a responsive interface. No app store approval means faster updates and no restrictions on content." },
  { q: "Is Plus available internationally?", a: "Yes. Plus works in 50+ cities worldwide. Travel mode lets you connect with members in any city before you arrive. While the largest user base is currently in major US cities, international members are welcome and growing." },
  { q: "What happened to Seeking Arrangement?", a: "Seeking Arrangement rebranded to 'Seeking' to go mainstream, but the rebrand confused users and prices rose to $109.99/month. Many long-time members have switched to newer alternatives like Plus that offer a similar experience with modern design and lower pricing." },
  { q: "How does Plus compare to Secret Benefits?", a: "Secret Benefits uses a credit-based system where you pay per message unlock, which can get expensive fast. Plus uses flat monthly tiers — Plus at $49.99/mo and Plus+ at $99.99/mo — with unlimited messaging. Plus also offers income verification, travel mode, and dating preference matching, features Secret Benefits lacks." },
  { q: "My Seeking Arrangement account was banned. What should I do?", a: "Seeking has become aggressive with bans, often for normal conversation. If you've been banned, create a free account on Plus. Your Plus profile is completely separate from Seeking." },
];

export default function SeekingAlternativePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
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
      <section className="px-6 md:px-12 pt-12 md:pt-24 pb-16 md:pb-20 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <p className="text-sm tracking-[0.3em] uppercase" style={{ color: gold }}>
            Seeking Arrangement Alternative
          </p>
          <span className="text-xs" style={{ color: creamMuted }}>Updated June 2026</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          The Best Seeking Arrangement Alternative in 2026
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mb-5" style={{ color: creamMuted }}>
          Seeking Arrangement (now Seeking) pioneered upfront dating, but in 2026, it&apos;s showing its age.
          Fake profiles, poor privacy, an outdated app, and rising prices have pushed members to look elsewhere.
          Plus was built from the ground up for people who want what Seeking promised but never fully delivered.
        </p>
        <p className="text-sm leading-relaxed max-w-2xl mb-10" style={{ color: creamMuted }}>
          The core problem with Seeking today is not any single issue — it&apos;s the accumulation of
          compromises. The platform charges $109.99 per month for Premium and $274.99 for Diamond,
          yet verification remains optional, meaning most profiles are unverified. Their
          moderation system bans users for normal conversation. The mobile
          experience feels retrofitted from a desktop site built a decade ago. And the bot problem
          has worsened since Apple removed their iOS app. Plus addresses every one of these
          issues: required verification, fair policies, mobile-first design, and
          pricing that respects your wallet.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Try Plus free, no credit card required
        </Link>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Comparison table */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: dark2 }}>
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Plus vs. Seeking: feature comparison
          </h2>
          <p className="text-sm mb-10" style={{ color: creamMuted }}>Side-by-side comparison of the two platforms as of 2026.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${line}` }}>
                  <th className="text-left py-4 pr-4 font-medium" style={{ color: creamMuted }}>Feature</th>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: gold }}>Plus</th>
                  <th className="text-left py-4 pl-4 font-medium" style={{ color: creamMuted }}>Seeking</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Free tier", "Yes, 5 messages/day", "Limited free tier"],
                  ["Mobile-first design", "Built for mobile", "Desktop-first, mobile retrofit"],
                  ["Income verification", "Yes, verified badge", "Optional, rarely used"],
                  ["Photo verification", "Yes, selfie match", "Basic"],
                  ["Hide from search", "Yes (Plus)", "Yes (Premium)"],
                  ["Blur photos for non-matches", "Yes (Plus)", "No"],
                  ["Private browsing mode", "Yes (Plus+)", "No"],
                  ["Travel mode", "Yes, connect before you arrive (Plus+)", "No"],
                  ["Distance-based discovery", "Yes, with miles shown", "City-level only"],
                  ["Relevancy-ranked feed", "Yes, active, verified profiles first", "No, chronological"],
                  ["New member boost", "Free 7-day boost for new members", "No"],
                  ["Typing indicators", "Yes", "No"],
                  ["Read receipts", "Yes (Plus+)", "No"],
                  ["Real-time messaging", "WebSocket, instant delivery", "Polling, delayed"],
                  ["Block & report", "Yes, with confirmation", "Yes"],
                  ["Profile completeness score", "Yes, with nudges", "No"],
                  ["Dating preference tags", "Yes, mentorship, travel, etc.", "No structured tags"],
                  ["Lifestyle interests", "Yes, 20 options", "Limited"],
                  ["Ideal first date field", "Yes", "No"],
                  ["Community safety page", "Yes, with meeting tips", "Minimal"],
                  ["Modern dark UI", "Yes", "No, dated design"],
                  ["Entry paid tier", "$49.99/month (Plus)", "$109.99/month (Premium)"],
                  ["Top-tier price", "$99.99/month (Plus+)", "$274.99/month (Diamond)"],
                ].map(([feature, plus, seeking]) => (
                  <tr key={feature} style={{ borderBottom: `1px solid ${line}` }}>
                    <td className="py-3 pr-4" style={{ color: creamMuted }}>{feature}</td>
                    <td className="py-3 px-4" style={{ color: cream }}>{plus}</td>
                    <td className="py-3 pl-4" style={{ color: creamMuted }}>{seeking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Why people switch */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          The top 5 reasons people leave Seeking for Plus
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Fake profiles and bots</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Seeking&apos;s verification system is minimal. Many users report spending hours messaging profiles that turn out to be fake, inactive, or
              catfishing. Plus&apos;s relevancy algorithm pushes verified, active profiles to the top and lets inactive accounts sink, so you&apos;re
              always seeing real people who are actually using the platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">2. Privacy concerns</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Seeking offers basic privacy controls, but many members — especially high-profile individuals — need more. Plus offers photo blurring
              for non-matches, private browsing mode, income hiding, and the ability to completely hide from search while still messaging existing
              connections. Your discretion is treated as a first-class feature, not an afterthought.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">3. Outdated mobile experience</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Seeking was built as a desktop website and its mobile app still feels like it. Plus was designed mobile-first — every feature, from
              swiping through profiles to real-time messaging with typing indicators, works seamlessly on your phone. Because that&apos;s where dating
              happens in 2026.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">4. Price</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Seeking Premium costs $109.99/month. Their Diamond tier is $274.99/month. Plus starts at $49.99/month and Plus+ is $99.99/month with all features
              included — both less than Seeking&apos;s base Premium tier. Two plans, everything unlocked, no upsells.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">5. No travel features</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Private dating is a global lifestyle. Seeking limits you to browsing your current city. Plus&apos;s travel mode lets you set your
              location to any city in the world — connect with people in Miami before your flight lands, browse London profiles from New York, or see
              who&apos;s in Dubai for the weekend. For jet-setting members, this changes everything.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* What happened to Seeking + Secret Benefits comparison + delete account */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-8" style={{ fontFamily: "var(--font-display)" }}>
          What happened to Seeking Arrangement?
        </h2>
        <div className="space-y-5 text-sm leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Seeking Arrangement rebranded to &ldquo;Seeking&rdquo; in an attempt to go mainstream and distance itself from its original identity.
            The rebrand confused the user base — people came to the platform for clear, upfront dating, and the new branding pretended that wasn&apos;t the case.
            Prices climbed from $90 to $109.99/month. Moderation became aggressive, banning users for normal conversation.
            Many long-time members started searching for alternatives.
          </p>
          <p>
            If your Seeking Arrangement account was banned or you&apos;re frustrated with the direction the platform has taken, you&apos;re not alone.
            Plus was built specifically for people who loved what Seeking used to be — honest, direct, upfront dating — and want
            that experience with modern design, real verification, and fair pricing.
          </p>
        </div>

        <h3 className="text-lg font-medium mt-12 mb-4">Secret Benefits vs. Seeking Arrangement vs. Plus</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${line}` }}>
                <th className="text-left py-3 pr-4" style={{ color: cream }}>Feature</th>
                <th className="py-3 px-4 text-center" style={{ color: gold }}>Plus</th>
                <th className="py-3 px-4 text-center" style={{ color: creamMuted }}>Seeking</th>
                <th className="py-3 pl-4 text-center" style={{ color: creamMuted }}>Secret Benefits</th>
              </tr>
            </thead>
            <tbody style={{ color: creamMuted }}>
              {[
                ["Pricing model", "$49.99-$99.99/mo", "$109.99/mo", "Credits ($59+)"],
                ["Income verification", "Available", "Optional", "None"],
                ["Free tier", "Yes, 5 messages/day", "Limited", "Yes, limited"],
                ["Travel mode", "Yes (Plus+)", "No", "No"],
                ["Mobile experience", "Mobile-first", "Dated", "Basic"],
                ["Dating preferences on profile", "Yes", "No", "No"],
              ].map(([feature, plus, seeking, sb]) => (
                <tr key={feature} style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4">{feature}</td>
                  <td className="py-3 px-4 text-center" style={{ color: cream }}>{plus}</td>
                  <td className="py-3 px-4 text-center">{seeking}</td>
                  <td className="py-3 pl-4 text-center">{sb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-12 mb-4">Want to delete your Seeking Arrangement account?</h3>
        <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
          Many members delete or deactivate their Seeking account after finding a better alternative.
          If you&apos;re ready to move on, create your <Link href="/auth?mode=register" style={{ color: gold, textDecoration: "underline" }}>free Plus profile</Link> first,
          then deactivate Seeking through their Settings → Account → Deactivate. Your Plus profile is completely separate —
          nobody on Seeking will know you&apos;ve switched. Many members use both during the transition before committing to Plus full-time.
        </p>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* FAQ with schema-ready markup */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark3 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Frequently asked questions
        </h2>

        <div className="space-y-8">
          {faqItems.map((faq) => (
            <div key={faq.q}>
              <h3 className="text-base font-medium mb-2">{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Related Reading */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-xl font-normal mb-8" style={{ fontFamily: "var(--font-display)" }}>Related reading</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { href: "/alternatives", title: "All Seeking Alternatives Compared", desc: "Side-by-side comparison table" },
            { href: "/blog/seeking-arrangement-cost", title: "How Much Does Seeking Cost in 2026?", desc: "Full pricing breakdown" },
            { href: "/blog/why-everyone-leaving-seeking-2026", title: "Why Everyone Is Leaving Seeking", desc: "Price hikes, bans, and the exodus" },
            { href: "/blog/seeking-arrangement-account-banned", title: "Seeking Account Banned?", desc: "What to do next" },
            { href: "/blog/sugardaddymeet-vs-arranged", title: "SugarDaddyMeet vs Plus", desc: "Head-to-head comparison" },
            { href: "/blog/secret-benefits-vs-arranged", title: "Secret Benefits vs Plus", desc: "Credits vs subscription" },
            { href: "/for-sugar-daddies", title: "For Successful Men: Why Plus Is Worth It", desc: "What established members get on Plus" },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              className="block p-4 border transition-all hover:border-opacity-60"
              style={{ borderColor: line, background: dark2 }}>
              <p className="text-sm font-medium mb-0.5" style={{ color: cream }}>{link.title}</p>
              <p className="text-xs" style={{ color: creamMuted }}>{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-normal mb-6 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-display)" }}>
          Ready to upgrade your dating experience?
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: creamMuted }}>
          Join members who switched from Seeking to Plus. Create your profile in 2 minutes — it&apos;s free.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-12 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Create your free profile
        </Link>
        <p className="text-xs mt-4" style={{ color: creamMuted }}>No credit card required. Free tier available for everyone.</p>
      </section>

      <PublicFooter />
    </div>
  );
}
