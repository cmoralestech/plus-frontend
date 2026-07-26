"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import api from "@/lib/api";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

interface PollDef {
  slug: string;
  question: string;
  emoji: string;
  options: string[];
}

const polls: PollDef[] = [
  {
    slug: "age-gap-acceptable",
    question: "What's an acceptable age gap in a sugar relationship?",
    emoji: "📊",
    options: ["5-10 years", "10-15 years", "15-20 years", "Age is just a number"],
  },
  {
    slug: "first-date-who-pays",
    question: "On a sugar first date, who pays?",
    emoji: "💳",
    options: ["The successful member, always", "Split it like equals", "Whoever asked the other out", "Depends on the vibe"],
  },
  {
    slug: "allowance-or-experiences",
    question: "Would you rather have a cash allowance or luxury experiences?",
    emoji: "💎",
    options: ["Cash, I decide how to use it", "Experiences, memories over money", "Mix of both", "Depends on the person"],
  },
  {
    slug: "deal-breaker",
    question: "Biggest deal-breaker in a sugar arrangement?",
    emoji: "🚩",
    options: ["Dishonesty about finances", "Poor communication", "No physical chemistry", "Disrespecting boundaries"],
  },
  {
    slug: "tell-friends",
    question: "Do your friends know you sugar date?",
    emoji: "🤫",
    options: ["Everyone knows", "A few close friends", "Absolutely nobody", "Only my online friends"],
  },
  {
    slug: "ppm-vs-monthly",
    question: "PPM (per-date) or monthly allowance?",
    emoji: "💰",
    options: ["PPM, keeps things flexible", "Monthly, stability matters", "Start PPM, switch to monthly", "I don't do cash arrangements"],
  },
  {
    slug: "first-message",
    question: "Who should send the first message?",
    emoji: "💬",
    options: ["The successful member", "The attractive member", "Whoever is more interested", "I always send it myself"],
  },
  {
    slug: "verify-income",
    question: "How important is income verification on a sugar dating app?",
    emoji: "✅",
    options: ["Essential, won't use a platform without it", "Nice to have", "Don't care", "I verify everything myself"],
  },
  {
    slug: "sugar-vs-vanilla",
    question: "Could you ever go back to traditional dating?",
    emoji: "🍦",
    options: ["Never, sugar dating ruined me", "Maybe for the right person", "I do both simultaneously", "I prefer traditional but I'm curious"],
  },
  {
    slug: "biggest-green-flag",
    question: "Biggest green flag on a sugar dating profile?",
    emoji: "💚",
    options: ["Verified income", "Detailed, honest bio", "Great photos (no filters)", "Clear about what they want"],
  },
  {
    slug: "travel-or-local",
    question: "Sugar date locally or travel for arrangements?",
    emoji: "✈️",
    options: ["Local only, convenience matters", "Love traveling for dates", "Both, depends on the person", "I use travel mode constantly"],
  },
  {
    slug: "how-long-before-meeting",
    question: "How long should you chat before meeting in person?",
    emoji: "⏰",
    options: ["Same day / next day", "A few days of chatting", "At least a week", "Video call first, then decide"],
  },
];

function PollCard({ poll }: { poll: PollDef }) {
  const [voted, setVoted] = useState<number | null>(null);
  const [results, setResults] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  // Load existing vote + results
  useEffect(() => {
    const stored = localStorage.getItem(`poll_${poll.slug}`);
    if (stored !== null) {
      setVoted(parseInt(stored));
      // Load results
      api.get(`/api/polls/results?slugs=${poll.slug}`).then(({ data }) => {
        if (data[poll.slug]) setResults(data[poll.slug]);
      }).catch(() => {});
    }
  }, [poll.slug]);

  const handleVote = async (optionIndex: number) => {
    if (voted !== null || loading) return;
    setLoading(true);
    try {
      await api.post("/api/polls/vote", { slug: poll.slug, option: optionIndex });
      localStorage.setItem(`poll_${poll.slug}`, String(optionIndex));
      setVoted(optionIndex);
      // Fetch updated results
      const { data } = await api.get(`/api/polls/results?slugs=${poll.slug}`);
      if (data[poll.slug]) setResults(data[poll.slug]);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="bg-card border border-card-border rounded-xl p-5 md:p-6">
      <p className="text-lg mb-4">
        <span className="mr-2">{poll.emoji}</span>
        <span className="font-medium">{poll.question}</span>
      </p>

      <div className="space-y-2">
        {poll.options.map((opt, i) => {
          const count = results[i] || 0;
          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isMyVote = voted === i;

          return voted !== null ? (
            /* Results view */
            <div key={i} className="relative">
              <div
                className="absolute inset-0 rounded-lg transition-all"
                style={{
                  width: `${pct}%`,
                  background: isMyVote ? "var(--accent)" : "var(--muted-bg)",
                  opacity: isMyVote ? 0.15 : 0.6,
                }}
              />
              <div className="relative flex items-center justify-between px-4 py-3 rounded-lg">
                <span className={`text-sm ${isMyVote ? "font-semibold text-accent" : ""}`}>
                  {opt} {isMyVote && "←"}
                </span>
                <span className="text-sm font-medium tabular-nums">{pct}%</span>
              </div>
            </div>
          ) : (
            /* Voting view */
            <button
              key={i}
              onClick={() => handleVote(i)}
              disabled={loading}
              className="w-full text-left px-4 py-3 rounded-lg border border-card-border hover:border-accent text-sm transition-colors disabled:opacity-50"
            >
              {opt}
            </button>
          );
        })}
      </div>

      {voted !== null && totalVotes > 0 && (
        <p className="text-xs text-muted mt-3">{totalVotes.toLocaleString()} {totalVotes === 1 ? "vote" : "votes"}</p>
      )}
    </div>
  );
}

export default function PollsPage() {
  useEffect(() => { document.title = "Community Polls, Plus"; }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl leading-snug mb-3">
            Sugar dating, unfiltered.
          </h1>
          <p className="text-muted text-sm">
            Anonymous polls from the community. Vote and see what everyone else thinks.
          </p>
        </div>

        <div className="space-y-4">
          {polls.map((poll) => (
            <PollCard key={poll.slug} poll={poll} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-card-border text-center">
          <p className="font-display text-xl mb-3">Know what you want?</p>
          <p className="text-sm text-muted mb-6">Join thousands of honest daters on Plus.</p>
          <Link
            href="/auth?mode=register"
            className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm font-semibold hover:bg-accent-dark transition-colors"
          >
            Create your free profile
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link href="/quiz" className="text-sm text-accent hover:text-accent-light transition-colors">
            Take the arrangement style quiz &rarr;
          </Link>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
