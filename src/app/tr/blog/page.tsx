"use client";

import { useState } from "react";
import Link from "next/link";
import { posts } from "@/lib/blog-tr";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

const tags = Array.from(new Set(posts.map((p) => p.tag)));

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? posts.filter((p) => p.tag === activeTag) : posts;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="px-5 md:px-10 lg:px-16 pt-12 md:pt-20 pb-8 max-w-5xl">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Blog</p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          İpuçları ve rehberler
        </h1>
        <p className="text-muted text-lg">
          Flört ipuçları, güvenlik rehberleri ve Plus topluluğu için içerikler.
        </p>
      </section>

      {/* Tag filter pills */}
      <div className="px-5 md:px-10 lg:px-16 pb-8 max-w-5xl">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              !activeTag ? "border-accent bg-accent/10 text-accent" : "border-card-border text-muted hover:border-muted"
            }`}
          >
            All ({posts.length})
          </button>
          {tags.map((tag) => {
            const count = posts.filter((p) => p.tag === tag).length;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeTag === tag ? "border-accent bg-accent/10 text-accent" : "border-card-border text-muted hover:border-muted"
                }`}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <section className="px-5 md:px-10 lg:px-16 pb-20 md:pb-28">
        <div className="max-w-5xl space-y-0">
          {filtered.map((post, i) => (
            <Link
              key={post.slug}
              href={`/tr/blog/${post.slug}`}
              className="group block py-8 border-t border-card-border"
            >
              <div className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-12">
                <div className="flex md:flex-col gap-3 md:gap-1">
                  <span className="text-xs tracking-[0.15em] uppercase text-accent">{post.tag}</span>
                  <span className="text-xs text-muted">{post.date}</span>
                  <span className="text-xs text-muted">{post.readTime}</span>
                </div>
                <div>
                  <h2 className="font-display text-xl md:text-2xl leading-snug mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted text-center py-16">No posts in this category.</p>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
