import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Sugar Dating in Turkey | Istanbul, Ankara & Coastal Cities | Plus",
  description: "Turkey leads all of Europe in sugar dating searches with 49,500/mo. Meet verified sugar daddies in Istanbul, Ankara, Antalya, and Bodrum on Plus.",
  alternates: { canonical: "https://meetyourplus.com/sugar-dating/turkey" },
  keywords: "sugar dating turkey, sugar daddy turkey, sugar baby turkey, istanbul sugar dating, turkish sugar daddy, sugar daddy istanbul, turkey arrangement dating",
  openGraph: {
    title: "Sugar Dating in Turkey | Plus",
    description: "Turkey leads Europe in sugar dating interest. Connect with verified members in Istanbul, Ankara, and beyond.",
    url: "https://meetyourplus.com/sugar-dating/turkey",
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

const faqItems = [
  {
    q: "Is sugar dating legal in Turkey?",
    a: "Sugar dating is legal in Turkey. Arrangements between consenting adults involving financial support and companionship are not prohibited under Turkish law. Plus provides a verified, discreet platform for members seeking these connections.",
  },
  {
    q: "What is the average sugar daddy allowance in Turkey?",
    a: "Allowances in Turkey typically range from \u20ba15,000 to \u20ba60,000 per month (roughly $450\u2013$1,800 USD). In Istanbul\u2019s wealthier districts like Ni\u015fanta\u015f\u0131 and Bebek, allowances trend toward the higher end. Some arrangements with international businessmen are denominated in USD or EUR and can go significantly higher.",
  },
  {
    q: "Where do sugar daddies hang out in Istanbul?",
    a: "Bebek waterfront cafes, Ni\u015fanta\u015f\u0131 cocktail bars, \u00c7\u0131ra\u011fan Palace, Soho House Istanbul, and the rooftop venues along the Bosphorus are all popular spots. On Plus, you can skip the guessing and connect directly with verified members in these areas using travel mode.",
  },
  {
    q: "Is sugar dating popular in Turkey?",
    a: "Extremely. Turkey generates 49,500 sugar dating searches per month \u2014 more than any other country in Europe. The combination of Istanbul\u2019s international business scene, a large young population, and a growing culture of discreet dating has made Turkey one of the fastest-growing sugar dating markets globally.",
  },
  {
    q: "Can I use Plus in Turkey?",
    a: "Yes. Plus works internationally and many members in Istanbul, Ankara, and coastal cities are already active on the platform. Travel mode lets you connect with members in any Turkish city before you arrive.",
  },
  {
    q: "How do I find a sugar daddy in Istanbul?",
    a: "The most efficient way is through Plus. We income-verify members and require photo verification, so you know who you\u2019re meeting. Istanbul\u2019s Ni\u015fanta\u015f\u0131, Bebek, and Karak\u00f6y neighborhoods are also natural places for organic connections, but the hit rate on a verified platform is significantly higher.",
  },
  {
    q: "Are there international sugar daddies in Turkey?",
    a: "Yes. Istanbul attracts a significant number of international businessmen, particularly from the Gulf states, Europe, and the US. Many maintain apartments in the city and visit regularly. Plus\u2019s travel mode is designed for exactly this use case \u2014 connect before you arrive.",
  },
  {
    q: "Is Plus available in Turkish?",
    a: "Our blog content is available in Turkish at /tr/blog/ with guides specifically written for the Turkish sugar dating market. The platform itself is in English, which works well given the international nature of sugar dating in Turkey.",
  },
];

const neighborhoods = [
  {
    name: "Ni\u015fanta\u015f\u0131",
    description: "Istanbul\u2019s most prestigious shopping district. Designer boutiques, high-end cafes, and old-money families who\u2019ve lived here for generations. This is where Istanbul\u2019s sugar dating scene is most concentrated \u2014 discreet, upscale, and walkable.",
  },
  {
    name: "Bebek",
    description: "The Bosphorus waterfront neighborhood where Istanbul\u2019s wealthy go for weekend brunch and sunset drinks. Bebek\u2019s cafe culture and yacht-lined shores make it the city\u2019s most scenic backdrop for first dates.",
  },
  {
    name: "Karak\u00f6y",
    description: "The revitalized port district that\u2019s become Istanbul\u2019s creative hub. Boutique hotels, specialty coffee shops, and art galleries attract a younger, cosmopolitan crowd of entrepreneurs and digital nomads.",
  },
  {
    name: "Etiler",
    description: "A residential enclave on the European side known for its affluent families and private clubs. Etiler\u2019s restaurants and lounges cater to an older, wealthier clientele that values discretion above all.",
  },
  {
    name: "Kad\u0131k\u00f6y",
    description: "The Asian side\u2019s vibrant heart. More bohemian than Ni\u015fanta\u015f\u0131 but increasingly popular with tech professionals and startup founders who prefer the more authentic, local atmosphere.",
  },
  {
    name: "Be\u015fikta\u015f",
    description: "Central, energetic, and well-connected. Be\u015fikta\u015f sits between the business districts and the Bosphorus, making it a convenient meeting point with excellent restaurants and a lively bar scene.",
  },
];

const allowanceData = [
  { city: "Istanbul (Ni\u015fanta\u015f\u0131, Bebek)", range: "\u20ba25,000 \u2013 \u20ba60,000 / month", note: "Higher end; international expats often pay in USD/EUR" },
  { city: "Istanbul (other districts)", range: "\u20ba15,000 \u2013 \u20ba35,000 / month", note: "Growing scene across Asian and European sides" },
  { city: "Ankara", range: "\u20ba12,000 \u2013 \u20ba30,000 / month", note: "Government and diplomatic community" },
  { city: "Antalya / Bodrum", range: "\u20ba10,000 \u2013 \u20ba25,000 / month", note: "Seasonal; peaks during summer tourism" },
  { city: "Izmir", range: "\u20ba10,000 \u2013 \u20ba25,000 / month", note: "University city with a growing scene" },
];

export default function TurkeyPage() {
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
            Turkey
          </p>
          <span className="text-xs" style={{ color: creamMuted }}>Updated July 2026</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Sugar Dating in Turkey
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mb-4" style={{ color: creamMuted }}>
          Turkey leads <strong style={{ color: cream }}>all of Europe</strong> in sugar dating search volume with
          49,500 monthly searches &mdash; more than the UK, Germany, or France. Istanbul&apos;s international
          business scene, wealthy expat community, and culture of discreet dating have made it one of the
          fastest-growing sugar dating markets in the world.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: creamMuted }}>
          Whether you&apos;re based in Istanbul, visiting Ankara on business, or spending summer along
          the Turquoise Coast, Plus connects you with verified members across Turkey.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Join Plus free &mdash; no credit card required
        </Link>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Why Turkey */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Why Turkey is Europe&apos;s #1 sugar dating market
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-medium mb-2">International business hub</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Istanbul straddles two continents and serves as a gateway between Europe, the Middle East,
              and Central Asia. The city attracts executives from multinational corporations, Gulf-state
              investors, and European entrepreneurs who maintain residences along the Bosphorus. This
              international wealth creates a sugar dating market that&apos;s both diverse and well-funded.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Wealthy expat and diplomatic community</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Between corporate expats, diplomatic staff, and remote workers drawn by Istanbul&apos;s
              cost-of-living arbitrage, the city has a large and growing international population.
              Many of these individuals earn in USD, EUR, or GBP while living in Turkey, giving them
              significant purchasing power and a natural interest in arrangement-style dating.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Culture of discreet dating</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Turkish dating culture values privacy and discretion, which aligns perfectly with sugar
              dating. In Istanbul&apos;s upscale circles, relationships with an element of financial
              generosity are understood and accepted without the stigma they might carry elsewhere.
              Plus&apos;s privacy features &mdash; photo blurring, private browsing, hide from search &mdash;
              are built for exactly this dynamic.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Young, ambitious population</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Turkey has one of Europe&apos;s youngest populations, with a median age under 33.
              Many young professionals in Istanbul and Ankara are ambitious, multilingual, and
              comfortable navigating international dating culture. The combination of youthful energy
              and established wealth creates ideal conditions for arrangement dating.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Lira economics</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              The Turkish lira&apos;s depreciation means that individuals earning in hard currencies
              have outsized purchasing power. For international sugar daddies, an allowance that feels
              modest in USD terms translates to a genuinely life-changing amount in local currency.
              This dynamic has accelerated Turkey&apos;s growth as a sugar dating destination.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Neighborhoods */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Best neighborhoods for sugar dating in Istanbul
        </h2>
        <p className="text-sm mb-10" style={{ color: creamMuted }}>
          Istanbul&apos;s sugar dating scene is concentrated in a handful of upscale neighborhoods,
          each with its own character.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {neighborhoods.map((n) => (
            <div key={n.name} className="p-5 border" style={{ borderColor: line, background: dark2 }}>
              <h3 className="text-base font-medium mb-2" style={{ color: gold }}>{n.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>{n.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Allowance ranges */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: dark2 }}>
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Sugar daddy allowance ranges in Turkey (2026)
          </h2>
          <p className="text-sm mb-10" style={{ color: creamMuted }}>
            Allowances vary significantly by city and whether the arrangement is denominated in
            Turkish lira or a foreign currency. Istanbul&apos;s top neighborhoods command the highest ranges.
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
                {allowanceData.map((row) => (
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
            Ranges based on community data and platform activity. Actual allowances depend on arrangement terms, frequency, and individual circumstances.
            Many international arrangements in Istanbul are denominated in USD ($500&ndash;$3,000/mo) or EUR.
          </p>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Beyond Istanbul */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Sugar dating beyond Istanbul
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-medium mb-2">Ankara</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Turkey&apos;s capital is home to the diplomatic community, government officials, and
              defense industry executives. The dating scene is more conservative than Istanbul but
              the demand for discreet arrangements is significant. Kava\u0131kl\u0131dere and \u00c7ankaya
              are the neighborhoods where most activity concentrates.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Antalya &amp; the Turquoise Coast</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              During summer, Antalya and Bodrum transform into playgrounds for wealthy Turks and
              international visitors. The seasonal sugar dating scene here is driven by tourism &mdash;
              yacht parties, beach clubs, and luxury resorts create natural settings for connections.
              Plus&apos;s travel mode is perfect for connecting with members before your trip.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Izmir</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Turkey&apos;s third-largest city has a more relaxed, Mediterranean vibe. The university
              population and growing tech sector are creating a younger sugar dating scene. Alsancak&apos;s
              waterfront bars and Kar\u015f\u0131yaka&apos;s cafes are the main social hubs.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Legal info */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Legal status of sugar dating in Turkey
        </h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Sugar dating is legal in Turkey. Relationships between consenting adults that involve
            financial generosity are not prohibited under Turkish law. There are no specific statutes
            that restrict arrangement-based dating, gifts, or financial support within a relationship.
          </p>
          <p>
            Turkey&apos;s approach is similar to most European countries: the law does not regulate
            private consensual relationships between adults. Plus operates as a dating platform
            connecting individuals with shared interests and lifestyle expectations, which is fully
            compliant with Turkish regulations.
          </p>
          <p>
            That said, discretion is culturally important in Turkey, particularly outside of Istanbul.
            Plus&apos;s privacy features &mdash; including photo blurring for non-matches, private
            browsing mode, and the ability to hide from search &mdash; are designed for members who
            prioritize confidentiality.
          </p>
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
            { href: "/tr/blog", title: "Turkish Blog", desc: "Sugar dating guides in Turkish" },
            { href: "/sugar-dating/dubai", title: "Sugar Dating in Dubai", desc: "The Gulf hub, a short flight from Istanbul" },
            { href: "/sugar-dating/london", title: "Sugar Dating in London", desc: "Europe\u2019s largest sugar dating market" },
            { href: "/alternatives", title: "Best Sugar Daddy Apps in 2026", desc: "Platform comparison guide" },
            { href: "/allowance-calculator", title: "Sugar Baby Allowance Guide", desc: "What to expect worldwide" },
            { href: "/seeking-arrangement-alternative", title: "Best Seeking Alternative", desc: "Why members are switching to Plus" },
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
          Ready to explore sugar dating in Turkey?
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: creamMuted }}>
          Join verified members in Istanbul, Ankara, and across Turkey. Create your profile in 2 minutes.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-12 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Create your free profile
        </Link>
        <p className="text-xs mt-4" style={{ color: creamMuted }}>No credit card required. Free forever for Plus members.</p>
      </section>

      <PublicFooter />
    </div>
  );
}
