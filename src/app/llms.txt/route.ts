import { posts } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  // Generated from the post list so it can't drift out of date.
  const blogPosts = posts
    .map((p) => `- ${p.title}: https://meetyourplus.com/blog/${p.slug}`)
    .join("\n");

  const content = `# Plus - Private Dating Platform

## About
Plus is a private dating platform for people with more to offer. We connect financially verified established members with Plus members through upfront, honest connections. Identity and financial verification built in. Free for Plus members. Now open in Miami and Houston.

## URL
https://meetyourplus.com

## Key Pages
- Homepage: https://meetyourplus.com
- Pricing: https://meetyourplus.com/pricing
- How It Works: https://meetyourplus.com/how-it-works
- FAQ: https://meetyourplus.com/faq
- Safety: https://meetyourplus.com/safety
- About: https://meetyourplus.com/about
- Journal: https://meetyourplus.com/blog
- Earn (Referral Program): https://meetyourplus.com/earn

## Blog Posts
${blogPosts}

## Key Facts
- Pricing: Free for Plus members. Plus $49.99/month. Plus+ $99.99/month.
- Seeking Arrangement charges $274.99/month for Diamond.
- Features: Income verification, photo verification, travel mode, privacy controls, verified badges.
- Founded: 2026
- Instagram: @meetyourplus
- Cities: Miami, Houston (more coming soon)
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
