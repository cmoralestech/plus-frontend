import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sugar Dating Blog: Tips, Guides & Honest Advice | Plus",
  description: "Real sugar dating advice, not the TikTok fantasy version. Safety tips, allowance guides, platform reviews, and how to actually make it work.",
  alternates: {
    canonical: "https://meetyourplus.com/blog",
    languages: {
      en: "https://meetyourplus.com/blog",
      es: "https://meetyourplus.com/es/blog",
      pt: "https://meetyourplus.com/pt/blog",
      tr: "https://meetyourplus.com/tr/blog",
      "x-default": "https://meetyourplus.com/blog",
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
