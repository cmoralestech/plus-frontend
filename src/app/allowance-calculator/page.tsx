"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import TrackPageView from "@/components/TrackPageView";

/* ── Theme ── */
const gold = "#d4b896";
const dark1 = "#141210";
const dark2 = "#1a1714";
const cream = "#ede6db";
const creamMuted = "#a8a090";
const line = "#2e2a24";

/* ── Data ── */
type CityData = { name: string; tier: 1 | 2 | 3 | 4 | 5; label: string };

const CITIES: CityData[] = [
  // Tier 1
  { name: "New York City", tier: 1, label: "New York City, NY" },
  { name: "San Francisco", tier: 1, label: "San Francisco, CA" },
  { name: "Los Angeles", tier: 1, label: "Los Angeles, CA" },
  { name: "Miami", tier: 1, label: "Miami, FL" },
  // Tier 2
  { name: "Chicago", tier: 2, label: "Chicago, IL" },
  { name: "Houston", tier: 2, label: "Houston, TX" },
  { name: "Dallas", tier: 2, label: "Dallas, TX" },
  { name: "Boston", tier: 2, label: "Boston, MA" },
  { name: "Washington DC", tier: 2, label: "Washington, DC" },
  { name: "Seattle", tier: 2, label: "Seattle, WA" },
  { name: "Denver", tier: 2, label: "Denver, CO" },
  { name: "Atlanta", tier: 2, label: "Atlanta, GA" },
  { name: "Philadelphia", tier: 2, label: "Philadelphia, PA" },
  { name: "Phoenix", tier: 2, label: "Phoenix, AZ" },
  { name: "Minneapolis", tier: 2, label: "Minneapolis, MN" },
  { name: "Portland", tier: 2, label: "Portland, OR" },
  // Tier 3
  { name: "Las Vegas", tier: 3, label: "Las Vegas, NV" },
  { name: "San Diego", tier: 3, label: "San Diego, CA" },
  { name: "Austin", tier: 3, label: "Austin, TX" },
  { name: "Nashville", tier: 3, label: "Nashville, TN" },
  { name: "Tampa", tier: 3, label: "Tampa, FL" },
  { name: "Orlando", tier: 3, label: "Orlando, FL" },
  { name: "Charlotte", tier: 3, label: "Charlotte, NC" },
  { name: "San Antonio", tier: 3, label: "San Antonio, TX" },
  { name: "Raleigh", tier: 3, label: "Raleigh, NC" },
  { name: "Salt Lake City", tier: 3, label: "Salt Lake City, UT" },
  // Tier 4
  { name: "Indianapolis", tier: 4, label: "Indianapolis, IN" },
  { name: "Columbus", tier: 4, label: "Columbus, OH" },
  { name: "Kansas City", tier: 4, label: "Kansas City, MO" },
  { name: "Memphis", tier: 4, label: "Memphis, TN" },
  { name: "Louisville", tier: 4, label: "Louisville, KY" },
  { name: "Milwaukee", tier: 4, label: "Milwaukee, WI" },
  { name: "Oklahoma City", tier: 4, label: "Oklahoma City, OK" },
  { name: "Jacksonville", tier: 4, label: "Jacksonville, FL" },
  // Tier 5 — International
  { name: "London", tier: 5, label: "London, UK" },
  { name: "Dubai", tier: 5, label: "Dubai, UAE" },
  { name: "Toronto", tier: 5, label: "Toronto, Canada" },
  { name: "Sydney", tier: 5, label: "Sydney, Australia" },
  { name: "Paris", tier: 5, label: "Paris, France" },
  { name: "Singapore", tier: 5, label: "Singapore" },
  { name: "Tokyo", tier: 5, label: "Tokyo, Japan" },
  { name: "Berlin", tier: 5, label: "Berlin, Germany" },
  { name: "Mexico City", tier: 5, label: "Mexico City, Mexico" },
  { name: "Sao Paulo", tier: 5, label: "Sao Paulo, Brazil" },
];

const TIER_RANGES: Record<number, [number, number]> = {
  1: [4000, 8000],
  2: [2500, 5000],
  3: [2000, 4000],
  4: [1500, 3000],
};

