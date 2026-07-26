"use client";

import { Profile } from "@/lib/store";
import { Camera, Pen, Heart, Sparkles, MapPin, CheckCircle } from "lucide-react";

interface ProfileCompletenessProps {
  profile: Profile;
  onAction?: (action: string) => void;
}

interface MissingItem {
  label: string;
  icon: React.ElementType;
  action: string;
  weight: number;
}

function getCompleteness(profile: Profile) {
  const fields: { key: string; weight: number }[] = [
    { key: "photos", weight: 30 },
    { key: "bio", weight: 25 },
    { key: "headline", weight: 20 },
    { key: "looking_for", weight: 15 },
    { key: "arrangement_types", weight: 10 },
  ];

  let filled = 0;
  let total = 0;

  for (const { key, weight } of fields) {
    total += weight;
    if (key === "photos") {
      if (profile.photos && profile.photos.length > 0) filled += weight;
    } else if (key === "arrangement_types" || key === "interests") {
      const arr = profile[key as keyof Profile] as string[] | undefined;
      if (arr && arr.length > 0) filled += weight;
    } else {
      const val = profile[key as keyof Profile];
      if (val !== null && val !== undefined && val !== "") filled += weight;
    }
  }

  return Math.round((filled / total) * 100);
}

function getMissing(profile: Profile): MissingItem[] {
  const missing: MissingItem[] = [];

  if (!profile.photos || profile.photos.length === 0) {
    missing.push({ label: "Add a profile photo", icon: Camera, action: "photos", weight: 20 });
  } else if (profile.photos.length < 3) {
    missing.push({ label: "Add more photos (3+ recommended)", icon: Camera, action: "photos", weight: 10 });
  }
  if (!profile.bio) missing.push({ label: "Write your bio", icon: Pen, action: "edit", weight: 15 });
  if (!profile.looking_for) missing.push({ label: "Describe what you're looking for", icon: Heart, action: "edit", weight: 15 });
  if (!profile.offering) missing.push({ label: "Share what you bring to the table", icon: Sparkles, action: "edit", weight: 10 });
  if (!profile.arrangement_types || profile.arrangement_types.length === 0) {
    missing.push({ label: "Select dating preferences", icon: Heart, action: "edit", weight: 10 });
  }
  if (!profile.interests || profile.interests.length === 0) {
    missing.push({ label: "Add your interests", icon: Sparkles, action: "edit", weight: 10 });
  }
  if (!profile.city) missing.push({ label: "Add your location", icon: MapPin, action: "edit", weight: 5 });

  return missing.slice(0, 3); // Show top 3 most impactful
}

export default function ProfileCompleteness({ profile, onAction }: ProfileCompletenessProps) {
  const pct = getCompleteness(profile);
  const missing = getMissing(profile);

  if (pct >= 95) return null; // Don't show when profile is essentially complete

  const color = pct >= 70 ? "text-success" : pct >= 40 ? "text-gold" : "text-danger";
  const bgColor = pct >= 70 ? "bg-success" : pct >= 40 ? "bg-gold" : "bg-danger";

  return (
    <div className="bg-card rounded-xl border border-card-border p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold">Profile strength</h3>
          <p className="text-xs text-muted mt-0.5">Complete your profile to appear higher in search results</p>
        </div>
        <span className={`text-lg font-bold ${color}`}>{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted-bg rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-500 ${bgColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Missing items */}
      {missing.length > 0 && (
        <div className="space-y-2">
          {missing.map((item) => (
            <button
              key={item.label}
              onClick={() => onAction?.(item.action)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted-bg transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <item.icon size={14} className="text-accent" />
              </div>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
