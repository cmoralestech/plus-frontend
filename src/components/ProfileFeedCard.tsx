"use client";

import { useMemo, useState } from "react";
import { Heart, BadgeCheck, MapPin, Briefcase } from "lucide-react";
import type { Profile } from "@/lib/store";

/**
 * One profile, rendered as a vertical feed rather than a grid tile.
 *
 * Photos and prompt answers alternate, and each is independently likeable. A
 * like that names what prompted it ("your answer to Ideal first date") carries
 * more than one aimed at a face, which is the whole reason for the layout.
 */

type FeedItem =
  | { kind: "photo"; url: string; index: number }
  | { kind: "prompt"; label: string; value: string };

interface Props {
  profile: Profile;
  blurred?: boolean;
  /** Called with a short label describing what was liked. */
  onLike: (context: string | null) => void;
  onPass: () => void;
  onOpen?: () => void;
}

function buildItems(profile: Profile): FeedItem[] {
  const photos = (profile.photos || []).filter((p) => p.url);
  const prompts: FeedItem[] = [];

  const add = (label: string, value?: string | null) => {
    const text = value?.trim();
    if (text) prompts.push({ kind: "prompt", label, value: text });
  };

  add("What I'm looking for", profile.looking_for);
  add("What I bring", profile.offering);
  add("Ideal first date", profile.ideal_first_date);
  add("About me", profile.bio);

  // Interleave so a prompt follows each photo; whichever list is longer tails
  // on the end rather than being dropped.
  const items: FeedItem[] = [];
  const max = Math.max(photos.length, prompts.length);
  for (let i = 0; i < max; i++) {
    if (photos[i]) items.push({ kind: "photo", url: photos[i].url, index: i });
    if (prompts[i]) items.push(prompts[i]);
  }
  return items;
}

function LikeButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center bg-background/85 backdrop-blur border border-card-border hover:bg-accent hover:text-white hover:border-accent transition-colors shadow-lg"
    >
      <Heart size={18} />
    </button>
  );
}

export default function ProfileFeedCard({ profile, blurred, onLike, onPass, onOpen }: Props) {
  const items = useMemo(() => buildItems(profile), [profile]);
  const [liked, setLiked] = useState(false);

  const like = (context: string | null) => {
    if (liked) return;
    setLiked(true);
    onLike(context);
  };

  const ordinal = (i: number) =>
    i === 0 ? "first photo" : i === 1 ? "second photo" : `photo ${i + 1}`;

  return (
    <article className="rounded-2xl border border-card-border bg-card overflow-hidden mb-6">
      {/* Identity */}
      <header className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold flex items-center gap-1.5 flex-wrap">
              <button onClick={onOpen} className="hover:underline text-left">
                {profile.display_name}
                {profile.age ? `, ${profile.age}` : ""}
              </button>
              {(profile.is_photo_verified || profile.is_income_verified) && (
                <BadgeCheck size={16} className="text-accent flex-shrink-0" aria-label="Verified" />
              )}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted">
              {profile.occupation && (
                <span className="inline-flex items-center gap-1">
                  <Briefcase size={12} /> {profile.occupation}
                </span>
              )}
              {profile.city && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} /> {profile.city}
                </span>
              )}
              {typeof profile.distance_miles === "number" && (
                <span>{Math.round(profile.distance_miles)} mi away</span>
              )}
            </div>
          </div>
        </div>
        {profile.headline && (
          <p className="mt-3 text-sm leading-relaxed">{profile.headline}</p>
        )}
      </header>

      {/* Photos and prompts */}
      {items.map((item, i) =>
        item.kind === "photo" ? (
          <div key={`p-${i}`} className="relative border-t border-card-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt=""
              className="w-full object-cover"
              style={{ aspectRatio: "4/5", filter: blurred ? "blur(22px)" : undefined }}
              loading={i > 1 ? "lazy" : "eager"}
              onClick={onOpen}
            />
            {!blurred && (
              <LikeButton
                onClick={() => like(`your ${ordinal(item.index)}`)}
                label={`Like ${profile.display_name}'s ${ordinal(item.index)}`}
              />
            )}
          </div>
        ) : (
          <div key={`q-${i}`} className="relative border-t border-card-border p-5 pr-16">
            <p className="text-[11px] uppercase tracking-wider text-muted mb-1.5">
              {item.label}
            </p>
            <p className="text-base leading-relaxed">{item.value}</p>
            {!blurred && (
              <LikeButton
                onClick={() => like(`your answer to "${item.label}"`)}
                label={`Like ${profile.display_name}'s answer to ${item.label}`}
              />
            )}
          </div>
        )
      )}

      {/* Tags */}
      {(profile.interests?.length || profile.lifestyle_tags?.length) && (
        <div className="border-t border-card-border p-4 flex flex-wrap gap-2">
          {[...(profile.interests || []), ...(profile.lifestyle_tags || [])]
            .slice(0, 8)
            .map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-card-border text-xs text-muted"
              >
                {tag}
              </span>
            ))}
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-card-border p-3 flex gap-2">
        <button
          onClick={onPass}
          className="flex-1 py-2.5 rounded-xl border border-card-border text-sm font-medium text-muted hover:bg-muted-bg transition-colors min-h-[44px]"
        >
          Not for me
        </button>
        <button
          onClick={() => like(null)}
          disabled={liked}
          className="flex-1 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px] disabled:opacity-60"
        >
          {liked ? "Liked" : "Like"}
        </button>
      </div>
    </article>
  );
}
