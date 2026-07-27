"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-20">
      <div className="text-center max-w-md">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Error</p>
        <h1 className="font-display text-3xl md:text-4xl mb-4">
          Something went wrong
        </h1>
        <p className="text-muted text-sm leading-relaxed mb-8">
          We hit an unexpected error. Try again, or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-card-border text-sm tracking-wide font-medium hover:bg-muted-bg transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
