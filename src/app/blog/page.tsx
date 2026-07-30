import { posts } from "@/lib/blog";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import BlogFilter from "./BlogFilter";

const postSummaries = posts.map(({ slug, title, tag, date, readTime, excerpt }) => ({
  slug, title, tag, date, readTime, excerpt,
}));

const blogLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://meetyourplus.com/blog#blog",
  name: "Plus Blog",
  description:
    "Sugar dating and private dating guides, city breakdowns, and honest platform reviews from the Plus team.",
  url: "https://meetyourplus.com/blog",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: "Plus",
    url: "https://meetyourplus.com",
    logo: { "@type": "ImageObject", url: "https://meetyourplus.com/icon-512.png" },
  },
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.metaDescription,
    url: `https://meetyourplus.com/blog/${p.slug}`,
    datePublished: p.datePublished ?? "2026-06-01",
    dateModified: p.dateModified ?? p.datePublished ?? "2026-06-01",
    articleSection: p.tag,
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://meetyourplus.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://meetyourplus.com/blog" },
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PublicNav />

      <section className="px-5 md:px-10 lg:px-16 pt-12 md:pt-20 pb-8 max-w-5xl">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Blog</p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          Sugar dating guides &amp; honest advice
        </h1>
        <p className="text-muted text-lg">
          Dating tips, safety guides, city breakdowns, and platform reviews for the Plus community.
        </p>
      </section>

      <BlogFilter posts={postSummaries} />

      <PublicFooter />
    </div>
  );
}
