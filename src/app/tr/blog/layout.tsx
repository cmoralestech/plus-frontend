import type { Metadata } from "next";
import { indexAlternates, localeHasPosts } from "@/lib/blog-alternates";

export const metadata: Metadata = {
  title: "Sugar Dating Blog: İpuçları ve Rehberler | Plus",
  description: "Gerçek sugar dating tavsiyeleri, TikTok fantezi versiyonu değil. Güvenlik ipuçları, harçlık rehberleri, platform incelemeleri ve gerçekten nasıl işe yarayacağı.",
  alternates: {
    canonical: "https://meetyourplus.com/tr/blog",
    languages: indexAlternates(),
  },
  // Empty until posts are translated into this locale — keep it out of the index
  // rather than shipping a thin, contentless listing page.
  robots: localeHasPosts("tr") ? undefined : { index: false, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
