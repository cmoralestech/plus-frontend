import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Plus | Support & Help",
  description:
    "Get in touch with the Plus team. Ask a question, report an issue, or reach out about partnerships and press. We respond within 24 hours.",
  alternates: { canonical: "https://meetyourplus.com/contact" },
  openGraph: {
    title: "Contact Plus | Support & Help",
    description: "Get in touch with the Plus team. We respond within 24 hours.",
    url: "https://meetyourplus.com/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