const INTL_RANGES: Record<string, [number, number]> = {
  London: [3000, 6000],
  Dubai: [3000, 7000],
  Toronto: [2500, 5000],
  Sydney: [2500, 5000],
  Paris: [2500, 5500],
  Singapore: [3000, 6000],
  Tokyo: [2500, 5000],
  Berlin: [2000, 4000],
  "Mexico City": [1500, 3000],
  "Sao Paulo": [1500, 3500],
};

type ArrangementType = "monthly" | "ppm" | "experience";
type Frequency = "1x" | "2x" | "weekly" | "2x-week";
type Exclusivity = "non-exclusive" | "exclusive";
type Experience = "new" | "some" | "experienced" | "very-experienced";

const EXPERIENCE_MODIFIER: Record<Experience, number> = {
  new: -0.1,
  some: 0,
  experienced: 0.15,
  "very-experienced": 0.25,
};

const FREQUENCY_DIVISOR: Record<Frequency, number> = {
  "1x": 1,
  "2x": 2,
  weekly: 4,
  "2x-week": 8,
};

function getBaseRange(city: CityData): [number, number] {
  if (city.tier === 5) return INTL_RANGES[city.name] ?? [2000, 4000];
  return TIER_RANGES[city.tier];
}

function calculate(
  city: CityData,
  arrangementType: ArrangementType,
  frequency: Frequency,
  exclusivity: Exclusivity,
  experience: Experience,
) {
  const [baseLow, baseHigh] = getBaseRange(city);
  const expMod = EXPERIENCE_MODIFIER[experience];
  const exclMod = exclusivity === "exclusive" ? 0.25 : 0;

  let low = Math.round(baseLow * (1 + expMod) * (1 + exclMod));
  let high = Math.round(baseHigh * (1 + expMod) * (1 + exclMod));

  const exclusivityPremiumLow = Math.round(baseLow * (1 + expMod) * exclMod);
  const exclusivityPremiumHigh = Math.round(baseHigh * (1 + expMod) * exclMod);

  let perLabel = "/ month";
  let ppmLow = 0;
  let ppmHigh = 0;

  if (arrangementType === "ppm") {
    const div = FREQUENCY_DIVISOR[frequency];
    // PPM gets a slight premium (10%) on per-date basis
    ppmLow = Math.round((low / 4) * 1.1);
    ppmHigh = Math.round((high / 4) * 1.1);
    low = ppmLow;
    high = ppmHigh;
    perLabel = "/ date";
  } else if (arrangementType === "experience") {
    // Experience-based is shown monthly but with wider range
    low = Math.round(low * 0.8);
    high = Math.round(high * 1.1);
  }

  // Round to nearest 100
  low = Math.round(low / 100) * 100;
  high = Math.round(high / 100) * 100;

  return {
    low,
    high,
    perLabel,
    baseLow,
    baseHigh,
    exclusivityPremiumLow,
    exclusivityPremiumHigh,
    isMonthly: arrangementType !== "ppm",
    monthlyEquivalentLow:
      arrangementType === "ppm"
        ? Math.round((ppmLow * FREQUENCY_DIVISOR[frequency] * 4) / FREQUENCY_DIVISOR[frequency] / 100) * 100
        : low,
    monthlyEquivalentHigh:
      arrangementType === "ppm"
        ? Math.round((ppmHigh * FREQUENCY_DIVISOR[frequency] * 4) / FREQUENCY_DIVISOR[frequency] / 100) * 100
        : high,
  };
}

