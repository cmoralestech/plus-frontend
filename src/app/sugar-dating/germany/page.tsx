import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Sugar Dating in Germany | Berlin, Munich, Frankfurt & More | Plus",
  description: "Germany has 25,000+ monthly sugar dating searches. Meet verified sugar daddies in Berlin, Munich, Frankfurt, Hamburg, and Dusseldorf on Plus.",
  alternates: { canonical: "https://meetyourplus.com/sugar-dating/germany" },
  keywords: "sugar dating germany, sugar daddy germany, sugar dating berlin, sugar dating deutschland, sugar daddy berlin, sugar baby germany, sugar dating munich, sugar daddy frankfurt",
  openGraph: {
    title: "Sugar Dating in Germany | Plus",
    description: "Germany's sugar dating market is booming. Connect with verified members in Berlin, Munich, Frankfurt, and beyond.",
    url: "https://meetyourplus.com/sugar-dating/germany",
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
    q: "Is sugar dating legal in Germany?",
    a: "Yes. Sugar dating is fully legal in Germany. Relationships between consenting adults that involve financial generosity are not regulated or restricted under German law. Germany has some of the most liberal personal freedom laws in Europe, and arrangement-style dating is widely accepted, particularly in major cities like Berlin and Munich.",
  },
  {
    q: "What is the average sugar daddy allowance in Germany?",
    a: "Allowances in Germany typically range from \u20ac1,500 to \u20ac5,000 per month. Berlin tends toward the lower-middle range (\u20ac1,500\u2013\u20ac3,500) while Munich and Frankfurt, where corporate and banking wealth is concentrated, trend higher (\u20ac2,500\u2013\u20ac5,000+). Some arrangements with senior executives or business owners go significantly higher.",
  },
  {
    q: "Where do sugar daddies hang out in Berlin?",
    a: "Charlottenburg\u2019s upscale restaurants and wine bars, Mitte\u2019s hotel lounges and rooftop bars, and Grunewald\u2019s private clubs are the main spots. Soho House Berlin, The Ritz-Carlton bar, and KaDeWe\u2019s top-floor restaurant attract the city\u2019s wealthier crowd. On Plus, you can skip the guessing and connect directly with verified members.",
  },
  {
    q: "Is sugar dating popular in Germany?",
    a: "Very. Germany generates approximately 25,000 sugar dating searches per month, making it one of the largest markets in Europe. The combination of high wealth concentration, a direct dating culture, and less social stigma around arrangements has made Germany a fast-growing sugar dating market.",
  },
  {
    q: "Can I use Plus in Germany?",
    a: "Yes. Plus works internationally and members in Berlin, Munich, Frankfurt, Hamburg, and D\u00fcsseldorf are already active on the platform. Travel mode lets you connect with members in any German city before you arrive.",
  },
  {
    q: "How is sugar dating in Germany different from the US?",
    a: "Germans tend to be more direct about expectations and less uncomfortable discussing financial aspects of relationships. There\u2019s significantly less stigma around sugar dating compared to the US. The expat community in cities like Berlin and Frankfurt also creates a more international, open-minded dating pool.",
  },
  {
    q: "Are there international sugar daddies in Germany?",
    a: "Absolutely. Frankfurt\u2019s banking district attracts finance professionals from across Europe and the US. Berlin\u2019s startup scene draws international tech founders. Munich hosts executives from BMW, Siemens, Allianz, and dozens of other major corporations. Plus\u2019s travel mode is designed for connecting before you arrive.",
  },
  {
    q: "What cities in Germany are best for sugar dating?",
    a: "Berlin has the largest and most diverse scene, driven by startups, nightlife, and the expat community. Munich has the highest average wealth. Frankfurt is where the banking money is. Hamburg attracts media and shipping wealth. D\u00fcsseldorf is strong in fashion and advertising. All five cities have active Plus members.",
  },
];

