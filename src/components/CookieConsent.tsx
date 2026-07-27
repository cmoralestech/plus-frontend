"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted") {
      loadTrackingScripts();
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    loadTrackingScripts();
    // Update GA4 consent
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#FFFBF7",
        borderTop: "1px solid #E8DDD2",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <p style={{ color: "#8A7E76", fontSize: "13px", margin: 0, maxWidth: "600px" }}>
        We use cookies for analytics and to improve your experience.{" "}
        <a href="/privacy#cookies" style={{ color: "#C87F6E", textDecoration: "underline" }}>
          Learn more
        </a>
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={accept}
          style={{
            background: "#C87F6E",
            color: "#F5EDE4",
            border: "none",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.5px",
          }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          style={{
            background: "transparent",
            color: "#8A7E76",
            border: "1px solid #E8DDD2",
            padding: "8px 20px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

function loadTrackingScripts() {
  if (typeof window === "undefined") return;

  // Meta Pixel
  if (!(window as any).fbq) {
    const f = window as any;
    const n: any = (f.fbq = function (...args: any[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [] as any[];
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(t);
    (window as any).fbq("init", "YOUR_META_PIXEL_ID");
    (window as any).fbq("track", "PageView");
  }

  // Google Ads
  if (!document.querySelector('script[src*="YOUR_GOOGLE_ADS_ID"]')) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ADS_ID";
    document.head.appendChild(s);
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "YOUR_GOOGLE_ADS_ID");
  }

  // Microsoft Clarity
  if (!(window as any).clarity) {
    ((c: any, l: any, a: string, r: string, i: string) => {
      c[a] =
        c[a] ||
        function (...args: any[]) {
          (c[a].q = c[a].q || []).push(args);
        };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
  }
}
