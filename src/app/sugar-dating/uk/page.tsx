import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Sugar Dating in the United Kingdom | London, Manchester & More | Plus",
  description: "The complete guide to sugar dating in the UK. Meet verified sugar daddies in London, Manchester, Birmingham, and Edinburgh. Legal, discreet, and free to join.",
  alternates: { canonical: "https://meetyourplus.com/sugar-dating/uk" },
  keywords: "sugar dating uk, sugar daddy uk, sugar baby uk, sugar dating london, sugar daddy london, sugar dating manchester, uk arrangement dating, sugar daddy edinburgh",
  openGraph: {
    title: "Sugar Dating in the United Kingdom | Plus",
    description: "Meet verified sugar daddies across the UK. London, Manchester, Birmingham, Edinburgh and beyond.",
    url: "https://meetyourplus.com/sugar-dating/uk",
    type: "website",
    images: [{ url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630 }],
  },
};

const gold = "#d4b896";
const dark1 = "#141210";
const dark2 = "#1a1714";
const dark3 = "#201d18";
const cream = "#ede6db";
const creamMuted = "#a8a090";
const line = "#2e2a24";

const faqItems = [
  {
    q: "Is sugar dating legal in the UK?",
    a: "Yes, completely. Sugar dating is fully legal in the United Kingdom. Relationships between consenting adults that involve financial generosity, gifts, or allowances are not restricted by UK law. There are no statutes that prohibit arrangement-style dating. Plus operates as a standard dating platform under UK regulations.",
  },
  {
    q: "What is the average sugar daddy allowance in the UK?",
    a: "Allowances in the UK typically range from \u00a31,500 to \u00a35,000 per month. London skews higher at \u00a32,500\u2013\u00a36,000+, while northern cities like Manchester and Leeds average \u00a31,500\u2013\u00a33,500. These figures vary based on frequency of dates, exclusivity, and individual circumstances.",
  },
  {
    q: "Where are the best cities for sugar dating in the UK?",
    a: "London is by far the most active market, followed by Manchester, Birmingham, and Edinburgh. London\u2019s concentration of financial wealth in the City and Canary Wharf creates the deepest pool of sugar daddies, but Manchester\u2019s growing scene offers less competition for sugar babies.",
  },
  {
    q: "How do I find a sugar daddy in London?",
    a: "The most efficient way is through a verified platform like Plus. We income-verify members and require photo verification. Many London sugar babies also frequent Mayfair bars, members\u2019 clubs, and Kensington restaurants, but the conversion rate on a dedicated app is significantly higher. We already have a detailed London city guide at /sugar-dating/london.",
  },
  {
    q: "Is sugar dating popular in the UK?",
    a: "Very. The UK is one of the top 5 sugar dating markets globally. London alone generates more sugar dating activity than most entire countries. The cultural acceptance of age-gap dating, combined with the City\u2019s financial wealth and a practical British attitude toward relationships, makes the UK ideal for arrangement dating.",
  },
  {
    q: "Can I use Plus in the UK?",
    a: "Yes. Plus is fully available in the UK and growing rapidly. Members in London, Manchester, Birmingham, Edinburgh, and other cities are already active. Travel mode lets you connect with members in any UK city before you arrive.",
  },
  {
    q: "Are sugar dating sites safe in the UK?",
    a: "Plus prioritizes safety with photo verification, income verification, and a relevancy algorithm that pushes verified profiles to the top. We also offer privacy features like photo blurring, private browsing mode, and hide from search. For in-person safety, we recommend public first dates in well-known venues.",
  },
  {
    q: "Do I have to pay tax on sugar daddy allowances in the UK?",
    a: "In the UK, gifts between individuals are generally not subject to income tax for the recipient. However, inheritance tax rules may apply to larger gifts if the giver passes away within seven years. Allowances within a genuine relationship are typically treated as gifts. Consult a UK tax adviser for your specific situation.",
  },
];

