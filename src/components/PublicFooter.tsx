import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-card-border px-5 md:px-10 lg:px-16 py-12 bg-background text-foreground">
      <div className="max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline mb-4">
              <span className="text-base tracking-[0.1em] font-display">PLUS</span>
              <span className="text-base font-bold text-accent">+</span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              Private dating for people with more to offer. Now open in Miami + Houston.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Product</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/pricing" className="text-muted hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/safety" className="text-muted hover:text-foreground transition-colors">Safety</Link></li>
              <li><Link href="/about" className="text-muted hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-foreground transition-colors">Journal</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Resources</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/earn" className="text-muted hover:text-foreground transition-colors">Earn Money</Link></li>
              <li><Link href="/faq" className="text-muted hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/how-it-works" className="text-muted hover:text-foreground transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/terms" className="text-muted hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="text-muted hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="/privacy#ccpa" className="text-muted hover:text-foreground transition-colors">Do Not Sell My Info</Link></li>
              <li><a href="tel:1-888-373-7888" className="text-muted hover:text-foreground transition-colors">Report Trafficking</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Connect</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/auth?mode=register" className="text-muted hover:text-foreground transition-colors">Sign up</Link></li>
              <li><Link href="/auth?mode=login" className="text-muted hover:text-foreground transition-colors">Sign in</Link></li>
              <li><a href="https://instagram.com/meetyourplus" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="https://tiktok.com/@meetyourplus" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">TikTok</a></li>
              <li><a href="https://x.com/meetyourplus" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">X</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-card-border text-xs text-muted/40">
          <span>&copy; {new Date().getFullYear()} Plus. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="https://instagram.com/meetyourplus" target="_blank" rel="noopener noreferrer" className="hover:text-muted/60 transition-colors" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com/@meetyourplus" target="_blank" rel="noopener noreferrer" className="hover:text-muted/60 transition-colors" aria-label="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.2 8.2 0 005.58 2.18v-3.45a4.85 4.85 0 01-3.77-1.27V6.69h3.77z"/></svg>
            </a>
            <a href="https://x.com/meetyourplus" target="_blank" rel="noopener noreferrer" className="hover:text-muted/60 transition-colors" aria-label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="mailto:support@meetyourplus.com" className="hover:text-muted/60 transition-colors">support@meetyourplus.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
