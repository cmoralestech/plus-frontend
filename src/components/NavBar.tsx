"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import {
  Compass,
  Heart,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Search,
  Gift,
  Star,
  Users,
} from "lucide-react";

const sidebarItems = [
  { href: "/discover", label: "Discover", icon: Compass, badgeKey: null },
  { href: "/search", label: "Search", icon: Search, badgeKey: null },
  { href: "/likes", label: "Likes", icon: Heart, badgeKey: "likes_received" as const },
  { href: "/messages", label: "Messages", icon: MessageCircle, badgeKey: "unread_messages" as const },
  { href: "/favorites", label: "Favorites", icon: Star, badgeKey: null },
  { href: "/referrals", label: "Refer & Earn", icon: Gift, badgeKey: null },
  { href: "/community", label: "Community", icon: Users, badgeKey: null },
  { href: "/profile", label: "Profile", icon: User, badgeKey: null },
  { href: "/settings", label: "Settings", icon: Settings, badgeKey: null },
];

const mobileItems = [
  { href: "/discover", label: "Discover", icon: Compass, badgeKey: null },
  { href: "/search", label: "Search", icon: Search, badgeKey: null },
  { href: "/likes", label: "Likes", icon: Heart, badgeKey: "likes_received" as const },
  { href: "/messages", label: "Messages", icon: MessageCircle, badgeKey: "unread_messages" as const },
  { href: "/favorites", label: "Favorites", icon: Star, badgeKey: null },
  { href: "/profile", label: "Profile", icon: User, badgeKey: null },
];

type BadgeCounts = { unread_messages: number; likes_received: number };

export default function NavBar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const [badges, setBadges] = useState<BadgeCounts>({ unread_messages: 0, likes_received: 0 });

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const { data } = await api.get("/api/badges/");
        setBadges(data);
      } catch {}
    };
    fetchBadges();
    const interval = setInterval(fetchBadges, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-card-border flex-col z-50">
        <div className="p-6">
          <h1 className="text-base tracking-[0.2em] uppercase font-display text-accent">
            Plus
          </h1>
          <p className="text-xs text-muted mt-1">Dating at a higher standard</p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const badgeCount = item.badgeKey ? badges[item.badgeKey] : 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-muted-bg hover:text-foreground"
                }`}
              >
                <span className="relative">
                  <item.icon size={20} />
                  {badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-accent text-background text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                      {badgeCount > 99 ? "99+" : badgeCount}
                    </span>
                  )}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-card-border">
          <button
            onClick={() => {
              logout();
              window.location.href = "/auth";
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-muted-bg hover:text-danger transition-colors w-full"
          >
            <LogOut size={20} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav — taller, branded badges, active indicator */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-card-border z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Main navigation"
      >
        <div className="flex justify-around items-center h-16">
          {mobileItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const badgeCount = item.badgeKey ? badges[item.badgeKey] : 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center w-16 py-1 text-[10px] font-medium transition-colors relative ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />
                )}
                <span className="relative mt-1">
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                  {badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] bg-accent text-background text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                      {badgeCount > 99 ? "99+" : badgeCount}
                    </span>
                  )}
                </span>
                <span className="mt-0.5">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
