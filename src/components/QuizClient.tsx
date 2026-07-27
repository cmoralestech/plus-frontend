"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import NewsletterCapture from "@/components/NewsletterCapture";

interface Question {
  question: string;
  options: { label: string; emoji: string; scores: Record<string, number> }[];
}

const questions: Question[] = [
  {
    question: "Your ideal Friday night?",
    options: [
      { label: "Tasting menu at a new restaurant", emoji: "\u{1F377}", scores: { classic: 2, experience: 1 } },
      { label: "Rooftop cocktails with a view", emoji: "\u{1F303}", scores: { jetsetter: 1, classic: 1 } },
      { label: "Spontaneous weekend trip somewhere", emoji: "\u2708\uFE0F", scores: { jetsetter: 2, experience: 1 } },
      { label: "Deep conversation over homemade dinner", emoji: "\u{1F56F}\uFE0F", scores: { mentor: 2, power: 1 } },
    ],
  },
  {
    question: "What attracts you most in a person?",
    options: [
      { label: "Ambition and drive", emoji: "\u{1F525}", scores: { power: 2, mentor: 1 } },
      { label: "Generosity and warmth", emoji: "\u{1F49B}", scores: { classic: 2 } },
      { label: "Sense of adventure", emoji: "\u{1F9ED}", scores: { jetsetter: 2, experience: 1 } },
      { label: "Wit and intelligence", emoji: "\u{1F9E0}", scores: { mentor: 2, power: 1 } },
    ],
  },
  {
    question: "Pick a dream destination.",
    options: [
      { label: "Paris in spring", emoji: "\u{1F5FC}", scores: { classic: 2, experience: 1 } },
      { label: "Private island in the Maldives", emoji: "\u{1F3DD}\uFE0F", scores: { jetsetter: 2, classic: 1 } },
      { label: "Tokyo for a week", emoji: "\u{1F3EF}", scores: { experience: 2, jetsetter: 1 } },
      { label: "A villa in Tuscany", emoji: "\u{1F347}", scores: { mentor: 1, classic: 1, power: 1 } },
    ],
  },
  {
    question: "What\u2019s your love language?",
    options: [
      { label: "Quality time together", emoji: "\u231B", scores: { mentor: 2, power: 1 } },
      { label: "Thoughtful gifts and surprises", emoji: "\u{1F381}", scores: { classic: 2, experience: 1 } },
      { label: "New experiences and adventures", emoji: "\u{1F3AD}", scores: { experience: 2, jetsetter: 1 } },
      { label: "Words of affirmation", emoji: "\u{1F4AC}", scores: { mentor: 1, power: 2 } },
    ],
  },
  {
    question: "Your approach to a new connection?",
    options: [
      { label: "Let chemistry build naturally", emoji: "\u{1F30A}", scores: { classic: 1, mentor: 2 } },
      { label: "Know what I want, go after it", emoji: "\u{1F3AF}", scores: { power: 2, jetsetter: 1 } },
      { label: "Keep it light, see where it goes", emoji: "\u{1F98B}", scores: { experience: 2 } },
      { label: "Plan the perfect first impression", emoji: "\u2728", scores: { classic: 2, jetsetter: 1 } },
    ],
  },
  {
    question: "Pick a first-date vibe.",
    options: [
      { label: "Michelin-star dinner, candlelight", emoji: "\u{1F56F}\uFE0F", scores: { classic: 2 } },
      { label: "Gallery opening then late-night drinks", emoji: "\u{1F5BC}\uFE0F", scores: { experience: 2, mentor: 1 } },
      { label: "Sunset yacht cruise", emoji: "\u26F5", scores: { jetsetter: 2, classic: 1 } },
      { label: "Coffee that turns into 4 hours talking", emoji: "\u2615", scores: { mentor: 2, power: 1 } },
    ],
  },
  {
    question: "What do you value most in an arrangement?",
    options: [
      { label: "Financial security and stability", emoji: "\u{1F48E}", scores: { classic: 2 } },
      { label: "Travel and once-in-a-lifetime experiences", emoji: "\u{1F30D}", scores: { jetsetter: 2, experience: 1 } },
      { label: "Mentorship and personal growth", emoji: "\u{1F4C8}", scores: { mentor: 2, power: 1 } },
      { label: "Freedom and flexibility", emoji: "\u{1F54A}\uFE0F", scores: { experience: 2, jetsetter: 1 } },
    ],
  },
];

interface Result {
  type: string;
  title: string;
  emoji: string;
  description: string;
  traits: string[];
  ideal: string;
  color: string;
  blogLinks: { title: string; slug: string }[];
}

