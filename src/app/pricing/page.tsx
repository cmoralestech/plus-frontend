import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import TrackPageView from "@/components/TrackPageView";
import PricingCards from "./PricingCards";

export const metadata: Metadata = {
  title: "Plus Pricing 2026: Private Dating From $49.99/mo",
  description: "Plus pricing: Free tier forever. Plus $49.99/mo or $499/yr. Plus+ $99.99/mo or $999/yr. Compare to Seeking Arrangement at $109-$274/mo. No hidden fees.",
  alternates: { canonical: "https://meetyourplus.com/pricing" },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

const pricingFaqs = [
  { q: "Is Plus really free to start?", a: "Yes. The Free tier gives you a profile, browsing, likes, matching, and 5 messages per day at zero cost. No hidden fees, no trial periods, no credit card required. You can upgrade to Plus or Plus+ whenever you want more features." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel your subscription anytime from your account settings. No contracts, no cancellation fees, no retention tricks. You keep access until the end of your billing period, and your profile, matches, and messages remain intact if you decide to resubscribe later. We don't believe in locking people in — if you're not getting value, you should leave easily." },
  { q: "What payment methods do you accept?", a: "All major credit and debit cards (Visa, Mastercard, American Express, Discover) processed securely through Stripe. Your card details are never stored on our servers — Stripe handles all payment data with PCI Level 1 compliance. Charges appear on your statement as a discreet company name, not \"Plus\" or anything dating-related." },
  { q: "What does Plus ($49.99/mo) include?", a: "Plus ($49.99/mo or $499/yr) unlocks unlimited messaging, see who liked you, a verified badge, the ability to hide from search, and photo blurring for non-matches. It's everything most members need for a great experience." },
  { q: "What does Plus+ ($99.99/mo) include?", a: "Plus+ ($99.99/mo or $999/yr) includes everything in Plus, and adds priority placement in the discover feed, travel mode, read receipts, profile boost, and unlimited likes. It's the complete package for members who want maximum visibility and flexibility." },
  { q: "How does Plus compare to Seeking Arrangement pricing?", a: "Seeking charges $109.99/month for Premium and $274.99/month for Diamond. Plus starts at $49.99/month and Plus+ is $99.99/month — both less than Seeking's base Premium tier. Plus includes required photo verification at all tiers, while Seeking makes verification optional (and charges extra for background checks). Seeking also removed their iOS app, while Plus works on every device as a progressive web app." },
  { q: "Is there an annual plan?", a: "Yes. Plus is $499/year ($41.58/mo) and Plus+ is $999/year ($83.25/mo). You can switch between monthly and annual billing from your subscription settings. Annual plans are billed once upfront for the full year." },
  { q: "What happens to my data if I cancel?", a: "Your profile remains on the platform in a deactivated state for 90 days after cancellation. During that window, you can resubscribe and pick up exactly where you left off — matches, messages, verification status, everything intact. After 90 days, we begin purging inactive data. If you want immediate deletion, you can request that separately through Settings > Account > Delete account." },
];

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Plus",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    url: "https://meetyourplus.com",
    description: "Private dating for people with more to offer. A verified, affordable alternative to Seeking Arrangement.",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free", description: "Create profile, browse, like & match, 5 messages per day, basic privacy" },
      { "@type": "Offer", price: "49.99", priceCurrency: "USD", name: "Plus (Monthly)", description: "Unlimited messaging, see who liked you, verified badge, hide from search, blur photos" },
      { "@type": "Offer", price: "499", priceCurrency: "USD", name: "Plus (Annual)", description: "Unlimited messaging, see who liked you, verified badge, hide from search, blur photos — billed annually" },
      { "@type": "Offer", price: "99.99", priceCurrency: "USD", name: "Plus+ (Monthly)", description: "Everything in Plus + priority placement, travel mode, read receipts, profile boost, unlimited likes" },
      { "@type": "Offer", price: "999", priceCurrency: "USD", name: "Plus+ (Annual)", description: "Everything in Plus + priority placement, travel mode, read receipts, profile boost, unlimited likes — billed annually" },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <TrackPageView event="pricing_viewed" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <PublicNav />

      <section className="px-6 md:px-12 pt-12 md:pt-20 pb-16 max-w-5xl">
        <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>Membership</p>
        <h1 className="text-4xl md:text-5xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Transparent pricing. No surprises.
        </h1>
        <p className="text-lg max-w-xl mb-6" style={{ color: creamMuted }}>
          Start free. Upgrade when you want more. Three tiers designed for the way you date.
        </p>
        <div className="space-y-4 text-sm leading-relaxed max-w-2xl" style={{ color: creamMuted }}>
          <p>
            Most premium dating platforms charge between $90 and $275 per month for basic access.
            Seeking Arrangement&apos;s Premium is $109.99/month. Their Diamond tier is $274.99/month.
            For that price, you get optional verification (meaning most profiles are unverified),
            an interface that hasn&apos;t been redesigned since 2015, and an AI moderation system that
            bans you for everyday conversation.
          </p>
          <p>
            Plus takes a different approach. We believe private dating should cost a
            reasonable amount, include verification by default, and actually work the way
            dating is supposed to work — with honest communication about expectations,
            real privacy controls that protect your identity, and no price increases
            after your first month. Below are our three plans, with no hidden fees and
            no credit packs.
          </p>
        </div>
      </section>

      <PricingCards />

      {/* Seeking Comparison */}
      <section className="px-6 md:px-12 py-16 md:py-20 max-w-5xl" style={{ borderTop: `1px solid ${line}` }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>Plus vs Seeking Arrangement pricing</h2>
        <p className="text-sm mb-10" style={{ color: creamMuted }}>Same features. Better verification. A fraction of the price.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ color: creamMuted }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${line}` }}>
                <th className="text-left py-3 pr-4 font-medium" style={{ color: cream }}>Feature</th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: gold }}>Plus</th>
                <th className="text-left py-3 pl-4 font-medium" style={{ color: creamMuted }}>Seeking</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Entry paid tier", "$49.99/mo (Plus)", "$109.99/mo (Premium)"],
                ["Top tier price", "$99.99/mo (Plus+)", "$274.99/mo (Diamond)"],
                ["Free tier", "Yes — 5 messages/day", "Limited"],
                ["Photo verification", "Required", "Optional"],
                ["Privacy controls", "Plus tier and above", "Diamond only ($274.99)"],
                ["iOS app", "PWA (works on iPhone)", "Removed by Apple"],
                ["See who liked you", "Plus tier ($49.99)", "Premium+ ($109.99)"],
                ["Travel mode", "Plus+ ($99.99)", "Not available"],
              ].map(([feature, plus, seeking]) => (
                <tr key={feature} style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4" style={{ color: cream }}>{feature}</td>
                  <td className="py-3 px-4">{plus}</td>
                  <td className="py-3 pl-4">{seeking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-6" style={{ color: creamMuted }}>
          Seeking Arrangement pricing as of June 2026. <Link href="/alternatives" style={{ color: gold }}>Read our full Seeking review →</Link>
        </p>
      </section>

      {/* Why Plus */}
      <section className="px-6 md:px-12 py-16 md:py-20 max-w-4xl" style={{ borderTop: `1px solid ${line}` }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>Why Plus costs less</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Most premium dating platforms charge $90 to $275 per month for full access.
            Seeking Arrangement&apos;s Diamond membership costs $274.99/month. We think
            that&apos;s excessive for what you get — optional verification, a dated interface, and no iOS app.
          </p>
          <p>
            Plus starts at $49.99/month with unlimited messaging, verified badge, and
            privacy controls. Plus+ at $99.99/month adds priority placement, travel mode,
            profile boost, and read receipts. Two plans with everything you need. No upsells. No hidden fees.
          </p>
          <p>
            Everyone starts free with 5 messages per day, browsing, likes, and matching.
            Not a free trial. Not a limited account. A real free tier that lets you
            experience the platform before you commit. We believe everyone deserves
            to see the value before they pay.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-16 md:py-20 max-w-4xl" style={{ borderTop: `1px solid ${line}` }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-12" style={{ fontFamily: "var(--font-display)" }}>Common questions</h2>
        <div className="space-y-8">
          {pricingFaqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="text-base font-medium mb-2">{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
