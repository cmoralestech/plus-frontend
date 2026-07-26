import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-card-border px-5 md:px-10 lg:px-16 py-12 bg-background text-foreground">
      <div className="max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="text-base tracking-[0.2em] uppercase font-display text-accent mb-4">Plus</p>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              The luxury dating platform for
              successful and attractive people.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Product</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/pricing" className="text-muted hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/safety" className="text-muted hover:text-foreground transition-colors">Safety</Link></li>
              <li><Link href="/about" className="text-muted hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/for-sugar-daddies" className="text-muted hover:text-foreground transition-colors">For Sugar Daddies</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Resources</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/seeking-arrangement-alternative" className="text-muted hover:text-foreground transition-colors">Seeking Alternative</Link></li>
              <li><Link href="/earn" className="text-muted hover:text-foreground transition-colors">Earn Money</Link></li>
              <li><Link href="/quiz" className="text-muted hover:text-foreground transition-colors">Arrangement Quiz</Link></li>
              <li><Link href="/faq" className="text-muted hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/community" className="text-muted hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted/60 mb-4">Cities</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sugar-dating/new-york" className="text-muted hover:text-foreground transition-colors">New York</Link></li>
              <li><Link href="/sugar-dating/miami" className="text-muted hover:text-foreground transition-colors">Miami</Link></li>
              <li><Link href="/sugar-dating/los-angeles" className="text-muted hover:text-foreground transition-colors">Los Angeles</Link></li>
              <li><Link href="/sugar-dating/las-vegas" className="text-muted hover:text-foreground transition-colors">Las Vegas</Link></li>
              <li><Link href="/sugar-dating/chicago" className="text-muted hover:text-foreground transition-colors">Chicago</Link></li>
              <li><Link href="/sugar-dating/houston" className="text-muted hover:text-foreground transition-colors">Houston</Link></li>
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
              <li><Link href="/contact" className="text-muted hover:text-foreground transition-colors">Contact Support</Link></li>
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
