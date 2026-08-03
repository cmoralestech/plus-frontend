import type { MetadataRoute } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { getAllSlugs as getAllSlugsEs, getPostBySlug as getPostBySlugEs } from "@/lib/blog-es";
import { getAllSlugs as getAllSlugsPt, getPostBySlug as getPostBySlugPt } from "@/lib/blog-pt";
import { getAllSlugs as getAllSlugsTr, getPostBySlug as getPostBySlugTr } from "@/lib/blog-tr";

const CITY_SLUGS = [
  "miami", "new-york", "los-angeles", "las-vegas", "chicago", "houston",
  "dallas", "fort-worth", "plano", "austin", "san-antonio", "orlando", "tampa", "jacksonville",
  "fort-lauderdale", "san-francisco", "san-diego", "orange-county",
  "hamptons", "westchester", "reno", "atlanta", "savannah",
  "portland", "charlotte", "minneapolis", "new-orleans", "salt-lake-city",
  "kansas-city", "columbus", "honolulu",
  "boston", "washington-dc", "seattle", "denver", "nashville", "scottsdale", "philadelphia", "phoenix",
  "palm-beach", "naples", "san-jose", "raleigh", "virginia-beach", "sarasota", "pittsburgh", "baltimore",
  "dubai", "london", "toronto", "singapore", "tokyo", "mumbai", "delhi",
  "sao-paulo", "paris", "sydney", "bangalore", "mexico-city",
];

const STATE_SLUGS = [
  "alabama", "alaska", "arizona", "arkansas", "california", "colorado",
  "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho",
  "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana",
  "maine", "maryland", "massachusetts", "michigan", "minnesota",
  "mississippi", "missouri", "montana", "nebraska", "nevada",
  "new-hampshire", "new-jersey", "new-mexico", "new-york",
  "north-carolina", "north-dakota", "ohio", "oklahoma", "oregon",
  "pennsylvania", "rhode-island", "south-carolina", "south-dakota",
  "tennessee", "texas", "utah", "vermont", "virginia", "washington",
  "west-virginia", "wisconsin", "wyoming",
];

// Fixed dates for static pages (updated when content actually changes)
const CONTENT_UPDATED = new Date("2026-07-12");
const SITE_LAUNCHED = new Date("2026-05-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://meetyourplus.com";
  const blogSlugs = getAllSlugs();
  const blogSlugsEs = getAllSlugsEs();
  const blogSlugsPt = getAllSlugsPt();
  const blogSlugsTr = getAllSlugsTr();

  return [
    { url: base, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/seeking-arrangement-alternative`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/alternatives`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/join`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/for-sugar-daddies`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/allowance-calculator`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/earn`, lastModified: SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/community`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/safety`, lastModified: SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/moderation`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    ...blogSlugs.map((slug) => {
      const post = getPostBySlug(slug);
      return {
        url: `${base}/blog/${slug}`,
        lastModified: post?.dateModified ? new Date(post.dateModified) : CONTENT_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
    // Spanish blog — index only listed once it actually has posts
    ...(blogSlugsEs.length
      ? [{ url: `${base}/es/blog`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    ...blogSlugsEs.map((slug) => {
      const post = getPostBySlugEs(slug);
      return {
        url: `${base}/es/blog/${slug}`,
        lastModified: post?.dateModified ? new Date(post.dateModified) : CONTENT_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    }),
    // Portuguese blog — index only listed once it actually has posts
    ...(blogSlugsPt.length
      ? [{ url: `${base}/pt/blog`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    ...blogSlugsPt.map((slug) => {
      const post = getPostBySlugPt(slug);
      return {
        url: `${base}/pt/blog/${slug}`,
        lastModified: post?.dateModified ? new Date(post.dateModified) : CONTENT_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    }),
    // Turkish blog — index only listed once it actually has posts
    ...(blogSlugsTr.length
      ? [{ url: `${base}/tr/blog`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    ...blogSlugsTr.map((slug) => {
      const post = getPostBySlugTr(slug);
      return {
        url: `${base}/tr/blog/${slug}`,
        lastModified: post?.dateModified ? new Date(post.dateModified) : CONTENT_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    }),
    ...CITY_SLUGS.map((city) => ({
      url: `${base}/sugar-dating/${city}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Country landing pages
    { url: `${base}/sugar-dating/turkey`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${base}/sugar-dating/uk`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${base}/sugar-dating/india`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${base}/sugar-dating/germany`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly" as const, priority: 0.85 },
    ...STATE_SLUGS.map((state) => ({
      url: `${base}/sugar-dating-laws/${state}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/acceptable-use`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/law-enforcement`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/terms`, lastModified: SITE_LAUNCHED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: SITE_LAUNCHED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/quiz`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/switch-from-seeking`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/how-it-works`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/polls`, lastModified: SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faq`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.6 },
  ];
}
