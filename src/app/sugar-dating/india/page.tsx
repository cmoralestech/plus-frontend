import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Sugar Dating in India | Mumbai, Delhi, Bangalore & More | Plus",
  description: "Sugar dating in India is growing fast, 11% of global traffic. Meet verified sugar daddies in Mumbai, Delhi, Bangalore, and Hyderabad on Plus.",
  alternates: { canonical: "https://meetyourplus.com/sugar-dating/india" },
  keywords: "sugar dating india, sugar daddy india, sugar baby india, sugar dating mumbai, sugar daddy delhi, sugar dating bangalore, india arrangement dating, sugar daddy hyderabad",
  openGraph: {
    title: "Sugar Dating in India | Plus",
    description: "India\u2019s fastest-growing sugar dating market. Connect with verified members in Mumbai, Delhi, Bangalore, and Hyderabad.",
    url: "https://meetyourplus.com/sugar-dating/india",
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
    q: "Is sugar dating legal in India?",
    a: "Sugar dating exists in a grey area in India. Consensual relationships between adults that involve financial support or gifts are not specifically prohibited by Indian law. However, India does not have explicit legislation addressing sugar dating as a category. Plus operates as a dating platform connecting consenting adults with shared lifestyle expectations.",
  },
  {
    q: "What is the average sugar daddy allowance in India?",
    a: "Allowances in India typically range from \u20b950,000 to \u20b93,00,000 per month ($600\u2013$3,600 USD). Mumbai and Delhi command the highest allowances, while Bangalore and Hyderabad are slightly lower but growing rapidly. International members or NRIs often offer allowances denominated in USD.",
  },
  {
    q: "Which cities have the most active sugar dating scenes?",
    a: "Mumbai leads by a significant margin, followed by Delhi, Bangalore, and Hyderabad. These four metros account for the vast majority of India\u2019s sugar dating activity. Mumbai\u2019s financial wealth and Bollywood culture, Delhi\u2019s political and business elite, and Bangalore\u2019s tech money each create distinct scenes.",
  },
  {
    q: "Can I use Plus in India?",
    a: "Yes. Plus is fully available in India. We already have detailed city guides for Mumbai and Delhi, and members across Indian metros are active on the platform. Travel mode lets you connect with members in any Indian city before you arrive.",
  },
  {
    q: "Is sugar dating popular in India?",
    a: "Increasingly so. India accounts for approximately 11% of Plus\u2019s global traffic, making it one of our fastest-growing markets. The combination of rapid wealth creation in tech and finance, a large young population, and growing cultural openness toward non-traditional relationships has fuelled significant growth.",
  },
  {
    q: "How do I find a sugar daddy in Mumbai?",
    a: "Plus is the most efficient way \u2014 we income-verify members and require photo verification. Mumbai\u2019s Bandra, Lower Parel, and South Mumbai are also natural hunting grounds, with upscale restaurants and rooftop bars that attract the city\u2019s wealthy. See our full Mumbai guide at /sugar-dating/mumbai for specific recommendations.",
  },
  {
    q: "Are NRI sugar daddies common on Plus?",
    a: "Yes. A significant portion of Indian sugar dating involves NRIs (Non-Resident Indians) based in the US, UK, Dubai, or Singapore who visit India regularly. Plus\u2019s travel mode is designed for exactly this \u2014 set your location to Mumbai or Delhi before your trip and have connections ready when you land.",
  },
  {
    q: "How private is Plus for Indian members?",
    a: "Very. We understand that discretion is especially important for Indian members. Plus offers photo blurring for non-matches, private browsing mode, hide from search, hide income details, and hide last seen. No app download required \u2014 it works in your phone\u2019s browser, so there\u2019s no app icon to explain.",
  },
];

