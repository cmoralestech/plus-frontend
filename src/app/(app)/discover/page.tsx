"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Profile, useAuthStore } from "@/lib/store";
import ProfileFeedCard from "@/components/ProfileFeedCard";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import ReportModal from "@/components/ReportModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { showToast } from "@/components/Toast";
import TravelMode from "@/components/TravelMode";
import { Heart, Crown, Eye, MessageCircle, Sparkles, X, ArrowRight, Search, Plane, Share2 } from "lucide-react";
import { trackFunnel } from "@/lib/track";

const FREE_VIEW_LIMIT = 5;
const LS_KEY = "plus_free_views";
const LS_DATE_KEY = "plus_free_views_date";

function getStoredFreeViews(): number {
  if (typeof window === "undefined") return 0;
  const storedDate = localStorage.getItem(LS_DATE_KEY);
  const today = new Date().toDateString();
  if (storedDate !== today) {
    localStorage.setItem(LS_KEY, "0");
    localStorage.setItem(LS_DATE_KEY, today);
    return 0;
  }
  const stored = localStorage.getItem(LS_KEY);
  return stored ? parseInt(stored, 10) || 0 : 0;
}

export default function DiscoverPage() {
  const { user } = useAuthStore();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [matchAnimation, setMatchAnimation] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [autoMessage, setAutoMessage] = useState(false);
  const [reportProfile, setReportProfile] = useState<Profile | null>(null);
  const [blockConfirmProfile, setBlockConfirmProfile] = useState<Profile | null>(null);
  const [subTier, setSubTier] = useState<string>("free");
  const [paywallProfile, setPaywallProfile] = useState<Profile | null>(null);
  const [travelCity, setTravelCity] = useState<string | null>(null);
  const [freeViews, setFreeViews] = useState<number>(getStoredFreeViews);
  const [passedIds, setPassedIds] = useState<Set<number>>(new Set());
  const [paywallDismissals, setPaywallDismissals] = useState(0);

  // Check subscription for blur logic
  useEffect(() => {
    if (user?.user_type === "sugar") {
      api.get("/api/subscription/").then(({ data }) => {
        setSubTier(data.tier || "free");
      }).catch(() => {});
    }
  }, [user]);

  const isFreeSD = user?.user_type === "sugar" && subTier === "free";
  const shouldBlur = isFreeSD;
  const freeViewsRemaining = FREE_VIEW_LIMIT - freeViews;

  const fetchProfiles = useCallback(async (cityOverride?: string | null) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page_size: "50" });
      const searchCity = cityOverride !== undefined ? cityOverride : travelCity;
      if (searchCity) params.set("city", searchCity);
      const { data } = await api.get(`/api/discover/?${params.toString()}`);
      setProfiles(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, [travelCity]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleTravelChange = (city: string | null) => {
    setTravelCity(city);
    fetchProfiles(city);
  };

  const handleLike = async (profileId: number, context: string | null = null) => {
    try {
      const { data } = await api.post("/api/matches/like", {
        profile_id: profileId,
        context,
      });
      if (data.is_match) {
        setMatchAnimation(true);
        setTimeout(() => setMatchAnimation(false), 2500);
        showToast("match", "It's a match! You can now message each other");
      } else {
        showToast("like", "Liked!");
      }
      setSelectedProfile(null);
      setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to like");
    }
  };

  const handlePass = (profileId: number) => {
    setPassedIds((prev) => new Set(prev).add(profileId));
    setSelectedProfile(null);
  };

  const handleBlock = async (profileId: number) => {
    try {
      await api.post(`/api/safety/block/${profileId}`);
      setSelectedProfile(null);
      setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to block");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold">Discover</h1>
        {!loading && profiles.length > 0 && (
          <button onClick={() => fetchProfiles()} className="text-xs text-muted hover:text-foreground transition-colors">
            Refresh
          </button>
        )}
      </div>

      {/* Free views remaining badge */}
      {isFreeSD && freeViewsRemaining > 0 && (
        <p className="text-xs text-muted mb-2">
          <Eye size={14} className="inline mr-1 align-[-2px]" />
          {freeViewsRemaining} free {freeViewsRemaining === 1 ? "view" : "views"} remaining
        </p>
      )}

      {/* Travel Mode */}
      <div className="mb-5">
        <TravelMode onCityChange={handleTravelChange} />
      </div>

      {/* Match animation */}
      {matchAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-10 text-center shadow-2xl">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold">It&apos;s a match!</h2>
            <p className="text-sm text-muted mt-2">You can now message each other</p>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => { setSelectedProfile(null); setAutoMessage(false); }}
          onLike={() => handleLike(selectedProfile.id)}
          onPass={() => handlePass(selectedProfile.id)}
          onBlock={() => { setBlockConfirmProfile(selectedProfile); setSelectedProfile(null); }}
          onReport={() => { setReportProfile(selectedProfile); setSelectedProfile(null); }}
          autoMessage={autoMessage}
        />
      )}
      {reportProfile && (
        <ReportModal
          profileId={reportProfile.id}
          profileName={reportProfile.display_name}
          onClose={() => setReportProfile(null)}
          onDone={() => { setReportProfile(null); setSelectedProfile(null); }}
        />
      )}
      {blockConfirmProfile && (
        <ConfirmDialog
          title={`Block ${blockConfirmProfile.display_name}?`}
          message="They won't be able to see your profile or message you."
          confirmLabel="Block"
          destructive
          onCancel={() => setBlockConfirmProfile(null)}
          onConfirm={() => { handleBlock(blockConfirmProfile.id); setBlockConfirmProfile(null); }}
        />
      )}

      {/* Paywall modal */}
      {paywallProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => { setPaywallDismissals((d) => d + 1); setPaywallProfile(null); }}>
          <div className="relative bg-card rounded-2xl border border-card-border shadow-2xl max-w-sm w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Blurred profile background strip */}
            {paywallProfile.photos?.[0]?.url && (
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={paywallProfile.photos[0].url}
                  alt=""
                  className="w-full h-full object-cover blur-xl scale-110 brightness-75"
                />
              </div>
            )}
            <button onClick={() => { setPaywallDismissals((d) => d + 1); setPaywallProfile(null); }} className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <X size={16} />
            </button>
            <div className="p-6 -mt-6 relative">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown size={24} className="text-accent" />
              </div>
              <h2 className="text-lg font-bold text-center">
                {paywallProfile.display_name ? `Unlock ${paywallProfile.display_name}\u2019s profile` : "Unlock full profiles"}
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li className="flex items-center gap-2.5 text-sm">
                  <Eye size={16} className="text-accent flex-shrink-0" />
                  See unblurred photos
                </li>
                <li className="flex items-center gap-2.5 text-sm">
                  <MessageCircle size={16} className="text-accent flex-shrink-0" />
                  Unlimited messaging
                </li>
                <li className="flex items-center gap-2.5 text-sm">
                  <Sparkles size={16} className="text-accent flex-shrink-0" />
                  See who liked you
                </li>
              </ul>
              <div className="mt-5 space-y-2">
                {/* Price is the same whether or not you've dismissed this before.
                    A discount that appears only after you decline is the pattern
                    we position against. */}
                <button
                  onClick={async () => {
                    trackFunnel("checkout_started", { tier: "plus_plus", source: "discover_paywall" });
                    try {
                      const { data } = await api.post("/api/billing/checkout?tier=plus_plus");
                      if (data.checkout_url) window.location.href = data.checkout_url;
                    } catch {
                      window.location.href = "/settings?tab=subscription";
                    }
                  }}
                  className="w-full py-3 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors"
                >
                  Unlock Plus+ &mdash; $99.99/mo
                </button>
                <button
                  onClick={() => { setPaywallDismissals((d) => d + 1); setPaywallProfile(null); }}
                  className="w-full py-2.5 border border-card-border rounded-lg text-sm font-medium text-muted hover:bg-muted-bg transition-colors"
                >
                  Keep browsing
                </button>
              </div>
              <p className="text-[11px] text-muted text-center mt-3">Cancel anytime</p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-danger text-sm bg-danger/5 px-3 py-2 rounded-lg mb-4">{error}</p>
      )}

      {/* Content */}
      {loading ? (
        <div className="max-w-xl mx-auto space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-card-border bg-card overflow-hidden">
              <div className="p-4 space-y-2">
                <div className="h-5 w-40 rounded bg-muted-bg animate-pulse" />
                <div className="h-3 w-56 rounded bg-muted-bg animate-pulse" />
              </div>
              <div className="w-full bg-muted-bg animate-pulse" style={{ aspectRatio: "4/5" }} />
            </div>
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-20 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-accent" />
          </div>
          <p className="text-lg font-semibold mb-1">No profiles nearby yet</p>
          <p className="text-sm text-muted mb-6">Expand your search or invite someone you know.</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-[#141210] rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors min-h-[44px]"
            >
              <Search size={16} />
              Try a different city
            </Link>
            <button
              onClick={() => handleTravelChange(null)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-card-border rounded-xl text-sm font-medium hover:bg-muted-bg transition-colors min-h-[44px]"
            >
              <Plane size={16} />
              Turn on travel mode
            </button>
            <Link
              href="/earn"
              className="inline-flex items-center justify-center gap-2 text-sm text-accent hover:underline mt-1"
            >
              <Share2 size={14} />
              Invite someone you know
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          {profiles.filter((p) => !passedIds.has(p.id)).map((profile) => (
            <ProfileFeedCard
              key={profile.id}
              profile={profile}
              blurred={shouldBlur}
              onLike={(context) => handleLike(profile.id, context)}
              onPass={() => handlePass(profile.id)}
              onOpen={() => {
                if (isFreeSD) {
                  if (freeViews < FREE_VIEW_LIMIT) {
                    const next = freeViews + 1;
                    setFreeViews(next);
                    localStorage.setItem(LS_KEY, String(next));
                    localStorage.setItem(LS_DATE_KEY, new Date().toDateString());
                    setSelectedProfile(profile);
                  } else {
                    trackFunnel("paywall_hit", { source: "discover" });
                    setPaywallProfile(profile);
                  }
                } else {
                  setSelectedProfile(profile);
                }
              }}
            />
          ))}
          {user?.user_type === "attractive" && (
            <Link
              href="/earn"
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-card-border bg-card/50 p-6 text-center text-sm text-muted hover:border-accent/30 hover:text-foreground transition-colors"
            >
              <span>Know someone generous who&apos;d appreciate you?</span>
              <span className="inline-flex items-center gap-1 text-accent text-xs font-medium">
                Share your referral link <ArrowRight size={14} />
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
