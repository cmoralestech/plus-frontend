"use client";

import { useState } from "react";
import Link from "next/link";

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

export default function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const isAnnual = billing === "annual";

  return (
    <section className="px-6 md:px-12 pb-20 md:pb-28">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4 mb-10 max-w-5xl">
        <span className="text-sm" style={{ color: billing === "monthly" ? cream : creamMuted }}>Monthly</span>
        <button
          role="switch"
          aria-checked={isAnnual}
          aria-label="Toggle annual billing"
          onClick={() => setBilling(isAnnual ? "monthly" : "annual")}
          className="relative w-12 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer"
          style={{ background: isAnnual ? gold : line }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-transform"
            style={{ background: isAnnual ? dark1 : cream, transform: isAnnual ? "translateX(24px)" : "translateX(0)" }}
          />
        </button>
        <span className="text-sm" style={{ color: isAnnual ? cream : creamMuted }}>
          Annual
          <span className="ml-2 text-[10px] tracking-[0.1em] uppercase px-2 py-0.5" style={{ background: `${gold}20`, color: gold }}>
            Save 17%
          </span>
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Free */}
        <div className="p-8 border" style={{ borderColor: line, background: dark2 }}>
          <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: creamMuted }}>Free</p>
          <p className="text-4xl font-light mb-1" style={{ fontFamily: "var(--font-display)" }}>$0</p>
          <p className="text-sm mb-8" style={{ color: creamMuted }}>Always free for attractive members</p>
          <ul className="space-y-3 text-sm mb-10" style={{ color: creamMuted }}>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Create profile & upload photos</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Browse & discover profiles</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Like & match</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> 1 opening message per conversation</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Basic privacy controls</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Block & report tools</li>
          </ul>
          <Link href="/auth?mode=register" className="block text-center py-3 text-sm tracking-wide border transition-all" style={{ borderColor: line, color: cream }}>
            Sign up free
          </Link>
        </div>

        {/* Diamond */}
        <div className="p-8 border relative" style={{ borderColor: gold, background: dark2 }}>
          <span className="absolute -top-3 left-8 px-3 py-0.5 text-[10px] tracking-[0.15em] uppercase" style={{ background: gold, color: dark1 }}>
            All features
          </span>
          <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: gold }}>Diamond</p>
          <p className="text-4xl font-light mb-1" style={{ fontFamily: "var(--font-display)" }}>
            {isAnnual ? "$999" : "$99.99"}
          </p>
          <p className="text-sm" style={{ color: creamMuted }}>
            {isAnnual ? "per year" : "per month"}
          </p>
          {isAnnual && (
            <p className="text-sm mt-1" style={{ color: gold }}>$83.25/mo</p>
          )}
          <div className={isAnnual ? "mb-6" : "mb-8"} />
          <ul className="space-y-3 text-sm mb-10" style={{ color: creamMuted }}>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Everything in Free</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Unlimited messaging</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> See all photos unblurred</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> See who liked you</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Hide from search</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Private browsing mode</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Hide read receipts</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Priority in discover feed</li>
            <li className="flex gap-3"><span style={{ color: gold }}>+</span> Featured profile badge</li>
          </ul>
          <Link href={`/settings?tab=subscription&billing=${billing}`} className="block text-center py-3 text-sm tracking-wide font-medium transition-all" style={{ background: gold, color: dark1 }}>
            {isAnnual ? "Get Diamond \u2014 $999/year" : "Get Diamond"}
          </Link>
        </div>
      </div>
    </section>
  );
}