const cities = [
  {
    name: "Mumbai",
    hasGuide: true,
    guideSlug: "mumbai",
    allowance: "\u20b91,00,000 \u2013 \u20b93,00,000 / month",
    description: "India\u2019s financial capital and the heart of the country\u2019s sugar dating scene. The combination of Dalal Street wealth, Bollywood glamour, and a cosmopolitan culture that values both ambition and discretion makes Mumbai the single most active sugar dating market in India. SoBo restaurants, Bandra rooftops, and Lower Parel\u2019s nightlife create a natural ecosystem for arrangement dating.",
    neighborhoods: ["South Mumbai (Colaba, Churchgate)", "Bandra West", "Lower Parel", "Juhu", "Worli", "Powai"],
  },
  {
    name: "Delhi",
    hasGuide: true,
    guideSlug: "delhi",
    allowance: "\u20b975,000 \u2013 \u20b92,50,000 / month",
    description: "The national capital\u2019s sugar dating scene draws from political power, old money, and a thriving business community. Defence Colony, Greater Kailash, and Lutyens\u2019 Delhi are home to some of the wealthiest individuals in the country. Delhi\u2019s sugar dating culture is more established and traditional than Bangalore\u2019s tech-driven scene.",
    neighborhoods: ["Defence Colony", "Greater Kailash", "Hauz Khas", "Vasant Vihar", "Golf Links", "Connaught Place"],
  },
  {
    name: "Bangalore",
    hasGuide: true,
    guideSlug: "bangalore",
    allowance: "\u20b960,000 \u2013 \u20b92,00,000 / month",
    description: "India\u2019s tech capital is the fastest-growing sugar dating market in the country. Startup founders, VC-funded executives, and senior engineers at multinational tech companies form the sugar daddy pool. The culture is younger and more progressive than other Indian cities, with less stigma around non-traditional dating. Indiranagar, Koramangala, and Whitefield drive most of the activity.",
    neighborhoods: ["Indiranagar", "Koramangala", "Whitefield", "MG Road", "JP Nagar", "HSR Layout"],
  },
  {
    name: "Hyderabad",
    hasGuide: false,
    guideSlug: null,
    allowance: "\u20b950,000 \u2013 \u20b91,50,000 / month",
    description: "Hyderabad\u2019s growing tech corridor (HITEC City, Gachibowli) and old Nawabi wealth create an interesting dual sugar dating market. The city is more conservative than Mumbai or Bangalore, which means discretion is paramount. Banjara Hills and Jubilee Hills concentrate most of the high-net-worth dating activity.",
    neighborhoods: ["Banjara Hills", "Jubilee Hills", "HITEC City", "Gachibowli", "Begumpet"],
  },
  {
    name: "Pune",
    hasGuide: false,
    guideSlug: null,
    allowance: "\u20b950,000 \u2013 \u20b91,50,000 / month",
    description: "Pune\u2019s proximity to Mumbai and its own growing IT sector have created an emerging sugar dating scene. Koregaon Park\u2019s restaurants and Kalyani Nagar\u2019s nightlife attract both local wealth and Mumbai weekenders. The city\u2019s large university population adds to the sugar baby side of the market.",
    neighborhoods: ["Koregaon Park", "Kalyani Nagar", "Viman Nagar", "Baner"],
  },
];

const allowanceTable = [
  { city: "Mumbai (SoBo, Bandra)", range: "\u20b91,50,000 \u2013 \u20b93,00,000 / month", note: "Highest in India; Bollywood + finance wealth" },
  { city: "Mumbai (other areas)", range: "\u20b975,000 \u2013 \u20b91,50,000 / month", note: "Growing across suburbs" },
  { city: "Delhi (South Delhi)", range: "\u20b91,00,000 \u2013 \u20b92,50,000 / month", note: "Political + business elite" },
  { city: "Delhi NCR (Gurgaon, Noida)", range: "\u20b960,000 \u2013 \u20b91,50,000 / month", note: "Corporate hub, MNC executives" },
  { city: "Bangalore", range: "\u20b960,000 \u2013 \u20b92,00,000 / month", note: "Tech money; fastest-growing market" },
  { city: "Hyderabad", range: "\u20b950,000 \u2013 \u20b91,50,000 / month", note: "HITEC City + old money" },
  { city: "Pune / Chennai", range: "\u20b950,000 \u2013 \u20b91,50,000 / month", note: "Emerging markets" },
  { city: "NRI / International", range: "$1,000 \u2013 $3,000+ / month", note: "USD-denominated; visit-based arrangements" },
];