const cities = [
  {
    name: "London",
    hasGuide: true,
    guideSlug: "london",
    allowance: "\u00a32,500 \u2013 \u00a36,000+ / month",
    description: "The undisputed capital of UK sugar dating. The City, Canary Wharf, and Mayfair concentrate more wealth per square mile than anywhere else in Europe. London\u2019s sugar dating scene is mature, sophisticated, and deeply international. Expect Michelin-starred dinners in Chelsea, cocktails at members\u2019 clubs, and weekends in the Cotswolds.",
    neighborhoods: ["Mayfair", "Chelsea", "Kensington", "Knightsbridge", "Canary Wharf", "Marylebone"],
  },
  {
    name: "Manchester",
    hasGuide: false,
    guideSlug: null,
    allowance: "\u00a31,500 \u2013 \u00a34,000 / month",
    description: "England\u2019s second city has a booming sugar dating scene driven by its growing financial sector, media industry (MediaCityUK), and Premier League football wealth. Manchester\u2019s lower cost of living means allowances go further, and the competition for sugar babies is less intense than London.",
    neighborhoods: ["Spinningfields", "Deansgate", "Didsbury", "Alderley Edge"],
  },
  {
    name: "Birmingham",
    hasGuide: false,
    guideSlug: null,
    allowance: "\u00a31,500 \u2013 \u00a33,500 / month",
    description: "Britain\u2019s second-largest city is an underrated sugar dating market. The Jewellery Quarter\u2019s creative scene, Colmore Row\u2019s business district, and a wave of Michelin-starred restaurants have put Birmingham on the map. The city\u2019s central location makes it easy to meet members from across the Midlands.",
    neighborhoods: ["Jewellery Quarter", "Colmore Row", "Edgbaston", "Brindleyplace"],
  },
  {
    name: "Edinburgh",
    hasGuide: false,
    guideSlug: null,
    allowance: "\u00a31,500 \u2013 \u00a33,500 / month",
    description: "Scotland\u2019s capital combines financial services wealth (one of Europe\u2019s largest fund management centres) with a historic, romantic backdrop. The New Town\u2019s Georgian elegance and Stockbridge\u2019s independent restaurants create a sugar dating scene that\u2019s intimate and distinctly Scottish.",
    neighborhoods: ["New Town", "Stockbridge", "Morningside", "Leith"],
  },
  {
    name: "Leeds",
    hasGuide: false,
    guideSlug: null,
    allowance: "\u00a31,200 \u2013 \u00a33,000 / month",
    description: "Yorkshire\u2019s financial capital has quietly become one of England\u2019s fastest-growing sugar dating markets. A thriving legal and financial services sector, combined with an increasingly cosmopolitan dining scene, has attracted both sugar daddies and sugar babies from across the North.",
    neighborhoods: ["The Calls", "Victoria Quarter", "Chapel Allerton", "Roundhay"],
  },
];

const allowanceTable = [
  { city: "London (Mayfair, Chelsea)", range: "\u00a33,000 \u2013 \u00a36,000+ / month", note: "Highest in the UK; international finance wealth" },
  { city: "London (other zones)", range: "\u00a32,000 \u2013 \u00a34,000 / month", note: "Still above national average" },
  { city: "Manchester", range: "\u00a31,500 \u2013 \u00a34,000 / month", note: "Growing fast; football and media money" },
  { city: "Birmingham", range: "\u00a31,500 \u2013 \u00a33,500 / month", note: "Underrated market with less competition" },
  { city: "Edinburgh", range: "\u00a31,500 \u2013 \u00a33,500 / month", note: "Fund management and fintech wealth" },
  { city: "Leeds / Bristol", range: "\u00a31,200 \u2013 \u00a33,000 / month", note: "Regional hubs with growing scenes" },
];

