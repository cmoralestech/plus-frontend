"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import WaitlistDashboard from "@/components/admin/WaitlistDashboard";
import {
  Users,
  MessageSquare,
  Heart,
  Shield,
  BadgeCheck,
  AlertTriangle,
  TrendingUp,
  Clock,
  Ban,
  CheckCircle,
  XCircle,
  RefreshCw,
  DollarSign,
  MapPin,
} from "lucide-react";

const ADMIN_EMAILS = ["cmoralestech@gmail.com", "mariom8927@gmail.com"];

interface Stats {
  users: number;
  profiles: number;
  matches: number;
  messages: number;
  reports: number;
  pending_verifications: number;
  flagged_messages: number;
  flagged_profiles: number;
}

interface NewUser {
  id: number;
  email: string;
  user_type: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  last_seen: string | null;
  has_profile: boolean;
  display_name: string | null;
  city: string | null;
  is_photo_verified: boolean;
  is_income_verified: boolean;
  photo_count: number;
  is_seed: boolean;
}

interface Verification {
  id: number;
  user_id: number;
  email: string | null;
  display_name: string | null;
  type: string;
  status: string;
  evidence_url: string;
  notes: string | null;
  created_at: string;
}

interface Report {
  id: number;
  reporter: string;
  reported: string;
  reported_profile_id: number;
  reason: string;
  details: string | null;
  created_at: string;
}

interface TimelineEntry {
  date: string;
  signups: number;
}

interface FunnelStage {
  stage: string;
  users: number;
}

interface FunnelData {
  days: number;
  user_type: string;
  funnel: FunnelStage[];
  user_journeys: { user_id: number; events: string[]; furthest_stage: string }[];
  checkout_cancelled: number;
}

interface AttributionSource {
  source: string;
  signups: number;
  profiles: number;
  paid: number;
}

interface AttributionPage {
  page: string;
  signups: number;
}

interface AttributionCampaign {
  campaign: string;
  signups: number;
  paid: number;
}

interface AttributionData {
  sources: AttributionSource[];
  landing_pages: AttributionPage[];
  utm_campaigns: AttributionCampaign[];
}

interface LocationEntry {
  city: string;
  searches: number;
  unique_users: number;
}

interface AdminProfile {
  user_id: number;
  email: string;
  user_type: string;
  display_name: string;
  city: string;
  state: string;
  country: string;
  gender: string | null;
  age: number | string;
  bio: string | null;
  headline: string | null;
  has_photos: boolean;
  photo_count: number;
  is_active: boolean;
  subscription_tier: string;
  created_at: string;
  last_seen: string | null;
}

