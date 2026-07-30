import type { Metadata } from "next";
import { indexAlternates } from "@/lib/blog-alternates";

export const metadata: Metadata = {
  title: "Sugar Dating Blog: Tips, Guides & Honest Advice | Plus",
  description: "Real sugar dating advice, not the TikTok fantasy version. Safety tips, allowance guides, platform reviews, and how to actually make it work.",
  alternates: {
    canonical: "https://meetyourplus.com/blog",
    languages: indexAlternates(),
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
