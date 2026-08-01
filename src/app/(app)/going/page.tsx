"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { Profile } from "@/lib/store";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import { showToast } from "@/components/Toast";
import { MapPin, Users, X } from "lucide-react";

interface Destination {
  id: number;
  slug: string;
  name: string;
  location: string | null;
  blurb: string | null;
  starts_on: string | null;
  ends_on: string | null;
  going_count: number;
  want_count: number;
  my_level: "going" | "want_to_go" | null;
}

type MemberProfile = Profile & { interest_level?: "going" | "want_to_go" };

export default function GoingPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [selected, setSelected] = useState<Profile | null>(null);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/api/destinations/");
      setDestinations(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Couldn't load destinations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setLevel = async (dest: Destination, level: "going" | "want_to_go") => {
    // Tapping the level you already have clears it, so a mark is never a trap.
    const clearing = dest.my_level === level;
    setDestinations((prev) =>
      prev.map((d) =>
        d.slug === dest.slug
          ? {
              ...d,
              my_level: clearing ? null : level,
              going_count:
                d.going_count +
                (level === "going" && !clearing ? 1 : 0) -
                (d.my_level === "going" ? 1 : 0),
              want_count:
                d.want_count +
                (level === "want_to_go" && !clearing ? 1 : 0) -
                (d.my_level === "want_to_go" ? 1 : 0),
            }
          : d,
      ),
    );
    try {
      if (clearing) {
        await api.delete(`/api/destinations/${dest.slug}`);
      } else {
        await api.put(`/api/destinations/${dest.slug}`, { level });
      }
    } catch {
      showToast("like", "Couldn't save that — try again");
      load();
    }
  };

  const openMembers = async (slug: string) => {
    setOpenSlug(slug);
    setMembersLoading(true);
    setMembers([]);
    try {
      const { data } = await api.get(`/api/destinations/${slug}/members`);
      setMembers(data.members || []);
    } catch {
      setMembers([]);
    } finally {
      setMembersLoading(false);
    }
  };

  const dateLabel = (d: Destination) => {
    if (!d.starts_on) return d.location;
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    const start = new Date(d.starts_on).toLocaleDateString(undefined, opts);
    if (!d.ends_on) return `${d.location} · ${start}`;
    const end = new Date(d.ends_on).toLocaleDateString(undefined, opts);
    return `${d.location} · ${start}–${end}`;
  };

  const openDest = destinations.find((d) => d.slug === openSlug);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold">
        Going somewhere?<span className="text-accent"> +</span>
      </h1>
      <p className="text-sm text-muted mt-1 mb-6 leading-relaxed">
        Add where you&apos;re headed — or where you&apos;d like to go — and find a
        + who wants to be there too.
      </p>

      {error && <p className="text-danger text-sm mb-4">{error}</p>}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-muted-bg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {destinations.map((d) => (
            <div key={d.slug} className="rounded-2xl border border-card-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-semibold">{d.name}</h2>
                  {dateLabel(d) && (
                    <p className="text-xs text-muted mt-0.5 inline-flex items-center gap-1">
                      <MapPin size={12} /> {dateLabel(d)}
                    </p>
                  )}
                  {d.blurb && <p className="text-sm text-muted mt-2">{d.blurb}</p>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <button
                  onClick={() => setLevel(d, "going")}
                  aria-pressed={d.my_level === "going"}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                    d.my_level === "going"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-card-border hover:border-muted"
                  }`}
                >
                  I&apos;m going
                </button>
                <button
                  onClick={() => setLevel(d, "want_to_go")}
                  aria-pressed={d.my_level === "want_to_go"}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                    d.my_level === "want_to_go"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-card-border hover:border-muted"
                  }`}
                >
                  I want to go
                </button>

                <button
                  onClick={() => openMembers(d.slug)}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
                >
                  <Users size={13} />
                  {d.going_count + d.want_count === 0
                    ? "Nobody yet"
                    : `${d.going_count} going · ${d.want_count} interested`}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Who else */}
      {openDest && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setOpenSlug(null)}
        >
          <div
            className="bg-card border border-card-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-card-border px-4 py-3 flex items-center justify-between">
              <p className="font-semibold text-sm">{openDest.name}</p>
              <button
                onClick={() => setOpenSlug(null)}
                aria-label="Close"
                className="p-1.5 text-muted hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {membersLoading ? (
              <p className="p-6 text-sm text-muted text-center">Loading…</p>
            ) : members.length === 0 ? (
              <p className="p-6 text-sm text-muted text-center leading-relaxed">
                Nobody here yet. Mark it and you&apos;ll be the first — people who
                add it later will see you.
              </p>
            ) : (
              <div className="p-3 space-y-2">
                {members.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-muted-bg transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted-bg overflow-hidden flex-shrink-0">
                      {m.photos?.[0]?.url && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={m.photos[0].url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {m.display_name}
                        {m.age ? `, ${m.age}` : ""}
                        {m.is_seed && (
                          <span className="ml-2 text-[10px] uppercase tracking-wider text-muted">
                            Example
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted truncate">
                        {m.interest_level === "going" ? "Going" : "Wants to go"}
                        {m.city ? ` · ${m.city}` : ""}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selected && (
        <ProfileDetailModal
          profile={selected}
          onClose={() => setSelected(null)}
          onLike={() => setSelected(null)}
        />
      )}
    </div>
  );
}
