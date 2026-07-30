import type { Metadata } from "next";
import { indexAlternates, localeHasPosts } from "@/lib/blog-alternates";

export const metadata: Metadata = {
  title: "Blog de Sugar Dating: Consejos y Guías | Plus",
  description: "Consejos reales sobre sugar dating, no la versión de fantasía de TikTok. Guías de seguridad, consejos de mesada, reseñas de plataformas y cómo hacer que realmente funcione.",
  alternates: {
    canonical: "https://meetyourplus.com/es/blog",
    languages: indexAlternates(),
  },
  // Empty until posts are translated into this locale — keep it out of the index
  // rather than shipping a thin, contentless listing page.
  robots: localeHasPosts("es") ? undefined : { index: false, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
