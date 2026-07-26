import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import FaqAccordion from "./FaqAccordion";

/* ─── FAQ data ─────────────────────────────────────────────────── */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is Plus?",
        answer:
          "Plus is a luxury dating platform designed for successful individuals and the attractive, ambitious people they want to meet. Think of it as dating with clear expectations, both parties are upfront about what they're looking for, whether that's mentorship, a travel companion, or a long-term sugar relationship. We're a modern alternative to Seeking Arrangement (now called Seeking).",
      },
      {
        question: "How is Plus different from Seeking Arrangement?",
        answer:
          "Plus was built from scratch for a post-Seeking world. We offer real income and photo verification, modern design, fair pricing (attractive members are always free), privacy controls, travel mode, and an interface that doesn't feel like it was designed in 2014. No fake profiles, no aggressive paywalls, no reputation problem.",
      },
      {
        question: "Is sugar dating legal?",
        answer:
          "Yes. Sugar dating is legal. It involves two consenting adults who choose to date with clear, mutually agreed-upon expectations. Plus explicitly prohibits any form of escort services or transactional exchanges for physical intimacy. Our platform is designed for genuine relationships with defined expectations, not transactions.",
      },
      {
        question: "How do I create a profile?",
        answer:
          "Creating a profile takes about two minutes. Sign up with your email, choose whether you're joining as a successful member or an attractive member, add your photos, write a brief bio, and define your arrangement preferences. You can start browsing immediately after signing up.",
      },
      {
        question: "What's the difference between a 'successful' and 'attractive' member?",
        answer:
          "Successful members are established professionals who are looking to meet attractive, ambitious people. They typically offer financial support, mentorship, or lifestyle experiences. Attractive members are the compelling individuals they want to meet, people who bring beauty, ambition, personality, and presence to the arrangement. Both sides bring value; the labels simply define the dynamic.",
      },
    ],
  },
  {
    title: "Membership & Pricing",
    items: [
      {
        question: "Is Plus free?",
        answer:
          "For attractive members, Plus is 100% free, forever. No hidden paywalls, no bait-and-switch. You can message anyone, see all profiles, and use all core features at no cost. Successful members can create a profile and browse for free, and get one free opening message per conversation. Upgrading to Diamond unlocks unlimited messaging and all features.",
      },
      {
        question: "How much does Diamond cost?",
        answer:
          "Diamond costs $99.99 per month (or $999/year) and includes unlimited messaging, the ability to see who liked your profile, see all photos unblurred, advanced search filters, private browsing mode, hidden read receipts, priority placement in the discover feed, and a featured profile badge. One plan with everything.",
      },
      {
        question: "Can I cancel my subscription?",
        answer:
          "Yes, you can cancel anytime from your account settings. Your premium features will remain active through the end of your current billing period. There are no cancellation fees or penalties.",
      },
    ],
  },
  {
    title: "Safety & Privacy",
    items: [
      {
        question: "Is Plus safe?",
        answer:
          "Safety is foundational to Plus. Every member undergoes photo verification to confirm they are who they say they are. Successful members can complete optional income verification. We provide block and report tools, the ability to hide your profile from search, invisible browsing mode, and a dedicated trust and safety team that reviews reports promptly.",
      },
      {
        question: "How does verification work?",
        answer:
          "Photo verification requires you to take a live selfie that matches your profile photos using AI-powered facial recognition. Income verification allows successful members to verify their earnings through secure document upload, tax returns, pay stubs, or bank statements processed by a third-party verification partner. Verified members earn a badge on their profile.",
      },
      {
        question: "Can I hide my profile?",
        answer:
          "Yes. Plus offers multiple privacy controls: you can hide your profile from search results so only people you message can see you, enable invisible browsing mode to view profiles without leaving a trace, and control which photos are visible to whom. Your discretion is non-negotiable.",
      },
      {
        question: "How do I report someone?",
        answer:
          "Every profile has a report button. You can report members for fake profiles, harassment, inappropriate behavior, or any terms-of-service violation. Our trust and safety team reviews every report and takes action within 24 hours. You can also block any member instantly.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "You can delete your account from your account settings at any time. Account deletion is permanent, all your data, messages, and profile information will be removed from our servers within 30 days in compliance with privacy regulations.",
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        question: "What is Travel Mode?",
        answer:
          "Travel Mode lets you set your location to any city before you arrive. Planning a trip to Miami? Turn on Travel Mode and start connecting with members there days or weeks in advance. It works in 50+ cities worldwide and is available to all premium members.",
      },
      {
        question: "What are arrangement types?",
        answer:
          "When you create your profile, you can specify what kind of arrangement you're looking for: mentorship, travel companion, sugar relationship, long-term, or open to anything. This helps you find people who want the same thing, no guessing games.",
      },
      {
        question: "How does messaging work?",
        answer:
          "Attractive members can message anyone for free, no limits. Successful members on the free plan get one opening message per conversation. Premium and Diamond members get unlimited messaging. There's no matching requirement, if someone catches your eye, reach out directly.",
      },
      {
        question: "What are profile boosts?",
        answer:
          "Profile boosts are a Diamond feature that places your profile at the top of search results and the discovery feed for a period of time. This dramatically increases your visibility and the number of profile views and messages you receive.",
      },
      {
        question: "Does Plus have a mobile app?",
        answer:
          "Plus is a mobile-first web application that works beautifully on any device, phone, tablet, or desktop. You can add it to your home screen for an app-like experience with push notifications, smooth animations, and offline caching. Apple and Google restrict sugar dating apps from their stores, which is why Seeking lost their iOS app. Our progressive web app approach means we're never at risk of being removed from an app store, and we can ship updates instantly without waiting for app review approval.",
      },
    ],
  },
  {
    title: "Sugar Dating Basics",
    items: [
      {
        question: "What is sugar dating?",
        answer:
          "Sugar dating is a form of dating where both parties are upfront about what they bring to the relationship and what they expect in return. Successful members — typically established professionals with significant income — connect with attractive members who offer companionship, charm, and genuine connection. The financial and lifestyle expectations are discussed openly from the start, eliminating the ambiguity and game-playing that defines traditional dating apps. Sugar dating is legal in the United States, UK, Canada, Australia, and most of Europe.",
      },
      {
        question: "How is sugar dating different from regular dating?",
        answer:
          "The key difference is transparency. In traditional dating, financial dynamics exist but are rarely discussed openly — someone picks up the check, someone drives the nicer car, someone pays for the vacation. In sugar dating, these dynamics are acknowledged and agreed upon upfront. Both parties know what to expect before the first date, which saves time and prevents mismatched expectations. The relationship itself can be anything from casual companionship to a long-term partnership — the arrangement terms simply define the framework.",
      },
      {
        question: "What is a sugar daddy allowance?",
        answer:
          "An allowance is a recurring financial arrangement between a sugar daddy and sugar baby, typically paid monthly. Allowances vary significantly by city, arrangement type, and individual agreement — ranging from $2,000/month in lower cost-of-living areas to $10,000+ in major metros like New York, Miami, and Los Angeles. Some arrangements use per-date compensation instead of monthly allowances. The specific terms are always negotiated directly between the two people involved.",
      },
      {
        question: "Is sugar dating safe?",
        answer:
          "Sugar dating carries the same safety considerations as any form of dating, plus some unique factors related to the financial component. Using a verified platform like Plus significantly reduces risk: income verification confirms financial claims are real, photo verification prevents catfishing, and moderation catches scam patterns. Beyond the platform, standard dating safety applies — meet in public first, tell a friend where you're going, arrange your own transportation, and never send money to someone you haven't met in person.",
      },
      {
        question: "How do I write a good sugar dating profile?",
        answer:
          "The best profiles are specific and honest. Instead of vague statements like 'I enjoy the finer things,' describe what you actually enjoy — 'I spend my weekends at gallery openings and my mornings at the farmers market.' Include what you're looking for in an arrangement (mentorship, travel companion, regular dates), what you bring to the table, and what your lifestyle looks like. Use recent, high-quality photos that show your face clearly. Verified profiles with complete information get significantly more messages than incomplete ones.",
      },
    ],
  },
];

