import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/discover", "/matches", "/messages", "/profile", "/settings", "/likes", "/favorites", "/search", "/onboarding", "/referrals", "/auth", "/forgot-password", "/verify-email", "/admin"],
      },
    ],
    sitemap: "https://meetyourplus.com/sitemap.xml",
  };
}
