import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Best Seeking Arrangement Alternatives 2026 | Honest Comparison",
  description: "Compared the top 5 Seeking Arrangement alternatives for 2026. Plus, Secret Benefits, SugarDaddyMeet, WhatsYourPrice — pricing, verification, pros & cons.",
  alternates: { canonical: "https://meetyourplus.com/alternatives" },
  keywords: "seeking arrangement alternatives, seeking arrangement alternatives 2026, best private dating sites, dating apps for professionals, seeking replacement, upfront dating platforms",
  openGraph: {
    title: "Best Seeking Arrangement Alternatives 2026 | Honest Comparison",
    description: "We tested every major Seeking alternative so you don't have to. Here's what's actually worth your time in 2026.",
    url: "https://meetyourplus.com/alternatives",
    type: "website",
    images: [{ url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630 }],
  },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const dark3 = "#FAF5F0";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";
const greenAccent = "#7cb894";

const faqItems = [
  { q: "What replaced Seeking Arrangement?", a: "Seeking Arrangement rebranded to 'Seeking' but hasn't been replaced by a single platform. The market has fragmented — Plus focuses on verified, upfront dating; Secret Benefits uses a credit model; WhatsYourPrice uses bidding; and SugarDaddyMeet offers a free option. Plus is the closest modern successor for people who want what SA used to offer." },
  { q: "Is there a free version of Seeking Arrangement?", a: "Seeking offers a limited free tier but you can't read messages without paying $109.99/month. Plus has a Free tier with 5 messages per day. SugarDaddyMeet has a free tier with limited messaging. WhatsYourPrice requires credits to unlock conversations." },
  { q: "Why did Seeking Arrangement change its name?", a: "Seeking Arrangement rebranded to 'Seeking' to distance itself from its original positioning and appeal to mainstream users. The rebrand confused long-time users and coincided with price increases and more aggressive moderation." },
  { q: "Which Seeking Arrangement alternative has the least bots?", a: "Plus has the lowest bot rate due to required photo verification and a relevancy algorithm that pushes unverified/inactive profiles to the bottom. Secret Benefits has moderate bot activity. SugarDaddyMeet has a significant bot problem. WhatsYourPrice's payment model deters some bots but not all." },
  { q: "Is Secret Benefits better than Seeking Arrangement?", a: "Secret Benefits is cheaper per-message for casual users, but heavy users can spend more than Seeking's monthly fee. It lacks income verification and dating-type matching. It's a reasonable alternative if you prefer pay-per-unlock over subscriptions." },
  { q: "What is the cheapest Seeking Arrangement alternative?", a: "SugarDaddyMeet is free to join with limited features. Plus has a Free tier with 5 messages per day. WhatsYourPrice charges per date bid ($5-10 credits). Plus at $49.99/month is the cheapest unlimited subscription among verified platforms." },
  { q: "Can I use multiple dating sites at once?", a: "Yes, and most experienced members do. Your profiles are completely separate between platforms. Many people use Plus as their primary platform while maintaining a presence on one or two others to maximize their pool of potential matches." },
  { q: "Are Seeking Arrangement alternatives safe?", a: "Safety varies by platform. Plus requires photo verification and offers income verification, reducing catfishing. Secret Benefits has basic verification. SugarDaddyMeet has minimal verification, so extra caution is needed. Always video chat before meeting anyone from any platform, and meet in public places first." },
];

