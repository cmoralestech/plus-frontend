import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Banned from Seeking? Switch to Plus in 2 Minutes",
  description:
    "Tired of Seeking's bans, censorship, and $110/month pricing? Plus has verified profiles, fair moderation, and starts at $49.99/month. Switch in 2 minutes.",
  alternates: { canonical: "https://meetyourplus.com/switch-from-seeking" },
  openGraph: {
    title: "Banned from Seeking? Switch to Plus",
    description: "Fair moderation. No surprise bans. From $49.99/month. Verified profiles.",
    url: "https://meetyourplus.com/switch-from-seeking",
    type: "website",
  },
};

export default function SwitchFromSeekingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      {/* Hero */}
      <section className="px-5 md:px-10 lg:px-16 pt-12 md:pt-24 pb-12 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            For Seeking refugees
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-6">
            Done with Seeking?<br />
            Start fresh in 2 minutes.
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-8">
            No surprise suspensions. No $110/month for optional
            verification. Just a private dating platform that lets you be honest
            about what you want.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
            >
              Create your free profile
            </Link>
            <Link
              href="#comparison"
              className="inline-flex items-center justify-center px-10 py-4 text-sm text-muted hover:text-foreground transition-colors"
            >
              See the comparison &darr;
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-card border-y border-card-border py-14 md:py-20">
        <div className="px-5 md:px-10 lg:px-16 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-10">
            Sound familiar?
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: "\"I got banned for having a normal conversation.\"",
                solution: "Plus has fair moderation. We don't ban people for being honest about what they're looking for.",
              },
              {
                problem: "\"They charged me $109.99 and banned me the same week.\"",
                solution: "Plus starts at $49.99/month. If you cancel, your access stops. We don't charge banned accounts because we don't ban people for normal behavior.",
              },
              {
                problem: "\"Half the profiles are fake. No way to tell who's real.\"",
                solution: "Every established member on Plus can verify their income. Photo verification confirms everyone is who they say they are.",
              },
              {
                problem: "\"There's no app and the mobile site is terrible.\"",
                solution: "Plus is mobile-first. Add it to your home screen and it works like a native app.",
              },
              {
                problem: "\"I sent support an email and never heard back.\"",
                solution: "We respond within 24 hours. Real humans. Not a ticket system that goes nowhere.",
              },
            ].map((item) => (
              <div key={item.problem} className="grid md:grid-cols-[1fr_1fr] gap-4 md:gap-8 py-4 border-b border-card-border last:border-0">
                <p className="text-sm text-foreground italic">{item.problem}</p>
                <p className="text-sm text-muted">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section id="comparison" className="px-5 md:px-10 lg:px-16 py-14 md:py-20">
        <div className="max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-8">
            Seeking vs Plus
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="text-left py-3 pr-4 text-muted font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-accent font-medium">Plus</th>
                  <th className="text-left py-3 pl-4 text-muted font-medium">Seeking</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {[
                  ["Entry paid tier", "$49.99/month (Plus)", "$109.99/month (Premium)"],
                  ["Top tier", "$99.99/month (Plus+)", "$274.99/month (Diamond)"],
                  ["Income verification", "Available", "Optional"],
                  ["Fair moderation", "Yes", "Aggressive bans"],
                  ["Mobile app experience", "Mobile-first PWA", "Removed from App Store"],
                  ["Customer support response", "Under 24 hours", "3% resolution rate"],
                  ["Refund if you cancel", "Yes, end of period", "Non-refundable"],
                  ["Photo blurring for privacy", "Included (Plus)", "$274.99/month (Diamond)"],
                  ["Travel mode", "Yes (Plus+)", "No"],
                  ["Free tier", "Yes, 5 messages/day", "Limited"],
                ].map(([feature, plus, seeking]) => (
                  <tr key={feature} className="border-b border-card-border">
                    <td className="py-3 pr-4 text-foreground">{feature}</td>
                    <td className="py-3 px-4">{plus}</td>
                    <td className="py-3 pl-4">{seeking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-y border-card-border py-14 md:py-20">
        <div className="px-5 md:px-10 lg:px-16 max-w-3xl text-center mx-auto">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
            Your profile takes 2 minutes.<br />
            No credit card to browse.
          </h2>
          <p className="text-muted text-sm mb-8 max-w-md mx-auto">
            Everyone starts free with 5 messages per day. Established members
            upgrade when they&apos;re ready. Cancel anytime.
          </p>
          <Link
            href="/auth?mode=register"
            className="inline-flex items-center justify-center px-12 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
          >
            Create your free profile
          </Link>
          <p className="text-xs text-muted mt-4">
            Already have a Plus account?{" "}
            <Link href="/auth?mode=login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      {/* Related reading */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:py-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-xl mb-6">Related reading</h2>
          <div className="space-y-3">
            {[
              { title: "Seeking banned your account? Here's what to do", href: "/blog/seeking-arrangement-unbanned" },
              { title: "Complete list of Seeking's banned words", href: "/blog/seeking-arrangement-banned-words" },
              { title: "How to get a refund from Seeking after a ban", href: "/blog/seeking-arrangement-refund-after-ban" },
              { title: "Seeking vs Plus: full comparison", href: "/blog/seeking-arrangement-vs-arranged" },
              { title: "Why people are leaving Seeking", href: "/blog/why-i-left-seeking-arrangement" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-muted hover:text-accent transition-colors"
              >
                &rarr; {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
