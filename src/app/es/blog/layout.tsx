import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Sugar Dating: Consejos y Guías | Plus",
  description: "Consejos reales sobre sugar dating, no la versión de fantasía de TikTok. Guías de seguridad, consejos de mesada, reseñas de plataformas y cómo hacer que realmente funcione.",
  alternates: { canonical: "https://meetyourplus.com/es/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
