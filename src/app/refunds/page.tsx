import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Plus",
  description:
    "How Plus billing, cancellation and refunds work: what you're charged, how to cancel, when refunds are given, and how to request one.",
  alternates: { canonical: "https://meetyourplus.com/refunds" },
  openGraph: {
    title: "Refund & Cancellation Policy | Plus",
    description:
      "Billing, cancellation and refunds on Plus, including statutory withdrawal rights.",
    url: "https://meetyourplus.com/refunds",
    type: "website",
  },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

const LAST_UPDATED = "2 August 2026";

const sections: { title: string; body: string[] }[] = [
  {
    title: "What you pay for",
    body: [
      "Plus members use the platform free of charge. There is nothing to cancel and nothing to refund.",
      "Established members can subscribe to Plus at $49.99 per month or $499 per year, or Plus+ at $99.99 per month or $999 per year. Prices are in US dollars and shown before you confirm.",
      "Subscriptions renew automatically at the end of each billing period until you cancel. We charge the payment method on file. Payments are processed by Stripe; we never see or store your full card details.",
    ],
  },
  {
    title: "Cancelling",
    body: [
      "You can cancel at any time from Settings → Subscription, or through the billing portal linked there. Cancelling takes effect immediately and stops all future charges.",
      "You keep access to paid features until the end of the period you have already paid for. We do not cut off access the moment you cancel.",
      "You do not need to contact support to cancel, and we will not ask you to explain why. If cancellation is not working for any reason, email support@meetyourplus.com and we will cancel it for you and confirm in writing.",
    ],
  },
  {
    title: "Refunds",
    body: [
      "Cancelling stops future billing but does not by itself refund the current period, because access continues until that period ends.",
      "We will refund you in full where: you were charged after cancelling; you were charged more than once for the same period; a technical fault prevented you from using the features you paid for; or the charge was not authorised by you.",
      "We consider requests outside those circumstances case by case, and we would rather resolve a genuine complaint than argue about it. Ask.",
      "Annual subscriptions cancelled within the first 14 days are refunded in full on request.",
    ],
  },
  {
    title: "Statutory rights",
    body: [
      "If you are a consumer in the United Kingdom or the European Union, you have a statutory right to withdraw from a distance contract within 14 days. We honour that right and will refund the subscription in full on request within that period.",
      "Nothing in this policy limits rights you have under the consumer law that applies where you live.",
    ],
  },
  {
    title: "How to request a refund",
    body: [
      "Email support@meetyourplus.com from the address on your account. Tell us what was charged and what went wrong. You do not need to fill in a form or call anyone.",
      "We respond to refund requests within two business days. Approved refunds go back to the original payment method and typically appear within five to ten business days, depending on your bank.",
    ],
  },
  {
    title: "Before you file a chargeback",
    body: [
      "If something has gone wrong with a charge, contact us first. We can usually resolve it the same day, and a refund reaches you faster than a chargeback will.",
      "Filing a chargeback without contacting us may result in the account being suspended while the dispute is resolved.",
    ],
  },
];

export default function RefundsPage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      <article className="px-6 md:px-12 pt-10 md:pt-16 pb-20 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>
          Policy
        </p>
        <h1
          className="text-3xl md:text-4xl font-normal leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-base leading-relaxed" style={{ color: creamMuted }}>
          What you&apos;re charged, how to stop it, and when we give money back.
        </p>
        <p className="text-xs mt-4" style={{ color: creamMuted }}>
          Last updated {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-9" style={{ borderTop: `1px solid ${line}`, paddingTop: "2rem" }}>
          {sections.map((s) => (
            <section key={s.title}>
              <h2
                className="text-lg md:text-xl font-medium mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </h2>
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed mb-3"
                  style={{ color: creamMuted }}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section style={{ borderTop: `1px solid ${line}`, paddingTop: "2rem" }}>
            <h2
              className="text-lg md:text-xl font-medium mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Related
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: creamMuted }}>
              <Link href="/pricing" style={{ color: gold }}>Pricing</Link>
              {" · "}
              <Link href="/terms" style={{ color: gold }}>Terms of Service</Link>
              {" · "}
              <Link href="/contact" style={{ color: gold }}>Contact</Link>
            </p>
          </section>
        </div>
      </article>

      <PublicFooter />
    </div>
  );
}
