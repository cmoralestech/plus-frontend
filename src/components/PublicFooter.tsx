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
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Account</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/auth?mode=register" className="text-muted hover:text-foreground transition-colors">Sign up</Link></li>
              <li><Link href="/auth?mode=login" className="text-muted hover:text-foreground transition-colors">Sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8 border-t border-card-border text-xs text-muted/40">
          <span>&copy; {new Date().getFullYear()} Plus. All rights reserved.</span>
          <a href="mailto:support@meetyourplus.com" className="hover:text-muted/60 transition-colors">support@meetyourplus.com</a>
        </div>
      </div>
    </footer>
  );
}
