import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { Mail, Shield, HelpCircle, CreditCard } from "lucide-react";

const quickLinks = [
  {
    icon: HelpCircle,
    title: "How does Plus work?",
    description: "Pricing, features, getting started",
    href: "/faq",
  },
  {
    icon: CreditCard,
    title: "Billing or subscription issue",
    description: "Cancel, upgrade, payment problems",
    href: "/faq#membership-pricing",
  },
  {
    icon: Shield,
    title: "Safety concern",
    description: "Report a member, harassment, fraud",
    href: "/safety",
  },
  {
    icon: Mail,
    title: "Privacy or data request",
    description: "Delete account, export data, GDPR",
    href: "/privacy",
  },
];

const commonFaqs = [
  {
    q: "How do I cancel my subscription?",
    a: "Go to Settings > Subscription and click \"Cancel subscription.\" Your premium features stay active through the end of your billing period. No cancellation fees. You can resubscribe at any time without losing your profile, matches, or conversation history.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings > Account and click \"Delete account.\" This is permanent — all your data, messages, and photos will be removed within 30 days. If you just want a break, consider hiding your profile instead (Settings > Privacy > Hide from search). That way you keep everything but disappear from discovery.",
  },
  {
    q: "I can't log in to my account",
    a: "Try resetting your password at meetyourplus.com/forgot-password. If you still can't get in, send us a message below with the email you signed up with and we'll help. Common issues: using a different email than you registered with, caps lock on, or browser autofill entering an old password.",
  },
  {
    q: "How long does verification take?",
    a: "Photo verification is usually approved within 2-4 hours during business hours. Income verification takes 1-2 business days because a human reviews your documents manually. We never use automated systems for income verification — real people check every submission.",
  },
  {
    q: "Someone is harassing me or making me uncomfortable",
    a: "Block them immediately from their profile (tap the three dots > Block). Then report them — go to their profile > Report and select the reason. Our safety team reviews all reports within 24 hours and can permanently ban accounts. If you feel you're in immediate danger, contact local law enforcement first, then email safety@meetyourplus.com.",
  },
  {
    q: "I was charged but my subscription isn't active",
    a: "This occasionally happens with payment processing delays. First, try logging out and back in — subscription status sometimes needs a refresh. If it still shows inactive after 15 minutes, send us a message below with your account email and approximate charge date. We'll resolve it same-day.",
  },
];

export default function ContactPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: commonFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PublicNav />

      {/* Header */}
      <section className="px-5 md:px-10 lg:px-16 pt-10 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl leading-snug mb-3">
            Get in touch
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-lg mb-4">
            Real humans read every message. We typically respond within 24 hours,
            usually faster during business hours (ET).
          </p>
          <p className="text-muted text-sm leading-relaxed max-w-lg">
            Plus is built by a small, focused team that genuinely cares about
            your experience on the platform. Whether you have a billing question,
            a safety concern, a feature suggestion, or just want to say hello, we
            want to hear from you. We do not outsource support to bots or overseas
            call centers. Every reply comes from someone who actually uses and
            builds the product.
          </p>
        </div>
      </section>

      {/* Quick help cards */}
      <section className="px-5 md:px-10 lg:px-16 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <p className="text-xs text-muted uppercase tracking-[0.15em] mb-4">
            Quick help — you might not need to wait
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-3 p-4 bg-card border border-card-border rounded-lg hover:border-accent/40 transition-colors group"
              >
                <item.icon
                  size={18}
                  className="text-muted group-hover:text-accent transition-colors mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="px-5 md:px-10 lg:px-16 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <div className="border-t border-card-border pt-10 md:pt-14">
            <h2 className="font-display text-xl md:text-2xl mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-muted mb-8">
              We&apos;ll email you back at the address you provide.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section className="px-5 md:px-10 lg:px-16 pb-12 md:pb-16">
        <div className="max-w-3xl border-t border-card-border pt-10 md:pt-14">
          <h2 className="font-display text-xl md:text-2xl mb-6">
            Common questions
          </h2>
          <div className="space-y-6">
            {commonFaqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-sm font-medium mb-1">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <Link
            href="/faq"
            className="inline-block mt-6 text-sm text-accent hover:text-accent-light transition-colors"
          >
            See all FAQs &rarr;
          </Link>
        </div>
      </section>

      {/* Direct email channels */}
      <section className="px-5 md:px-10 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-3xl border-t border-card-border pt-10 md:pt-14">
          <h2 className="font-display text-xl md:text-2xl mb-3">
            Prefer email?
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-6">
            If you prefer a direct email over the contact form, use one of the
            addresses below. Routing your message to the right team helps us
            respond faster. General questions go to support. If you have a safety
            or abuse concern that requires immediate attention, email our safety
            team directly — those messages are triaged with highest priority and
            reviewed within hours, not days. For press, partnerships, or media
            inquiries, our communications team handles everything from interviews
            to data requests for articles about dating trends.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted text-xs uppercase tracking-[0.1em] mb-1">General support</p>
              <a href="mailto:support@meetyourplus.com" className="text-accent hover:underline">
                support@meetyourplus.com
              </a>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-[0.1em] mb-1">Safety &amp; abuse</p>
              <a href="mailto:safety@meetyourplus.com" className="text-accent hover:underline">
                safety@meetyourplus.com
              </a>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-[0.1em] mb-1">Privacy &amp; data</p>
              <a href="mailto:privacy@meetyourplus.com" className="text-accent hover:underline">
                privacy@meetyourplus.com
              </a>
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-[0.1em] mb-1">Press inquiries</p>
              <a href="mailto:press@meetyourplus.com" className="text-accent hover:underline">
                press@meetyourplus.com
              </a>
            </div>
          </div>

          {/* Already published in the email footer; stated here too so the
              contact page stands on its own. */}
          <div className="mt-8 pt-6 border-t border-card-border text-sm">
            <p className="text-muted text-xs uppercase tracking-[0.1em] mb-1">Postal address</p>
            <address className="not-italic text-muted leading-relaxed">
              Plus
              <br />
              PO Box 911711
              <br />
              Houston, TX 77291
              <br />
              United States
            </address>
            <p className="text-xs text-muted mt-4">
              Support is handled by email. We reply to most messages within one
              business day, and to safety reports within hours.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
