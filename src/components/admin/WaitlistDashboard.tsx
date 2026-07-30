"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

type Breakdown = Record<string, number>;

interface CityStats {
  city: string;
  count: number;
  potential_established: number;
  gender: Breakdown;
  interested_in: Breakdown;
  pairings: Breakdown;
  age_ranges: Breakdown;
  avg_age: number | null;
  looking_for: Breakdown;
  what_matters: Breakdown;
  bring_to_table: Breakdown;
  worth_joining: Breakdown;
  how_heard: Breakdown;
  utm_source: Breakdown;
  top_referrers: { first_name: string | null; share_code: string; referred: number }[];
  growth: Breakdown;
}

const pct = (n: number, total: number) => (total > 0 ? Math.round((n / total) * 100) : 0);

const sortDesc = (b: Breakdown) => Object.entries(b).sort((a, z) => z[1] - a[1]);

/** Share of a city's members who selected any of `keys`. */
const shareOf = (b: Breakdown, total: number, keys: string[]) =>
  pct(keys.reduce((sum, k) => sum + (b[k] || 0), 0), total);

function BarRow({ label, value, total }: { label: string; value: number; total: number }) {
  const percent = pct(value, total);
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-foreground">{label}</span>
        <span className="text-muted">
          {value} <span className="opacity-60">({percent}%)</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted-bg overflow-hidden">
        <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-4">
      <p className="text-xs uppercase tracking-wider text-muted mb-3">{title}</p>
      {children}
    </div>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted italic">{children}</p>;
}

/**
 * Reciprocity between the two opposite-sex flows.
 *
 * A city with 2,000 women seeking men and 40 men seeking women has demand but
 * no market. "Everyone" counts as supply on both sides.
 */
function useLiquidity(city: CityStats | null) {
  return useMemo(() => {
    if (!city) return null;
    const p = city.pairings;
    const womenSeekingMen = (p["woman seeking men"] || 0) + (p["woman seeking everyone"] || 0);
    const menSeekingWomen = (p["man seeking women"] || 0) + (p["man seeking everyone"] || 0);
    const menSeekingMen = (p["man seeking men"] || 0) + (p["man seeking everyone"] || 0);
    const womenSeekingWomen = (p["woman seeking women"] || 0) + (p["woman seeking everyone"] || 0);

    const pair = womenSeekingMen + menSeekingWomen;
    const ratio =
      pair === 0
        ? 0
        : Math.min(womenSeekingMen, menSeekingWomen) /
          Math.max(womenSeekingMen, menSeekingWomen || 1);

    return { womenSeekingMen, menSeekingWomen, menSeekingMen, womenSeekingWomen, ratio };
  }, [city]);
}

