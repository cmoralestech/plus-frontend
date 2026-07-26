import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sugar Dating Blog: İpuçları ve Rehberler | Plus",
  description: "Gerçek sugar dating tavsiyeleri, TikTok fantezi versiyonu değil. Güvenlik ipuçları, harçlık rehberleri, platform incelemeleri ve gerçekten nasıl işe yarayacağı.",
  alternates: { canonical: "https://meetyourplus.com/tr/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
