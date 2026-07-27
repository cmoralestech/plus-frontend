"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/about", label: "About" },
  { href: "/safety", label: "Safety" },
  { href: "/blog", label: "Journal" },
];

export default function PublicNav({ transparent }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-5 md:px-10 lg:px-16 py-5">
      <Link href="/" className="flex items-baseline">
        <span className="text-base md:text-lg tracking-[0.1em] font-display" style={{ color: transparent ? "#fff" : "var(--foreground)" }}>
          PLUS
        </span>
        <span className="text-base md:text-lg font-bold" style={{ color: "var(--accent)" }}>+</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] transition-colors"
            style={{ color: transparent ? "rgba(255,255,255,0.5)" : "var(--muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = transparent ? "#fff" : "var(--foreground)"}
            onMouseLeave={(e) => e.currentTarget.style.color = transparent ? "rgba(255,255,255,0.5)" : "var(--muted)"}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/auth?mode=login"
          className="text-[13px] transition-colors"
          style={{ color: transparent ? "rgba(255,255,255,0.5)" : "var(--muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = transparent ? "#fff" : "var(--foreground)"}
          onMouseLeave={(e) => e.currentTarget.style.color = transparent ? "rgba(255,255,255,0.5)" : "var(--muted)"}
        >
          Sign In
        </Link>
        <Link
          href="/auth?mode=register"
          className="text-[13px] tracking-wide px-5 py-2.5 font-medium transition-colors hover:opacity-90"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          JOIN PLUS+
        </Link>
      </div>

      {/* Mobile: Join free + hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <Link
          href="/auth?mode=register"
          className="text-[13px] tracking-wide px-4 py-2 font-medium transition-colors hover:opacity-90"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          JOIN PLUS+
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="p-2 transition-colors"
          style={{ color: transparent ? "rgba(255,255,255,0.6)" : "var(--muted)" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b border-card-border z-50 md:hidden">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-muted-bg rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth?mode=login"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-muted-bg rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
