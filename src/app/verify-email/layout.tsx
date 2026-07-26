import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Plus",
  description: "Verify your Plus email address to activate your account.",
  robots: { index: false, follow: true },
};

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
