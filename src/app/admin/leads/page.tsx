import { Target, Search } from "lucide-react"

const leads = [
  { name: "Rajesh Verma", email: "rajesh@company.com", source: "Contact Form", date: "28-Mar-2026", status: "New" },
  { name: "Sunita Devi", email: "sunita@firm.in", source: "Job Posting", date: "27-Mar-2026", status: "Contacted" },
  { name: "Mahesh Patel", email: "mahesh@corp.com", source: "Blog", date: "25-Mar-2026", status: "Qualified" },
  { name: "Anita Rao", email: "anita@enterprise.in", source: "Referral", date: "23-Mar-2026", status: "New" },
]

const statusBadge: Record<string, string> = { New: "bg-blue-100 text-blue-700", Contacted: "bg-orange-100 text-orange-700", Qualified: "bg-green-100 text-green-700", Lost: "bg-red-100 text-red-700" }

export default function AdminLeadsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Leads</h1>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search leads..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-64" /></div>
      </div>
      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50"><th className="text-left px-5 py-3 font-medium text-gray-500">Name</th><th className="text-left px-5 py-3 font-medium text-gray-500">Email</th><th className="text-left px-5 py-3 font-medium text-gray-500">Source</th><th className="text-left px-5 py-3 font-medium text-gray-500">Date</th><th className="text-left px-5 py-3 font-medium text-gray-500">Status</th></tr></thead>
          <tbody>
            {leads.map(l => (
              <tr key={l.email} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-navy">{l.name}</td>
                <td className="px-5 py-3 text-gray-500">{l.email}</td>
                <td className="px-5 py-3 text-gray-500">{l.source}</td>
                <td className="px-5 py-3 text-gray-500">{l.date}</td>
                <td className="px-5 py-3"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[l.status] || "bg-gray-100 text-gray-700"}`}>{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
