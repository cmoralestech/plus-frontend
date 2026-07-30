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
          "Plus is a private dating platform designed for successful individuals and the attractive, ambitious people they want to meet. Think of it as dating with clear expectations — both parties are upfront about what they're looking for, whether that's mentorship, a travel companion, or a long-term relationship. We're a modern, affordable alternative to Seeking Arrangement (now called Seeking).",
      },
      {
        question: "How is Plus different from Seeking Arrangement?",
        answer:
          "Plus was built from scratch for a post-Seeking world. We offer real photo verification, modern design, fair pricing (Free tier available for everyone), privacy controls, travel mode, and an interface that doesn't feel like it was designed in 2014. No fake profiles, no aggressive paywalls, no reputation problem.",
      },
      {
        question: "Is upfront dating legal?",
        answer:
          "Yes. Upfront dating is legal. It involves two consenting adults who choose to date with clear, mutually agreed-upon expectations. Plus explicitly prohibits any form of escort services or transactional exchanges for physical intimacy. Our platform is designed for genuine relationships with defined expectations, not transactions.",
      },
      {
        question: "How do I create a profile?",
        answer:
          "Creating a profile takes about two minutes. Sign up with your email, choose whether you're joining as an established member or a Plus member, add your photos, write a brief bio, and define your dating preferences. You can start browsing immediately after signing up.",
      },
      {
        question: "What's the difference between a 'successful' and 'attractive' member?",
        answer:
          "Established members are established professionals who are looking to meet attractive, ambitious people. They typically offer financial generosity, mentorship, or lifestyle experiences. Plus members are the compelling individuals they want to meet — people who bring beauty, ambition, personality, and presence to the relationship. Both sides bring value; the labels simply define the dynamic.",
      },
    ],
  },
  {
    title: "Membership & Pricing",
    items: [
      {
        question: "Is Plus free?",
        answer:
          "Plus has a Free tier that's available to everyone, forever. It includes profile creation, browsing, likes, matching, and 5 messages per day. Upgrading to Plus ($49.99/mo) unlocks unlimited messaging, verified badge, and privacy features. Plus+ ($99.99/mo) adds priority placement, travel mode, read receipts, profile boost, and unlimited likes.",
      },
      {
        question: "How much does Plus cost?",
        answer:
          "Plus is $49.99 per month (or $499/year) and includes unlimited messaging, the ability to see who liked your profile, a verified badge, hide from search, and photo blurring for non-matches. Plus+ is $99.99 per month (or $999/year) and adds priority placement in the discover feed, travel mode, read receipts, profile boost, and unlimited likes.",
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
          "Safety is foundational to Plus. Every member can undergo photo verification to confirm they are who they say they are. Established members can complete optional income verification. We provide block and report tools, the ability to hide your profile from search, invisible browsing mode, and a dedicated trust and safety team that reviews reports promptly.",
      },
      {
        question: "How does verification work?",
        answer:
          "Photo verification requires you to take a live selfie that matches your profile photos using AI-powered facial recognition. Income verification allows established members to verify their earnings through secure document upload — tax returns, pay stubs, or bank statements processed by a third-party verification partner. Verified members earn a badge on their profile.",
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
          "You can delete your account from your account settings at any time. Account deletion is permanent — all your data, messages, and profile information will be removed from our servers within 30 days in compliance with privacy regulations.",
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        question: "What is Travel Mode?",
        answer:
          "Travel Mode lets you set your location to any city before you arrive. Planning a trip to Miami? Turn on Travel Mode and start connecting with members there days or weeks in advance. It's available to Plus+ members.",
      },
      {
        question: "What are dating preferences?",
        answer:
          "When you create your profile, you can specify what kind of connection you're looking for: mentorship, travel companion, long-term relationship, or open to anything. This helps you find people who want the same thing — no guessing games.",
      },
      {
        question: "How does messaging work?",
        answer:
          "Free members get 5 messages per day. Plus members ($49.99/mo) get unlimited messaging. There's no matching requirement — if someone catches your eye, reach out directly.",
      },
      {
        question: "What are profile boosts?",
        answer:
          "Profile boosts are a Plus+ feature that places your profile at the top of search results and the discovery feed for a period of time. This dramatically increases your visibility and the number of profile views and messages you receive.",
      },
      {
        question: "Does Plus have a mobile app?",
        answer:
          "Plus is a mobile-first web application that works beautifully on any device — phone, tablet, or desktop. You can add it to your home screen for an app-like experience with push notifications, smooth animations, and offline caching. Our progressive web app approach means we're never at risk of being removed from an app store, and we can ship updates instantly without waiting for app review approval.",
      },
    ],
  },
  {
    title: "Private Dating Basics",
    items: [
      {
        question: "What is private dating?",
        answer:
          "Private dating is a form of dating where both parties are upfront about what they bring to the relationship and what they expect in return. Established members — typically established professionals with significant income — connect with Plus members who offer companionship, charm, and genuine connection. The expectations are discussed openly from the start, eliminating the ambiguity and game-playing that defines traditional dating apps.",
      },
      {
        question: "How is upfront dating different from regular dating?",
        answer:
          "The key difference is transparency. In traditional dating, financial dynamics exist but are rarely discussed openly — someone picks up the check, someone drives the nicer car, someone pays for the vacation. In upfront dating, these dynamics are acknowledged and agreed upon from the start. Both parties know what to expect before the first date, which saves time and prevents mismatched expectations. The relationship itself can be anything from casual companionship to a long-term partnership.",
      },
      {
        question: "Is private dating safe?",
        answer:
          "Private dating carries the same safety considerations as any form of dating. Using a verified platform like Plus significantly reduces risk: photo verification prevents catfishing, income verification confirms financial claims are real, and moderation catches scam patterns. Beyond the platform, standard dating safety applies — meet in public first, tell a friend where you're going, arrange your own transportation, and never send money to someone you haven't met in person.",
      },
      {
        question: "How do I write a good profile?",
        answer:
          "The best profiles are specific and honest. Instead of vague statements like 'I enjoy the finer things,' describe what you actually enjoy — 'I spend my weekends at gallery openings and my mornings at the farmers market.' Include what you're looking for (mentorship, travel companion, regular dates), what you bring to the table, and what your lifestyle looks like. Use recent, high-quality photos that show your face clearly. Verified profiles with complete information get significantly more messages than incomplete ones.",
      },
    ],
  },
];

// Flatten for JSON-LD
const ALL_FAQS = FAQ_SECTIONS.flatMap((s) => s.items);

/* ─── Metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Private Dating FAQ | Plus",
  description:
    "Frequently asked questions about Plus, the private dating platform for people with more to offer. Learn about pricing, safety, verification, and features.",
  alternates: { canonical: "https://meetyourplus.com/faq" },
  openGraph: {
    title: "Private Dating FAQ | Plus",
    description:
      "Everything you need to know about Plus, the modern private dating platform.",
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
            New to Plus? Curious about private dating? Here are answers to the
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
