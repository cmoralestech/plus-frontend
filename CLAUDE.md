@AGENTS.md

# Arranged Frontend — Project Guidelines

## Blog Post Creation Checklist

When creating or expanding blog posts, ALWAYS follow this process:

### 1. Write the English post first
- File: `src/lib/blog.ts`
- Include: verdict box, FAQ section (H2 "Frequently asked questions" with H3 questions), datePublished, dateModified, internal links
- Target: 1,500-2,500 words minimum for new posts
- Tone: conversational, casual authority ("we" perspective), subtle humor, NOT corporate/clinical
- Avoid AI patterns: don't use "Bold label. Explanation." on every bullet, vary sentence length, limit em dashes, no "here's the thing" filler

### 2. Translate to all 3 languages
After the English post is finalized, create translated versions in:
- **Spanish** (`src/lib/blog-es.ts`) — natural Latin American Spanish, "tú" form
- **Portuguese** (`src/lib/blog-pt.ts`) — Brazilian Portuguese (PT-BR), "você" form
- **Turkish** (`src/lib/blog-tr.ts`) — natural Turkish with correct characters (İ/ı, ö, ü, ç, ş, ğ), "sen" form

Translation rules:
- Use the SAME slug as the English version
- Translate title, excerpt, metaDescription
- Keep brand names untranslated (Seeking, Arranged, Secret Benefits)
- Keep internal links pointing to English pages
- Keep the same HTML structure and verdict box styling
- NOT word-for-word translation — write naturally as a native speaker would
- FAQ H2: "Preguntas frecuentes" (ES), "Perguntas frequentes" (PT), "Sıkça sorulan sorular" (TR)

### 3. Update the sitemap
The sitemap at `src/app/sitemap.ts` auto-imports from all blog files. No manual update needed unless adding new static pages.

### 4. SEO requirements for every post
- H2 headings should target search queries (not generic labels)
- Include datePublished and dateModified (ISO format: "2026-06-18")
- FAQ section triggers automatic FAQPage JSON-LD schema (detected by the blog page component)
- Internal links to related posts using `/blog/slug` format
- Meta description under 160 characters with target keyword

## Blog Architecture

```
src/lib/blog.ts        → English posts (primary)
src/lib/blog-es.ts     → Spanish posts
src/lib/blog-pt.ts     → Portuguese posts  
src/lib/blog-tr.ts     → Turkish posts

src/app/blog/           → English blog routes
src/app/es/blog/        → Spanish blog routes
src/app/pt/blog/        → Portuguese blog routes
src/app/tr/blog/        → Turkish blog routes
```

## City Guide Pages

City guides at `src/app/sugar-dating/[city]/page.tsx` use a data-driven template. To add a city, add an entry to the `CITIES` object in that file. Use local currency for allowance ranges.

Current cities: Miami, New York, LA, Las Vegas, Chicago, Houston, Dubai, London, Toronto, Singapore, Tokyo.

## Key Technical Notes

- Blog post page auto-generates FAQPage JSON-LD from any H2 containing "faq" or "frequently asked" followed by H3+p pairs
- BlogPosting schema uses per-post datePublished/dateModified fields, falling back to "2026-06-01"
- hreflang tags are set globally in `src/app/layout.tsx` and per-post in each language's [slug] page
- The backend geocoder uses Nominatim API with a static US city cache — works globally
- Onboarding requires: display name, DOB, gender, city, and at least 1 photo
