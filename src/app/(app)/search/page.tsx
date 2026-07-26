"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/lib/api";
import { trackFunnel } from "@/lib/track";
import { Profile, useAuthStore } from "@/lib/store";
import ProfileCard from "@/components/ProfileCard";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import { CardSkeleton } from "@/components/Skeleton";
import { MapPin, SlidersHorizontal, X, ChevronDown, Loader2, Crown, Eye, MessageCircle, Sparkles } from "lucide-react";

const FREE_VIEW_LIMIT = 5;
const LS_KEY = "arranged_free_views";
const LS_DATE_KEY = "arranged_free_views_date";

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

const STORAGE_KEY = "arranged_search_prefs";

const popularCities = [
  "New York", "Los Angeles", "Miami", "Las Vegas", "Chicago",
  "Houston", "Dallas", "Atlanta", "San Francisco", "Seattle",
  "San Diego", "Phoenix", "Denver", "Boston", "Nashville",
  "Austin", "Orlando", "Charlotte", "Washington DC", "Philadelphia",
  "London", "Dubai", "Toronto", "Paris", "Tokyo",
  "Sydney", "Mumbai", "Singapore", "São Paulo", "Mexico City",
];

const distanceOptionsMi = [
  { value: "10", label: "10 mi" },
  { value: "25", label: "25 mi" },
  { value: "50", label: "50 mi" },
  { value: "100", label: "100 mi" },
  { value: "250", label: "250 mi" },
  { value: "", label: "Any distance" },
];

const distanceOptionsKm = [
  { value: "15", label: "15 km" },
  { value: "40", label: "40 km" },
  { value: "80", label: "80 km" },
  { value: "160", label: "160 km" },
  { value: "400", label: "400 km" },
  { value: "", label: "Any distance" },
];

interface SearchPrefs {
  distance: string;
  distance_unit: "mi" | "km";
  min_age: string;
  max_age: string;
  gender: string;
  user_type: string;
  income_range: string;
  body_type: string;
}

const defaultPrefs: SearchPrefs = {
  distance: "50",
  distance_unit: "mi",
  min_age: "",
  max_age: "",
  gender: "",
  user_type: "",
  income_range: "",
  body_type: "",
};

function loadPrefs(): SearchPrefs {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultPrefs, ...JSON.parse(saved) };
  } catch {}
  return { ...defaultPrefs };
}

