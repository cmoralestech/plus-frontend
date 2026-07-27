import Link from "next/link";
import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Earn Money Referring People to Plus | Recurring Income",
  description: "Earn $5-$12/month per subscriber by sharing Plus. Recurring income, no cap, 4 tiers. Perfect for creators and influencers.",
  alternates: { canonical: "https://meetyourplus.com/earn" },
  openGraph: {
    title: "Get Paid to Share Plus",
    description: "Earn recurring monthly income by referring people to the private dating platform. $5-$12/subscriber/month. No cap.",
  },
};

const tiers = [
  { name: "Starter", min: "0", plus: "$5", plusPlus: "$10", color: "" },
  { name: "Silver", min: "25+", plus: "$7.50", plusPlus: "$15", color: "" },
  { name: "Gold", min: "100+", plus: "$10", plusPlus: "$25", color: "border-accent" },
  { name: "Platinum", min: "500+", plus: "$12", plusPlus: "$32", color: "border-accent" },
];

export default function EarnPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      {/* Hero */}
      <section className="px-5 md:px-10 lg:px-16 pt-12 md:pt-24 pb-14 md:pb-20 max-w-5xl">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6">Plus Referral Program</p>
        <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1] tracking-tight mb-6">
          The dating app<br />that pays you back.
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-10">
          Share your personal referral link. When someone signs up and subscribes,
          you earn recurring monthly income, for as long as they stay.
          No cap. No catch. Just passive income from a product people actually want.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
        >
          Create account and get your link
        </Link>
      </section>

      {/* How much can you earn */}
      <section className="border-y border-card-border bg-card">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-20 max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-10">
            How much can you earn?
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Share with friends", signups: "50 signups", paying: "15 subscribe", low: "$75", high: "$180", period: "/month" },
              { label: "Post on social media", signups: "500 signups", paying: "100 subscribe", low: "$500", high: "$1,200", period: "/month" },
              { label: "Build a creator brand", signups: "2,000 signups", paying: "400 subscribe", low: "$4,000", high: "$12,800", period: "/month" },
            ].map((s) => (
              <div key={s.label} className="p-5 bg-background rounded-xl border border-card-border">
                <p className="text-xs text-accent uppercase tracking-wide mb-3">{s.label}</p>
                <p className="text-sm text-muted mb-1">{s.signups} → {s.paying}</p>
                <p className="font-display text-2xl md:text-3xl text-foreground">
                  {s.low}<span className="text-muted text-lg">–</span>{s.high}
                </p>
                <p className="text-xs text-muted">{s.period}, recurring</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted text-center">
            These are real projections based on our commission tiers. Earnings scale with your referral count.
          </p>
        </div>
      </section>

      {/* Commission tiers */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:py-20 max-w-5xl">
        <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
          The more you refer, the more you earn.
        </h2>
        <p className="text-muted text-sm mb-10 max-w-lg">
          Four commission tiers that reward growth. Start at $5/subscriber and scale to $32/subscriber
          as your referral count grows. Tiers upgrade automatically.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {tiers.map((tier) => (
            <div key={tier.name} className={`p-5 rounded-xl border border-card-border bg-card text-center ${tier.color}`}>
              <p className="text-[10px] uppercase tracking-wide text-muted mb-3">{tier.name}</p>
              <p className="text-xs text-muted mb-1">Per Plus subscriber</p>
              <p className="font-display text-xl text-foreground mb-3">{tier.plus}<span className="text-xs text-muted font-sans">/mo</span></p>
              <p className="text-xs text-muted mb-1">Per Plus+ subscriber</p>
              <p className="font-display text-xl text-accent">{tier.plusPlus}<span className="text-xs text-muted font-sans">/mo</span></p>
              {tier.min !== "0" && (
                <p className="text-[10px] text-muted/50 mt-3 pt-3 border-t border-card-border">{tier.min} paying referrals</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-card-border bg-card">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-20 max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-10">
            How it works
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
            {[
              { n: "01", title: "Sign up free", body: "Create a Plus account (takes 2 minutes). Your referral link is generated automatically." },
              { n: "02", title: "Share your link", body: "Post it on social media, put it in your bio, share it in DMs, use it in content. Wherever your audience is." },
              { n: "03", title: "People sign up", body: "When someone clicks your link and creates an account, they're tracked to you forever. They don't even need to subscribe right away." },
              { n: "04", title: "You get paid monthly", body: "When your referrals subscribe, you earn $5-$32/month per subscriber. PayPal payouts when your balance hits $50." },
            ].map((step) => (
              <div key={step.n}>
                <span className="text-accent text-xs tracking-[0.3em] block mb-3">{step.n}</span>
                <h3 className="text-base font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:py-20 max-w-5xl">
        <h2 className="font-display text-2xl md:text-3xl leading-snug mb-10">
          Who earns with Plus
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              title: "Content creators",
              body: "You make dating, lifestyle, or relationship content. Your audience is already interested. One viral post can generate hundreds of signups and months of recurring income.",
            },
            {
              title: "Dating community members",
              body: "You're already in the space. You know people who are frustrated with Seeking. Recommend something better and get paid for it, every month.",
            },
            {
              title: "Anyone with a network",
              body: "You don't need a huge following. Share with 20 friends. If 5 subscribe, that's $25-$60/month in passive income. Share with 200 and the math gets very interesting.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-sm font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What makes this different */}
      <section className="border-y border-card-border bg-card">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-20 max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-8">
            Why this isn&apos;t like other referral programs
          </h2>
          <div className="space-y-4 text-sm">
            {[
              { point: "Recurring, not one-time", detail: "Most referral programs pay you once. We pay you every month for as long as your referral stays subscribed." },
              { point: "No cap on earnings", detail: "There's no maximum. Refer 1,000 people? You earn on all 1,000. Forever." },
              { point: "Tiered commissions that reward growth", detail: "Start at $5/subscriber. As you refer more paying users, your rate automatically increases, up to $32/subscriber at Platinum." },
              { point: "The product sells itself", detail: "Plus starts at $49.99/mo — less than half the price of Seeking with better features. You're not pushing something people don't want, you're pointing them to something better." },
              { point: "Custom referral links", detail: "Get a branded link like meetyourplus.com/r/your-name. Professional and trackable." },
              { point: "Ready-to-post content", detail: "We give you copy-paste captions for Twitter, Instagram, TikTok, and DMs. Share in seconds." },
            ].map((item) => (
              <div key={item.point} className="flex gap-3">
                <span className="text-accent mt-0.5 flex-shrink-0">+</span>
                <div>
                  <span className="font-medium text-foreground">{item.point}</span>
                  <span className="text-muted">, {item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings examples */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:py-20 max-w-5xl">
        <h2 className="font-display text-2xl md:text-3xl leading-snug mb-6">
          Real earning scenarios
        </h2>
        <div className="space-y-5 text-sm text-muted leading-relaxed max-w-2xl">
          <p>
            Let&apos;s break down the math with specific examples so you know exactly what
            to expect. These scenarios use the Starter tier ($5/Plus subscriber,
            $10/Plus+ subscriber) to show conservative estimates — your actual earnings
            increase as you climb tiers.
          </p>
          <p>
            <span className="text-foreground font-medium">Scenario 1: Casual sharing.</span>{" "}
            You send your link to 20 friends who are interested in private dating.
            5 of them sign up, 2 subscribe to Plus+. You earn $10/month, every
            month, for doing nothing. Over a year, that&apos;s $120 from five minutes of effort.
          </p>
          <p>
            <span className="text-foreground font-medium">Scenario 2: One viral TikTok.</span>{" "}
            You post a video about dating tips and include your link in bio.
            It gets 50K views and drives 300 signups. If 10% subscribe (30 people),
            you&apos;re earning $150-$300/month. That single video pays you for years.
          </p>
          <p>
            <span className="text-foreground font-medium">Scenario 3: Consistent content creator.</span>{" "}
            You make weekly content about dating, lifestyle, or relationships. Over
            6 months you accumulate 1,000 signups with 150 paying subscribers.
            At the Gold tier ($25/Plus+ subscriber), you&apos;re earning $3,750/month.
            That&apos;s a meaningful income stream from content you were already making.
          </p>
          <p>
            The key insight: referrals are permanent. Someone who signs up through your
            link in January and subscribes in March still counts as your referral. You
            don&apos;t need them to convert immediately. The lifetime attribution means your
            earnings compound over time as more of your referrals eventually subscribe.
          </p>
        </div>
      </section>

      {/* Payout details */}
      <section className="border-y border-card-border bg-card">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-20 max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-6">
            How payouts work
          </h2>
          <div className="space-y-4 text-sm text-muted leading-relaxed max-w-2xl">
            <p>
              Payouts are processed on the 1st and 15th of every month via PayPal.
              Your minimum threshold is $50 — once your balance hits that, the next
              payout cycle sends your earnings automatically. No invoicing, no manual
              requests, no waiting on approvals.
            </p>
            <p>
              Your dashboard shows real-time stats: total signups, active subscribers,
              current tier, estimated next payout, and historical earnings. You can see
              exactly how much each referral is generating and track which content or
              channels drive the most conversions.
            </p>
            <p>
              There is no clawback period. If someone subscribes and then cancels a
              week later, you still earn for the month they were active. You only stop
              earning on a referral when they stop paying — which is how recurring
              revenue should work.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-28 max-w-3xl">
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-5">
          Your link. Your income.<br />Start in 2 minutes.
        </h2>
        <p className="text-muted text-sm leading-relaxed max-w-md mb-8">
          Create a free account, grab your referral link, and start sharing.
          Your first payout could be this month.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
        >
          Get your referral link, free
        </Link>
      </section>

      {/* Earnings disclaimer */}
      <section className="px-5 md:px-10 lg:px-16 pb-12 max-w-5xl">
        <p className="text-xs text-muted/60 leading-relaxed">
          Individual results vary. The earning examples above are hypothetical projections based on our commission structure, not guarantees of income. Most referrers earn between $5 and $50 per month.
        </p>
      </section>

      <PublicFooter />
    </div>
  );
}
