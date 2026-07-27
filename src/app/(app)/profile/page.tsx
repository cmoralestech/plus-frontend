"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Profile, useAuthStore } from "@/lib/store";
import {
  capitalize,
  formatIncome,
  formatNetWorth,
  formatLifestyle,
  formatHeight,
} from "@/lib/utils";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Edit3,
  Save,
  X,
  Ruler,
  DollarSign,
  Sparkles,
  Loader2,
  Camera,
  Settings,
} from "lucide-react";
import CityAutocomplete from "@/components/CityAutocomplete";
import PhotoUpload from "@/components/PhotoUpload";
import ProfileCompleteness from "@/components/ProfileCompleteness";
import { ProfileSkeleton } from "@/components/Skeleton";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPhotoManager, setShowPhotoManager] = useState(false);
  const [error, setError] = useState("");
  const [editForm, setEditForm] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/api/profiles/me");
      setProfile(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load profile");
    }
    setLoading(false);
  };

  const startEditing = () => {
    if (!profile) return;
    setEditForm({
      display_name: profile.display_name,
      headline: profile.headline || "",
      bio: profile.bio || "",
      city: profile.city || "",
      state: profile.state || "",
      country: profile.country || "",
      occupation: profile.occupation || "",
      education: profile.education || "",
      height_cm: profile.height_cm || "",
      body_type: profile.body_type || "",
      ethnicity: profile.ethnicity || "",
      drinking: profile.drinking || "",
      smoking: profile.smoking || "",
      income_range: profile.income_range || "",
      net_worth_range: profile.net_worth_range || "",
      lifestyle_expectation: profile.lifestyle_expectation || "",
      looking_for: profile.looking_for || "",
      offering: profile.offering || "",
      ideal_first_date: profile.ideal_first_date || "",
      arrangement_types: profile.arrangement_types || [],
      interests: profile.interests || [],
      lifestyle_tags: profile.lifestyle_tags || [],
      relationship_status: profile.relationship_status || "",
      availability: profile.availability || "",
      languages: profile.languages || "",
    });
    setEditing(true);
  };

  const toggleEditArray = (field: "arrangement_types" | "interests" | "lifestyle_tags", value: string) => {
    setEditForm((prev: Record<string, any>) => {
      const arr: string[] = prev[field] || [];
      const max = field === "arrangement_types" ? 5 : field === "lifestyle_tags" ? 8 : 10;
      if (arr.includes(value)) return { ...prev, [field]: arr.filter((v: string) => v !== value) };
      if (arr.length >= max) return prev;
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const payload: Record<string, any> = {};
      for (const [key, value] of Object.entries(editForm)) {
        if (key === "height_cm") {
          payload[key] = value ? parseInt(value as string) : null;
        } else if (key === "arrangement_types" || key === "interests" || key === "lifestyle_tags") {
          payload[key] = (value as string[]).length > 0 ? value : null;
        } else {
          payload[key] = value || null;
        }
      }
      const { data } = await api.patch("/api/profiles/me", payload);
      setProfile(data);
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to save");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <div className="h-8 bg-muted-bg rounded w-40 mb-6 animate-pulse" />
        <ProfileSkeleton />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">No profile found</p>
        {error && <p className="text-danger text-sm mt-2">{error}</p>}
      </div>
    );
  }

  const isSugar = profile.user_type === "sugar";
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const photo = profile.photos.find((p) => p.is_primary) || profile.photos[0];

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Profile</h1>
        {!editing ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShowPhotoManager(!showPhotoManager)}
              className="p-2.5 bg-card border border-card-border rounded-lg text-muted hover:text-foreground transition-colors"
              aria-label="Manage photos"
            >
              <Camera size={18} />
            </button>
            <button
              onClick={startEditing}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-accent text-background rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              <Edit3 size={14} />
              Edit
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => { setEditing(false); setError(""); }}
              className="flex items-center gap-1 px-4 py-2 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 px-4 py-2 bg-accent text-[#F5EDE4] rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-danger text-sm bg-danger/5 px-3 py-2 rounded-lg mb-4">
          {error}
        </p>
      )}

      {/* Photo manager */}
      {showPhotoManager && (
        <div className="bg-card rounded-2xl border border-card-border p-6 mb-6">
          <h2 className="font-semibold mb-4">Manage photos</h2>
          <PhotoUpload photos={profile.photos} onUpdate={fetchProfile} />
        </div>
      )}

      <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
        {/* Photo hero, large, prominent */}
        <div className="relative aspect-[3/4] md:aspect-square bg-muted-bg">
          {photo ? (
            <img
              src={`${apiBase}${photo.url}`}
              alt={profile.display_name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 via-muted-bg to-card gap-4">
              <span className="text-6xl font-display text-accent/30">{profile.display_name[0]}</span>
              <button
                onClick={() => setShowPhotoManager(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-card border border-card-border rounded-lg text-sm text-muted hover:text-foreground transition-colors"
              >
                <Camera size={16} />
                Add your first photo
              </button>
            </div>
          )}
          {photo && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-white text-2xl font-bold">{profile.display_name}</h2>
                  <span className="text-white/70 text-xl">{profile.age}</span>
                  {profile.is_photo_verified && (
                    <BadgeCheck size={20} className="text-accent fill-accent/30" />
                  )}
                </div>
                {profile.headline && (
                  <p className="text-white/60 text-sm">{profile.headline}</p>
                )}
              </div>
              <button
                onClick={() => setShowPhotoManager(true)}
                className="absolute top-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1"
              >
                <Camera size={12} /> {profile.photos.length} {profile.photos.length === 1 ? "photo" : "photos"}
              </button>
            </>
          )}
        </div>

        <div className="px-5 py-5">
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Display name</label>
                <input
                  value={editForm.display_name}
                  onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, display_name: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Headline</label>
                <input
                  value={editForm.headline}
                  onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, headline: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">About me</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  maxLength={2000}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <CityAutocomplete
                  value={editForm.city}
                  onChange={(city, state, country) =>
                    setEditForm((f: Record<string, any>) => ({ ...f, city, state, country }))
                  }
                  placeholder="Search for a city..."
                />
                {(editForm.state || editForm.country) && (
                  <p className="text-xs text-muted mt-1">
                    {[editForm.state, editForm.country].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Occupation</label>
                  <input
                    value={editForm.occupation}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, occupation: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Education</label>
                  <select
                    value={editForm.education}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, education: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Select...</option>
                    <option value="high_school">High school</option>
                    <option value="some_college">Some college</option>
                    <option value="bachelors">Bachelor&apos;s</option>
                    <option value="masters">Master&apos;s</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={editForm.height_cm}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, height_cm: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    min={120}
                    max={250}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drinking</label>
                  <select
                    value={editForm.drinking}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, drinking: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Select...</option>
                    <option value="never">Never</option>
                    <option value="socially">Socially</option>
                    <option value="regularly">Regularly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Smoking</label>
                  <select
                    value={editForm.smoking}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, smoking: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Select...</option>
                    <option value="never">Never</option>
                    <option value="occasionally">Occasionally</option>
                    <option value="regularly">Regularly</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Body type</label>
                <select
                  value={editForm.body_type}
                  onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, body_type: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="">Select...</option>
                  <option value="slim">Slim</option>
                  <option value="athletic">Athletic</option>
                  <option value="average">Average</option>
                  <option value="curvy">Curvy</option>
                  <option value="full_figured">Full figured</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Ethnicity</label>
                  <select
                    value={editForm.ethnicity}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, ethnicity: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Select...</option>
                    {["White / Caucasian","Black / African American","Hispanic / Latino","Asian","Middle Eastern","South Asian","Mixed / Multiracial","Native American","Pacific Islander","Other","Prefer not to say"].map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Children</label>
                  <select
                    value={editForm.has_children === true ? "yes" : editForm.has_children === false ? "no" : ""}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, has_children: e.target.value === "yes" ? true : e.target.value === "no" ? false : null }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Select...</option>
                    <option value="no">No children</option>
                    <option value="yes">Has children</option>
                  </select>
                </div>
              </div>
              {isSugar ? (
                <div>
                  <label className="block text-sm font-medium mb-1">Annual income</label>
                  <select
                    value={editForm.income_range}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, income_range: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Select...</option>
                    <option value="under_100k">Under $100K</option>
                    <option value="100k_250k">$100K - $250K</option>
                    <option value="250k_500k">$250K - $500K</option>
                    <option value="500k_1m">$500K - $1M</option>
                    <option value="1m_5m">$1M - $5M</option>
                    <option value="5m_10m">$5M - $10M</option>
                    <option value="over_10m">$10M+</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-1">Lifestyle expectation</label>
                  <select
                    value={editForm.lifestyle_expectation}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, lifestyle_expectation: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Select...</option>
                    <option value="negotiable">Negotiable</option>
                    <option value="minimal">Minimal</option>
                    <option value="practical">Practical</option>
                    <option value="moderate">Moderate</option>
                    <option value="substantial">Substantial</option>
                    <option value="high">High</option>
                  </select>
                </div>
              )}

              {/* Sugar dating fields */}
              <div className="pt-4 border-t border-card-border space-y-4">
                <div>
                  <label htmlFor="edit-looking" className="block text-sm font-medium mb-1">
                    {isSugar ? "What I'm looking for" : "What I'm looking for"}
                  </label>
                  <textarea id="edit-looking" value={editForm.looking_for}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, looking_for: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                    rows={3} maxLength={1000} placeholder="What kind of connection are you seeking?" />
                </div>
                <div>
                  <label htmlFor="edit-offering" className="block text-sm font-medium mb-1">
                    {isSugar ? "What I offer" : "What I bring"}
                  </label>
                  <textarea id="edit-offering" value={editForm.offering}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, offering: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                    rows={3} maxLength={1000} placeholder="What do you bring to the table?" />
                </div>
                <div>
                  <label htmlFor="edit-firstdate" className="block text-sm font-medium mb-1">Ideal first date</label>
                  <textarea id="edit-firstdate" value={editForm.ideal_first_date}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, ideal_first_date: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                    rows={2} maxLength={500} placeholder="Describe your perfect first date" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Arrangement type</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["mentorship","travel_companion","long_term","short_term","no_strings","dating","networking","experience_partner","sugar_relationship"].map((t) => {
                      const selected = (editForm.arrangement_types || []).includes(t);
                      const arrangementLabels: Record<string, string> = { no_strings: "Casual dating" };
                      return (
                        <button key={t} type="button" onClick={() => toggleEditArray("arrangement_types", t)} aria-pressed={selected}
                          className={`px-2.5 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                            selected ? "border-accent bg-accent/10 text-accent" : "border-card-border hover:border-muted"
                          }`}>
                          {arrangementLabels[t] || t.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["travel","fine_dining","fitness","art","fashion","nightlife","music","cooking","wine","yachting","golf","theater","photography","reading","hiking","yoga","dancing","spa","investing","sports"].map((i) => {
                      const selected = (editForm.interests || []).includes(i);
                      return (
                        <button key={i} type="button" onClick={() => toggleEditArray("interests", i)} aria-pressed={selected}
                          className={`px-2.5 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                            selected ? "border-accent bg-accent/10 text-accent" : "border-card-border hover:border-muted"
                          }`}>
                          {i.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Lifestyle</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["monogamous","enm","open_relationship","polyamorous","kink_friendly","vanilla","curious","dom","sub","switch","couples_friendly","group_friendly","voyeur","exhibitionist","discrete","420_friendly"].map((t) => {
                      const selected = (editForm.lifestyle_tags || []).includes(t);
                      const labels: Record<string, string> = {
                        enm: "ENM", dom: "Dom", sub: "Sub", "420_friendly": "420 Friendly",
                        open_relationship: "Open Relationship", kink_friendly: "Kink Friendly",
                        couples_friendly: "Couples Friendly", group_friendly: "Group Friendly",
                      };
                      return (
                        <button key={t} type="button" onClick={() => toggleEditArray("lifestyle_tags", t)} aria-pressed={selected}
                          className={`px-2.5 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                            selected ? "border-pink-400 bg-pink-400/10 text-pink-400" : "border-card-border hover:border-muted"
                          }`}>
                          {labels[t] || t.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="edit-availability" className="block text-sm font-medium mb-1">Availability</label>
                    <select id="edit-availability" value={editForm.availability}
                      onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, availability: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
                      <option value="">Select...</option>
                      <option value="flexible">Flexible</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings</option>
                      <option value="travel_ready">Travel-ready</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="edit-status" className="block text-sm font-medium mb-1">Relationship status</label>
                    <select id="edit-status" value={editForm.relationship_status}
                      onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, relationship_status: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
                      <option value="">Prefer not to say</option>
                      <option value="single">Single</option>
                      <option value="divorced">Divorced</option>
                      <option value="separated">Separated</option>
                      <option value="widowed">Widowed</option>
                      <option value="married">Married</option>
                      <option value="open_relationship">Open relationship</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-languages" className="block text-sm font-medium mb-1">Languages</label>
                  <input id="edit-languages" value={editForm.languages}
                    onChange={(e) => setEditForm((f: Record<string, any>) => ({ ...f, languages: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="English, Spanish..." />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Name, only show here if no photo (otherwise it's overlaid on the photo) */}
              {!photo && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">{profile.display_name}</h2>
                    <span className="text-muted">{profile.age}</span>
                    {profile.is_photo_verified && (
                      <BadgeCheck size={20} className="text-accent fill-accent/20" />
                    )}
                  </div>
                  {profile.headline && (
                    <p className="text-sm text-muted mb-4">{profile.headline}</p>
                  )}
                </>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {profile.city && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted-bg text-sm rounded-lg">
                    <MapPin size={14} className="text-muted" />
                    {profile.city}{profile.state ? `, ${profile.state}` : ""}
                  </span>
                )}
                {profile.occupation && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted-bg text-sm rounded-lg">
                    <Briefcase size={14} className="text-muted" />
                    {profile.occupation}
                  </span>
                )}
                {profile.education && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted-bg text-sm rounded-lg">
                    <GraduationCap size={14} className="text-muted" />
                    {capitalize(profile.education)}
                  </span>
                )}
                {profile.height_cm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted-bg text-sm rounded-lg">
                    <Ruler size={14} className="text-muted" />
                    {formatHeight(profile.height_cm)}
                  </span>
                )}
              </div>

              {isSugar && profile.income_range && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold-bg text-gold text-sm rounded-lg font-medium">
                    <DollarSign size={14} />
                    Income: {formatIncome(profile.income_range)}
                  </span>
                </div>
              )}

              {!isSugar && profile.lifestyle_expectation && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-lg font-medium">
                    <Sparkles size={14} />
                    Lifestyle: {formatLifestyle(profile.lifestyle_expectation)}
                  </span>
                </div>
              )}

              {/* === PRIMARY: What you want === */}
              {(profile.arrangement_types?.length || profile.looking_for) && (
                <div className="mt-5 pt-5 border-t border-card-border">
                  {profile.arrangement_types && profile.arrangement_types.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {profile.arrangement_types.map((t: string) => {
                        const arrangementLabels: Record<string, string> = { no_strings: "Casual dating" };
                        return (
                          <span key={t} className="px-2.5 py-1 bg-accent/5 text-accent text-xs rounded-full font-medium border border-accent/20">
                            {arrangementLabels[t] || capitalize(t)}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {profile.looking_for && (
                    <p className="text-sm text-foreground/80 leading-relaxed">{profile.looking_for}</p>
                  )}
                </div>
              )}

              {/* === SECONDARY: Bio + Offering === */}
              {(profile.bio || profile.offering) && (
                <div className="mt-5 pt-5 border-t border-card-border space-y-4">
                  {profile.bio && (
                    <div>
                      <h3 className="text-xs text-muted uppercase tracking-wider mb-1.5">About</h3>
                      <p className="text-sm text-foreground/80 leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                  {profile.offering && (
                    <div>
                      <h3 className="text-xs text-muted uppercase tracking-wider mb-1.5">{isSugar ? "What I offer" : "What I bring"}</h3>
                      <p className="text-sm text-foreground/80 leading-relaxed">{profile.offering}</p>
                    </div>
                  )}
                </div>
              )}

              {/* === INTERESTS + LIFESTYLE TAGS === */}
              {((profile.interests && profile.interests.length > 0) || (profile.lifestyle_tags && profile.lifestyle_tags.length > 0)) && (
                <div className="mt-5 pt-5 border-t border-card-border space-y-3">
                  {profile.interests && profile.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {profile.interests.map((i: string) => (
                        <span key={i} className="px-2.5 py-1 bg-muted-bg text-xs rounded-full">
                          {capitalize(i)}
                        </span>
                      ))}
                    </div>
                  )}
                  {profile.lifestyle_tags && profile.lifestyle_tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {profile.lifestyle_tags.map((t: string) => {
                        const labels: Record<string, string> = {
                          enm: "ENM", dom: "Dom", sub: "Sub", "420_friendly": "420 Friendly",
                          open_relationship: "Open Relationship", kink_friendly: "Kink Friendly",
                          couples_friendly: "Couples Friendly", group_friendly: "Group Friendly",
                        };
                        return (
                          <span key={t} className="px-2.5 py-1 bg-pink-500/10 text-pink-400 text-xs rounded-full">
                            {labels[t] || t.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* === IDEAL FIRST DATE === */}
              {profile.ideal_first_date && (
                <div className="mt-5 pt-5 border-t border-card-border">
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-1.5">Ideal first date</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed italic">&ldquo;{profile.ideal_first_date}&rdquo;</p>
                </div>
              )}

              {/* === DETAILS GRID === */}
              {(profile.body_type || profile.ethnicity || profile.relationship_status || profile.availability || profile.drinking || profile.smoking || profile.languages) && (
                <div className="mt-5 pt-5 border-t border-card-border">
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-3">Details</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {profile.body_type && (
                      <div><span className="text-muted text-xs">Body</span><p>{capitalize(profile.body_type)}</p></div>
                    )}
                    {profile.relationship_status && (
                      <div><span className="text-muted text-xs">Status</span><p>{capitalize(profile.relationship_status)}</p></div>
                    )}
                    {profile.drinking && (
                      <div><span className="text-muted text-xs">Drinking</span><p>{capitalize(profile.drinking)}</p></div>
                    )}
                    {profile.smoking && (
                      <div><span className="text-muted text-xs">Smoking</span><p>{capitalize(profile.smoking)}</p></div>
                    )}
                    {profile.ethnicity && (
                      <div><span className="text-muted text-xs">Ethnicity</span><p>{profile.ethnicity}</p></div>
                    )}
                    {profile.languages && (
                      <div><span className="text-muted text-xs">Languages</span><p>{profile.languages}</p></div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Completeness indicator, below the profile card, compact */}
      {!editing && (
        <div className="max-w-lg mx-auto mt-4">
          <ProfileCompleteness
            profile={profile}
            onAction={(action) => {
              if (action === "photos") setShowPhotoManager(true);
              else if (action === "edit") startEditing();
            }}
          />
        </div>
      )}

      {/* Verification section */}
      {!editing && (!profile.is_photo_verified || (user?.user_type === "sugar" && !profile.is_income_verified)) && (
        <VerificationSection
          isPhotoVerified={!!profile.is_photo_verified}
          isIncomeVerified={!!profile.is_income_verified}
          isSugar={user?.user_type === "sugar" || false}
        />
      )}
    </div>
  );
}

function VerificationSection({
  isPhotoVerified,
  isIncomeVerified,
  isSugar,
}: {
  isPhotoVerified: boolean;
  isIncomeVerified: boolean;
  isSugar?: boolean;
}) {
  const [pendingPhoto, setPendingPhoto] = useState(false);
  const [pendingIncome, setPendingIncome] = useState(false);
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/profiles/verify/status");
        setPendingPhoto(data.pending_photo);
        setPendingIncome(data.pending_income);
      } catch {}
    })();
  }, []);

  const submit = async (type: "photo" | "income") => {
    setSubmitting(type);
    try {
      await api.post(`/api/profiles/verify/${type}`);
      if (type === "photo") setPendingPhoto(true);
      else setPendingIncome(true);
    } catch {}
    setSubmitting(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-4 bg-card border border-card-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <BadgeCheck size={18} className="text-accent" />
        <h3 className="text-sm font-semibold">Get Verified</h3>
      </div>
      <p className="text-xs text-muted mb-4">
        Verified profiles get significantly more matches. Verification badges show others you&apos;re real.
      </p>

      <div className="space-y-3">
        {!isPhotoVerified && (
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Photo verification</p>
              <p className="text-xs text-muted">Confirm you match your profile photos</p>
            </div>
            {pendingPhoto ? (
              <span className="text-xs px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-full">Pending review</span>
            ) : (
              <button
                onClick={() => submit("photo")}
                disabled={submitting === "photo"}
                className="text-xs px-4 py-2 bg-accent text-background rounded-lg font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
              >
                {submitting === "photo" ? "Submitting..." : "Request verification"}
              </button>
            )}
          </div>
        )}

        {isSugar && !isIncomeVerified && (
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Income verification</p>
              <p className="text-xs text-muted">Verify your income to build trust</p>
            </div>
            {pendingIncome ? (
              <span className="text-xs px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-full">Pending review</span>
            ) : (
              <button
                onClick={() => submit("income")}
                disabled={submitting === "income"}
                className="text-xs px-4 py-2 bg-accent text-background rounded-lg font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
              >
                {submitting === "income" ? "Submitting..." : "Request verification"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
