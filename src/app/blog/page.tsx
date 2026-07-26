import { posts } from "@/lib/blog";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import BlogFilter from "./BlogFilter";

const postSummaries = posts.map(({ slug, title, tag, date, readTime, excerpt }) => ({
  slug, title, tag, date, readTime, excerpt,
}));

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="px-5 md:px-10 lg:px-16 pt-12 md:pt-20 pb-8 max-w-5xl">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Blog</p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          Insights & advice
        </h1>
        <p className="text-muted text-lg">
          Dating tips, safety guides, and lifestyle content for the Plus community.
        </p>
      </section>

      <BlogFilter posts={postSummaries} />

      <PublicFooter />
    </div>
  );
}
