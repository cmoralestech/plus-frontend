"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Captures UTM parameters and referral source from the URL on first visit.
 * Stores them in localStorage so they persist until signup.
 * Place this component in the root layout.
 *
 * Standard UTM link templates:
 *   Medium posts:    https://meetyourplus.com/blog/SLUG?utm_source=medium&utm_medium=blog&utm_campaign=medium-repub
 *   Quora answers:   https://meetyourplus.com/blog/SLUG?utm_source=quora&utm_medium=answer&utm_campaign=quora-TOPIC
 *   Reddit:          https://meetyourplus.com/blog/SLUG?utm_source=reddit&utm_medium=comment&utm_campaign=reddit-slf
 *   Email drips:     https://meetyourplus.com/auth?mode=register&utm_source=email&utm_medium=drip&utm_campaign=newsletter
 *   AlternativeTo:   https://meetyourplus.com?utm_source=alternativeto&utm_medium=listing&utm_campaign=alt-listing
 */
export default function UTMCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only capture on first visit (don't overwrite)
    if (localStorage.getItem("utm_captured")) return;

    const utm: Record<string, string> = {};
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

    for (const key of keys) {
      const val = searchParams.get(key);
      if (val) utm[key] = val;
    }

    // Also capture the referring domain
    if (document.referrer) {
      try {
        utm.referrer = new URL(document.referrer).hostname;
      } catch {}
    }

    // Always store landing page — even for direct traffic with no UTM params
    utm.landing_page = window.location.pathname;

    // Always persist (captures landing_page for direct visitors too)
    localStorage.setItem("utm_data", JSON.stringify(utm));
    localStorage.setItem("utm_captured", "1");
  }, [searchParams]);

  return null;
}
