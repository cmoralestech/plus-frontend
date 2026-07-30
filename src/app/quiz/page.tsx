import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import QuizClient from "@/components/QuizClient";

const faqs = [
  {
    q: "What's my dating style?",
    a: "This quiz identifies your arrangement style based on what you value most — luxury and consistency (The Connoisseur), travel and spontaneity (The Jet-Setter), intellectual connection (The Mentor & Muse), cultural experiences (The Experience Collector), or ambitious partnerships between equals (The Power Match). Most people are a mix of two or three types.",
  },
  {
    q: "Is this dating personality quiz free?",
    a: "Yes, completely free. No sign-up, no email gate, no credit card. You see your full results immediately and can share them or retake the quiz as many times as you want.",
  },
  {
    q: "How accurate is this dating style quiz?",
    a: "The quiz reflects real preferences we see across dating profiles. It highlights your dominant style, but your results page also shows a percentage breakdown of all five styles so you can see the full picture.",
  },
  {
    q: "What are the different types of dating styles?",
    a: "The five main styles are: classic/traditional (regular dates, gifts, allowance), travel-based (jet-setting with a companion), mentorship (career guidance + emotional bond), experience-driven (events, culture, nightlife), and power match (two ambitious people choosing each other as equals).",
  },
  {
    q: "Can I retake the quiz?",
    a: "Yes. Your answers aren't saved anywhere — each attempt is a clean slate. Many people retake it after a few months when their priorities shift.",
  },
];

export default function QuizPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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

      {/* Server-rendered intro visible to crawlers */}
      <div className="max-w-xl mx-auto px-5 pt-12 md:pt-20">
        <h1 className="font-display text-3xl md:text-4xl leading-snug mb-4">
          What type of dater are you?
        </h1>
        <p className="text-muted text-sm leading-relaxed mb-2">
          7 questions. 90 seconds. No sign-up required. Whether you&apos;re a Plus member
          wondering what kind of arrangement actually fits you, or a established member
          trying to figure out why your last three first dates went nowhere — this
          quiz will tell you what you actually want (even if you won&apos;t admit it).
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Be honest. The quiz can&apos;t judge you. We definitely will, but the quiz won&apos;t.
        </p>
      </div>

      <QuizClient />

      {/* Server-rendered SEO content about result types */}
      <section className="max-w-3xl mx-auto px-5 pb-16 md:pb-20">
        <h2 className="font-display text-2xl mb-4">The five dating personality types</h2>
        <p className="text-sm text-muted leading-relaxed mb-4">
          After analyzing thousands of dating profiles and arrangement preferences on
          Plus, we identified five distinct personality archetypes. Most people are a blend
          of two or three types, with one dominant style that shapes what they look for in an
          arrangement. Understanding your type helps you write a better profile, choose better
          matches, and communicate your expectations more clearly from the first message.
        </p>
        <p className="text-sm text-muted leading-relaxed mb-8">
          These archetypes aren&apos;t labels — they&apos;re starting points for self-awareness.
          A Jet-Setter might also have strong Connoisseur tendencies. A Mentor &amp; Muse might
          evolve into a Power Match as their career grows. The quiz gives you a percentage
          breakdown across all five types so you can see the full picture of what drives your
          dating preferences and arrangement expectations.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted">
          <div>
            <h3 className="text-base font-medium text-foreground mb-1">The Connoisseur</h3>
            <p>
              You have a reservation at that restaurant everyone&apos;s been posting about,
              and you&apos;d rather split a bottle of something interesting than drink alone.
              Your ideal arrangement runs on elegance, generosity, and real chemistry —
              regular dates, thoughtful gifts, and the kind of relationship where
              both people actually look forward to Friday.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium text-foreground mb-1">The Jet-Setter</h3>
            <p>
              Your carry-on is always half-packed. You don&apos;t want a partner who
              needs two weeks&apos; notice for a weekend in Tulum — you want someone who
              texts &ldquo;boarding in 40 minutes, you coming?&rdquo; International trips,
              spontaneous getaways, and collecting passport stamps over designer bags.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium text-foreground mb-1">The Mentor &amp; Muse</h3>
            <p>
              You showed up to a first date and somehow ended up talking for four hours
              about career goals and childhood memories. Your arrangement is built on
              intellectual connection, personal growth, and conversations that make you
              lose track of time. The generous part matters, but the substance matters more.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium text-foreground mb-1">The Experience Collector</h3>
            <p>
              You&apos;d rather have a story than a Birkin. Gallery openings, concert after-parties,
              that pop-up nobody knows about yet — your arrangement style is about access.
              The best nights are the ones that start with &ldquo;I know a place&rdquo; and end
              at 3 AM wondering how you got there.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium text-foreground mb-1">The Power Match</h3>
            <p>
              You don&apos;t want someone to take care of you — you want someone who matches
              your energy. Your ideal arrangement is two ambitious people choosing each
              other because they want to, not because they need to. Mutual respect,
              shared goals, and enough confidence to split the check sometimes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="max-w-3xl mx-auto px-5 pb-16 md:pb-24 border-t border-card-border pt-12">
        <h2 className="font-display text-2xl mb-8">Frequently asked questions</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="text-sm font-medium text-foreground mb-1">{faq.q}</h3>
              <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
