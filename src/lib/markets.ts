"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

/**
 * Active markets — the single source of truth for "is PLUS open here?".
 *
 * Matched loosely because city strings arrive from several places (profile
 * input, geo lookup, city autocomplete) with varying formatting, e.g.
 * "Miami, FL" or "miami beach".
 */
export const ACTIVE_MARKETS = ["miami", "houston"] as const;

export function isActiveMarket(city: string | null | undefined): boolean {
  if (!city) return false;
  const normalized = city.toLowerCase().trim();
  return ACTIVE_MARKETS.some((market) => normalized.includes(market));
}

const CACHE_KEY = "visitor_city";

export type VisitorLocation = {
  /** Detected city, or null when detection is unavailable or inconclusive. */
  city: string | null;
  /** False until detection settles, so the UI can avoid flashing the wrong CTA. */
  resolved: boolean;
  isActive: boolean;
};

/**
 * Best-effort visitor city.
 *
 * Detection is deliberately allowed to fail: when it does, `city` stays null and
 * callers fall back to city-neutral copy. Guessing a city wrong is worse than
 * not naming one, since the whole point is to make someone feel seen.
 */
export function useVisitorCity(): VisitorLocation {
  const [city, setCity] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached !== null) {
      setCity(cached || null);
      setResolved(true);
      return;
    }

    (async () => {
      try {
        const { data } = await api.get("/api/location/detect");
        if (cancelled) return;
        const detected: string | null = data?.city || null;
        localStorage.setItem(CACHE_KEY, detected || "");
        setCity(detected);
      } catch {
        // Detection is optional; city-neutral copy is the fallback.
        if (!cancelled) setCity(null);
      } finally {
        if (!cancelled) setResolved(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { city, resolved, isActive: isActiveMarket(city) };
}
