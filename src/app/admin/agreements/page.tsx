import { FileCheck, Search } from "lucide-react"

const agreements = [
  { client: "National Trust Bank", type: "Recruitment", startDate: "01-Jan-2026", endDate: "31-Dec-2026", status: "Active" },
  { client: "SecureLife Insurance", type: "RPO", startDate: "15-Feb-2026", endDate: "14-Feb-2027", status: "Active" },
  { client: "TechBridge Solutions", type: "Contract Staffing", startDate: "01-Mar-2026", endDate: "28-Feb-2027", status: "Active" },
  { client: "Premier Finance Bank", type: "Recruitment", startDate: "01-Jun-2025", endDate: "31-May-2026", status: "Expiring" },
]

export default function AdminAgreementsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Agreements</h1>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search agreements..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-64" /></div>
      </div>
      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50"><th className="text-left px-5 py-3 font-medium text-gray-500">Client</th><th className="text-left px-5 py-3 font-medium text-gray-500">Type</th><th className="text-left px-5 py-3 font-medium text-gray-500">Start</th><th className="text-left px-5 py-3 font-medium text-gray-500">End</th><th className="text-left px-5 py-3 font-medium text-gray-500">Status</th></tr></thead>
          <tbody>
            {agreements.map(a => (
              <tr key={a.client} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-navy">{a.client}</td>
                <td className="px-5 py-3 text-gray-500">{a.type}</td>
                <td className="px-5 py-3 text-gray-500">{a.startDate}</td>
                <td className="px-5 py-3 text-gray-500">{a.endDate}</td>
                <td className="px-5 py-3"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${a.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
