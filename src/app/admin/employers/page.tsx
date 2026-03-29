import { Building2, Search } from "lucide-react"

const employers = [
  { company: "National Trust Bank", contact: "hr@axisbank.com", jobs: 12, joined: "01-Jan-2026", status: "Verified" },
  { company: "SecureLife Insurance", contact: "recruit@hdfclife.com", jobs: 8, joined: "15-Jan-2026", status: "Verified" },
  { company: "Premier Finance Bank", contact: "hr@kotak.com", jobs: 5, joined: "20-Feb-2026", status: "Pending" },
  { company: "TechBridge Solutions", contact: "talent@techbridge.com", jobs: 15, joined: "10-Feb-2026", status: "Verified" },
]

export default function AdminEmployersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Employers</h1>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search employers..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-64" /></div>
      </div>
      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50"><th className="text-left px-5 py-3 font-medium text-gray-500">Company</th><th className="text-left px-5 py-3 font-medium text-gray-500">Contact</th><th className="text-left px-5 py-3 font-medium text-gray-500">Jobs</th><th className="text-left px-5 py-3 font-medium text-gray-500">Joined</th><th className="text-left px-5 py-3 font-medium text-gray-500">Status</th></tr></thead>
          <tbody>
            {employers.map(e => (
              <tr key={e.company} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-navy">{e.company}</td>
                <td className="px-5 py-3 text-gray-500">{e.contact}</td>
                <td className="px-5 py-3 text-navy font-medium">{e.jobs}</td>
                <td className="px-5 py-3 text-gray-500">{e.joined}</td>
                <td className="px-5 py-3"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${e.status === "Verified" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{e.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