export default function IndiaPage() {
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
            India
          </p>
          <span className="text-xs" style={{ color: creamMuted }}>Updated July 2026</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Sugar Dating in India
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mb-4" style={{ color: creamMuted }}>
          India is one of Plus&apos;s fastest-growing markets, accounting for
          approximately <strong style={{ color: cream }}>11% of global traffic</strong>. The rapid
          creation of tech wealth in Bangalore, Bollywood money in Mumbai, and old-money business
          dynasties in Delhi have created a sugar dating scene that&apos;s large, diverse, and
          increasingly open.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: creamMuted }}>
          Whether you&apos;re in Mumbai, Delhi, Bangalore, or Hyderabad, Plus connects you with
          verified members who value discretion, generosity, and genuine connection.
        </p>
        <Link href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
          style={{ background: gold, color: dark1 }}>
          Join Plus free &mdash; no credit card required
        </Link>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Why India */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl" style={{ background: dark2 }}>
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Why sugar dating is growing in India
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-medium mb-2">Rapid wealth creation</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              India has produced more new millionaires in the last five years than almost any other
              country. The tech boom in Bangalore and Hyderabad, the financial sector in Mumbai, and
              a thriving startup ecosystem across the country have created a generation of wealthy
              individuals in their 30s and 40s who are comfortable with non-traditional dating.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Large young population</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              With a median age of 28, India has the world&apos;s largest population of young adults.
              Many are ambitious, educated, and looking for opportunities to advance their careers
              and lifestyles. Sugar dating provides a framework for mutually beneficial relationships
              that align with these aspirations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">NRI connections</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              A significant portion of India&apos;s sugar dating market involves NRIs (Non-Resident Indians)
              based in the US, UK, Dubai, or Singapore. These individuals visit India regularly and
              often seek companionship during their stays. Plus&apos;s travel mode is designed for
              exactly this use case &mdash; connect before your flight and have dates ready when you land.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Cultural shift in metro cities</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              While India remains culturally conservative in many regions, the major metros &mdash;
              particularly Mumbai and Bangalore &mdash; have seen a significant shift toward acceptance
              of modern dating dynamics. Dating apps are mainstream, age-gap relationships are less
              stigmatised, and financial transparency in relationships is increasingly normalised.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Privacy technology matters more here</h3>
            <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
              In a country where social circles are tight and families are involved in personal lives,
              privacy isn&apos;t a nice-to-have &mdash; it&apos;s essential. Plus&apos;s photo blurring,
              private browsing mode, and browser-based design (no app icon on your phone) are
              particularly valued by Indian members. You control exactly who sees you.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Cities */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Sugar dating by city
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
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: dark2 }}>
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Sugar daddy allowance ranges in India (2026)
          </h2>
          <p className="text-sm mb-10" style={{ color: creamMuted }}>
            All figures in Indian rupees unless noted. NRI arrangements are often denominated in USD.
            Mumbai and South Delhi command the highest ranges.
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
            frequency, exclusivity, and individual circumstances. Many arrangements in India involve additional
            benefits like career mentorship, introductions, or travel opportunities.
          </p>
        </div>
      </section>

      <div className="mx-6 md:mx-12" style={{ borderTop: `1px solid ${line}` }} />

      {/* Legal info */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Legal status of sugar dating in India
        </h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Sugar dating occupies a grey area under Indian law. There is no specific legislation
            that addresses or prohibits arrangement-based dating between consenting adults. Relationships
            that involve financial support, gifts, or allowances within a genuine romantic context are
            generally treated as private matters between individuals.
          </p>
          <p>
            The Indian legal framework recognises the autonomy of consenting adults in private
            relationships. The Supreme Court&apos;s evolving jurisprudence on individual rights and
            privacy (particularly the landmark Puttaswamy decision affirming the right to privacy as
            a fundamental right) provides a supportive backdrop for consensual arrangement dating.
          </p>
          <p>
            Plus operates as a dating platform connecting consenting adults with shared lifestyle
            expectations. Members are expected to comply with all applicable local laws. The platform&apos;s
            verification requirements (age verification, photo verification) ensure that all users are
            legal adults capable of providing informed consent.
          </p>
          <p>
            For Indian members particularly concerned about discretion, Plus&apos;s privacy-first
            design &mdash; browser-based (no app download), photo blurring, private browsing, hide from
            search &mdash; provides the confidentiality that the Indian social context often demands.
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
            { href: "/sugar-dating/mumbai", title: "Sugar Dating in Mumbai", desc: "The complete Mumbai city guide" },
            { href: "/sugar-dating/delhi", title: "Sugar Dating in Delhi", desc: "Delhi\u2019s full sugar dating guide" },
            { href: "/sugar-dating/bangalore", title: "Sugar Dating in Bangalore", desc: "India\u2019s tech capital guide" },
            { href: "/blog/sugar-baby-allowance-guide", title: "Sugar Baby Allowance Guide", desc: "What to expect by city and country" },
            { href: "/sugar-dating/turkey", title: "Sugar Dating in Turkey", desc: "Europe\u2019s fastest-growing market" },
            { href: "/sugar-dating/uk", title: "Sugar Dating in the UK", desc: "London, Manchester, and beyond" },
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
          Ready to explore sugar dating in India?
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: creamMuted }}>
          Join verified members across Mumbai, Delhi, Bangalore, and beyond. Create your profile in 2 minutes.
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
