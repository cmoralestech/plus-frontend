import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In or Join Free | Plus",
  description: "Sign up free in 2 minutes. Verified profiles, real privacy, honest dating. Plus members always free. A better alternative to Seeking.",
  robots: { index: false, follow: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
