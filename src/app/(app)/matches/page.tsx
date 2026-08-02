"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Match, Profile, useAuthStore } from "@/lib/store";
import { timeAgo } from "@/lib/utils";
import { Loader2, Heart, Crown } from "lucide-react";
import { ListItemSkeleton } from "@/components/Skeleton";
import ProfileDetailModal from "@/components/ProfileDetailModal";

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewProfile, setViewProfile] = useState<Profile | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const { user } = useAuthStore();
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/matches/");
        setMatches(data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load matches");
      }
      setLoading(false);
    })();
    if (user?.user_type === "established") {
      (async () => {
        try {
          const { data } = await api.get("/api/subscription/");
          setSubscriptionTier(data.tier || "free");
        } catch {
          setSubscriptionTier("free");
        }
      })();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-3">
        <div className="h-8 bg-muted-bg rounded w-32 mb-6 animate-pulse" />
        {Array.from({ length: 4 }).map((_, i) => <ListItemSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Matches</h1>
        <p className="text-sm text-muted">
          {matches.length} {matches.length === 1 ? "match" : "matches"}
        </p>
      </div>

      {user?.user_type === "established" && subscriptionTier === "free" && matches.length > 0 && (
        <div className="flex items-center justify-between gap-3 bg-accent/5 border border-accent/20 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <Crown size={16} className="text-accent flex-shrink-0" />
            <p className="text-sm">Upgrade to Premium for unlimited messaging with your matches</p>
          </div>
          <a
            href="/settings?tab=subscription"
            className="flex-shrink-0 px-4 py-2 bg-accent text-[#141210] rounded-lg text-xs font-semibold hover:bg-accent-dark transition-colors min-h-[36px] flex items-center"
          >
            Upgrade
          </a>
        </div>
      )}

      {viewProfile && (
        <ProfileDetailModal
          profile={viewProfile}
          onClose={() => setViewProfile(null)}
          onLike={() => setViewProfile(null)}
        />
      )}

      {error && (
        <p className="text-danger text-sm bg-danger/5 px-3 py-2 rounded-lg mb-4">{error}</p>
      )}

      {matches.length === 0 && !error ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={28} className="text-accent" />
          </div>
          <p className="font-semibold text-lg mb-1">No matches yet</p>
          <p className="text-sm text-muted mb-6 max-w-xs mx-auto">
            When you and someone else both like each other, you&apos;ll see them here
          </p>
          <a href="/discover" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors min-h-[44px]">
            Start discovering
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {matches.map((match) => {
            const photo =
              match.profile.photos.find((p) => p.is_primary) ||
              match.profile.photos[0];

            return (
              <div
                key={match.id}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-card-border hover:shadow-md transition-shadow"
              >
                {/* Avatar, tap to view profile */}
                <button
                  onClick={() => setViewProfile(match.profile)}
                  className="w-14 h-14 rounded-full bg-muted-bg overflow-hidden flex-shrink-0 cursor-pointer"
                  aria-label={`View ${match.profile.display_name}'s profile`}
                >
                  {photo ? (
                    <img
                      src={`${apiBase}${photo.url}`}
                      alt={match.profile.display_name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-lg font-semibold">
                      {match.profile.display_name[0]}
                    </div>
                  )}
                </button>
                {/* Message area, tap to open chat */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => router.push(`/messages?match=${match.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">
                      {match.profile.display_name}
                    </h3>
                    <span className="text-xs text-muted">
                      {match.profile.age}
                    </span>
                  </div>
                  {match.last_message ? (
                    <p className="text-sm text-muted truncate">
                      {match.last_message}
                    </p>
                  ) : (
                    <p className="text-sm text-accent">
                      New match! Say hello
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-muted">
                    {timeAgo(match.created_at)}
                  </span>
                  {match.unread_count > 0 && (
                    <span className="w-5 h-5 bg-accent text-[#141210] text-xs rounded-full flex items-center justify-center font-medium">
                      {match.unread_count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