const results: Record<string, Result> = {
  classic: {
    type: "classic",
    title: "The Connoisseur",
    emoji: "\u{1F942}",
    description:
      "You have taste, and you're not apologizing for it. Your ideal arrangement involves candlelight, a good vintage, and someone who actually knows how to hold a conversation over dinner. You're not here for situationships \u2014 you want the real thing, just with better restaurants.",
    traits: ["Appreciates luxury", "Values consistency", "Romantically inclined", "Generous spirit"],
    ideal:
      "A traditional relationship with regular dates, mutual appreciation, and the kind of chemistry that makes the waiter uncomfortable.",
    color: "#C87F6E",
    blogLinks: [
      { title: "Private dating guide", slug: "what-is-private-dating" },
      { title: "Miami dating guide", slug: "miami-dating-guide" },
      { title: "Why we built Plus", slug: "why-we-built-plus" },
    ],
  },
  jetsetter: {
    type: "jetsetter",
    title: "The Jet-Setter",
    emoji: "\u2708\uFE0F",
    description:
      "Your ideal partner doesn't need two weeks' notice to fly somewhere. You want someone who texts \"boarding in 40 minutes, you coming?\" and means it. Your carry-on is always half-packed, and your love language is aisle seats.",
    traits: ["Adventurous", "Spontaneous", "Worldly", "Experience-driven"],
    ideal:
      "A travel companion arrangement \u2014 weekend getaways, international trips, and collecting passport stamps over things that collect dust.",
    color: "#7dd3fc",
    blogLinks: [
      { title: "Travel dating guide", slug: "travel-dating-guide" },
      { title: "Houston dating scene", slug: "houston-dating-scene" },
      { title: "Sugar Private dating guide", slug: "what-is-private-dating" },
    ],
  },
  mentor: {
    type: "mentor",
    title: "The Mentor & Muse",
    emoji: "\u{1F4DA}",
    description:
      "You went on a first date and somehow ended up talking for four hours about career goals, childhood memories, and why most people settle for less than they deserve. You want depth, not flash. The generosity is nice, but the substance is why you stay.",
    traits: ["Intellectually curious", "Patient", "Growth-oriented", "Emotionally intelligent"],
    ideal:
      "A mentorship-focused arrangement with real conversation, career guidance, and the kind of bond where you actually miss each other between dates.",
    color: "#a78bfa",
    blogLinks: [
      { title: "What is private dating?", slug: "what-is-private-dating" },
      { title: "Sugar Why we built Plus", slug: "why-we-built-plus" },
      { title: "Find your match in Miami", slug: "how-to-find-sugar-daddy-miami" },
    ],
  },
  experience: {
    type: "experience",
    title: "The Experience Collector",
    emoji: "\u{1F3AD}",
    description:
      "You'd rather have a story than a Birkin. Gallery openings, concert after-parties, that speakeasy nobody's found on Google yet \u2014 your arrangement style is about access. The best nights start with \"I know a place\" and end at 3 AM wondering how you got there.",
    traits: ["Culturally curious", "Open-minded", "Spontaneous", "Social"],
    ideal:
      "An experience-based arrangement \u2014 art, music, food, nightlife. You want the kind of dates that become stories you tell for years.",
    color: "#fb923c",
    blogLinks: [
      { title: "Sugar dating in Miami", slug: "sugar-dating-miami" },
      { title: "Art Basel Miami dating guide", slug: "art-basel-miami-dating-guide" },
      { title: "First date safety tips", slug: "first-date-safety-tips" },
    ],
  },
  power: {
    type: "power",
    title: "The Power Match",
    emoji: "\u26A1",
    description:
      "You don't want someone to take care of you \u2014 you want someone who can keep up. Your ideal arrangement is two people who chose success independently and now choose each other because they want to, not because they need to. You've split a check before and it wasn't weird.",
    traits: ["Ambitious", "Direct", "Strategic", "Independent"],
    ideal:
      "A partnership between equals \u2014 mutual respect, shared ambition, and enough confidence that neither of you is keeping score.",
    color: "#f472b6",
    blogLinks: [
      { title: "Sugar dating for men over 40", slug: "sugar-dating-for-men-over-40" },
      { title: "Sugar momma dating guide", slug: "sugar-momma-dating-guide" },
      { title: "How to spot a salt daddy", slug: "how-to-spot-salt-daddy" },
    ],
  },
};

const styleOrder = ["classic", "jetsetter", "mentor", "experience", "power"] as const;

function getResult(scores: Record<string, number>): Result {
  let maxKey = "classic";
  let maxScore = 0;
  for (const [key, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxKey = key;
    }
  }
  return results[maxKey];
}

function getPercentages(scores: Record<string, number>): Record<string, number> {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const pcts: Record<string, number> = {};
  for (const key of styleOrder) {
    pcts[key] = Math.round(((scores[key] || 0) / total) * 100);
  }
  return pcts;
}

