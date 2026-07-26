import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sugar Dating Polls: Anonymous Community Votes | Plus",
  description: "What do real sugar daters think? Vote on age gaps, allowances, deal-breakers, and more. See results instantly. 100% anonymous.",
  alternates: { canonical: "https://meetyourplus.com/polls" },
};

export default function PollsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
