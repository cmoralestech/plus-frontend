import type { Metadata } from "next";

// Without its own canonical this page inherits the root layout's, which points
// at the homepage.
export const metadata: Metadata = {
  title: "Join the Plus Waitlist — Bring Plus to Your City",
  description:
    "Plus is open in Miami and Houston. Tell us where you are and what you're looking for, and we'll use member demand to decide where Plus opens next.",
  alternates: { canonical: "https://meetyourplus.com/waitlist" },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