function savePrefs(prefs: SearchPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

export default function SearchPage() {
  const { user } = useAuthStore();
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [paywallProfile, setPaywallProfile] = useState<Profile | null>(null);
  const [paywallDismissals, setPaywallDismissals] = useState(0);
  const [subTier, setSubTier] = useState<string>("free");

  useEffect(() => {
    if (user?.user_type === "sugar") {
      api.get("/api/subscription/").then(({ data }) => setSubTier(data.tier || "free")).catch(() => {});
    }
  }, [user]);

  const isFreeSD = user?.user_type === "sugar" && subTier === "free";
  const shouldBlur = isFreeSD;
  const [freeViews, setFreeViews] = useState<number>(getStoredFreeViews);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [myCity, setMyCity] = useState("");
  const [activeCity, setActiveCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [prefs, setPrefs] = useState<SearchPrefs>(defaultPrefs);
  const locationRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Load user's profile city and saved prefs
  useEffect(() => {
    const savedPrefs = loadPrefs();
    setPrefs(savedPrefs);

    (async () => {
      try {
        const { data } = await api.get("/api/profiles/me");
        const city = data.city || "";
        setMyCity(city);
        setActiveCity(city);
      } catch {
        setActiveCity("New York");
      }
      initialized.current = true;
    })();
  }, []);

  // Search whenever activeCity or prefs change
  const doSearch = useCallback(async (city: string, searchPrefs: SearchPrefs) => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("city", city.trim());
      if (searchPrefs.distance) {
        const distVal = searchPrefs.distance_unit === "km"
          ? String(Math.round(parseFloat(searchPrefs.distance) * 0.621371))
          : searchPrefs.distance;
        params.set("max_distance", distVal);
      }
      if (searchPrefs.min_age) params.set("min_age", searchPrefs.min_age);
      if (searchPrefs.max_age) params.set("max_age", searchPrefs.max_age);
      if (searchPrefs.gender) params.set("gender", searchPrefs.gender);
      if (searchPrefs.user_type) params.set("user_type", searchPrefs.user_type);
      if (searchPrefs.income_range) params.set("income_range", searchPrefs.income_range);
      if (searchPrefs.body_type) params.set("body_type", searchPrefs.body_type);
      params.set("page_size", "50");
      const { data } = await api.get(`/api/discover/?${params.toString()}`);
      setResults(data);
    } catch {}
    setLoading(false);
  }, []);

  // Trigger search when city is set
  useEffect(() => {
    if (initialized.current && activeCity) {
      doSearch(activeCity, prefs);
    }
  }, [activeCity]); // eslint-disable-line react-hooks/exhaustive-deps

  const updatePrefs = (updates: Partial<SearchPrefs>) => {
    setPrefs(prev => {
      const next = { ...prev, ...updates };
      savePrefs(next);
      return next;
    });
  };

  const applyFilters = () => {
    savePrefs(prefs);
    setShowFilters(false);
    doSearch(activeCity, prefs);
  };

  const switchCity = (city: string) => {
    setActiveCity(city);
    setShowLocationPicker(false);
    setCustomCity("");
    trackFunnel("search_location", { city });
  };

  const handleLike = async (profileId: number) => {
    try {
      await api.post("/api/matches/like", { profile_id: profileId });
      setSelectedProfile(null);
      setResults(prev => prev.filter(p => p.id !== profileId));
    } catch {}
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocationPicker(false);
      }
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeFilterCount = [prefs.min_age, prefs.max_age, prefs.gender, prefs.income_range, prefs.body_type].filter(Boolean).length;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onLike={() => handleLike(selectedProfile.id)}
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
                {paywallDismissals > 0 && (
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wide bg-accent/15 text-accent px-2 py-0.5 rounded-full">Limited offer</span>
                  </div>
                )}
                <button
                  onClick={async () => {
                    const couponParam = paywallDismissals > 0 ? "&coupon=5LpkJfaj" : "";
                    trackFunnel("checkout_started", { tier: "diamond", source: "search_paywall", discounted: paywallDismissals > 0 });
                    try {
                      const { data } = await api.post(`/api/billing/checkout?tier=diamond${couponParam}`);
                      if (data.checkout_url) window.location.href = data.checkout_url;
                    } catch {
                      window.location.href = "/settings?tab=subscription";
                    }
                  }}
                  className="w-full py-3 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors"
                >
                  {paywallDismissals > 0 ? (
                    <>First month 25% off &mdash; $74.99 <span className="line-through opacity-60 ml-1">$99.99</span></>
                  ) : (
                    <>Unlock &mdash; $99.99/mo</>
                  )}
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

      <h1 className="sr-only">Search Members by Location</h1>

      {/* Top bar: location pill + filters */}
      <div className="flex items-center gap-2 mb-5">
        {/* Location pill */}
        <div className="relative" ref={locationRef}>
          <button
            onClick={() => { setShowLocationPicker(!showLocationPicker); setShowFilters(false); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-card border border-card-border rounded-full text-sm font-medium hover:border-accent transition-colors"
          >
            <MapPin size={15} className="text-accent" />
            <span>{activeCity || "Set location"}</span>
            <ChevronDown size={14} className={`text-muted transition-transform ${showLocationPicker ? "rotate-180" : ""}`} />
          </button>

          {showLocationPicker && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-card-border rounded-xl shadow-lg z-50 overflow-hidden">
              {/* Custom city input */}
              <div className="p-3 border-b border-card-border">
                <div className="flex gap-2">
                  <input
                    value={customCity}
                    onChange={e => setCustomCity(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && customCity.trim()) switchCity(customCity.trim()); }}
                    placeholder="Type a city..."
                    className="flex-1 px-3 py-2 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    autoFocus
                  />
                  {customCity.trim() && (
                    <button
                      onClick={() => switchCity(customCity.trim())}
                      className="px-3 py-2 bg-accent text-[#141210] rounded-lg text-sm font-medium"
                    >
                      Go
                    </button>
                  )}
                </div>
              </div>

              {/* My city */}
              {myCity && (
                <button
                  onClick={() => switchCity(myCity)}
                  className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 hover:bg-muted-bg transition-colors ${
                    activeCity === myCity ? "text-accent font-medium" : ""
                  }`}
                >
                  <MapPin size={14} className="text-accent" />
                  {myCity}
                  <span className="text-xs text-muted ml-auto">My city</span>
                </button>
              )}

              {/* Popular cities */}
              <div className="max-h-60 overflow-y-auto">
                {popularCities.filter(c => c !== myCity).map(city => (
                  <button
                    key={city}
                    onClick={() => switchCity(city)}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted-bg transition-colors ${
                      activeCity === city ? "text-accent font-medium" : ""
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Distance pill */}
        <div className="flex items-center gap-1">
          <select
            value={prefs.distance}
            onChange={e => {
              updatePrefs({ distance: e.target.value });
              doSearch(activeCity, { ...prefs, distance: e.target.value });
            }}
            className="px-3 py-2.5 bg-card border border-card-border rounded-l-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer"
            style={{ backgroundImage: "none", paddingRight: "12px" }}
          >
            {(prefs.distance_unit === "km" ? distanceOptionsKm : distanceOptionsMi).map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const newUnit = prefs.distance_unit === "mi" ? "km" : "mi";
              // Map current distance to closest equivalent in the new unit
              const miToKmMap: Record<string, string> = { "10": "15", "25": "40", "50": "80", "100": "160", "250": "400", "": "" };
              const kmToMiMap: Record<string, string> = { "15": "10", "40": "25", "80": "50", "160": "100", "400": "250", "": "" };
              const mapped = newUnit === "km"
                ? (miToKmMap[prefs.distance] ?? "80")
                : (kmToMiMap[prefs.distance] ?? "50");
              const next = { ...prefs, distance_unit: newUnit as "mi" | "km", distance: mapped };
              setPrefs(next);
              savePrefs(next);
              doSearch(activeCity, next);
            }}
            className="px-2.5 py-2.5 bg-card border border-card-border border-l-0 rounded-r-full text-xs font-semibold hover:bg-muted-bg transition-colors"
          >
            {prefs.distance_unit === "mi" ? "mi" : "km"}
          </button>
        </div>

        {/* Filters button */}
        <div className="relative ml-auto" ref={filtersRef}>
          <button
            onClick={() => { setShowFilters(!showFilters); setShowLocationPicker(false); }}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full border text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? "bg-accent/10 border-accent text-accent"
                : "bg-card border-card-border hover:border-muted"
            }`}
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-accent text-[#141210] rounded-full text-xs flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {showFilters && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-card-border rounded-xl shadow-lg z-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-muted hover:text-foreground">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-muted mb-1">Min age</label>
                    <input
                      type="number"
                      value={prefs.min_age}
                      onChange={e => updatePrefs({ min_age: e.target.value })}
                      placeholder="18"
                      min={18}
                      className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Max age</label>
                    <input
                      type="number"
                      value={prefs.max_age}
                      onChange={e => updatePrefs({ max_age: e.target.value })}
                      placeholder="99"
                      className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted mb-1">Gender</label>
                  <select
                    value={prefs.gender}
                    onChange={e => updatePrefs({ gender: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non_binary">Non-binary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-muted mb-1">Income</label>
                  <select
                    value={prefs.income_range}
                    onChange={e => updatePrefs({ income_range: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Any</option>
                    <option value="100k_250k">$100K+</option>
                    <option value="250k_500k">$250K+</option>
                    <option value="500k_1m">$500K+</option>
                    <option value="1m_5m">$1M+</option>
                    <option value="5m_10m">$5M+</option>
                    <option value="over_10m">$10M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-muted mb-1">Body type</label>
                  <select
                    value={prefs.body_type}
                    onChange={e => updatePrefs({ body_type: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="">Any</option>
                    <option value="slim">Slim</option>
                    <option value="athletic">Athletic</option>
                    <option value="average">Average</option>
                    <option value="curvy">Curvy</option>
                    <option value="full_figured">Full figured</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={applyFilters}
                  className="flex-1 py-2.5 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    const reset = { ...defaultPrefs };
                    setPrefs(reset);
                    savePrefs(reset);
                    setShowFilters(false);
                    doSearch(activeCity, reset);
                  }}
                  className="px-4 py-2.5 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      {!loading && results.length > 0 && (
        <p className="text-sm text-muted mb-4">
          {results.length} {results.length === 1 ? "member" : "members"}
          {prefs.distance ? ` within ${prefs.distance} ${prefs.distance_unit}` : ""} of {activeCity}
        </p>
      )}

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg mb-2">No members found nearby</p>
          <p className="text-sm text-muted mb-6">Try expanding your search to find more people.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Any distance", "Miami", "New York", "Los Angeles", "Chicago"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  if (suggestion === "Any distance") {
                    updatePrefs({ distance: "" });
                    doSearch(activeCity, { ...prefs, distance: "" });
                  } else {
                    switchCity(suggestion);
                  }
                }}
                className="px-4 py-2 rounded-full border border-card-border text-sm text-muted hover:border-accent hover:text-accent transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(profile => (
            <ProfileCard key={profile.id} profile={profile} compact blurred={shouldBlur} onClick={() => {
              if (isFreeSD) {
                if (freeViews < FREE_VIEW_LIMIT) {
                  const next = freeViews + 1;
                  setFreeViews(next);
                  localStorage.setItem(LS_KEY, String(next));
                  localStorage.setItem(LS_DATE_KEY, new Date().toDateString());
                  setSelectedProfile(profile);
                } else {
                  trackFunnel("paywall_hit", { source: "search" });
                  setPaywallProfile(profile);
                }
              } else {
                setSelectedProfile(profile);
              }
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
