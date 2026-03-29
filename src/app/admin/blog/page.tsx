import Link from "next/link"
import { FileText, PlusCircle, Eye, Calendar } from "lucide-react"

const posts = [
  { title: "Top 10 Interview Tips for Banking & Finance Jobs", status: "Published", views: 1234, date: "25-Mar-2026" },
  { title: "How to Build a Career in IT Recruitment", status: "Published", views: 890, date: "20-Mar-2026" },
  { title: "Resume Writing Guide for Freshers", status: "Draft", views: 0, date: "28-Mar-2026" },
]

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Blog Posts</h1>
        <Link href="/admin/blog/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium"><PlusCircle className="w-4 h-4" />New Post</Link>
      </div>
      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50"><th className="text-left px-5 py-3 font-medium text-gray-500">Title</th><th className="text-left px-5 py-3 font-medium text-gray-500">Status</th><th className="text-left px-5 py-3 font-medium text-gray-500">Views</th><th className="text-left px-5 py-3 font-medium text-gray-500">Date</th></tr></thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.title} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-navy">{p.title}</td>
                <td className="px-5 py-3"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === "Published" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{p.status}</span></td>
                <td className="px-5 py-3 text-gray-500 flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{p.views.toLocaleString()}</td>
                <td className="px-5 py-3 text-gray-500">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
