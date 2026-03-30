import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MessageCircle } from "lucide-react"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

async function getPost(slug: string) {
  return prisma.blogPost.findFirst({ where: { slug, published: true } }).catch(() => null)
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: "Post Not Found - TalentTie Blog" }

  const canonical = `https://talenttie.com/blog/${post.slug}`
  const description = post.metaDescription || post.excerpt || post.title

  return {
    title: post.metaTitle || post.title,
    description,
    keywords: post.tags?.length ? post.tags : [post.category || "career", "jobs india", "recruitment"],
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      type: "article",
      publishedTime: (post.publishedAt || post.createdAt).toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["TalentTie"],
      section: post.category || "Career",
      images: [{ url: post.coverImage || "/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.coverImage || "/og-image.png"],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const canonical = `https://talenttie.com/blog/${post.slug}`
  const publishedDate = (post.publishedAt || post.createdAt).toISOString()

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonical,
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.coverImage || "https://talenttie.com/og-image.png",
    datePublished: publishedDate,
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "TalentTie Editorial Team",
      url: "https://talenttie.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "TalentTie Services",
      logo: { "@type": "ImageObject", url: "https://talenttie.com/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: post.category || "Career",
    keywords: post.tags?.join(", ") || post.category || "career advice india",
    inLanguage: "en-IN",
    url: canonical,
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://talenttie.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://talenttie.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen">
        <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6">
              <ArrowLeft className="w-4 h-4" />Back to Blog
            </Link>
            {post.category && (
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />~{Math.ceil((post.content?.length || 500) / 1000)} min read
              </span>
              <span>By TalentTie Editorial Team</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="bg-white rounded-2xl p-8 sm:p-12 shadow-3d border border-gray-100 prose prose-gray max-w-none prose-headings:text-navy prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
            <p className="text-navy font-medium mb-3">Need career guidance? Our team is here to help!</p>
            <a
              href="https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium"
            >
              <MessageCircle className="w-4 h-4" />Chat on WhatsApp
            </a>
          </div>

          <div className="mt-6 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium">
              <ArrowLeft className="w-4 h-4" />Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
