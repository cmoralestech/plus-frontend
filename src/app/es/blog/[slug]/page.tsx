import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog-es";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

const gold = "#d4b896";
const dark1 = "#141210";
const dark2 = "#1a1714";
const cream = "#ede6db";
const creamMuted = "#a8a090";
const line = "#2e2a24";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Plus`,
    description: post.metaDescription,
    alternates: {
      canonical: `https://meetyourplus.com/es/blog/${slug}`,
      languages: {
        en: `https://meetyourplus.com/blog/${slug}`,
        es: `https://meetyourplus.com/es/blog/${slug}`,
        pt: `https://meetyourplus.com/pt/blog/${slug}`,
        tr: `https://meetyourplus.com/tr/blog/${slug}`,
        "x-default": `https://meetyourplus.com/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://meetyourplus.com/es/blog/${slug}`,
      type: "article",
      siteName: "Plus",
      images: [{ url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: ["https://meetyourplus.com/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.datePublished ?? "2026-06-01",
    dateModified: post.dateModified ?? post.datePublished ?? "2026-06-01",
    author: { "@type": "Person", name: "The Plus Team", url: "https://meetyourplus.com/about" },
    publisher: { "@type": "Organization", name: "Plus", url: "https://meetyourplus.com", logo: { "@type": "ImageObject", url: "https://meetyourplus.com/icon-512.png" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://meetyourplus.com/es/blog/${slug}` },
    image: "https://meetyourplus.com/og-image.png",
  };

  // Extract FAQ items from post content for FAQPage schema (rich snippets)
  const faqMatches = post.content.match(/<h2>[^<]*(?:faq|frequently asked)[^<]*<\/h2>([\s\S]*?)(?=<h2>|$)/i);
  let faqJsonLd: object | null = null;
  if (faqMatches) {
    const faqBlock = faqMatches[1];
    const questions = [...faqBlock.matchAll(/<h3>([^<]+)<\/h3>\s*<p>([\s\S]*?)(?=<h3>|$)/g)];
    if (questions.length > 0) {
      faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map(([, q, a]) => ({
          "@type": "Question",
          name: q.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: a.replace(/<\/?p>/g, "").replace(/<a [^>]*>/g, "").replace(/<\/a>/g, "").trim(),
          },
        })),
      };
    }
  }

  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <PublicNav />

      <article className="px-6 md:px-12 pt-8 md:pt-16 pb-20 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs tracking-[0.15em] uppercase" style={{ color: gold }}>{post.tag}</span>
            <span className="text-xs" style={{ color: creamMuted }}>{post.date}</span>
            <span className="text-xs" style={{ color: creamMuted }}>{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-normal leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {post.title}
          </h1>
          <p className="text-lg" style={{ color: creamMuted }}>{post.excerpt}</p>
          <p className="text-xs mt-4" style={{ color: creamMuted }}>
            By <Link href="/es/about" style={{ color: gold }}>The Plus Team</Link>
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${line}`, paddingTop: "2rem" }}>
          <div
            className="blog-content"
            style={{ color: creamMuted }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Disclaimer */}
        <div className="mt-10 px-4 py-3 rounded-lg text-xs leading-relaxed" style={{ background: dark2, color: creamMuted }}>
          <strong style={{ color: cream }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute legal, financial, or professional advice. Plus is a dating platform for consenting adults. We do not facilitate, promote, or tolerate escort services, commercial sexual activity, or any illegal activity. Always consult a qualified professional for legal or financial questions. Testimonials and claims represent individual experiences and are not guaranteed outcomes.
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 text-center" style={{ borderTop: `1px solid ${line}` }}>
          <p className="text-lg mb-4" style={{ fontFamily: "var(--font-display)" }}>Ready to get started?</p>
          <Link
            href="/auth?mode=register"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all"
            style={{ background: gold, color: dark1 }}
          >
            Create your free profile
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 pb-16 max-w-3xl mx-auto" style={{ borderTop: `1px solid ${line}`, paddingTop: "2rem" }}>
          <h2 className="text-lg font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>Keep reading</h2>
          <div className="space-y-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/es/blog/${r.slug}`} className="block group">
                <span className="text-xs tracking-[0.1em] uppercase" style={{ color: gold }}>{r.tag}</span>
                <p className="text-base font-medium group-hover:underline mt-0.5">{r.title}</p>
                <p className="text-sm mt-1" style={{ color: creamMuted }}>{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <PublicFooter />

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 { color: ${cream}; font-size: 1.5rem; font-weight: 500; margin: 2rem 0 0.75rem; font-family: var(--font-display); }
        .blog-content h3 { color: ${cream}; font-size: 1.15rem; font-weight: 500; margin: 1.5rem 0 0.5rem; }
        .blog-content p { line-height: 1.75; margin-bottom: 1rem; font-size: 0.95rem; }
        .blog-content ul, .blog-content ol { margin: 1rem 0; padding-left: 1.5rem; }
        .blog-content li { margin-bottom: 0.5rem; line-height: 1.6; font-size: 0.95rem; }
        .blog-content strong { color: ${cream}; }
        .blog-content a { color: ${gold}; text-decoration: underline; }
        .blog-content a:hover { opacity: 0.8; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.85rem; }
        .blog-content th { text-align: left; padding: 10px 12px; border-bottom: 2px solid ${line}; color: ${cream}; font-weight: 600; }
        .blog-content td { padding: 10px 12px; border-bottom: 1px solid ${line}; }
        .blog-content tr:hover { background: rgba(212,184,150,0.03); }
      `}} />
    </div>
  );
}
