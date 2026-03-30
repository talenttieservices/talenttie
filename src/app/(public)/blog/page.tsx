import Link from "next/link"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = { title: "Career Resources & Blog", description: "Career tips, interview preparation, resume guidance, and industry insights for job seekers across India." }

const gradients = ["from-blue-500 to-cyan-500","from-purple-500 to-pink-500","from-orange-500 to-red-500","from-green-500 to-emerald-500","from-indigo-500 to-blue-500","from-amber-500 to-orange-500","from-rose-500 to-pink-500","from-teal-500 to-cyan-500"]

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { title: true, excerpt: true, slug: true, category: true, readTime: true, createdAt: true },
  }).catch(() => [])

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Career Resources & <span className="text-primary">Insights</span></h1>
          <p className="text-gray-400 text-lg">Expert tips on resumes, interviews, and career growth</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No posts yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden card-3d shadow-3d border border-gray-100">
                <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} relative`}>
                  <div className="absolute bottom-4 left-4"><span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">{post.category || "Career Tips"}</span></div>
                  <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-white/50 group-hover:text-white transition-all" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(post.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    {post.readTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min read</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
