import Link from "next/link";

const gold = "#d4b896";
const dark3 = "#201d18";
const line = "#2e2a24";

interface PreviewCard {
  name: string;
  age: number;
  city: string;
  badge: "Verified" | "New";
  gradient: string;
}

const PREVIEW_CARDS: PreviewCard[] = [
  { name: "Sofia", age: 24, city: "Miami", badge: "Verified", gradient: "from-rose-900/60 via-amber-900/40 to-stone-900" },
  { name: "Emma", age: 26, city: "New York", badge: "Verified", gradient: "from-violet-900/50 via-slate-800/50 to-stone-900" },
  { name: "Isabella", age: 23, city: "Los Angeles", badge: "New", gradient: "from-amber-900/50 via-rose-900/30 to-stone-900" },
  { name: "Olivia", age: 27, city: "Chicago", badge: "Verified", gradient: "from-teal-900/40 via-slate-800/50 to-stone-900" },
  { name: "Valentina", age: 22, city: "Houston", badge: "New", gradient: "from-pink-900/40 via-amber-900/30 to-stone-900" },
  { name: "Ava", age: 25, city: "Las Vegas", badge: "Verified", gradient: "from-indigo-900/40 via-purple-900/30 to-stone-900" },
  { name: "Mia", age: 28, city: "San Francisco", badge: "Verified", gradient: "from-emerald-900/40 via-teal-900/30 to-stone-900" },
  { name: "Charlotte", age: 24, city: "Miami", badge: "New", gradient: "from-rose-900/40 via-violet-900/30 to-stone-900" },
];

export default function ProfilePreviewStatic() {
  return (
    <div className="px-5 md:px-10 lg:px-16 py-14 md:py-20">
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-xl md:text-2xl font-normal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Members waiting to meet you
            </h2>
            <p className="text-sm mt-1" style={{ color: "#a8a090" }}>
              Sign up free to see full profiles and start connecting.
            </p>
          </div>
          <Link
            href="/auth?mode=register"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-all hover:brightness-110 rounded-lg"
            style={{ background: gold, color: "#141210" }}
          >
            Join free
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {PREVIEW_CARDS.map((card, i) => (
            <Link
              key={i}
              href="/auth?mode=register"
              className="rounded-xl border overflow-hidden transition-all hover:border-opacity-60"
              style={{ borderColor: line, background: dark3 }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                {/* Gradient background */}
                <div className={`w-full h-full bg-gradient-to-br ${card.gradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-white/[0.06] to-transparent" />
                </div>

                {/* Frosted glass overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

                {/* Center initial */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span
                      className="text-2xl md:text-3xl"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {card.name[0]}
                    </span>
                  </div>
                  <span
                    className="text-[10px] tracking-wide"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Sign up to view
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-2.5 right-2.5">
                  {card.badge === "Verified" ? (
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{
                        background: `${gold}20`,
                        border: `1px solid ${gold}30`,
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={gold}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span
                        className="text-[9px] font-medium tracking-wide"
                        style={{ color: gold }}
                      >
                        Verified
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(52,211,153,0.12)",
                        border: "1px solid rgba(52,211,153,0.2)",
                      }}
                    >
                      <span
                        className="text-[9px] font-medium tracking-wide"
                        style={{ color: "rgb(110,231,183)" }}
                      >
                        New
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card info */}
              <div className="p-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm">{card.name}</span>
                  <span className="text-xs" style={{ color: "#a8a090" }}>
                    {card.age}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 mt-0.5 text-xs"
                  style={{ color: "#a8a090" }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{card.city}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <div
            className="py-5 rounded-xl border"
            style={{ borderColor: line, background: dark3 }}
          >
            <p className="text-sm mb-3" style={{ color: "#a8a090" }}>
              Sign up to see full profiles, photos, and start messaging.
            </p>
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all hover:brightness-110 rounded-lg"
              style={{ background: gold, color: "#141210" }}
            >
              Create your free profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
