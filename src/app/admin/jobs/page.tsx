import { Briefcase, Search } from "lucide-react"

const jobs = [
  { title: "Relationship Manager", employer: "National Trust Bank", location: "Surat", applications: 34, status: "Active", posted: "20-Mar-2026" },
  { title: "Insurance Advisor", employer: "SecureLife Insurance", location: "Ahmedabad", applications: 22, status: "Active", posted: "18-Mar-2026" },
  { title: "Branch Manager", employer: "Premier Finance Bank", location: "Jaipur", applications: 15, status: "Closed", posted: "10-Mar-2026" },
  { title: "Embedded Engineer", employer: "TechBridge Solutions", location: "Pune", applications: 45, status: "Active", posted: "15-Mar-2026" },
  { title: "Area Sales Manager", employer: "HUL", location: "Mumbai", applications: 28, status: "Active", posted: "22-Mar-2026" },
]

export default function AdminJobsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Jobs</h1>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search jobs..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-64" /></div>
      </div>
      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50"><th className="text-left px-5 py-3 font-medium text-gray-500">Title</th><th className="text-left px-5 py-3 font-medium text-gray-500">Employer</th><th className="text-left px-5 py-3 font-medium text-gray-500">Location</th><th className="text-left px-5 py-3 font-medium text-gray-500">Apps</th><th className="text-left px-5 py-3 font-medium text-gray-500">Posted</th><th className="text-left px-5 py-3 font-medium text-gray-500">Status</th></tr></thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.title} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-navy">{j.title}</td>
                <td className="px-5 py-3 text-gray-500">{j.employer}</td>
                <td className="px-5 py-3 text-gray-500">{j.location}</td>
                <td className="px-5 py-3 text-navy font-medium">{j.applications}</td>
                <td className="px-5 py-3 text-gray-500">{j.posted}</td>
                <td className="px-5 py-3"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${j.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{j.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