// Flatten for JSON-LD
const ALL_FAQS = FAQ_SECTIONS.flatMap((s) => s.items);

/* ─── Metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Sugar Dating FAQ | Plus",
  description:
    "Frequently asked questions about Plus, the luxury sugar dating platform. Learn about pricing, safety, verification, features, and how sugar dating works.",
  alternates: { canonical: "https://meetyourplus.com/faq" },
  openGraph: {
    title: "Sugar Dating FAQ | Plus",
    description:
      "Everything you need to know about Plus, the modern sugar dating platform.",
    url: "https://meetyourplus.com/faq",
    siteName: "Plus",
    type: "website",
  },
};

/* ─── Page ─────────────────────────────────────────────────────── */

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="px-5 md:px-10 lg:px-16 pt-10 md:pt-24 lg:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-8 md:mb-10">
            Frequently asked questions
          </p>
          <h1 className="font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-tight max-w-4xl mb-0">
            Everything you need to know.
          </h1>
          <p className="mt-8 text-muted text-base md:text-lg leading-relaxed max-w-xl">
            New to Plus? Curious about sugar dating? Here are answers to the
            questions we hear most, from pricing and safety to how the platform
            actually works.
          </p>
        </div>
      </section>

      {/* ═══ FAQ SECTIONS ═══ */}
      <FaqAccordion sections={FAQ_SECTIONS} />

      {/* ═══ STILL HAVE QUESTIONS ═══ */}
      <section className="border-t border-card-border px-5 md:px-10 lg:px-16 py-16 md:py-28">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
            Still have questions?
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-md mb-8">
            Our support team is here to help. Reach out anytime and we&apos;ll
            get back to you within 24 hours.
          </p>
          <a
            href="mailto:support@meetyourplus.com"
            className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
          >
            Contact support
          </a>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