export default function UKPage() {
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
            United Kingdom
          </p>
          <span className="text-xs" style={{ color: creamMuted }}>Updated July 2026</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Sugar Dating in the United Kingdom
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mb-4" style={{ color: creamMuted }}>
          The UK is one of the world&apos;s top sugar dating markets, anchored by London&apos;s
          extraordinary concentration of financial wealth and fuelled by a pragmatic British attitude
          toward modern relationships. From Mayfair to Manchester, Edinburgh to Birmingham,
          arrangement dating is legal, growing, and increasingly mainstream.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: creamMuted }}>
          Plus connects verified sugar daddies and sugar babies across the UK with income
          verification, photo verification, and privacy features designed for members who value discretion.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Join Plus free &mdash; no credit card required
        </Link>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Cities */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Sugar dating across the UK
        </h2>

        <div className="space-y-12">
          {cities.map((city) => (
            <div key={city.name}>
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-xl font-medium" style={{ color: gold }}>{city.name}</h3>
                <span className="text-xs" style={{ color: creamMuted }}>{city.allowance}</span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: creamMuted }}>
                {city.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {city.neighborhoods.map((n) => (
                  <span key={n} className="text-xs px-3 py-1 border" style={{ borderColor: line, color: cream }}>
                    {n}
                  </span>
                ))}
              </div>
              {city.hasGuide && (
                <Link href={`/sugar-dating/${city.guideSlug}`} className="text-sm underline" style={{ color: gold }}>
                  Read the full {city.name} city guide &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Allowance table */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Sugar daddy allowance ranges in the UK (2026)
          </h2>
          <p className="text-sm mb-10" style={{ color: creamMuted }}>
            All figures in British pounds. London dominates the high end, but northern cities offer
            strong value with less competition.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${line}` }}>
                  <th className="text-left py-3 pr-4 font-medium" style={{ color: creamMuted }}>City / Area</th>
                  <th className="text-left py-3 px-4 font-medium" style={{ color: gold }}>Typical Range</th>
                  <th className="text-left py-3 pl-4 font-medium" style={{ color: creamMuted }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {allowanceTable.map((row) => (
                  <tr key={row.city} style={{ borderBottom: `1px solid ${line}` }}>
                    <td className="py-3 pr-4" style={{ color: cream }}>{row.city}</td>
                    <td className="py-3 px-4" style={{ color: gold }}>{row.range}</td>
                    <td className="py-3 pl-4" style={{ color: creamMuted }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs mt-6" style={{ color: creamMuted }}>
            Ranges based on community data and platform activity. Actual allowances depend on arrangement terms,
            frequency, exclusivity, and individual circumstances.
          </p>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Legal status */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Legal status of sugar dating in the UK
        </h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Sugar dating is <strong style={{ color: cream }}>fully legal</strong> in the United Kingdom.
            Relationships between consenting adults that involve financial support, gifts, or allowances
            are not regulated or restricted under English, Scottish, Welsh, or Northern Irish law.
          </p>
          <p>
            The UK has no laws against providing or receiving financial support within a consensual
            relationship. Dating platforms like Plus operate as standard technology companies
            under UK regulations, including compliance with the Online Safety Act and GDPR.
          </p>
          <p>
            This clear legal framework is one reason the UK has become such a strong market for
            arrangement dating. Members can engage openly without legal ambiguity, and Plus&apos;s
            verification and privacy features provide the discretion that many UK professionals require.
          </p>
          <p>
            For tax purposes, gifts between individuals are generally not subject to income tax in
            the UK. Inheritance tax may apply to larger gifts under the seven-year rule, but standard
            allowances within a genuine relationship are typically treated as gifts. Members with
            significant arrangements should consult a UK tax adviser.
          </p>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Why Plus for UK members */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Why UK members choose Plus
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-medium mb-2">Verification that matters</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              UK sugar dating platforms are plagued by fake profiles. Plus requires photo
              verification and offers income verification, so you know the person behind the profile
              is real and can back up their claims. Active, verified members are ranked higher in
              the feed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Privacy-first for professionals</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Many UK sugar daddies work in the City, in law, or in public-facing roles where
              discretion is non-negotiable. Plus offers photo blurring for non-matches, private
              browsing mode, hide from search, and the ability to hide income details &mdash; controls
              that legacy platforms simply don&apos;t provide.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Travel mode for domestic and international</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Heading from Manchester to London for business? Set your location before you leave and
              have dates lined up when you arrive. Flying to Dubai for the weekend? Same thing.
              Travel mode turns every trip into an opportunity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Half the price of legacy platforms</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Seeking charges over &pound;90/month for Premium. Plus Diamond is &pound;79.99/month
              with all features. Attractive members are free forever. You get more for less.
            </p>
          </div>
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

      {/* Related reading */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-xl font-normal mb-8" style={{ fontFamily: "var(--font-display)" }}>Related reading</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { href: "/sugar-dating/london", title: "Sugar Dating in London", desc: "The complete London city guide" },
            { href: "/seeking-arrangement-alternative", title: "Best Seeking Alternative", desc: "Why members are switching to Plus" },
            { href: "/blog/sugar-daddy-apps", title: "Best Sugar Daddy Apps in 2026", desc: "Platform comparison guide" },
            { href: "/blog/sugar-baby-allowance-guide", title: "Sugar Baby Allowance Guide", desc: "What to expect by city and country" },
            { href: "/sugar-dating/turkey", title: "Sugar Dating in Turkey", desc: "Europe\u2019s fastest-growing market" },
            { href: "/sugar-dating/india", title: "Sugar Dating in India", desc: "Mumbai, Delhi, Bangalore, and beyond" },
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
          Ready to explore sugar dating in the UK?
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: creamMuted }}>
          Join verified members across London, Manchester, Edinburgh, and beyond. Create your profile in 2 minutes.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-12 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Create your free profile
        </Link>
        <p className="text-xs mt-4" style={{ color: creamMuted }}>No credit card required. Free forever for attractive members.</p>
      </section>

      <PublicFooter />
    </div>
  );
}
