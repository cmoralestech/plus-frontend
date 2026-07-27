"use client";

import { memo } from "react";
import { Profile } from "@/lib/store";
import { capitalize, formatIncome, formatLifestyle, formatHeight } from "@/lib/utils";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Heart,
  X,
  DollarSign,
  Sparkles,
  MessageCircle,
} from "lucide-react";

const pronounsMap: Record<string, string> = {
  he_him: "He/Him",
  she_her: "She/Her",
  they_them: "They/Them",
  he_they: "He/They",
  she_they: "She/They",
  other: "Other",
};

function formatPronouns(value?: string): string {
  if (!value || value === "prefer_not_to_say") return "";
  return pronounsMap[value] || capitalize(value);
}

interface ProfileCardProps {
  profile: Profile;
  onLike?: () => void;
  onPass?: () => void;
  onClick?: () => void;
  onMessage?: () => void;
  compact?: boolean;
  blurred?: boolean;
}

function ProfileCard({
  profile,
  onLike,
  onPass,
  onClick,
  onMessage,
  compact,
  blurred,
}: ProfileCardProps) {
  const primaryPhoto = profile.photos.find((p) => p.is_primary) || profile.photos[0];
  const isSugar = profile.user_type === "sugar";
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  if (compact) {
    return (
      <div
        onClick={onClick}
        className="bg-card rounded-xl border border-card-border overflow-hidden cursor-pointer hover:shadow-md transition-shadow relative"
      >
        <div className="aspect-[3/4] bg-muted-bg relative">
          {primaryPhoto ? (
            <div className="relative w-full h-full">
              <img
                src={`${apiBase}${primaryPhoto.url}`}
                alt={profile.display_name}
                loading="lazy"
                className={`w-full h-full object-cover ${blurred ? "blur-lg scale-105" : ""}`}
              />
              {blurred && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                  <Sparkles size={20} className="text-accent mb-1" />
                  <span className="text-[10px] text-white font-medium">Upgrade to view</span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1e1b17] to-[#141210]">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                <span className="text-2xl font-display text-accent/50">{profile.display_name[0]}</span>
              </div>
              <span className="text-[10px] text-muted/30">Photo coming soon</span>
            </div>
          )}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {profile.is_featured && profile.subscription_tier === "diamond" && (
              <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-accent text-[10px] font-semibold rounded-full">
                Featured
              </span>
            )}
            {profile.is_new && (
              <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                New
              </span>
            )}
            {profile.is_popular && !profile.is_new && (
              <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                Popular
              </span>
            )}
          </div>
          {profile.is_photo_verified && (
            <BadgeCheck
              size={18}
              className="absolute top-2 right-2 text-accent fill-accent/20"
            />
          )}
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1.5">
            {profile.is_online && (
              <span className="w-2 h-2 bg-success rounded-full flex-shrink-0" title="Online now" />
            )}
            <h3 className="font-semibold text-sm truncate">
              {profile.display_name}
            </h3>
            <span className="text-muted text-xs">{profile.age}</span>
            {profile.pronouns && profile.pronouns !== "prefer_not_to_say" && (
              <span className="text-muted/60 text-[10px]">{formatPronouns(profile.pronouns)}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted">
            {profile.city && (
              <span className="flex items-center gap-0.5">
                <MapPin size={11} />
                {profile.is_traveling ? profile.travel_city : profile.city}
              </span>
            )}
            {profile.distance_miles != null && profile.distance_miles < 500 && (
              <span>{profile.distance_miles} mi</span>
            )}
          </div>
          {profile.is_traveling && (
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-accent/10 text-accent text-[10px] rounded-full font-medium ">
              Traveling
            </span>
          )}
          {profile.occupation && (
            <span className="text-xs text-muted mt-1 block truncate">
              {profile.occupation}
            </span>
          )}
          {onMessage && (
            <button
              onClick={(e) => { e.stopPropagation(); onMessage(); }}
              className="absolute bottom-3 right-3 w-8 h-8 bg-accent/90 text-background rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-sm"
              aria-label={`Message ${profile.display_name}`}
            >
              <MessageCircle size={14} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-card-border overflow-hidden max-w-lg mx-auto shadow-sm">
      <div className="aspect-[4/5] md:aspect-[3/4] bg-muted-bg relative">
        {primaryPhoto ? (
          <div className="relative w-full h-full">
            <img
              src={`${apiBase}${primaryPhoto.url}`}
              alt={profile.display_name}
              loading="lazy"
              className={`w-full h-full object-cover ${blurred ? "blur-xl scale-105" : ""}`}
            />
            {blurred && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                <Sparkles size={28} className="text-accent mb-2" />
                <span className="text-sm text-white font-medium">Upgrade to see photos</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted-bg to-card">
            <span className="text-7xl font-bold text-accent/30">{profile.display_name[0]}</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-20">
          <div className="flex items-center gap-2">
            <h2 className="text-white text-2xl font-bold">
              {profile.display_name}
            </h2>
            <span className="text-white/80 text-xl">{profile.age}</span>
            {profile.pronouns && profile.pronouns !== "prefer_not_to_say" && (
              <span className="text-white/50 text-sm">{formatPronouns(profile.pronouns)}</span>
            )}
            {profile.is_photo_verified && (
              <BadgeCheck
                size={22}
                className="text-accent fill-accent/30"
              />
            )}
          </div>
          {profile.headline && (
            <p className="text-white/80 text-sm mt-1">{profile.headline}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.city && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-xs rounded-full">
                <MapPin size={12} />
                {profile.city}{profile.state ? `, ${profile.state}` : ""}
              </span>
            )}
            {profile.occupation && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-xs rounded-full">
                <Briefcase size={12} />
                {profile.occupation}
              </span>
            )}
            {profile.education && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-xs rounded-full">
                <GraduationCap size={12} />
                {capitalize(profile.education)}
              </span>
            )}
          </div>
        </div>
      </div>

      {profile.bio && (
        <div className="p-5">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {profile.bio}
          </p>
        </div>
      )}

      {(onLike || onPass) && (
        <div className="flex justify-center gap-6 p-5 pt-0">
          {onPass && (
            <button
              onClick={onPass}
              className="w-14 h-14 rounded-full border-2 border-card-border flex items-center justify-center text-muted hover:border-danger hover:text-danger transition-colors"
            >
              <X size={24} />
            </button>
          )}
          {onLike && (
            <button
              onClick={onLike}
              className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
            >
              <Heart size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(ProfileCard);

function User({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
