import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sugar Baby Allowance Calculator 2026 — Free Tool | Plus",
  description:
    "Calculate your expected sugar baby allowance based on your city, arrangement type, and experience. Real data from 2026.",
  alternates: { canonical: "https://meetyourplus.com/allowance-calculator" },
};

export default function AllowanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