export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    classic: 0, jetsetter: 0, mentor: 0, experience: 0, power: 0,
  });
  const [answers, setAnswers] = useState<Record<string, number>[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Update URL when result is shown
  useEffect(() => {
    if (result) {
      window.history.replaceState(null, "", `/quiz?result=${result.type}`);
    }
  }, [result]);

  const handleAnswer = useCallback((optionScores: Record<string, number>) => {
    if (animating) return;
    setAnimating(true);

    const newScores = { ...scores };
    for (const [key, val] of Object.entries(optionScores)) {
      newScores[key] = (newScores[key] || 0) + val;
    }
    setScores(newScores);
    setAnswers([...answers, optionScores]);

    setTimeout(() => {
      if (step === questions.length - 1) {
        setResult(getResult(newScores));
      } else {
        setStep(step + 1);
      }
      setAnimating(false);
    }, 300);
  }, [animating, scores, answers, step]);

  const goBack = () => {
    if (step === 0 || animating) return;
    const prevAnswer = answers[answers.length - 1];
    const newScores = { ...scores };
    for (const [key, val] of Object.entries(prevAnswer)) {
      newScores[key] = (newScores[key] || 0) - val;
    }
    setScores(newScores);
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  };

  const restart = () => {
    setStep(0);
    setScores({ classic: 0, jetsetter: 0, mentor: 0, experience: 0, power: 0 });
    setAnswers([]);
    setResult(null);
    window.history.replaceState(null, "", "/quiz");
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `I got "${result.title}" on the Plus dating style quiz ${result.emoji}\n\nTake it: https://meetyourplus.com/quiz`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `I'm ${result.title}`, text, url: "https://meetyourplus.com/quiz" });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const percentages = result ? getPercentages(scores) : null;

  return (
    <div className="max-w-xl mx-auto px-5 py-12 md:py-20">
      {!result ? (
        <>
          {/* Progress */}
          <div className="flex gap-1.5 mb-8">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i < step ? "bg-accent" : i === step ? "bg-accent/60" : "bg-card-border"
                }`}
              />
            ))}
          </div>

          {/* Back + counter */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={goBack}
              disabled={step === 0}
              className={`text-xs flex items-center gap-1 transition-colors ${
                step === 0 ? "text-muted/30 cursor-default" : "text-muted hover:text-foreground"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <p className="text-xs text-muted">
              {step + 1} of {questions.length}
            </p>
          </div>

          {/* Question */}
          <div
            className={`transition-all duration-300 ${animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
          >
            <h2 className="font-display text-2xl md:text-3xl leading-snug mb-8">
              {questions[step].question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.scores)}
                  className="w-full text-left px-5 py-4 bg-card border border-card-border rounded-xl hover:border-accent active:scale-[0.98] transition-all flex items-center gap-4 group"
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-sm font-medium group-hover:text-accent transition-colors">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Result */
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-xs text-accent tracking-[0.3em] uppercase mb-6">
            Your arrangement style
          </p>

          {/* Result card */}
          <div className="bg-card border border-card-border rounded-2xl p-8 md:p-10 mb-6">
            <div className="text-5xl mb-4">{result.emoji}</div>
            <h2
              className="font-display text-3xl md:text-4xl mb-4"
              style={{ color: result.color }}
            >
              {result.title}
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {result.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-muted-bg rounded-full text-xs font-medium text-foreground"
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="border-t border-card-border pt-5">
              <p className="text-xs text-muted uppercase tracking-wide mb-2">
                Your ideal arrangement
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {result.ideal}
              </p>
            </div>
          </div>

          {/* Score breakdown */}
          {percentages && (
            <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 mb-6">
              <p className="text-xs text-muted uppercase tracking-wide mb-4">
                Your style breakdown
              </p>
              <div className="space-y-3">
                {styleOrder.map((key) => {
                  const r = results[key];
                  const pct = percentages[key];
                  const isTop = key === result.type;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-medium ${isTop ? "text-foreground" : "text-muted"}`}
                        >
                          {r.emoji} {r.title}
                        </span>
                        <span
                          className={`text-xs ${isTop ? "text-foreground font-semibold" : "text-muted"}`}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted-bg rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isTop ? r.color : `${r.color}40`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related reads */}
          <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 mb-8">
            <p className="text-xs text-muted uppercase tracking-wide mb-4">
              Recommended reading for you
            </p>
            <div className="space-y-2">
              {result.blogLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/blog/${link.slug}`}
                  className="flex items-center gap-3 py-2 group"
                >
                  <span className="text-accent text-sm">&rarr;</span>
                  <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                    {link.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter capture */}
          <NewsletterCapture source={`quiz-${result.type}`} />

          {/* CTAs */}
          <div className="space-y-3">
            <Link
              href="/auth?mode=register"
              className="block w-full py-4 bg-accent text-background text-center rounded-xl font-semibold hover:bg-accent-dark transition-colors"
            >
              Find your match on Plus — it&apos;s free
            </Link>

            <button
              onClick={shareResult}
              className="relative block w-full py-4 border border-card-border text-center rounded-xl text-sm font-medium hover:bg-muted-bg transition-colors"
            >
              {copied ? "Copied to clipboard!" : "Share your result"}
            </button>

            <button
              onClick={restart}
              className="block w-full py-3 text-center text-sm text-muted hover:text-foreground transition-colors"
            >
              Take it again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
