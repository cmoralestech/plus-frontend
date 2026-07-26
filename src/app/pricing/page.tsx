import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import TrackPageView from "@/components/TrackPageView";
import PricingCards from "./PricingCards";

export const metadata: Metadata = {
  title: "Plus Pricing 2026: Verified Sugar Dating From $99.99/mo",
  description: "Plus pricing: Free for attractive members forever. Diamond $99.99/mo or $999/yr. Compare to Seeking Arrangement at $109-$274/mo. No hidden fees.",
  alternates: { canonical: "https://meetyourplus.com/pricing" },
};

const gold = "#d4b896";
const dark1 = "#141210";
const dark2 = "#1a1714";
const cream = "#ede6db";
const creamMuted = "#a8a090";
const line = "#2e2a24";

const pricingFaqs = [
  { q: "Is it really free for attractive members?", a: "Yes, 100% free, forever. No hidden fees, no trial periods, no credit card required. You get full messaging, matching, and profile features at zero cost. We built it this way because both sides of an arrangement should feel valued by the platform — not exploited. Attractive members bring the community to life, and we believe charging them creates a barrier that hurts everyone's experience." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel your subscription anytime from your account settings. No contracts, no cancellation fees, no retention tricks. You keep access until the end of your billing period, and your profile, matches, and messages remain intact if you decide to resubscribe later. We don't believe in locking people in — if you're not getting value, you should leave easily." },
  { q: "What payment methods do you accept?", a: "All major credit and debit cards (Visa, Mastercard, American Express, Discover) processed securely through Stripe. Your card details are never stored on our servers — Stripe handles all payment data with PCI Level 1 compliance. Charges appear on your statement as a discreet company name, not \"Plus\" or anything dating-related." },
  { q: "Do I need to pay to send a message?", a: "Attractive members can message freely with no limits. Successful members can send one opening message per match for free, which is enough to establish interest. Unlimited messaging requires Diamond ($99.99/mo or $999/yr). We intentionally avoided the credit-per-message model used by Secret Benefits and other platforms — that model punishes active users and makes every conversation feel like a transaction." },
  { q: "What does Diamond include?", a: "Diamond ($99.99/mo or $999/yr) unlocks everything: unlimited messaging, see who liked you, see all photos unblurred, hide from search, blur photos for non-matches, hide your income, private browsing mode (view profiles without them knowing), hidden read receipts, priority placement in the discover feed, hidden last-seen status, and a featured profile badge. One plan, all features." },
  { q: "How does Plus compare to Seeking Arrangement pricing?", a: "Seeking charges $109.99/month for Premium and $274.99/month for Diamond. Plus Diamond is $99.99/month — less than Seeking's base Premium tier. The feature comparison is even more dramatic: Plus includes required income and photo verification at all tiers, while Seeking makes verification optional (and charges extra for background checks). Seeking also removed their iOS app, while Plus works on every device as a progressive web app." },
  { q: "Is there an annual plan?", a: "Yes. Diamond is $999/year ($83.25/mo) \u2014 that's 17% off the monthly price. You can switch between monthly and annual billing from your subscription settings. Annual plans are billed once upfront for the full year." },
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
    description: "The modern sugar dating platform with income-verified profiles. A premium alternative to Seeking Arrangement.",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free (Attractive Members)", description: "Full access for attractive members — forever free" },
      { "@type": "Offer", price: "99.99", priceCurrency: "USD", name: "Diamond (Monthly)", description: "Unlimited messaging, all privacy controls, priority placement, private browsing" },
      { "@type": "Offer", price: "999", priceCurrency: "USD", name: "Diamond (Annual)", description: "Unlimited messaging, all privacy controls, priority placement, private browsing — billed annually" },
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
          Attractive members are always free. Successful members choose the plan that fits their lifestyle.
        </p>
        <div className="space-y-4 text-sm leading-relaxed max-w-2xl" style={{ color: creamMuted }}>
          <p>
            Most sugar dating platforms charge between $90 and $275 per month for basic access.
            Seeking Arrangement&apos;s Premium is $109.99/month. Their Diamond tier is $274.99/month.
            For that price, you get optional verification (meaning most profiles are unverified),
            an interface that hasn&apos;t been redesigned since 2015, and an AI moderation system that
            bans you for using words like &quot;arrangement&quot; and &quot;allowance&quot; — on a sugar dating platform.
          </p>
          <p>
            Plus takes a different approach. We believe premium dating should cost a
            reasonable amount, include verification by default, and actually work the way
            sugar dating is supposed to work — with honest communication about expectations,
            no censorship of arrangement language, and real privacy controls that protect
            your identity. Below are our two plans, with no hidden fees, no credit packs,
            and no price increases after your first month.
          </p>
        </div>
      </section>

      <PricingCards />

      {/* Seeking Comparison */}
      <section className="px-6 md:px-12 py-16 md:py-20 max-w-5xl" style={{ borderTop: `1px solid ${line}` }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>Plus vs Seeking Arrangement pricing</h2>
        <p className="text-sm mb-10" style={{ color: creamMuted }}>Same features. Better verification. Less than half the price.</p>
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
                ["Full access price", "$99.99/mo", "$109.99/mo"],
                ["Top tier price", "$99.99/mo", "$274.99/mo"],
                ["Free for attractive members", "Yes, full access", "Limited"],
                ["Income verification", "Required", "Optional (extra cost)"],
                ["Photo verification", "Required", "Optional"],
                ["Privacy controls", "All tiers", "Diamond only ($274.99)"],
                ["iOS app", "PWA (works on iPhone)", "Removed by Apple"],
                ["See who liked you", "Diamond", "Premium+"],
                ["Unlimited likes", "All tiers (free)", "Not enforced"],
              ].map(([feature, arranged, seeking]) => (
                <tr key={feature} style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4" style={{ color: cream }}>{feature}</td>
                  <td className="py-3 px-4">{arranged}</td>
                  <td className="py-3 pl-4">{seeking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-6" style={{ color: creamMuted }}>
          Seeking Arrangement pricing as of June 2026. <Link href="/blog/seeking-arrangement-review" style={{ color: gold }}>Read our full Seeking review →</Link>
        </p>
      </section>

      {/* Why Plus */}
      <section className="px-6 md:px-12 py-16 md:py-20 max-w-4xl" style={{ borderTop: `1px solid ${line}` }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>Why Plus costs less</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Most sugar dating platforms charge $90 to $275 per month for premium access.
            Seeking Arrangement&apos;s Diamond membership costs $274.99/month. We think
            that&apos;s excessive for what you get — optional verification, a dated interface, and no iOS app.
          </p>
          <p>
            Plus Diamond is $99.99/month and includes unlimited messaging,
            required income verification, all privacy controls, and a modern mobile experience.
            One plan with everything. No upsells. No hidden fees.
          </p>
          <p>
            Attractive members pay nothing. Not a free trial. Not a limited account.
            Full access, forever, at zero cost. We believe both sides of the arrangement
            should feel valued — not exploited by the platform sitting in the middle.
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
