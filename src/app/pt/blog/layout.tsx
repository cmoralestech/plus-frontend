import type { Metadata } from "next";
import { indexAlternates, localeHasPosts } from "@/lib/blog-alternates";

export const metadata: Metadata = {
  title: "Blog de Sugar Dating: Dicas e Guias | Plus",
  description: "Conselhos reais sobre sugar dating, não a versão fantasia do TikTok. Dicas de segurança, guias de mesada, avaliações de plataformas e como realmente fazer funcionar.",
  alternates: {
    canonical: "https://meetyourplus.com/pt/blog",
    languages: indexAlternates(),
  },
  // Empty until posts are translated into this locale — keep it out of the index
  // rather than shipping a thin, contentless listing page.
  robots: localeHasPosts("pt") ? undefined : { index: false, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