const cities = [
  {
    name: "Berlin",
    tagline: "The hub \u2014 startup money, nightlife, expat scene",
    description: "Berlin is Germany\u2019s sugar dating capital. The city\u2019s massive startup ecosystem has created a new generation of young, wealthy founders. Combined with one of Europe\u2019s best nightlife scenes and a huge international expat community, Berlin offers the most diverse and active sugar dating market in the country. The culture here is direct, open-minded, and refreshingly low on judgment.",
    neighborhoods: [
      { name: "Charlottenburg", desc: "Old-money Berlin. Upscale boutiques along Kurf\u00fcrstendamm, fine dining, and a quieter, more refined atmosphere. The classic meeting ground for established sugar daddies." },
      { name: "Mitte", desc: "The city center where business meets culture. Hotel bars, art galleries, and Michelin-starred restaurants make it the natural first-date neighborhood." },
      { name: "Grunewald", desc: "Berlin\u2019s wealthiest residential area. Villas, private lakes, and country clubs. Discreet and affluent \u2014 many of Berlin\u2019s highest-net-worth individuals live here." },
    ],
  },
  {
    name: "Munich",
    tagline: "Corporate wealth and Bavarian money",
    description: "Munich is Germany\u2019s richest city by average income. Home to BMW, Siemens, Allianz, and Munich Re, the city has a deep pool of corporate executives and old-money Bavarian families. The dating culture here is more traditional than Berlin but the wealth concentration is unmatched. Sugar daddies in Munich tend to be more established and generous.",
    neighborhoods: [
      { name: "Maxvorstadt / Schwabing", desc: "The upscale university district. Cocktail bars, galleries, and the kind of quiet money that doesn\u2019t need to show off." },
      { name: "Bogenhausen", desc: "Munich\u2019s most exclusive residential area. Embassies, luxury apartments, and executives who value discretion above all." },
    ],
  },
  {
    name: "Frankfurt",
    tagline: "Banking capital of Europe",
    description: "Frankfurt is Europe\u2019s financial center. The European Central Bank, Deutsche Bank, Commerzbank, and hundreds of international banks are headquartered here. The city punches well above its size in terms of wealth \u2014 banking bonuses alone fuel a significant sugar dating scene. The international finance crowd here is comfortable with arrangement-style dating and tends to be straightforward about expectations.",
    neighborhoods: [
      { name: "Westend", desc: "Frankfurt\u2019s most prestigious residential district. Tree-lined streets, consulates, and the city\u2019s wealthiest residents. Walking distance from the financial district." },
      { name: "Sachsenhausen", desc: "The trendy south bank of the Main river. Upscale bars and restaurants that attract the after-work banking crowd." },
    ],
  },
  {
    name: "Hamburg",
    tagline: "Media and shipping wealth",
    description: "Hamburg is Germany\u2019s wealthiest city per capita after Munich. The port city\u2019s economy runs on shipping, media, and aviation \u2014 Airbus, Hapag-Lloyd, and most of Germany\u2019s major media companies are based here. Hamburg\u2019s sugar dating scene is more understated than Berlin\u2019s but the money runs deep, especially in the Alster lake neighborhoods.",
    neighborhoods: [
      { name: "Blankenese", desc: "Hamburg\u2019s most exclusive suburb. Hillside villas overlooking the Elbe, old shipping money, and a village-like atmosphere that belies its wealth." },
      { name: "Eppendorf / Harvestehude", desc: "The upscale inner-city neighborhoods along the Alster. Boutique shopping, waterfront dining, and quiet affluence." },
    ],
  },
  {
    name: "D\u00fcsseldorf",
    tagline: "Fashion and advertising capital",
    description: "D\u00fcsseldorf is Germany\u2019s fashion and advertising hub, home to major agencies and the luxury shopping mile K\u00f6nigsallee. The city also has a significant Japanese business community and attracts international professionals. The Altstadt\u2019s bar scene and the K\u00f6 boulevard create natural meeting grounds for arrangement dating.",
    neighborhoods: [
      { name: "Oberkassel", desc: "The affluent left-bank neighborhood across the Rhine. Quiet streets, excellent restaurants, and a residential feel popular with successful professionals." },
      { name: "K\u00f6nigsallee area", desc: "The luxury shopping boulevard and surrounding streets. Where D\u00fcsseldorf\u2019s wealth concentrates for dining, shopping, and socializing." },
    ],
  },
];

const allowanceData = [
  { city: "Berlin", range: "\u20ac1,500 \u2013 \u20ac3,500 / month", note: "Wide range; startup founders to established executives" },
  { city: "Munich", range: "\u20ac2,500 \u2013 \u20ac5,000+ / month", note: "Highest in Germany; corporate and old money" },
  { city: "Frankfurt", range: "\u20ac2,000 \u2013 \u20ac5,000 / month", note: "Banking bonuses push the high end significantly" },
  { city: "Hamburg", range: "\u20ac2,000 \u2013 \u20ac4,000 / month", note: "Shipping and media wealth; discreet scene" },
  { city: "D\u00fcsseldorf", range: "\u20ac1,500 \u2013 \u20ac3,500 / month", note: "Fashion, advertising, and international business" },
];

