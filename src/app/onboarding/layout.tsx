import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Profile | Plus",
  description: "Set up your Plus dating profile in 6 easy steps. Add your photos, preferences, and arrangement type.",
  robots: { index: false, follow: true },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