export default function AlternativesPage() {
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
            Alternatives Hub
          </p>
          <span className="text-xs" style={{ color: creamMuted }}>Updated July 2026</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          The Best Seeking Arrangement Alternatives in 2026
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mb-5" style={{ color: creamMuted }}>
          Seeking Arrangement used to be the only game in town. That&apos;s no longer true. Between rising prices ($109/mo for Premium),
          aggressive bans, an outdated interface, and a bot problem that&apos;s gotten worse since the rebrand, thousands of members
          have quietly moved on.
        </p>
        <p className="text-base leading-relaxed max-w-2xl mb-5" style={{ color: creamMuted }}>
          We tested the top alternatives head-to-head. Here&apos;s what&apos;s actually worth your time and money in 2026.
        </p>
        <p className="text-sm leading-relaxed max-w-2xl mb-10" style={{ color: creamMuted }}>
          The private dating market has fragmented since Seeking&apos;s rebrand. Each platform takes a different approach:
          some use credit-based messaging, others use bidding systems, and a few offer flat subscriptions. The right
          choice depends on how active you plan to be, whether you prioritize verification over user base size, and
          how much privacy control you need. Below we compare five platforms on the metrics that matter most: real
          cost per month for active users, verification quality, user experience, and how well they handle the unique
          needs of private, upfront dating relationships.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Try Plus free — no credit card
        </Link>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Quick Comparison Table */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: dark2 }}>
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Quick comparison: Seeking Arrangement alternatives at a glance
          </h2>
          <p className="text-sm mb-10" style={{ color: creamMuted }}>All data as of July 2026. Prices reflect standard monthly plans.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${line}` }}>
                  <th className="text-left py-4 pr-4 font-medium" style={{ color: creamMuted }}>Platform</th>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: creamMuted }}>Monthly Price</th>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: creamMuted }}>Verification</th>
                  <th className="text-left py-4 px-4 font-medium" style={{ color: creamMuted }}>Design</th>
                  <th className="text-left py-4 pl-4 font-medium" style={{ color: creamMuted }}>Bot Score</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${line}`, background: "rgba(124, 184, 148, 0.05)" }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: greenAccent }}>Plus</td>
                  <td className="py-3 px-4" style={{ color: cream }}>$49.99-$99.99 (free tier avail.)</td>
                  <td className="py-3 px-4" style={{ color: cream }}>Photo + Income available</td>
                  <td className="py-3 px-4" style={{ color: cream }}>9.5/10</td>
                  <td className="py-3 pl-4" style={{ color: greenAccent }}>Low</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: creamMuted }}>Seeking</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>$109.99</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>Optional photo</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>5/10</td>
                  <td className="py-3 pl-4" style={{ color: "#c97a6a" }}>High</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: creamMuted }}>Secret Benefits</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>Credits ($59+)</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>Basic photo</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>6.5/10</td>
                  <td className="py-3 pl-4" style={{ color: "#d4a050" }}>Medium</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: creamMuted }}>WhatsYourPrice</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>Bids ($5-10/ea)</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>None required</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>5.5/10</td>
                  <td className="py-3 pl-4" style={{ color: "#d4a050" }}>Medium</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${line}` }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: creamMuted }}>SugarDaddyMeet</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>Free / $50 (limited)</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>None</td>
                  <td className="py-3 px-4" style={{ color: creamMuted }}>4/10</td>
                  <td className="py-3 pl-4" style={{ color: "#c97a6a" }}>High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Individual Platform Reviews */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-14" style={{ fontFamily: "var(--font-display)" }}>
          Each alternative, reviewed honestly
        </h2>

        {/* Plus — Featured Pick */}
        <div className="mb-16 p-8 border-l-4" style={{ borderColor: greenAccent, background: dark2 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1" style={{ background: greenAccent, color: dark1 }}>Our Pick</span>
            <h3 className="text-xl font-medium" style={{ color: greenAccent }}>Plus</h3>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: creamMuted }}>
            Built from scratch as a modern replacement for what Seeking used to be. Upfront dating with required verification,
            travel mode, privacy controls, and a mobile-first design that doesn&apos;t feel like it was built in 2012.
            Free tier available. Plus at $49.99/mo for unlimited messaging. Plus+ at $99.99/mo for all features.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: greenAccent }}>Pros</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: greenAccent }}>+</span> Required photo verification (real profiles)</li>
                <li className="flex gap-2"><span style={{ color: greenAccent }}>+</span> Free tier with 5 messages/day</li>
                <li className="flex gap-2"><span style={{ color: greenAccent }}>+</span> Travel mode — set location to any city before you go</li>
                <li className="flex gap-2"><span style={{ color: greenAccent }}>+</span> Modern dark UI, mobile-first, fast</li>
                <li className="flex gap-2"><span style={{ color: greenAccent }}>+</span> Dating preference tags on profiles (mentorship, travel, etc.)</li>
                <li className="flex gap-2"><span style={{ color: greenAccent }}>+</span> Fair moderation — no arbitrary bans</li>
                <li className="flex gap-2"><span style={{ color: greenAccent }}>+</span> $49.99-$99.99/mo vs Seeking&apos;s $274.99/mo</li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: creamMuted }}>Cons</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Smaller user base (growing fast, newer platform)</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> No native iOS/Android app yet (PWA works well)</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Fewer international users than Seeking (50+ cities and counting)</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/auth?mode=register"
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-wide font-medium transition-all"
              style={{ background: greenAccent, color: dark1 }}>
              Try Plus free
            </Link>
          </div>
        </div>

        {/* Secret Benefits */}
        <div className="mb-16">
          <h3 className="text-xl font-medium mb-4">Secret Benefits</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: creamMuted }}>
            Secret Benefits uses a credit-based system rather than a monthly subscription. You buy credits and spend them to unlock messages
            and photos. This can be cheaper if you&apos;re a light user, but heavy users often spend more than they would on a flat subscription.
            The platform is aesthetically cleaner than Seeking but lacks income verification and dating-type matching.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: gold }}>Pros</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Pay-per-unlock can be cheaper for casual browsing</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Free for female members</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Cleaner interface than Seeking</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Private photo feature (unlock on request)</li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: creamMuted }}>Cons</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Credits add up fast — can exceed $150/mo for active users</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> No income verification (more catfish risk)</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> No travel mode or location features</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Moderate bot problem despite basic verification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SugarDaddyMeet */}
        <div className="mb-16">
          <h3 className="text-xl font-medium mb-4">SugarDaddyMeet</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: creamMuted }}>
            The budget option. SugarDaddyMeet lets you create a profile and browse for free, which is its main appeal.
            The catch: the interface looks like it hasn&apos;t been updated since 2015, verification is essentially nonexistent,
            and the bot problem is severe. It works best as a supplement to a better primary platform, not a standalone.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: gold }}>Pros</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Free to join and browse</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Large user base (quantity over quality)</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Low barrier to entry</li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: creamMuted }}>Cons</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Severe bot and fake profile problem</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Extremely dated UI/UX</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> No verification system</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Free messaging is very limited</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> No privacy controls to speak of</li>
              </ul>
            </div>
          </div>
        </div>

        {/* WhatsYourPrice */}
        <div className="mb-0">
          <h3 className="text-xl font-medium mb-4">WhatsYourPrice</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: creamMuted }}>
            The most unique model on this list. WhatsYourPrice works like an auction: you bid a dollar amount to take someone on a first date.
            If they accept, you exchange info and meet. It&apos;s direct and eliminates endless messaging, but it&apos;s not for everyone. The platform
            is focused on first dates rather than ongoing connections, which limits its use case.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: gold }}>Pros</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Unique bidding model cuts through the noise</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Both parties have skin in the game (reduces flaking)</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Fast — skip weeks of messaging</li>
                <li className="flex gap-2"><span style={{ color: gold }}>+</span> Pay-per-date, not monthly subscription</li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: creamMuted }}>Cons</p>
              <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Focused on first dates, not relationships</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Can feel transactional</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> No income or photo verification</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Dated interface, limited privacy features</li>
                <li className="flex gap-2"><span style={{ color: "#c97a6a" }}>-</span> Smaller pool in non-major cities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Why People Leave Seeking */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Why people leave Seeking Arrangement
        </h2>
        <p className="text-sm leading-relaxed mb-10" style={{ color: creamMuted }}>
          We&apos;ve talked to hundreds of former Seeking users. The same complaints come up over and over:
        </p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <span className="text-2xl font-light shrink-0 w-8" style={{ color: gold }}>1</span>
            <div>
              <h3 className="text-base font-medium mb-2">Bots and fake profiles everywhere</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
                Seeking&apos;s optional verification means the majority of profiles are unverified. Members report spending hours messaging
                accounts that turn out to be catfish, scammers, or profiles that haven&apos;t been active in months. The platform has no
                mechanism to surface verified, active users over dead accounts.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl font-light shrink-0 w-8" style={{ color: gold }}>2</span>
            <div>
              <h3 className="text-base font-medium mb-2">Price keeps climbing</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
                Seeking Premium went from $90 to $109.99/month. Diamond is $274.99/month. For a platform with optional verification,
                no travel features, and an interface that looks like 2014, that&apos;s hard to justify. Especially when alternatives
                offer more features at a fraction of the price.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl font-light shrink-0 w-8" style={{ color: gold }}>3</span>
            <div>
              <h3 className="text-base font-medium mb-2">Outdated UI that never improves</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
                The mobile app was removed from the App Store. The web app looks like it was designed a decade ago. No typing indicators,
                no read receipts, no real-time messaging. In 2026, when even free apps have polished experiences, Seeking feels
                stuck in the past.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl font-light shrink-0 w-8" style={{ color: gold }}>4</span>
            <div>
              <h3 className="text-base font-medium mb-2">Random bans for normal behavior</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
                Since rebranding, Seeking has become aggressive with bans. Users report being banned for normal conversations.
                The appeal process is opaque, and refunds are rarely issued.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl font-light shrink-0 w-8" style={{ color: gold }}>5</span>
            <div>
              <h3 className="text-base font-medium mb-2">Identity crisis after the rebrand</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
                Seeking dropped &ldquo;Arrangement&rdquo; from the name to go mainstream, but the user base came for upfront dating.
                The result is a platform that doesn&apos;t know what it is — too vanilla for members who want honesty, too stigmatized for
                mainstream dating. Members feel like they&apos;re using a platform that&apos;s embarrassed by its own users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Internal Links / Related Reading */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
          More on Seeking Arrangement
        </h2>
        <p className="text-sm mb-10" style={{ color: creamMuted }}>
          Deep dives, guides, and reviews covering everything about Seeking and private dating in 2026.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { href: "/blog/seeking-arrangement-review", title: "Seeking Arrangement Review 2026", desc: "Full review with pricing, features, and verdict" },
            { href: "/blog/seeking-arrangement-account-banned", title: "Seeking Arrangement Account Banned", desc: "Why it happens and what to do next" },
            { href: "/blog/seeking-arrangement-not-working", title: "Seeking Arrangement Not Working?", desc: "Common issues and how to fix them" },
            { href: "/blog/seeking-arrangement-appeal-letter", title: "Seeking Arrangement Appeal Letter", desc: "How to write an appeal that works" },
            { href: "/blog/seeking-arrangement-vs-arranged", title: "Seeking vs Plus: Full Comparison", desc: "Feature-by-feature breakdown" },
            { href: "/blog/sugar-daddy-apps", title: "Best Dating Apps for Professionals 2026", desc: "The top apps ranked and reviewed" },
            { href: "/blog/best-sugar-dating-sites", title: "Best Private Dating Sites", desc: "Complete guide to every major platform" },
            { href: "/blog/sugardaddymeet-vs-arranged", title: "SugarDaddyMeet vs Plus", desc: "Pricing, verification, and user base compared" },
            { href: "/blog/luxy-vs-arranged", title: "Luxy vs Plus", desc: "Luxury dating comparison" },
            { href: "/blog/the-league-vs-arranged", title: "The League vs Plus", desc: "Both verify users, but one costs 6x more" },
            { href: "/blog/secret-benefits-vs-arranged", title: "Secret Benefits vs Plus", desc: "Credits vs subscription — which model wins?" },
            { href: "/blog/seeking-arrangement-cost", title: "How Much Does Seeking Cost?", desc: "Full pricing breakdown for 2026" },
            { href: "/blog/why-everyone-leaving-seeking-2026", title: "Why Everyone Is Leaving Seeking", desc: "Price hikes, bans, and the exodus" },
            { href: "/seeking-arrangement-alternative", title: "Seeking Arrangement Alternative", desc: "Why Plus is the #1 replacement" },
            { href: "/for-sugar-daddies", title: "For Successful Men: Why Plus Is Worth It", desc: "What generous members get on Plus" },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              className="block p-5 border transition-all hover:border-opacity-60"
              style={{ borderColor: line, background: dark2 }}>
              <p className="text-sm font-medium mb-1" style={{ color: cream }}>{link.title}</p>
              <p className="text-xs" style={{ color: creamMuted }}>{link.desc}</p>
              <span className="text-xs mt-2 inline-block" style={{ color: gold }}>Read &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* FAQ */}
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

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-normal mb-6 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-display)" }}>
          Done comparing? Try the one that&apos;s actually good.
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: creamMuted }}>
          Plus has a Free tier for everyone. No credit card, no trial period, no catch. Create your profile in 2 minutes.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-12 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Create your free profile
        </Link>
        <p className="text-xs mt-4" style={{ color: creamMuted }}>Join members who switched from Seeking. Free tier available for everyone.</p>
      </section>

      <PublicFooter />
    </div>
  );
}
