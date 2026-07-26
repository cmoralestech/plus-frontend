import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Sugar Dating: Dicas e Guias | Plus",
  description: "Conselhos reais sobre sugar dating, não a versão fantasia do TikTok. Dicas de segurança, guias de mesada, avaliações de plataformas e como realmente fazer funcionar.",
  alternates: { canonical: "https://meetyourplus.com/pt/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
