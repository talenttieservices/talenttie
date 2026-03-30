import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/jobs", "/jobs/", "/blog", "/blog/", "/about", "/contact", "/companies", "/for-employers", "/register"],
        disallow: ["/admin/", "/candidate/", "/employer/", "/api/", "/_next/", "/login"],
      },
      {
        // Block AI training crawlers
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web"],
        disallow: ["/"],
      },
    ],
    sitemap: "https://talenttie.com/sitemap.xml",
    host: "https://talenttie.com",
  }
}