export default function WaitlistDashboard() {
  const [cities, setCities] = useState<CityStats[]>([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/waitlist/stats");
        setCities(data.cities || []);
        setTotal(data.total || 0);
        setSelected(data.cities?.[0]?.city ?? null);
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status;
        setError(
          status === 403
            ? "Admin access required."
            : "Could not load waitlist stats."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const city = cities.find((c) => c.city === selected) ?? null;
  const liquidity = useLiquidity(city);

  if (loading) return <p className="text-sm text-muted">Loading waitlist data…</p>;
  if (error) return <p className="text-sm text-danger">{error}</p>;
  if (!cities.length) {
    return (
      <p className="text-sm text-muted">
        No waitlist entries yet. Cities appear here as people join.
      </p>
    );
  }

  const establishedShare = city ? pct(city.potential_established, city.count) : 0;

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <p className="text-2xl font-bold">{total.toLocaleString()}</p>
        <p className="text-sm text-muted">
          people waiting across {cities.length} {cities.length === 1 ? "city" : "cities"}
        </p>
      </div>

      {/* City selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {cities.map((c) => (
          <button
            key={c.city}
            onClick={() => setSelected(c.city)}
            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
              selected === c.city
                ? "border-accent bg-accent/10 text-accent"
                : "border-card-border text-muted hover:border-muted"
            }`}
          >
            {c.city}{" "}
            <span className="opacity-60">{c.count.toLocaleString()}</span>
          </button>
        ))}
      </div>

      {city && (
        <div className="space-y-4">
          {/* Headline numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Waiting", value: city.count.toLocaleString() },
              {
                label: "Potential established",
                value: `${city.potential_established} (${establishedShare}%)`,
              },
              { label: "Avg age", value: city.avg_age ? String(city.avg_age) : "—" },
              {
                label: "Pairing balance",
                value: liquidity ? `${Math.round(liquidity.ratio * 100)}%` : "—",
              },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-card-border rounded-lg p-4">
                <p className="text-xs text-muted mb-1">{s.label}</p>
                <p className="text-lg font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Pairing balance is the ratio between women seeking men and men seeking
            women — the closer to 100%, the more evenly the two sides match.
            A large waitlist with a low balance means demand without a market.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Panel title="Who's seeking whom">
              {liquidity && (
                <>
                  <BarRow label="Women seeking men" value={liquidity.womenSeekingMen} total={city.count} />
                  <BarRow label="Men seeking women" value={liquidity.menSeekingWomen} total={city.count} />
                  <BarRow label="Men seeking men" value={liquidity.menSeekingMen} total={city.count} />
                  <BarRow label="Women seeking women" value={liquidity.womenSeekingWomen} total={city.count} />
                </>
              )}
              {!Object.keys(city.pairings).length && (
                <EmptyNote>No one has given gender and interest yet.</EmptyNote>
              )}
            </Panel>

            <Panel title="What they want">
              {sortDesc(city.looking_for).length ? (
                sortDesc(city.looking_for).map(([k, v]) => (
                  <BarRow key={k} label={k} value={v} total={city.count} />
                ))
              ) : (
                <EmptyNote>Not answered yet.</EmptyNote>
              )}
              <div className="mt-3 pt-3 border-t border-card-border grid grid-cols-3 gap-2 text-center">
                {[
                  ["Generous", shareOf(city.looking_for, city.count, ["Generous dating"])],
                  ["Long-term", shareOf(city.looking_for, city.count, ["Long-term"])],
                  [
                    "Travel/exp.",
                    shareOf(city.looking_for, city.count, ["Travel partner", "Experience partner"]),
                  ],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-sm font-semibold">{value}%</p>
                    <p className="text-[10px] text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Age ranges">
              {Object.keys(city.age_ranges).length ? (
                Object.entries(city.age_ranges)
                  .sort((a, z) => a[0].localeCompare(z[0]))
                  .map(([k, v]) => <BarRow key={k} label={k} value={v} total={city.count} />)
              ) : (
                <EmptyNote>No ages given yet.</EmptyNote>
              )}
            </Panel>

            <Panel title="What they bring">
              {sortDesc(city.bring_to_table).length ? (
                sortDesc(city.bring_to_table)
                  .slice(0, 6)
                  .map(([k, v]) => <BarRow key={k} label={k} value={v} total={city.count} />)
              ) : (
                <EmptyNote>Not answered yet.</EmptyNote>
              )}
            </Panel>

            <Panel title="What matters most">
              {sortDesc(city.what_matters).length ? (
                sortDesc(city.what_matters)
                  .slice(0, 6)
                  .map(([k, v]) => <BarRow key={k} label={k} value={v} total={city.count} />)
              ) : (
                <EmptyNote>Not answered yet.</EmptyNote>
              )}
            </Panel>

            <Panel title="Why they'd join">
              {sortDesc(city.worth_joining).length ? (
                sortDesc(city.worth_joining)
                  .slice(0, 6)
                  .map(([k, v]) => <BarRow key={k} label={k} value={v} total={city.count} />)
              ) : (
                <EmptyNote>Not answered yet.</EmptyNote>
              )}
            </Panel>

            <Panel title="Where they came from">
              {sortDesc(city.how_heard).length || sortDesc(city.utm_source).length ? (
                <>
                  {sortDesc(city.how_heard).map(([k, v]) => (
                    <BarRow key={k} label={k} value={v} total={city.count} />
                  ))}
                  {sortDesc(city.utm_source).map(([k, v]) => (
                    <BarRow key={`utm-${k}`} label={`utm: ${k}`} value={v} total={city.count} />
                  ))}
                </>
              ) : (
                <EmptyNote>No attribution captured yet.</EmptyNote>
              )}
            </Panel>

            <Panel title="Top referrers">
              {city.top_referrers.length ? (
                <div className="space-y-2">
                  {city.top_referrers.map((r) => (
                    <div key={r.share_code} className="flex justify-between text-xs">
                      <span>{r.first_name || "—"}</span>
                      <span className="text-muted">
                        {r.referred} referred
                        <span className="ml-2 opacity-50 font-mono">{r.share_code}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyNote>Nobody has referred anyone here yet.</EmptyNote>
              )}
            </Panel>
          </div>

          <Panel title="Growth">
            {Object.keys(city.growth).length ? (
              <div className="flex items-end gap-2 h-24">
                {Object.entries(city.growth).map(([month, n]) => {
                  const max = Math.max(...Object.values(city.growth));
                  return (
                    <div key={month} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-accent"
                        style={{ height: `${max > 0 ? (n / max) * 100 : 0}%`, minHeight: 2 }}
                        title={`${month}: ${n}`}
                      />
                      <span className="text-[10px] text-muted">{month.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyNote>Not enough history yet.</EmptyNote>
            )}
          </Panel>
        </div>
      )}
    </div>
  );
}
