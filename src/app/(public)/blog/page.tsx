import Link from "next/link"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Career Resources & Blog", description: "Career tips, interview preparation, resume guidance, and industry insights for job seekers across India." }

const posts = [
  { title: "How to Create a Winning Resume in 2026", excerpt: "Learn essential tips to craft a resume that stands out and passes ATS screening.", category: "Resume Help", date: "25-Mar-2026", readTime: "5 min", slug: "how-to-create-a-winning-resume", gradient: "from-blue-500 to-cyan-500" },
  { title: "Top Self-Introduction Questions for Interviews", excerpt: "Master self-introduction with commonly asked questions and expert answers.", category: "Interview Prep", date: "23-Mar-2026", readTime: "7 min", slug: "top-self-introduction-questions", gradient: "from-purple-500 to-pink-500" },
  { title: "How to Introduce Yourself in an Interview", excerpt: "Step-by-step guide to making a strong first impression in any interview.", category: "Interview Prep", date: "22-Mar-2026", readTime: "6 min", slug: "how-to-introduce-yourself", gradient: "from-orange-500 to-red-500" },
  { title: "How to Apply for Jobs Online - Step by Step", excerpt: "Complete guide for first-time job seekers on applying through job portals.", category: "Career Tips", date: "20-Mar-2026", readTime: "5 min", slug: "how-to-apply-for-jobs-online", gradient: "from-green-500 to-emerald-500" },
  { title: "Top Jobs in Tier 2 Cities India", excerpt: "Discover high-paying career opportunities in growing Indian cities.", category: "Industry Guide", date: "18-Mar-2026", readTime: "8 min", slug: "top-jobs-tier-2-cities-india", gradient: "from-indigo-500 to-blue-500" },
  { title: "Banking & Insurance Career Guide", excerpt: "Comprehensive guide to building a career in banking and financial services.", category: "Industry Guide", date: "15-Mar-2026", readTime: "10 min", slug: "bfsi-career-guide", gradient: "from-amber-500 to-orange-500" },
  { title: "How to Prepare for Your First Job Interview", excerpt: "Essential preparation tips for freshers facing their first interview.", category: "Interview Prep", date: "12-Mar-2026", readTime: "7 min", slug: "prepare-first-job-interview", gradient: "from-rose-500 to-pink-500" },
  { title: "Resume Templates for Freshers", excerpt: "Download-ready resume formats and templates for fresh graduates.", category: "Resume Help", date: "10-Mar-2026", readTime: "5 min", slug: "resume-templates-freshers", gradient: "from-teal-500 to-cyan-500" },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4"><div className="max-w-7xl mx-auto text-center"><h1 className="text-4xl font-bold text-white mb-4">Career Resources & <span className="text-primary">Insights</span></h1><p className="text-gray-400 text-lg">Expert tips on resumes, interviews, and career growth</p></div></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden card-3d shadow-3d border border-gray-100">
              <div className={`h-40 bg-gradient-to-br ${post.gradient} relative`}><div className="absolute bottom-4 left-4"><span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">{post.category}</span></div><ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-white/50 group-hover:text-white transition-all" /></div>
              <div className="p-6"><h3 className="text-lg font-bold text-navy mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3><p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p><div className="flex items-center gap-4 text-xs text-gray-400"><span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span><span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span></div></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
