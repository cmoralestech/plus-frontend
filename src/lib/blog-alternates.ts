import { getPostBySlug as getEn, posts as postsEn } from "@/lib/blog";
import { getPostBySlug as getEs, posts as postsEs } from "@/lib/blog-es";
import { getPostBySlug as getPt, posts as postsPt } from "@/lib/blog-pt";
import { getPostBySlug as getTr, posts as postsTr } from "@/lib/blog-tr";

const SITE = "https://meetyourplus.com";

const LOCALES = [
  { code: "en", path: "/blog", lookup: getEn, all: postsEn },
  { code: "es", path: "/es/blog", lookup: getEs, all: postsEs },
  { code: "pt", path: "/pt/blog", lookup: getPt, all: postsPt },
  { code: "tr", path: "/tr/blog", lookup: getTr, all: postsTr },
] as const;

/** Locale codes whose blog actually has at least one post. */
export function localesWithPosts(): string[] {
  return LOCALES.filter(({ all }) => all.length > 0).map(({ code }) => code);
}

/** True when the given locale's blog has content worth indexing. */
export function localeHasPosts(code: string): boolean {
  return localesWithPosts().includes(code);
}

/** hreflang map for the blog index, limited to locales that have posts. */
export function indexAlternates(): Record<string, string> | undefined {
  const available = LOCALES.filter(({ all }) => all.length > 0);
  if (available.length < 2) return undefined;

  const languages: Record<string, string> = {};
  for (const { code, path } of available) {
    languages[code] = `${SITE}${path}`;
  }
  languages["x-default"] = `${SITE}/blog`;
  return languages;
}

/**
 * hreflang map for a post, containing only locales that actually have it.
 *
 * Pointing hreflang at a URL that 404s invalidates the whole cluster, so the
 * translation files are the source of truth: entries appear automatically as
 * posts are added to blog-es/pt/tr, and stay absent until then. Returns
 * undefined when English is the only version, so no alternates are emitted.
 */
export function languageAlternates(slug: string): Record<string, string> | undefined {
  const available = LOCALES.filter(({ lookup }) => lookup(slug));
  if (available.length < 2) return undefined;

  const languages: Record<string, string> = {};
  for (const { code, path } of available) {
    languages[code] = `${SITE}${path}/${slug}`;
  }
  languages["x-default"] = `${SITE}/blog/${slug}`;
  return languages;
}