type Tab = "dashboard" | "users" | "verifications" | "reports" | "funnel" | "locations" | "profiles" | "attribution" | "waitlist";

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<Stats | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [newUsers, setNewUsers] = useState<NewUser[]>([]);
  const [allUsers, setAllUsers] = useState<NewUser[]>([]);
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [funnel, setFunnel] = useState<FunnelData | null>(null);
  const [locations, setLocations] = useState<LocationEntry[]>([]);
  const [attribution, setAttribution] = useState<AttributionData | null>(null);
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);
  const [profileFilter, setProfileFilter] = useState<"" | "sugar" | "attractive">("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Auth gate
  useEffect(() => {
    if (user && !ADMIN_EMAILS.includes(user.email)) {
      router.push("/discover");
    }
  }, [user, router]);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, timelineRes, newUsersRes] = await Promise.all([
        api.get("/api/admin/stats"),
        api.get("/api/admin/stats/timeline?days=30"),
        api.get("/api/admin/new-users?days=30"),
      ]);
      setStats(statsRes.data);
      setTimeline(timelineRes.data);
      setNewUsers(newUsersRes.data);
    } catch {
      // Not admin or not logged in
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get("/api/admin/users");
      setAllUsers(res.data);
    } catch {}
  }, []);

  const fetchVerifications = useCallback(async () => {
    try {
      const res = await api.get("/api/admin/verifications?status=all");
      setVerifications(res.data);
    } catch {}
  }, []);

  const fetchReports = useCallback(async () => {
    try {
      const res = await api.get("/api/admin/reports");
      setReports(res.data);
    } catch {}
  }, []);

  const fetchFunnel = useCallback(async () => {
    try {
      const res = await api.get("/api/analytics/funnel?days=30&user_type=sugar");
      setFunnel(res.data);
    } catch {}
  }, []);

  const fetchLocations = useCallback(async () => {
    try {
      const res = await api.get("/api/analytics/locations?days=30");
      setLocations(res.data.locations || []);
    } catch {}
  }, []);

  const fetchAttribution = useCallback(async () => {
    try {
      const res = await api.get("/api/admin/attribution?days=90");
      setAttribution(res.data);
    } catch {}
  }, []);

  const fetchProfiles = useCallback(async (filter: string = "") => {
    try {
      const res = await api.get(`/api/admin/profiles?user_type=${filter}`);
      setAdminProfiles(res.data);
    } catch {}
  }, []);

  useEffect(() => {
    if (tab === "users") fetchUsers();
    if (tab === "verifications") fetchVerifications();
    if (tab === "reports") fetchReports();
    if (tab === "funnel") fetchFunnel();
    if (tab === "locations") fetchLocations();
    if (tab === "profiles") fetchProfiles(profileFilter);
    if (tab === "attribution") fetchAttribution();
  }, [tab, fetchUsers, fetchVerifications, fetchReports, fetchFunnel, fetchLocations, fetchProfiles, profileFilter, fetchAttribution]);

  const handleAction = async (url: string, key: string) => {
    setActionLoading(key);
    try {
      await api.post(url);
      fetchData();
      if (tab === "users") fetchUsers();
      if (tab === "verifications") fetchVerifications();
    } catch {}
    setActionLoading(null);
  };

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-muted text-sm">Admin access required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <RefreshCw size={20} className="animate-spin text-muted" />
      </div>
    );
  }

  const realUsers = newUsers.filter((u) => !u.is_seed);
  const maxSignups = Math.max(...timeline.map((t) => t.signups), 1);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => { setLoading(true); fetchData(); }}
            className="flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card border border-card-border rounded-lg p-1 mb-6">
          {([
            ["dashboard", "Dashboard"],
            ["attribution", "Attribution"],
            ["funnel", "Funnel"],
            ["locations", "Locations"],
            ["waitlist", "Waitlist"],
            ["profiles", "Profiles"],
            ["users", "Users"],
            ["verifications", "Verifications"],
            ["reports", "Reports"],
          ] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === key ? "bg-muted-bg text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {label}
              {key === "verifications" && stats && stats.pending_verifications > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-accent text-background text-[10px] rounded-full">
                  {stats.pending_verifications}
                </span>
              )}
              {key === "reports" && stats && (stats.flagged_messages + stats.flagged_profiles) > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-danger text-white text-[10px] rounded-full">
                  {stats.flagged_messages + stats.flagged_profiles}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {tab === "dashboard" && stats && (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Users", value: stats.users, icon: Users, color: "text-accent" },
                { label: "Profiles", value: stats.profiles, icon: BadgeCheck, color: "text-success" },
                { label: "Matches", value: stats.matches, icon: Heart, color: "text-pink-400" },
                { label: "Messages", value: stats.messages, icon: MessageSquare, color: "text-blue-400" },
                { label: "Reports", value: stats.reports, icon: Shield, color: "text-orange-400" },
                { label: "Pending Verify", value: stats.pending_verifications, icon: Clock, color: "text-yellow-400" },
                { label: "Flagged Msgs", value: stats.flagged_messages, icon: AlertTriangle, color: "text-danger" },
                { label: "Flagged Profiles", value: stats.flagged_profiles, icon: AlertTriangle, color: "text-danger" },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-card-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon size={16} className={s.color} />
                    <span className="text-xs text-muted">{s.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Signup timeline chart */}
            <div className="bg-card border border-card-border rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-accent" />
                <span className="text-sm font-medium">Signups (last 30 days)</span>
              </div>
              <div className="flex items-end gap-1 h-24">
                {timeline.map((t) => (
                  <div
                    key={t.date}
                    className="flex-1 bg-accent/20 hover:bg-accent/40 rounded-t transition-colors relative group"
                    style={{ height: `${(t.signups / maxSignups) * 100}%`, minHeight: t.signups > 0 ? "4px" : "1px" }}
                    title={`${t.date}: ${t.signups} signups`}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card border border-card-border px-1.5 py-0.5 rounded text-[10px] text-foreground hidden group-hover:block whitespace-nowrap">
                      {t.signups}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted">
                <span>{timeline[0]?.date}</span>
                <span>{timeline[timeline.length - 1]?.date}</span>
              </div>
            </div>

            {/* New real users */}
            <div className="bg-card border border-card-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-success" />
                  <span className="text-sm font-medium">Real Users (last 30 days)</span>
                </div>
                <span className="text-xs text-muted">{realUsers.length} users</span>
              </div>
              {realUsers.length === 0 ? (
                <p className="text-sm text-muted">No real user signups yet.</p>
              ) : (
                <div className="space-y-2">
                  {realUsers.map((u) => (
                    <div key={u.id} className="flex items-center justify-between py-2 border-b border-card-border last:border-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{u.display_name || u.email}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            u.user_type === "sugar" ? "bg-accent/10 text-accent" : "bg-pink-500/10 text-pink-400"
                          }`}>
                            {u.user_type === "sugar" ? "SD" : "SB"}
                          </span>
                          {u.is_photo_verified && <BadgeCheck size={14} className="text-accent" />}
                          {u.is_income_verified && <BadgeCheck size={14} className="text-success" />}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                          <span>{u.email}</span>
                          {u.city && <span>{u.city}</span>}
                          <span>{u.photo_count} photos</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!u.is_income_verified && u.user_type === "sugar" && (
                          <button
                            onClick={() => handleAction(`/api/admin/users/${u.id}/verify-income`, `income-${u.id}`)}
                            disabled={actionLoading === `income-${u.id}`}
                            className="text-xs px-3 py-1.5 bg-success/10 text-success rounded-md hover:bg-success/20 transition-colors disabled:opacity-50"
                          >
                            Verify Income
                          </button>
                        )}
                        {!u.is_photo_verified && (
                          <button
                            onClick={() => handleAction(`/api/admin/users/${u.id}/verify-photo`, `photo-${u.id}`)}
                            disabled={actionLoading === `photo-${u.id}`}
                            className="text-xs px-3 py-1.5 bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors disabled:opacity-50"
                          >
                            Verify Photo
                          </button>
                        )}
                        <span className="text-[10px] text-muted">
                          {new Date(u.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Attribution Tab */}
        {tab === "attribution" && (
          <div className="space-y-4">
            {/* Source → Conversion */}
            <div className="bg-card border border-card-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-accent" />
                  <span className="text-sm font-medium">Source → Conversion (last 90 days)</span>
                </div>
                <button onClick={fetchAttribution} className="text-xs text-muted hover:text-foreground">
                  <RefreshCw size={14} />
                </button>
              </div>
              {!attribution ? (
                <p className="text-sm text-muted py-4">Loading attribution data...</p>
              ) : attribution.sources.length === 0 ? (
                <p className="text-sm text-muted py-4">No attribution data yet. Data appears as users sign up with UTM params or referrers.</p>
              ) : (
                <div className="space-y-2">
                  {/* Header */}
                  <div className="grid grid-cols-[1fr_80px_80px_80px_80px] gap-2 text-[10px] text-muted uppercase tracking-wider pb-2 border-b border-card-border">
                    <span>Source</span>
                    <span className="text-right">Signups</span>
                    <span className="text-right">Profiles</span>
                    <span className="text-right">Paid</span>
                    <span className="text-right">Conv %</span>
                  </div>
                  {attribution.sources.map((s) => {
                    const convRate = s.signups > 0 ? ((s.paid / s.signups) * 100).toFixed(0) : "0";
                    const maxSignups = Math.max(...attribution.sources.map((x) => x.signups), 1);
                    const barWidth = (s.signups / maxSignups) * 100;
                    return (
                      <div key={s.source}>
                        <div className="grid grid-cols-[1fr_80px_80px_80px_80px] gap-2 items-center text-sm py-1.5">
                          <span className="font-medium truncate">{s.source}</span>
                          <span className="text-right">{s.signups}</span>
                          <span className="text-right text-muted">{s.profiles}</span>
                          <span className={`text-right font-medium ${s.paid > 0 ? "text-success" : "text-muted"}`}>{s.paid}</span>
                          <span className={`text-right text-xs ${Number(convRate) > 0 ? "text-success" : "text-muted"}`}>{convRate}%</span>
                        </div>
                        <div className="h-1.5 bg-muted-bg rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${s.paid > 0 ? "bg-success" : "bg-accent/60"}`}
                            style={{ width: `${Math.max(barWidth, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Landing Pages */}
            {attribution && attribution.landing_pages.length > 0 && (
              <div className="bg-card border border-card-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-accent" />
                  <span className="text-sm font-medium">Top Landing Pages</span>
                </div>
                <div className="space-y-1.5">
                  {attribution.landing_pages.map((lp, i) => {
                    const maxLp = Math.max(...attribution.landing_pages.map((x) => x.signups), 1);
                    const pct = (lp.signups / maxLp) * 100;
                    const isBlog = lp.page.startsWith("/blog/");
                    return (
                      <div key={lp.page}>
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-muted w-5 flex-shrink-0">{i + 1}.</span>
                            <span className={`truncate ${isBlog ? "text-accent" : ""}`}>{lp.page}</span>
                            {isBlog && <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent flex-shrink-0">Blog</span>}
                          </div>
                          <span className="font-medium flex-shrink-0 ml-2">{lp.signups}</span>
                        </div>
                        <div className="h-1.5 bg-muted-bg rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-accent/40 transition-all" style={{ width: `${Math.max(pct, 2)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* UTM Campaigns */}
            {attribution && attribution.utm_campaigns.length > 0 && (
              <div className="bg-card border border-card-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign size={16} className="text-accent" />
                  <span className="text-sm font-medium">UTM Campaigns</span>
                </div>
                <div className="space-y-1.5">
                  {/* Header */}
                  <div className="grid grid-cols-[1fr_80px_80px] gap-2 text-[10px] text-muted uppercase tracking-wider pb-2 border-b border-card-border">
                    <span>Campaign</span>
                    <span className="text-right">Signups</span>
                    <span className="text-right">Paid</span>
                  </div>
                  {attribution.utm_campaigns.map((c) => (
                    <div key={c.campaign} className="grid grid-cols-[1fr_80px_80px] gap-2 items-center text-sm py-1.5 border-b border-card-border last:border-0">
                      <span className="font-medium truncate">{c.campaign}</span>
                      <span className="text-right">{c.signups}</span>
                      <span className={`text-right ${c.paid > 0 ? "text-success font-medium" : "text-muted"}`}>{c.paid}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Converting Blog Posts */}
            {attribution && (() => {
              const blogPages = attribution.landing_pages.filter((lp) => lp.page.startsWith("/blog/"));
              if (blogPages.length === 0) return null;
              return (
                <div className="bg-card border border-card-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={16} className="text-success" />
                    <span className="text-sm font-medium">Top Converting Blog Posts</span>
                  </div>
                  <div className="space-y-2">
                    {blogPages.map((bp, i) => {
                      const slug = bp.page.replace("/blog/", "");
                      return (
                        <div key={bp.page} className="flex items-center justify-between py-2 border-b border-card-border last:border-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs text-muted w-5 flex-shrink-0">{i + 1}.</span>
                            <span className="text-sm truncate">{slug}</span>
                          </div>
                          <span className="text-sm font-medium flex-shrink-0 ml-2">{bp.signups} signup{bp.signups !== 1 ? "s" : ""}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Users Tab */}
        {tab === "users" && (() => {
          const realOnly = allUsers.filter((u) => !u.is_seed);
          const seedOnly = allUsers.filter((u) => u.is_seed);
          return (
          <div className="space-y-4">
            {/* Real users */}
            <div className="bg-card border border-card-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Real Users</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success">{realOnly.length}</span>
                </div>
                <button onClick={fetchUsers} className="text-xs text-muted hover:text-foreground">
                  <RefreshCw size={14} />
                </button>
              </div>
              {realOnly.length === 0 ? (
                <p className="text-sm text-muted py-4">No real users yet.</p>
              ) : (
              <div className="space-y-1">
                {realOnly.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-2.5 border-b border-card-border last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{u.display_name || "No profile"}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        u.user_type === "sugar" ? "bg-accent/10 text-accent" : "bg-pink-500/10 text-pink-400"
                      }`}>
                        {u.user_type === "sugar" ? "SD" : "SB"}
                      </span>
                      {u.is_seed && <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted-bg text-muted">Seed</span>}
                      {!u.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-danger/10 text-danger">Suspended</span>}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {u.email} &middot; Joined {new Date(u.created_at).toLocaleDateString()}
                      {u.last_seen && <> &middot; Last seen {new Date(u.last_seen).toLocaleDateString()}</>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {u.is_active ? (
                      <button
                        onClick={() => handleAction(`/api/admin/users/${u.id}/suspend`, `suspend-${u.id}`)}
                        disabled={actionLoading === `suspend-${u.id}`}
                        className="text-xs px-3 py-1.5 text-danger hover:bg-danger/10 rounded-md transition-colors disabled:opacity-50"
                      >
                        <Ban size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(`/api/admin/users/${u.id}/unsuspend`, `unsuspend-${u.id}`)}
                        disabled={actionLoading === `unsuspend-${u.id}`}
                        className="text-xs px-3 py-1.5 text-success hover:bg-success/10 rounded-md transition-colors disabled:opacity-50"
                      >
                        <CheckCircle size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
              )}
            </div>

            {/* Seed users — collapsed by default */}
            <details className="bg-card border border-card-border rounded-lg">
              <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-medium text-muted hover:text-foreground">
                <div className="flex items-center gap-2">
                  Seed Profiles
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted-bg text-muted">{seedOnly.length}</span>
                </div>
              </summary>
              <div className="px-4 pb-4 space-y-1">
                {seedOnly.map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-2 border-b border-card-border last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted">{u.display_name || "No profile"}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          u.user_type === "sugar" ? "bg-accent/10 text-accent" : "bg-pink-500/10 text-pink-400"
                        }`}>
                          {u.user_type === "sugar" ? "SD" : "SB"}
                        </span>
                      </div>
                      <span className="text-xs text-muted">{u.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
          );
        })()}

        {/* Verifications Tab */}
        {tab === "verifications" && (
          <div className="bg-card border border-card-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Verification Requests</span>
              <button onClick={fetchVerifications} className="text-xs text-muted hover:text-foreground">
                <RefreshCw size={14} />
              </button>
            </div>
            {verifications.length === 0 ? (
              <p className="text-sm text-muted py-4">No verification requests.</p>
            ) : (
              <div className="space-y-2">
                {verifications.map((v) => (
                  <div key={v.id} className="flex items-center justify-between py-3 border-b border-card-border last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{v.display_name || v.email}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          v.type === "photo" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
                        }`}>
                          {v.type === "photo" ? "Photo" : "Income"}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          v.status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                          v.status === "approved" ? "bg-success/10 text-success" :
                          "bg-danger/10 text-danger"
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted mt-0.5">
                        {v.email} &middot; {new Date(v.created_at).toLocaleDateString()}
                        {v.evidence_url && <> &middot; <a href={v.evidence_url} target="_blank" rel="noopener" className="text-accent hover:underline">View evidence</a></>}
                      </div>
                    </div>
                    {v.status === "pending" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAction(`/api/admin/verifications/${v.id}/approve`, `approve-${v.id}`)}
                          disabled={actionLoading === `approve-${v.id}`}
                          className="text-xs px-3 py-1.5 bg-success/10 text-success rounded-md hover:bg-success/20 transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleAction(`/api/admin/verifications/${v.id}/reject`, `reject-${v.id}`)}
                          disabled={actionLoading === `reject-${v.id}`}
                          className="text-xs px-3 py-1.5 text-danger hover:bg-danger/10 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Funnel Tab */}
        {tab === "funnel" && (
          <div className="space-y-4">
            <div className="bg-card border border-card-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-accent" />
                  <span className="text-sm font-medium">Established Member Conversion Funnel (30 days)</span>
                </div>
                <button onClick={fetchFunnel} className="text-xs text-muted hover:text-foreground">
                  <RefreshCw size={14} />
                </button>
              </div>
              {!funnel ? (
                <p className="text-sm text-muted py-4">Loading funnel data...</p>
              ) : (
                <>
                  {/* Funnel bars */}
                  <div className="space-y-2">
                    {funnel.funnel.map((stage, i) => {
                      const maxUsers = Math.max(...funnel.funnel.map((s) => s.users), 1);
                      const pct = maxUsers > 0 ? (stage.users / maxUsers) * 100 : 0;
                      const prevUsers = i > 0 ? funnel.funnel[i - 1].users : stage.users;
                      const dropoff = prevUsers > 0 ? Math.round(((prevUsers - stage.users) / prevUsers) * 100) : 0;
                      const labels: Record<string, string> = {
                        signup: "Signed up",
                        profile_created: "Created profile",
                        paywall_hit: "Hit paywall",
                        pricing_viewed: "Viewed pricing",
                        subscription_tab_viewed: "Viewed upgrade page",
                        checkout_started: "Started checkout",
                        checkout_completed: "Paid",
                      };
                      return (
                        <div key={stage.stage}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted">{labels[stage.stage] || stage.stage}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{stage.users}</span>
                              {i > 0 && dropoff > 0 && (
                                <span className="text-danger text-[10px]">-{dropoff}%</span>
                              )}
                            </div>
                          </div>
                          <div className="h-6 bg-muted-bg rounded overflow-hidden">
                            <div
                              className={`h-full rounded transition-all ${stage.stage === "checkout_completed" ? "bg-success" : "bg-accent/60"}`}
                              style={{ width: `${Math.max(pct, stage.users > 0 ? 2 : 0)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cancelled checkouts */}
                  {funnel.checkout_cancelled > 0 && (
                    <p className="text-xs text-muted mt-4">
                      {funnel.checkout_cancelled} user{funnel.checkout_cancelled > 1 ? "s" : ""} cancelled/abandoned checkout
                    </p>
                  )}

                  {/* Per-user journey */}
                  {funnel.user_journeys.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xs font-medium text-muted mb-3">Individual Journeys</h3>
                      <div className="space-y-1.5">
                        {funnel.user_journeys.map((uj) => (
                          <div key={uj.user_id} className="flex items-center gap-2 text-xs py-1.5 border-b border-card-border last:border-0">
                            <span className="text-muted w-12 flex-shrink-0">#{uj.user_id}</span>
                            <div className="flex flex-wrap gap-1">
                              {uj.events.map((ev) => (
                                <span key={ev} className={`px-1.5 py-0.5 rounded text-[10px] ${
                                  ev === "checkout_completed" ? "bg-success/10 text-success" :
                                  ev === "checkout_started" ? "bg-accent/10 text-accent" :
                                  ev === "checkout_cancelled" ? "bg-danger/10 text-danger" :
                                  "bg-muted-bg text-muted"
                                }`}>
                                  {ev.replace(/_/g, " ")}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Locations Tab */}
        {tab === "locations" && (
          <div className="space-y-4">
            <div className="bg-card border border-card-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-accent" />
                  <span className="text-sm font-medium">Where users are searching for companions (30 days)</span>
                </div>
                <button onClick={fetchLocations} className="text-xs text-muted hover:text-foreground">
                  <RefreshCw size={14} />
                </button>
              </div>
              {locations.length === 0 ? (
                <p className="text-sm text-muted py-4">No location data yet. Data will appear as users search in different cities.</p>
              ) : (
                <div className="space-y-2">
                  {locations.map((loc, i) => {
                    const maxSearches = Math.max(...locations.map((l) => l.searches), 1);
                    const pct = (loc.searches / maxSearches) * 100;
                    return (
                      <div key={loc.city}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-muted w-5">{i + 1}.</span>
                            <span className="font-medium">{loc.city}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-muted">{loc.unique_users} user{loc.unique_users !== 1 ? "s" : ""}</span>
                            <span className="font-medium w-12 text-right">{loc.searches}</span>
                          </div>
                        </div>
                        <div className="h-5 bg-muted-bg rounded overflow-hidden">
                          <div
                            className="h-full rounded bg-accent/60 transition-all"
                            style={{ width: `${Math.max(pct, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profiles Tab */}
        {tab === "waitlist" && <WaitlistDashboard />}

        {tab === "profiles" && (
          <div className="space-y-4">
            <div className="bg-card border border-card-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Real Profiles (newest first)</span>
                <div className="flex gap-1">
                  {([["", "All"], ["sugar", "Daddies"], ["attractive", "Babies"]] as const).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setProfileFilter(val as "" | "sugar" | "attractive")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        profileFilter === val ? "bg-accent text-background" : "bg-muted-bg text-muted hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {adminProfiles.length === 0 ? (
                <p className="text-sm text-muted py-4">No profiles found.</p>
              ) : (
                <div className="space-y-2">
                  {adminProfiles.map((p) => (
                    <div key={p.user_id} className="flex items-start gap-3 py-3 border-b border-card-border last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{p.display_name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            p.user_type === "sugar" ? "bg-accent/10 text-accent" : "bg-success/10 text-success"
                          }`}>
                            {p.user_type === "sugar" ? "Generous" : "Attractive"}
                          </span>
                          {p.subscription_tier !== "free" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent font-bold">
                              {p.subscription_tier.toUpperCase()}
                            </span>
                          )}
                          {!p.has_photos && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-danger/10 text-danger">No photos</span>
                          )}
                        </div>
                        <div className="text-xs text-muted mt-1">
                          {p.age && <span>{p.age}y · </span>}
                          {p.gender && <span>{p.gender} · </span>}
                          {p.city && <span>{p.city}{p.country ? `, ${p.country}` : ""} · </span>}
                          <span>{p.photo_count} photo{p.photo_count !== 1 ? "s" : ""}</span>
                        </div>
                        {p.headline && <p className="text-xs text-muted mt-1 italic">&ldquo;{p.headline}&rdquo;</p>}
                        <div className="text-[10px] text-muted mt-1">
                          {p.email} · Joined {new Date(p.created_at).toLocaleDateString()}
                          {p.last_seen && <span> · Last seen {new Date(p.last_seen).toLocaleDateString()}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {tab === "reports" && (
          <div className="bg-card border border-card-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Reports & Flags</span>
              <button onClick={fetchReports} className="text-xs text-muted hover:text-foreground">
                <RefreshCw size={14} />
              </button>
            </div>
            {reports.length === 0 ? (
              <p className="text-sm text-muted py-4">No reports.</p>
            ) : (
              <div className="space-y-2">
                {reports.map((r) => (
                  <div key={r.id} className="py-3 border-b border-card-border last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">
                        <strong>{r.reporter}</strong> reported <strong>{r.reported}</strong>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400">
                        {r.reason}
                      </span>
                    </div>
                    {r.details && <p className="text-xs text-muted">{r.details}</p>}
                    <p className="text-[10px] text-muted mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
