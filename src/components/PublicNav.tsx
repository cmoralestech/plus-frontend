"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/earn", label: "Earn" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-5 md:px-10 lg:px-16 py-5">
      <Link href="/" className="text-base md:text-lg tracking-[0.2em] uppercase font-display text-accent">
        Plus
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
            {link.label}
          </Link>
        ))}
        <Link href="/auth?mode=login" className="text-sm text-muted hover:text-foreground transition-colors">
          Sign in
        </Link>
        <Link
          href="/auth?mode=register"
          className="text-sm tracking-wide px-5 py-2.5 bg-accent text-background font-medium hover:bg-accent-light transition-colors"
        >
          Join free
        </Link>
      </div>

      {/* Mobile: Join free + hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <Link
          href="/auth?mode=register"
          className="text-sm tracking-wide px-4 py-2 bg-accent text-background font-medium hover:bg-accent-light transition-colors"
        >
          Join free
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="p-2 text-muted hover:text-foreground transition-colors"
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
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
