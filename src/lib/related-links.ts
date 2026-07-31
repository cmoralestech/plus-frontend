/**
 * Destinations for blog slugs that were linked but never written.
 *
 * 57 `/blog/...` URLs were referenced across city pages, state pages, and the
 * Seeking comparison pages — 422 rendered links, all 404s. Nearly every one has
 * a real equivalent somewhere on the site, so each is repointed rather than
 * dropped.
 *
 * This table is the single source of truth for two things: what internal links
 * point at, and what `middleware.ts` 301s the dead URLs to. Keeping them
 * together stops the redirects from drifting away from the links.
 *
 * When a post is genuinely written later, delete its entry here and add the
 * real slug to `blog.ts`.
 */

export interface RelatedLink {
  href: string;
  /** Overrides the caller's title when the destination is about something different. */
  title?: string;
}

export const BLOG_SLUG_REDIRECTS: Record<string, RelatedLink> = {
  // ── City guides → the city landing pages ──────────────────────────────
  "sugar-dating-miami": { href: "/sugar-dating/miami" },
  "sugar-dating-new-york": { href: "/sugar-dating/new-york" },
  "sugar-dating-los-angeles": { href: "/sugar-dating/los-angeles" },
  "sugar-dating-las-vegas": { href: "/sugar-dating/las-vegas" },
  "sugar-dating-las-vegas-guide": { href: "/sugar-dating/las-vegas" },
  "sugar-dating-atlanta": { href: "/sugar-dating/atlanta" },
  "sugar-dating-austin": { href: "/sugar-dating/austin" },
  "sugar-dating-dallas": { href: "/sugar-dating/dallas" },
  "sugar-dating-dfw": { href: "/sugar-dating/dallas", title: "Sugar Dating in Dallas–Fort Worth" },
  "sugar-dating-hamptons": { href: "/sugar-dating/hamptons" },
  "sugar-dating-plano-frisco": { href: "/sugar-dating/plano", title: "Sugar Dating in Plano" },
  "sugar-dating-san-diego": { href: "/sugar-dating/san-diego" },
  "sugar-dating-san-francisco": { href: "/sugar-dating/san-francisco" },
  "sugar-dating-for-expats": { href: "/sugar-dating/dubai", title: "Sugar Dating for Expats in Dubai" },
  "best-cities-sugar-dating-worldwide": {
    href: "/sugar-dating/london",
    title: "Sugar Dating in London",
  },

  // ── "Where to meet" → the closest real guide ──────────────────────────
  "where-to-meet-sugar-daddy-miami": {
    href: "/blog/how-to-find-sugar-daddy-miami",
    title: "How to Find a Sugar Daddy in Miami",
  },
  "where-to-meet-sugar-daddy-new-york": { href: "/sugar-dating/new-york" },
  "where-to-meet-sugar-daddy-texas": {
    href: "/sugar-dating/houston",
    title: "Sugar Dating in Houston",
  },
  "where-to-meet-sugar-daddy-florida": {
    href: "/sugar-dating/miami",
    title: "Sugar Dating in Miami",
  },
  "miami-first-date-spots-sugar-dating": {
    href: "/blog/miami-dating-guide",
    title: "The Honest Guide to Dating in Miami",
  },
  "sugar-baby-miami-guide": {
    href: "/blog/sugar-dating-miami-guide",
    title: "Sugar Dating in Miami: Allowances & Culture",
  },

  // ── State-level → the state law pages ─────────────────────────────────
  "sugar-dating-california": { href: "/sugar-dating-laws/california" },
  "sugar-dating-florida": { href: "/sugar-dating-laws/florida" },
  "sugar-dating-georgia": { href: "/sugar-dating-laws/georgia" },
  "sugar-dating-nevada": { href: "/sugar-dating-laws/nevada" },
  "sugar-dating-texas": { href: "/sugar-dating-laws/texas" },
  "sugar-dating-new-york-state": { href: "/sugar-dating-laws/new-york" },
  "is-sugar-dating-legal": {
    href: "/sugar-dating-laws/florida",
    title: "Is Sugar Dating Legal? Florida Law Explained",
  },
  "sugar-dating-laws-by-country": {
    href: "/sugar-dating/uk",
    title: "Sugar Dating in the UK: Law and Culture",
  },

  // ── Seeking: leaving, bans, and comparisons ───────────────────────────
  "seeking-arrangement-alternatives": { href: "/alternatives" },
  "seeking-alternatives": { href: "/alternatives" },
  "best-sugar-dating-sites": { href: "/alternatives", title: "The Best Sugar Dating Sites Compared" },
  "sugar-daddy-apps": { href: "/alternatives", title: "Sugar Daddy Apps Compared" },
  "seeking-arrangement-review": { href: "/alternatives", title: "Seeking Arrangement Reviewed" },
  "seeking-arrangement-cost": {
    href: "/alternatives",
    title: "What Seeking Arrangement Actually Costs",
  },
  "sugardaddymeet-vs-arranged": { href: "/alternatives", title: "SugarDaddyMeet vs Plus" },
  "luxy-vs-arranged": { href: "/alternatives", title: "Luxy vs Plus" },
  "the-league-vs-arranged": { href: "/alternatives", title: "The League vs Plus" },
  "secret-benefits-vs-arranged": { href: "/alternatives", title: "Secret Benefits vs Plus" },
  "seeking-arrangement-vs-arranged": {
    href: "/seeking-arrangement-alternative",
    title: "Seeking Arrangement vs Plus",
  },
  "why-everyone-leaving-seeking-2026": {
    href: "/blog/seeking-arrangement-alternatives-2026",
    title: "Seeking Arrangement Alternatives in 2026",
  },
  "why-i-left-seeking-arrangement": {
    href: "/blog/seeking-arrangement-alternatives-2026",
    title: "Seeking Arrangement Alternatives in 2026",
  },
  "seeking-arrangement-account-banned": {
    href: "/switch-from-seeking",
    title: "Banned from Seeking? Switch to Plus",
  },
  "seeking-arrangement-appeal-letter": {
    href: "/switch-from-seeking",
    title: "Appealing a Seeking Ban",
  },
  "seeking-arrangement-banned-words": {
    href: "/switch-from-seeking",
    title: "What Gets You Banned on Seeking",
  },
  "seeking-arrangement-not-working": {
    href: "/switch-from-seeking",
    title: "Seeking Not Working? Try Plus",
  },
  "seeking-arrangement-refund-after-ban": {
    href: "/switch-from-seeking",
    title: "Refunds After a Seeking Ban",
  },
  "seeking-arrangement-unbanned": {
    href: "/switch-from-seeking",
    title: "Getting Unbanned from Seeking",
  },

  // ── Guides → the closest real guide, tool, or policy page ─────────────
  "how-to-find-a-sugar-daddy": {
    href: "/blog/how-to-find-sugar-daddy-miami",
    title: "How to Find a Sugar Daddy",
  },
  "sugar-baby-allowance-guide": {
    href: "/allowance-calculator",
    title: "Allowance Calculator",
  },
  "sugar-daddy-allowance-guide": {
    href: "/allowance-calculator",
    title: "Allowance Calculator",
  },
  "sugar-dating-for-beginners": {
    href: "/blog/what-is-private-dating",
    title: "What Is Private Dating?",
  },
  "privacy-in-sugar-dating": {
    href: "/blog/what-is-private-dating",
    title: "What Is Private Dating?",
  },
  "sugar-dating-profile-tips": {
    href: "/blog/dating-profile-that-works",
    title: "How to Write a Dating Profile That Works",
  },
  "first-date-safety-tips": { href: "/safety", title: "Safety on Plus" },
  "sugar-dating-scams": { href: "/safety", title: "Spotting Scams: Safety on Plus" },
  "sugar-dating-statistics-2026": {
    href: "/blog/what-women-want-from-dating-apps-2026",
    title: "What Women Actually Want From Dating Apps",
  },
};

/**
 * Resolve a legacy blog slug to a live destination.
 * Unknown slugs fall through to the normal blog URL.
 */
export function resolveBlogLink(slug: string, fallbackTitle?: string): { href: string; title?: string } {
  const mapped = BLOG_SLUG_REDIRECTS[slug];
  if (!mapped) return { href: `/blog/${slug}`, title: fallbackTitle };
  return { href: mapped.href, title: mapped.title ?? fallbackTitle };
}
