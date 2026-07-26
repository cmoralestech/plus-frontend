export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  datePublished?: string;
  dateModified?: string;
  tag: string;
  readTime: string;
  content: string; // HTML content
  metaDescription: string;
  featuredImage?: string; // URL for hero image
  featuredImageAlt?: string;
}

export const posts: BlogPost[] = [
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  // Prefer same tag, then fall back to other posts
  const sameTag = posts.filter((p) => p.slug !== slug && p.tag === current.tag);
  const others = posts.filter((p) => p.slug !== slug && p.tag !== current.tag);
  return [...sameTag, ...others].slice(0, count);
}
