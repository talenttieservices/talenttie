import Link from "next/link"
import { Bookmark, Briefcase } from "lucide-react"

export default function SavedJobsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Saved Jobs</h1>
      <div className="bg-white rounded-2xl p-12 shadow-3d border border-gray-100 text-center">
        <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-navy mb-2">No saved jobs yet</h3>
        <p className="text-gray-500 mb-6">Save jobs you&apos;re interested in to review them later.</p>
        <Link href="/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl btn-3d font-medium"><Briefcase className="w-4 h-4" />Browse Jobs</Link>
      </div>
    </div>
  )
}
