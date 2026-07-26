import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicNav />

      <div className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="text-center max-w-md">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">404</p>
          <h1 className="font-display text-3xl md:text-4xl mb-4">
            Page not found
          </h1>
          <p className="text-muted text-sm leading-relaxed mb-8">
            This page doesn&apos;t exist, was removed, or you followed a broken link.
            No worries — here are some places to go instead.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
            >
              Go home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-card-border text-sm tracking-wide font-medium hover:bg-muted-bg transition-colors"
            >
              Read the blog
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted">
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link href="/seeking-arrangement-alternative" className="hover:text-foreground transition-colors">Seeking Alternative</Link>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