/* ── Components ── */

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300"
            style={{
              background: i + 1 <= current ? gold : "transparent",
              color: i + 1 <= current ? dark1 : creamMuted,
              border: `1px solid ${i + 1 <= current ? gold : line}`,
            }}
          >
            {i + 1}
          </div>
          {i < total - 1 && (
            <div
              className="w-8 md:w-12 h-px transition-all duration-300"
              style={{ background: i + 1 < current ? gold : line }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function RadioOption({
  selected,
  onClick,
  label,
  sublabel,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-4 border transition-all duration-200"
      style={{
        borderColor: selected ? gold : line,
        background: selected ? `${gold}10` : "transparent",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{ borderColor: selected ? gold : creamMuted }}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full" style={{ background: gold }} />
          )}
        </div>
        <div>
          <span className="text-sm" style={{ color: cream }}>
            {label}
          </span>
          {sublabel && (
            <p className="text-xs mt-0.5" style={{ color: creamMuted }}>
              {sublabel}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

/* ── Page ── */

export default function AllowanceCalculatorPage() {
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [citySearch, setCitySearch] = useState("");
  const [arrangementType, setArrangementType] = useState<ArrangementType>("monthly");
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [exclusivity, setExclusivity] = useState<Exclusivity>("non-exclusive");
  const [experience, setExperience] = useState<Experience>("some");
  const [showResult, setShowResult] = useState(false);

  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) return CITIES;
    const q = citySearch.toLowerCase();
    return CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.label.toLowerCase().includes(q),
    );
  }, [citySearch]);

  const result = useMemo(() => {
    if (!selectedCity) return null;
    return calculate(selectedCity, arrangementType, frequency, exclusivity, experience);
  }, [selectedCity, arrangementType, frequency, exclusivity, experience]);

  const handleCalculate = useCallback(() => {
    setShowResult(true);
  }, []);

  const handleBack = useCallback(() => {
    if (showResult) {
      setShowResult(false);
    } else if (step > 1) {
      setStep(step - 1);
    }
  }, [step, showResult]);

  const handleNext = useCallback(() => {
    if (step < 3) setStep(step + 1);
    else handleCalculate();
  }, [step, handleCalculate]);

  const canProceed =
    (step === 1 && selectedCity !== null) ||
    (step === 2 && arrangementType !== null) ||
    step === 3;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much should a sugar baby get paid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sugar baby allowances vary significantly based on location, arrangement type, and experience. In major cities like New York, San Francisco, Los Angeles, and Miami, monthly allowances typically range from $4,000 to $8,000. In mid-tier cities like Chicago, Houston, and Seattle, expect $2,500 to $5,000 per month. Smaller cities average $1,500 to $3,000. Per-date (PPM) arrangements generally work out to about 25% of the monthly range per meeting. Exclusive arrangements command a 20-30% premium over non-exclusive ones.",
        },
      },
      {
        "@type": "Question",
        name: "What is a fair PPM (pay per meet) amount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A fair PPM depends on your city and expectations. In Tier 1 cities (NYC, LA, Miami, SF), PPM ranges from $1,100 to $2,200 per date. Tier 2 cities (Chicago, Houston, DC, Boston) see $700 to $1,400. Tier 3 cities (Las Vegas, Austin, Nashville) average $550 to $1,100. These figures assume meeting once per week. Exclusive arrangements add roughly 25% to these numbers. Experience level and the overall dynamic of the arrangement also factor in.",
        },
      },
      {
        "@type": "Question",
        name: "Do sugar baby allowances vary by city?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, dramatically. Cost of living is the biggest factor in allowance expectations. New York City and San Francisco have the highest allowances ($4,000-$8,000/month) because the cost of living is extremely high and the pool of affluent sugar daddies is large. Cities like Indianapolis, Columbus, and Memphis have lower ranges ($1,500-$3,000/month). International cities also vary: London and Dubai run $3,000-$7,000/month, while cities like Mexico City and Berlin trend lower at $1,500-$4,000/month.",
        },
      },
      {
        "@type": "Question",
        name: "Is a monthly allowance or PPM better?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both have advantages. Monthly allowances provide financial stability and signal trust between both parties. They work best in established arrangements where you meet regularly. PPM (pay per meet) is more common in new arrangements because it reduces risk for both sides — the sugar daddy pays only for dates that happen, and the sugar baby isn't locked into an arrangement that isn't working. Many couples start with PPM and transition to monthly after 2-3 months of consistent dates.",
        },
      },
      {
        "@type": "Question",
        name: "How do I negotiate a sugar baby allowance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Research your city's typical range using a tool like this calculator, then set your expectation in the upper-middle of that range. Discuss expectations before the first date — most experienced sugar daddies prefer upfront honesty over ambiguity. Frame it as a conversation, not a demand: 'I'm looking for something around $X per month — does that work for you?' Be willing to start with PPM if the sugar daddy prefers it, and revisit monthly after establishing trust. Never accept below your minimum just to secure an arrangement — low offers rarely increase over time.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <TrackPageView event="allowance_calculator_viewed" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PublicNav />

      {/* Hero */}
      <section className="px-6 md:px-12 pt-12 md:pt-20 pb-10 max-w-3xl">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: gold }}
        >
          Free tool
        </p>
        <h1
          className="text-3xl md:text-5xl font-normal mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sugar Baby Allowance Calculator
        </h1>
        <p className="text-base md:text-lg max-w-xl" style={{ color: creamMuted }}>
          Estimate your expected allowance based on your city, arrangement type,
          and experience level. Updated for 2026 with data from real arrangements.
        </p>
      </section>

      {/* Calculator */}
      <section className="px-6 md:px-12 pb-16 md:pb-24 max-w-3xl">
        {!showResult && <StepIndicator current={step} total={3} />}

        {/* Step 1: Location */}
        {step === 1 && !showResult && (
          <div
            className="transition-opacity duration-300"
            style={{ opacity: 1 }}
          >
            <h2
              className="text-xl md:text-2xl font-normal mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Where are you located?
            </h2>
            <p className="text-sm mb-6" style={{ color: creamMuted }}>
              Your city is the biggest factor in determining allowance ranges.
            </p>

            <input
              type="text"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                if (selectedCity) setSelectedCity(null);
              }}
              placeholder="Search cities..."
              className="w-full px-4 py-3 mb-4 text-sm outline-none transition-all duration-200"
              style={{
                background: dark2,
                border: `1px solid ${line}`,
                color: cream,
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = gold)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = line)
              }
            />

            <div
              className="max-h-72 overflow-y-auto space-y-1 pr-1"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: `${line} transparent`,
              }}
            >
              {filteredCities.map((city) => (
                <button
                  key={city.label}
                  type="button"
                  onClick={() => {
                    setSelectedCity(city);
                    setCitySearch(city.label);
                  }}
                  className="w-full text-left px-4 py-3 text-sm transition-all duration-150"
                  style={{
                    background:
                      selectedCity?.name === city.name ? `${gold}15` : "transparent",
                    borderLeft:
                      selectedCity?.name === city.name
                        ? `2px solid ${gold}`
                        : "2px solid transparent",
                    color:
                      selectedCity?.name === city.name ? cream : creamMuted,
                  }}
                >
                  {city.label}
                </button>
              ))}
              {filteredCities.length === 0 && (
                <p className="text-sm py-4 px-4" style={{ color: creamMuted }}>
                  No cities found. Try a different search.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Arrangement Details */}
        {step === 2 && !showResult && (
          <div className="transition-opacity duration-300" style={{ opacity: 1 }}>
            <h2
              className="text-xl md:text-2xl font-normal mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Arrangement details
            </h2>
            <p className="text-sm mb-8" style={{ color: creamMuted }}>
              The type and terms of your arrangement affect the expected amount.
            </p>

            {/* Arrangement Type */}
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>
              Arrangement type
            </p>
            <div className="space-y-2 mb-8">
              <RadioOption
                selected={arrangementType === "monthly"}
                onClick={() => setArrangementType("monthly")}
                label="Monthly allowance"
                sublabel="A set amount each month for ongoing arrangements"
              />
              <RadioOption
                selected={arrangementType === "ppm"}
                onClick={() => setArrangementType("ppm")}
                label="Per-date (PPM)"
                sublabel="Pay per meet, common for newer arrangements"
              />
              <RadioOption
                selected={arrangementType === "experience"}
                onClick={() => setArrangementType("experience")}
                label="Experience-based"
                sublabel="Trips, gifts, and experiences instead of fixed amounts"
              />
            </div>

            {/* Frequency (PPM only) */}
            {arrangementType === "ppm" && (
              <>
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: gold }}
                >
                  How often do you meet?
                </p>
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {(
                    [
                      ["1x", "1x / month"],
                      ["2x", "2x / month"],
                      ["weekly", "Weekly"],
                      ["2x-week", "2x / week"],
                    ] as [Frequency, string][]
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFrequency(val)}
                      className="py-3 text-sm text-center border transition-all duration-200"
                      style={{
                        borderColor: frequency === val ? gold : line,
                        background: frequency === val ? `${gold}10` : "transparent",
                        color: frequency === val ? cream : creamMuted,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Exclusivity */}
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>
              Exclusivity
            </p>
            <div className="space-y-2">
              <RadioOption
                selected={exclusivity === "non-exclusive"}
                onClick={() => setExclusivity("non-exclusive")}
                label="Non-exclusive"
                sublabel="Open to seeing other people"
              />
              <RadioOption
                selected={exclusivity === "exclusive"}
                onClick={() => setExclusivity("exclusive")}
                label="Exclusive"
                sublabel="Only seeing each other (+25% premium)"
              />
            </div>
          </div>
        )}

        {/* Step 3: Experience Level */}
        {step === 3 && !showResult && (
          <div className="transition-opacity duration-300" style={{ opacity: 1 }}>
            <h2
              className="text-xl md:text-2xl font-normal mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your experience level
            </h2>
            <p className="text-sm mb-8" style={{ color: creamMuted }}>
              More experienced members generally command higher allowances.
            </p>

            <div className="space-y-2">
              <RadioOption
                selected={experience === "new"}
                onClick={() => setExperience("new")}
                label="New to sugar dating"
                sublabel="First arrangement or just exploring"
              />
              <RadioOption
                selected={experience === "some"}
                onClick={() => setExperience("some")}
                label="Some experience"
                sublabel="1-2 previous arrangements"
              />
              <RadioOption
                selected={experience === "experienced"}
                onClick={() => setExperience("experienced")}
                label="Experienced"
                sublabel="Several successful arrangements"
              />
              <RadioOption
                selected={experience === "very-experienced"}
                onClick={() => setExperience("very-experienced")}
                label="Very experienced"
                sublabel="Well-established in sugar dating"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        {!showResult && (
          <div className="flex items-center gap-4 mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 text-sm border transition-all duration-200"
                style={{ borderColor: line, color: creamMuted }}
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="px-8 py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: canProceed ? gold : `${gold}30`,
                color: canProceed ? dark1 : creamMuted,
                cursor: canProceed ? "pointer" : "not-allowed",
              }}
            >
              {step === 3 ? "Calculate my allowance" : "Next"}
            </button>
          </div>
        )}

        {/* Result */}
        {showResult && result && selectedCity && (
          <div
            className="animate-fade-in"
            style={{
              animation: "fadeSlideIn 0.5s ease-out forwards",
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `,
              }}
            />

            {/* Result Card */}
            <div className="p-8 md:p-10 border" style={{ borderColor: gold, background: dark2 }}>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-6"
                style={{ color: gold }}
              >
                Your estimated allowance
              </p>
              <p
                className="text-4xl md:text-5xl font-light mb-2"
                style={{ fontFamily: "var(--font-display)", color: cream }}
              >
                ${result.low.toLocaleString()} &mdash; ${result.high.toLocaleString()}
              </p>
              <p className="text-sm mb-8" style={{ color: creamMuted }}>
                {result.perLabel}
              </p>

              {/* Breakdown */}
              <div
                className="space-y-3 py-6 mb-6"
                style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}
              >
                <div className="flex justify-between text-sm">
                  <span style={{ color: creamMuted }}>
                    Base range for {selectedCity.name}
                  </span>
                  <span style={{ color: cream }}>
                    ${result.baseLow.toLocaleString()} &mdash; ${result.baseHigh.toLocaleString()} / mo
                  </span>
                </div>
                {exclusivity === "exclusive" && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: creamMuted }}>Exclusivity premium</span>
                    <span style={{ color: gold }}>
                      +${result.exclusivityPremiumLow.toLocaleString()} &mdash; ${result.exclusivityPremiumHigh.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span style={{ color: creamMuted }}>Experience modifier</span>
                  <span style={{ color: cream }}>
                    {experience === "new"
                      ? "-10%"
                      : experience === "some"
                        ? "Baseline"
                        : experience === "experienced"
                          ? "+15%"
                          : "+25%"}
                  </span>
                </div>
                {arrangementType === "ppm" && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: creamMuted }}>Frequency</span>
                    <span style={{ color: cream }}>
                      {frequency === "1x"
                        ? "1x / month"
                        : frequency === "2x"
                          ? "2x / month"
                          : frequency === "weekly"
                            ? "Weekly"
                            : "2x / week"}
                    </span>
                  </div>
                )}
              </div>

              {/* Platform comparison */}
              <div className="p-4 mb-8" style={{ background: `${gold}08`, border: `1px solid ${line}` }}>
                <p className="text-sm" style={{ color: creamMuted }}>
                  On Seeking, you&apos;d pay{" "}
                  <span style={{ color: cream }}>$109.99/month</span> just for platform
                  access. On Plus, Diamond is{" "}
                  <span style={{ color: gold }}>$99.99/month</span> &mdash; with all
                  features and required verification included.
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Link
                  href="/auth?mode=register"
                  className="block text-center py-3.5 text-sm font-medium tracking-wide transition-all duration-200"
                  style={{ background: gold, color: dark1 }}
                >
                  Find verified members in {selectedCity.name}
                </Link>
                <Link
                  href="/blog/sugar-baby-allowance-guide"
                  className="block text-center py-3 text-sm transition-all duration-200"
                  style={{ color: gold }}
                >
                  See detailed allowance data &rarr;
                </Link>
              </div>
            </div>

            {/* Recalculate */}
            <button
              type="button"
              onClick={() => {
                setShowResult(false);
                setStep(1);
                setSelectedCity(null);
                setCitySearch("");
              }}
              className="mt-6 text-sm transition-all duration-200"
              style={{ color: creamMuted }}
            >
              &larr; Start over with different inputs
            </button>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section
        className="px-6 md:px-12 py-16 md:py-20 max-w-3xl"
        style={{ borderTop: `1px solid ${line}` }}
      >
        <h2
          className="text-2xl md:text-3xl font-normal mb-12"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Frequently asked questions
        </h2>
        <div className="space-y-8">
          {[
            {
              q: "How much should a sugar baby get paid?",
              a: "It depends on your city, arrangement type, and experience. In top-tier cities like New York and Miami, monthly allowances range from $4,000 to $8,000. Mid-tier cities like Chicago and Houston see $2,500 to $5,000. Exclusive arrangements add roughly 25% to these figures. Use the calculator above for a personalized estimate.",
            },
            {
              q: "What is a fair PPM (pay per meet) amount?",
              a: "PPM typically works out to about one-quarter of the monthly allowance with a slight premium. In NYC, that's $1,100 to $2,200 per date. In a city like Austin or Nashville, expect $550 to $1,100. PPM is the most common arrangement type for new relationships because it reduces risk for both parties.",
            },
            {
              q: "Do sugar baby allowances vary by city?",
              a: "Dramatically. Cost of living is the single biggest factor. New York and San Francisco have the highest allowances because everything costs more and the concentration of affluent partners is higher. A sugar baby in Memphis or Indianapolis should expect roughly half of what someone in Manhattan receives.",
            },
            {
              q: "Is a monthly allowance or PPM better?",
              a: "Monthly allowances provide stability and signal trust. PPM is more flexible and common in newer arrangements. Most experienced sugar daters start with PPM for the first 2-3 months, then transition to monthly once they've established consistency and comfort with each other.",
            },
            {
              q: "How do I negotiate a sugar baby allowance?",
              a: "Research your city's range (this calculator helps), then ask for something in the upper-middle. Be direct and have the conversation before your first date. Frame it as a discussion, not a demand. Start with PPM if they prefer, and revisit monthly later. Never accept below your minimum — low offers rarely go up over time.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="text-base font-medium mb-2">{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: creamMuted }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Guides */}
      <section
        className="px-6 md:px-12 py-16 md:py-20 max-w-3xl"
        style={{ borderTop: `1px solid ${line}` }}
      >
        <h2
          className="text-2xl md:text-3xl font-normal mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Related guides
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              href: "/blog/sugar-baby-allowance-guide",
              title: "Sugar Baby Allowance Guide 2026",
              desc: "Complete breakdown of allowance ranges by city, arrangement type, and experience level.",
            },
            {
              href: "/blog/sugar-daddy-allowance-guide",
              title: "Sugar Daddy Allowance Guide",
              desc: "What to expect to provide as a sugar daddy, and how to structure your arrangement.",
            },
            {
              href: "/blog/sugar-dating-for-beginners",
              title: "Sugar Dating for Beginners",
              desc: "Everything you need to know before your first arrangement — from profiles to first dates.",
            },
            {
              href: "/blog/sugar-dating-statistics-2026",
              title: "Sugar Dating Statistics 2026",
              desc: "Real data on the sugar dating industry: demographics, average allowances, and growth trends.",
            },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="block p-6 border transition-all duration-200 group"
              style={{ borderColor: line, background: dark2 }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = gold)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = line)
              }
            >
              <h3
                className="text-sm font-medium mb-2 transition-colors duration-200"
                style={{ color: cream }}
              >
                {guide.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: creamMuted }}>
                {guide.desc}
              </p>
              <span
                className="inline-block mt-3 text-xs"
                style={{ color: gold }}
              >
                Read guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
