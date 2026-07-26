import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Plus",
  description: "Reset your Plus account password. We'll send you a link to create a new one.",
  robots: { index: false, follow: true },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
