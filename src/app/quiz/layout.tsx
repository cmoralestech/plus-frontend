import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's Your Dating Style? Free Quiz | Plus",
  description:
    "Take our free dating personality quiz. 7 questions, 5 dating styles. Find out if you're The Connoisseur, Jet-Setter, Mentor & Muse, Experience Collector, or Power Match.",
  alternates: { canonical: "https://meetyourplus.com/quiz" },
  openGraph: {
    title: "What's Your Dating Style? Take the Quiz",
    description:
      "7 questions. 5 dating styles. Find out which one fits you — then find your match on Plus.",
    url: "https://meetyourplus.com/quiz",
    type: "website",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
