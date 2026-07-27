"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Profile } from "@/lib/store";
import ProfileCard from "@/components/ProfileCard";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import { CardSkeleton } from "@/components/Skeleton";
import { Heart, Lock, Crown } from "lucide-react";

interface LikesReceivedData {
  count: number;
  profiles: any[];
  is_premium: boolean;
}

type Tab = "received" | "sent";

export default function LikesPage() {
  const [tab, setTab] = useState<Tab>("received");
  const [receivedData, setReceivedData] = useState<LikesReceivedData | null>(null);
  const [sentProfiles, setSentProfiles] = useState<Profile[]>([]);
  const [loadingReceived, setLoadingReceived] = useState(true);
  const [loadingSent, setLoadingSent] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/engagement/likes-received");
        setReceivedData(data);
      } catch {}
      setLoadingReceived(false);
    })();
    (async () => {
      try {
        const { data } = await api.get("/api/engagement/likes-sent");
        setSentProfiles(data);
      } catch {}
      setLoadingSent(false);
    })();
  }, []);

  const handleLikeBack = async (profileId: number) => {
    try {
      await api.post("/api/matches/like", { profile_id: profileId });
      setSelectedProfile(null);
      const { data } = await api.get("/api/engagement/likes-received");
      setReceivedData(data);
    } catch {}
  };

  const loading = tab === "received" ? loadingReceived : loadingSent;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Likes</h1>
      </div>

      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onLike={() => handleLikeBack(selectedProfile.id)}
        />
      )}

      {/* Tabs */}
      <div className="flex border-b border-card-border mb-6">
        <button
          onClick={() => setTab("received")}
          className={`flex-1 py-3 text-sm font-medium text-center transition-colors relative ${
            tab === "received" ? "text-accent" : "text-muted hover:text-foreground"
          }`}
        >
          Liked you
          {receivedData && receivedData.count > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
              {receivedData.count}
            </span>
          )}
          {tab === "received" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>
        <button
          onClick={() => setTab("sent")}
          className={`flex-1 py-3 text-sm font-medium text-center transition-colors relative ${
            tab === "sent" ? "text-accent" : "text-muted hover:text-foreground"
          }`}
        >
          You liked
          {sentProfiles.length > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
              {sentProfiles.length}
            </span>
          )}
          {tab === "sent" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : tab === "received" ? (
        /* Liked You tab */
        !receivedData || receivedData.count === 0 ? (
          <EmptyState
            message="No likes yet"
            sub="When someone likes your profile, they'll appear here"
          />
        ) : !receivedData.is_premium ? (
          /* Free user: blurred previews */
          <div>
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-6 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart size={24} className="text-accent" />
              </div>
              <p className="text-2xl font-bold mb-1">
                {receivedData.count} {receivedData.count === 1 ? "person" : "people"} liked your profile
              </p>
              <p className="text-sm text-muted mb-4">See who&apos;s interested in you</p>
              <a
                href="/settings?tab=subscription"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-[#141210] rounded-xl font-semibold text-base hover:bg-accent-dark transition-colors min-h-[48px]"
              >
                <Crown size={18} />
                Upgrade to Premium
              </a>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {receivedData.profiles.map((p: any) => (
                <div key={p.id} className="aspect-square rounded-xl bg-muted-bg relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/5 to-accent/15">
                    <span className="text-3xl font-bold text-accent/30">{p.initial}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                    <p className="text-white text-xs font-medium">{p.city || "Nearby"}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <a
                href="/settings?tab=subscription"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-[#141210] rounded-xl font-semibold text-base hover:bg-accent-dark transition-colors min-h-[48px]"
              >
                <Crown size={18} />
                Unlock all likes
              </a>
            </div>
          </div>
        ) : (
          /* Premium: full profiles */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {receivedData.profiles.map((p: Profile) => (
              <ProfileCard key={p.id} profile={p} compact onClick={() => setSelectedProfile(p)} />
            ))}
          </div>
        )
      ) : (
        /* You Liked tab */
        sentProfiles.length === 0 ? (
          <EmptyState
            message="You haven't liked anyone yet"
            sub="Profiles you like will appear here"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sentProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} compact onClick={() => setSelectedProfile(profile)} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

function EmptyState({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart size={28} className="text-accent" />
      </div>
      <p className="font-semibold text-lg mb-1">{message}</p>
      <p className="text-sm text-muted max-w-xs mx-auto">{sub}</p>
    </div>
  );
}
