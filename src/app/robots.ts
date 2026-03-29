import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/candidate/", "/employer/", "/api/"] },
    sitemap: "https://talenttie.com/sitemap.xml",
  }
}
