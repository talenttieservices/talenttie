"use client"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewBlogPostPage() {
  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-navy text-sm mb-4"><ArrowLeft className="w-4 h-4" />Back to Blog</Link>
      <h1 className="text-2xl font-bold text-navy mb-6">New Blog Post</h1>
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3d border border-gray-100 space-y-5">
        <div><label className="block text-sm font-medium text-navy mb-1.5">Title *</label><input type="text" placeholder="Post title" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Slug</label><input type="text" placeholder="post-url-slug" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Excerpt</label><textarea rows={3} placeholder="Short description for previews..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        <div><label className="block text-sm font-medium text-navy mb-1.5">Content *</label><textarea rows={12} placeholder="Write your blog post content here..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        <div className="flex gap-3">
          <button className="px-8 py-3 bg-primary text-white rounded-xl btn-3d font-semibold flex items-center gap-2"><Save className="w-4 h-4" />Publish</button>
          <button className="px-8 py-3 bg-gray-100 text-navy rounded-xl font-semibold hover:bg-gray-200 transition-colors">Save Draft</button>
        </div>
      </div>
    </div>
  )
}
