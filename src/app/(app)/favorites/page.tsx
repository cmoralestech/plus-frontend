"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Profile } from "@/lib/store";
import ProfileCard from "@/components/ProfileCard";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import { CardSkeleton } from "@/components/Skeleton";
import { Bookmark } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const fetchFavorites = async () => {
    try {
      const { data } = await api.get("/api/engagement/favorites");
      setFavorites(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleLike = async (profileId: number) => {
    try {
      await api.post("/api/matches/like", { profile_id: profileId });
      setSelectedProfile(null);
    } catch {}
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="h-8 bg-muted-bg rounded w-32 mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-sm text-muted">{favorites.length} saved {favorites.length === 1 ? "profile" : "profiles"}</p>
      </div>

      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onLike={() => handleLike(selectedProfile.id)}
        />
      )}

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark size={28} className="text-accent" />
          </div>
          <p className="font-semibold text-lg mb-1">No favorites yet</p>
          <p className="text-sm text-muted max-w-xs mx-auto mb-6">
            Save profiles you&apos;re interested in and come back to them later
          </p>
          <a href="/discover" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-[#141210] rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors min-h-[44px]">
            Browse profiles
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              compact
              onClick={() => setSelectedProfile(profile)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
