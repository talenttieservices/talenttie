import { ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
export default function ApplicantsPage() {
  return (
    <div>
      <Link href="/employer/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-navy text-sm mb-4"><ArrowLeft className="w-4 h-4" />Back to Jobs</Link>
      <h1 className="text-2xl font-bold text-navy mb-6">Applicants</h1>
      <div className="bg-white rounded-2xl p-12 shadow-3d border border-gray-100 text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-navy mb-2">No applicants yet</h3>
        <p className="text-gray-500">Applicants will appear here once candidates apply to this job.</p>
      </div>
    </div>
  )
}
