import Link from "next/link"
import { PlusCircle, Briefcase } from "lucide-react"

export default function EmployerJobsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">My Jobs</h1>
        <Link href="/employer/jobs/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium"><PlusCircle className="w-4 h-4" />Post New Job</Link>
      </div>
      <div className="bg-white rounded-2xl p-12 shadow-3d border border-gray-100 text-center">
        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-navy mb-2">No jobs posted yet</h3>
        <p className="text-gray-500 mb-6">Create your first job posting and start receiving applications.</p>
        <Link href="/employer/jobs/new" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl btn-3d font-medium"><PlusCircle className="w-4 h-4" />Post Your First Job</Link>
      </div>
    </div>
  )
}