export default function GermanyPage() {
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
            Germany
          </p>
          <span className="text-xs" style={{ color: creamMuted }}>Updated July 2026</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Sugar Dating in Germany
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mb-4" style={{ color: creamMuted }}>
          Germany generates <strong style={{ color: cream }}>25,000+ monthly searches</strong> for sugar dating &mdash;
          one of the largest markets in Europe. Between Berlin&apos;s startup wealth, Munich&apos;s corporate
          money, and Frankfurt&apos;s banking scene, Germany has a deep and growing sugar dating market
          with less stigma than almost anywhere else in the world.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: creamMuted }}>
          Whether you&apos;re based in Berlin, traveling to Frankfurt for business, or looking to connect
          in Munich, Hamburg, or D&uuml;sseldorf, Plus connects you with verified members across Germany.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Join Plus free &mdash; no credit card required
        </Link>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Why Germany is different */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Why Germany is different for sugar dating
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-medium mb-2">More direct culture, less stigma</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Germans are famously direct. That extends to dating. Discussing expectations, financial
              arrangements, and relationship terms upfront is more culturally normal here than in the
              US or UK. The sugar dating conversation in Germany skips the awkwardness and gets to the
              point &mdash; which is exactly how it should be.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Strong expat community</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Berlin alone has over 200,000 international residents. Frankfurt&apos;s financial district
              is one of the most internationally diverse workplaces in Europe. This creates a sugar
              dating pool that&apos;s cosmopolitan, multilingual, and comfortable crossing cultural
              boundaries. Many arrangements in Germany involve one or both parties being expats.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Concentrated wealth across multiple cities</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Unlike countries where wealth concentrates in one capital city, Germany spreads it
              across Berlin, Munich, Frankfurt, Hamburg, and D&uuml;sseldorf. Each city has its own
              economic engine &mdash; tech, automotive, banking, media, fashion &mdash; and its own
              distinct sugar dating culture. This means more options regardless of where you are.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Legal clarity and acceptance</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Germany has some of the most progressive personal freedom laws in Europe. Sugar dating
              between consenting adults is fully legal and faces far less social stigma than in many
              other countries. The culture respects privacy and personal choices, making it one of the
              most comfortable places in the world for arrangement-style relationships.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Europe&apos;s largest economy</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              Germany is the fourth-largest economy in the world and the largest in Europe. The
              &ldquo;Mittelstand&rdquo; &mdash; Germany&apos;s famous small and medium-sized enterprises &mdash;
              creates thousands of wealthy business owners who aren&apos;t on any rich list but have
              significant disposable income. This &ldquo;hidden wealth&rdquo; is a major driver of
              Germany&apos;s sugar dating market.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Cities */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Sugar dating by city
        </h2>
        <p className="text-sm mb-12" style={{ color: creamMuted }}>
          Each German city has its own character, its own wealth profile, and its own sugar dating culture.
        </p>

        <div className="space-y-16">
          {cities.map((city) => (
            <div key={city.name}>
              <h3 className="text-xl font-medium mb-1" style={{ color: gold }}>{city.name}</h3>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: creamMuted }}>{city.tagline}</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: creamMuted }}>{city.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                {city.neighborhoods.map((n) => (
                  <div key={n.name} className="p-4 border" style={{ borderColor: line, background: dark2 }}>
                    <h4 className="text-sm font-medium mb-1">{n.name}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: creamMuted }}>{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Allowance ranges */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: dark2 }}>
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Sugar daddy allowance ranges in Germany (2026)
          </h2>
          <p className="text-sm mb-10" style={{ color: creamMuted }}>
            All figures in euros. Ranges vary by city, industry, and the specifics of each arrangement.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${line}` }}>
                  <th className="text-left py-3 pr-4 font-medium" style={{ color: creamMuted }}>City</th>
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
            Ranges based on community data and platform activity. Actual allowances depend on arrangement terms,
            frequency, and individual circumstances. International arrangements are sometimes denominated in USD.
          </p>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Legal status */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Legal status of sugar dating in Germany
        </h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Sugar dating is legal in Germany. Consensual relationships between adults that involve
            financial support, gifts, or lifestyle assistance are not regulated or prohibited under
            German law. Germany has some of the most progressive personal freedom legislation in
            Europe, and private arrangements between consenting adults are considered a personal matter.
          </p>
          <p>
            Culturally, sugar dating carries significantly less stigma in Germany than in the United
            States or many other countries. German society generally takes a pragmatic, live-and-let-live
            approach to personal relationships. In major cities like Berlin and Munich, arrangement-style
            dating is understood and accepted as part of the modern dating landscape.
          </p>
          <p>
            Plus operates as a dating platform connecting individuals with shared lifestyle
            expectations, which is fully compliant with German and EU regulations. Our privacy features
            &mdash; including photo blurring, private browsing, and hide-from-search &mdash; are built
            for members who value discretion.
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
            { href: "/sugar-dating/uk", title: "Sugar Dating in the UK", desc: "Europe\u2019s largest English-speaking market" },
            { href: "/sugar-dating/turkey", title: "Sugar Dating in Turkey", desc: "Europe\u2019s #1 market by search volume" },
            { href: "/for-sugar-daddies", title: "For Sugar Daddies", desc: "Why Plus is worth it for successful men" },
            { href: "/blog/sugar-daddy-apps", title: "Best Sugar Daddy Apps in 2026", desc: "Platform comparison guide" },
            { href: "/blog/sugar-baby-allowance-guide", title: "Sugar Baby Allowance Guide", desc: "What to expect worldwide" },
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
          Ready to explore sugar dating in Germany?
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: creamMuted }}>
          Join verified members in Berlin, Munich, Frankfurt, and across Germany. Create your profile in 2 minutes.
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
