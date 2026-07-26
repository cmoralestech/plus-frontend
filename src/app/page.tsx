"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import ProfilePreview from "@/components/ProfilePreview";

export default function LandingPage() {
  const { user, loading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => {
    if (!loading && user) router.push(user.has_profile ? "/discover" : "/onboarding");
  }, [loading, user, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Plus",
          url: "https://meetyourplus.com",
          logo: "https://meetyourplus.com/icon-512.png",
          description: "The luxury dating platform for successful and attractive people. A modern alternative to Seeking Arrangement.",
          contactPoint: { "@type": "ContactPoint", email: "support@meetyourplus.com", contactType: "customer service" },
          sameAs: [],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Plus",
          url: "https://meetyourplus.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://meetyourplus.com/blog?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
      ]) }} />

      {/* ═══ HERO ═══ */}
      <div className="relative min-h-[90vh] md:min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Couple enjoying luxury dating on a yacht"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <div className="relative z-10">
          <PublicNav />
        </div>

        <div className="relative z-10 flex-1 flex items-end px-5 md:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-7xl w-full">
            <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] tracking-tight max-w-4xl text-white mb-6">
              Date someone<br />
              worth your time.
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-10">
              Plus connects successful, generous people with the captivating
              people they actually want to meet. Verified profiles only.
              Attractive members are always free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth?mode=register"
                className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
              >
                Join free
              </Link>
              <Link
                href="/seeking-arrangement-alternative"
                className="inline-flex items-center justify-center px-10 py-4 text-sm text-white/50 hover:text-white transition-colors"
              >
                Switching from Seeking? &rarr;
              </Link>
              <Link
                href="/for-sugar-daddies"
                className="inline-flex items-center justify-center px-10 py-4 text-sm text-white/50 hover:text-white transition-colors"
              >
                For successful men &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* ═══ PROFILE PREVIEW ═══ */}
      <ProfilePreview />


      {/* ═══ WHAT MAKES THIS DIFFERENT ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28">
        <div className="max-w-7xl">
          <h2 className="font-display text-2xl md:text-4xl leading-snug max-w-2xl mb-16 md:mb-20">
            Most sugar dating apps charge you $110+ a month and can&apos;t even
            verify that the person you&apos;re talking to is real.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="text-accent text-sm font-medium mb-3">Verification built in</p>
              <p className="text-sm text-muted leading-relaxed">
                Income verification and photo verification are available for every
                member. Verified badges show you who&apos;s real before
                you send the first message.
              </p>
            </div>
            <div>
              <p className="text-accent text-sm font-medium mb-3">Attractive members are always free</p>
              <p className="text-sm text-muted leading-relaxed">
                Not a trial. Not a limited version. Full access, unlimited messaging,
                zero cost, forever. We don&apos;t charge both sides of the arrangement.
              </p>
            </div>
            <div>
              <p className="text-accent text-sm font-medium mb-3">Half the price of Seeking</p>
              <p className="text-sm text-muted leading-relaxed">
                Seeking Arrangement charges $109.99/month for Premium. Plus Diamond is $99.99.
                All features included, better verification, and an app that actually
                works on your phone.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ TWO AUDIENCES ═══ */}
      <section className="border-y border-card-border">
        <div className="grid md:grid-cols-2">
          {/* Successful */}
          <div className="px-5 md:px-10 lg:px-16 py-14 md:py-24 border-b md:border-b-0 md:border-r border-card-border">
            <p className="text-xs text-muted uppercase tracking-[0.2em] mb-6">For sugar daddies &amp; mommas</p>
            <h3 className="font-display text-xl md:text-2xl leading-snug mb-4">
              You&apos;ve done well. Date like it.
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-md">
              Verify your income once, and every person you match with knows
              you&apos;re real before the conversation starts. Travel mode,
              privacy controls, and people who respect your time.
            </p>
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
            >
              Create your profile
            </Link>
          </div>

          {/* Attractive */}
          <div className="px-5 md:px-10 lg:px-16 py-14 md:py-24">
            <p className="text-xs text-muted uppercase tracking-[0.2em] mb-6">For sugar babies</p>
            <h3 className="font-display text-xl md:text-2xl leading-snug mb-4">
              Stop swiping on people who waste your time.
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-md">
              Every successful member on Plus has verified their income.
              No fake profiles, no games. Set your expectations upfront and
              message anyone for free.
            </p>
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-card-border text-sm tracking-wide font-medium hover:bg-muted-bg transition-colors"
            >
              Join free — it stays free
            </Link>
          </div>
        </div>
      </section>


      {/* ═══ SOCIAL PROOF — real positioning, not fake stats ═══ */}
      <section className="bg-card border-y border-card-border py-16 md:py-28">
        <div className="px-5 md:px-10 lg:px-16 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-6">
            Why people switch from Seeking Arrangement
          </h2>
          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <p>
              Seeking used to be the only option. Then they raised prices to
              $274.99/month for Diamond, removed their iOS app, and made
              verification optional — so half the profiles you see might not
              be who they say they are.
            </p>
            <p>
              Plus exists because we thought that was ridiculous. Verification
              should be the default, not a premium add-on. A good experience
              shouldn&apos;t cost $275 a month. And the platform shouldn&apos;t
              charge the person being pursued.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-card-border">
            <div>
              <p className="font-display text-2xl md:text-3xl">$99.99</p>
              <p className="text-muted text-xs mt-1">Diamond, per month</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl">$0</p>
              <p className="text-muted text-xs mt-1">For attractive members</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl">Verified</p>
              <p className="text-muted text-xs mt-1">Income &amp; photo checks</p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ HOW IT WORKS — less generic ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28">
        <div className="max-w-7xl">
          <div className="max-w-lg mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
              Set up takes two minutes. We&apos;re not exaggerating.
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              No 40-question personality survey. No algorithms deciding who
              you&apos;re allowed to talk to.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-accent text-xs tracking-[0.2em] mb-3">01</p>
              <h3 className="text-sm font-medium mb-2">Say what you want</h3>
              <p className="text-sm text-muted leading-relaxed">
                Your profile states your expectations clearly.
                Arrangement type, lifestyle, what you bring. No ambiguity.
              </p>
            </div>
            <div>
              <p className="text-accent text-xs tracking-[0.2em] mb-3">02</p>
              <h3 className="text-sm font-medium mb-2">Get verified</h3>
              <p className="text-sm text-muted leading-relaxed">
                Income verification for successful members. Photo verification
                for everyone. It takes five minutes and it&apos;s worth it.
              </p>
            </div>
            <div>
              <p className="text-accent text-xs tracking-[0.2em] mb-3">03</p>
              <h3 className="text-sm font-medium mb-2">Message anyone</h3>
              <p className="text-sm text-muted leading-relaxed">
                No waiting for a match. If you like someone&apos;s profile,
                say hello. The best arrangements start with honest conversation.
              </p>
            </div>
            <div>
              <p className="text-accent text-xs tracking-[0.2em] mb-3">04</p>
              <h3 className="text-sm font-medium mb-2">Meet in person</h3>
              <p className="text-sm text-muted leading-relaxed">
                Dinner, a weekend trip, whatever works for both of you.
                Travel mode lets you connect in any city before you arrive.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ PRICING TEASE ═══ */}
      <section className="bg-card border-y border-card-border">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-24 max-w-7xl">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
                Pricing that doesn&apos;t feel like a scam
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-md mb-3">
                Attractive members use Plus completely free — no trial,
                no catch. Successful members start free too and upgrade when
                they want unlimited messaging.
              </p>
              <p className="text-muted text-sm leading-relaxed max-w-md">
                For context: Seeking Arrangement charges $109.99/month for
                Premium and $274.99/month for Diamond.
              </p>
              <Link href="/pricing" className="inline-block mt-6 text-sm text-accent hover:text-accent-light transition-colors">
                Full pricing breakdown &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-card-border rounded-lg overflow-hidden">
              {[
                { name: "Free", price: "$0", note: "Full access for attractive members" },
                { name: "Diamond", price: "$99.99", note: "All features — messaging, privacy, priority" },
              ].map((plan) => (
                <div key={plan.name} className="bg-muted-bg p-5 md:p-6 text-center">
                  <p className="text-xs text-muted mb-2">{plan.name}</p>
                  <p className="font-display text-xl md:text-2xl mb-2">{plan.price}<span className="text-xs text-muted font-sans">/mo</span></p>
                  <p className="text-[11px] text-muted leading-snug">{plan.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══ REFERRAL ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:py-24">
        <div className="max-w-7xl grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-center">
          <div>
            <p className="text-xs text-muted uppercase tracking-[0.2em] mb-5">Referral program</p>
            <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
              Know people who&apos;d be into this?<br />Get paid when they join.
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-md">
              Share your link. When someone subscribes through it, you earn
              $5–$12/month for as long as they stay. Recurring. No cap.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth?mode=register"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
              >
                Start earning
              </Link>
              <Link
                href="/earn"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                How it works &rarr;
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { scenario: "Share your link with friends", result: "5 subscribe", earning: "$25–$60/mo" },
              { scenario: "Post about it on TikTok", result: "30 subscribe", earning: "$150–$360/mo" },
              { scenario: "Build it into your content", result: "100 subscribe", earning: "$750–$1,200/mo" },
            ].map((s) => (
              <div key={s.scenario} className="p-4 bg-card border border-card-border rounded-lg">
                <p className="text-xs text-muted mb-1">{s.scenario}</p>
                <p className="text-sm mb-1">{s.result}</p>
                <p className="text-accent font-display text-lg">{s.earning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599582350162-83106f579198?w=1920&q=80&auto=format"
            alt="Couple on luxury vacation by the ocean"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 px-5 md:px-10 lg:px-16 max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-white mb-6">
            You already know what you want.<br />
            Come find it.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-md mb-10">
            Your profile takes two minutes. Attractive members pay nothing.
            Successful members start free. No commitment, cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
            >
              Create your free profile
            </Link>
            <Link
              href="/seeking-arrangement-alternative"
              className="inline-flex items-center justify-center px-10 py-4 text-sm text-white/50 hover:text-white transition-colors"
            >
              Compare to Seeking &rarr;
            </Link>
          </div>
        </div>
      </section>


      <PublicFooter />
    </div>
  );
}
