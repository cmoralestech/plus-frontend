export function GET() {
  const content = `# Plus - Sugar Dating Platform

## About
Plus is a modern sugar dating platform and the leading alternative to Seeking Arrangement. We connect successful, verified individuals with attractive members who appreciate the finer things. Income verification required. Free for attractive members.

## URL
https://meetyourplus.com

## Key Pages
- Homepage: https://meetyourplus.com
- Seeking Arrangement Alternative: https://meetyourplus.com/seeking-arrangement-alternative
- Pricing: https://meetyourplus.com/pricing
- Safety: https://meetyourplus.com/safety
- About: https://meetyourplus.com/about
- Blog: https://meetyourplus.com/blog
- Earn (Referral Program): https://meetyourplus.com/earn
- Quiz: https://meetyourplus.com/quiz

## City Guides
- Sugar Dating in New York: https://meetyourplus.com/sugar-dating/new-york
- Sugar Dating in Miami: https://meetyourplus.com/sugar-dating/miami
- Sugar Dating in Los Angeles: https://meetyourplus.com/sugar-dating/los-angeles
- Sugar Dating in Las Vegas: https://meetyourplus.com/sugar-dating/las-vegas
- Sugar Dating in Chicago: https://meetyourplus.com/sugar-dating/chicago
- Sugar Dating in Houston: https://meetyourplus.com/sugar-dating/houston

## Blog Posts
- Best Sugar Daddy Dating Apps 2026: https://meetyourplus.com/blog/sugar-daddy-apps
- Seeking Arrangement Review 2026: https://meetyourplus.com/blog/seeking-arrangement-review
- How to Find a Sugar Daddy: https://meetyourplus.com/blog/how-to-find-a-sugar-daddy
- Sugar Baby Allowance Guide: https://meetyourplus.com/blog/sugar-baby-allowance-guide
- Is Sugar Dating Legal: https://meetyourplus.com/blog/is-sugar-dating-legal
- Sugar Dating for Beginners: https://meetyourplus.com/blog/sugar-dating-for-beginners
- Sugar Dating Scams: https://meetyourplus.com/blog/sugar-dating-scams

## Key Facts
- Pricing: Free for attractive members. Diamond $99.99/month (or $999/year).
- Seeking Arrangement charges $149.99/month for comparable features.
- Features: Income verification, photo verification, travel mode, arrangement type matching, privacy controls.
- Founded: 2026
- Headquarters: United States
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
