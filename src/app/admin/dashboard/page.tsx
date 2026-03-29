import { Users, Briefcase, FileText, Building2, Eye, Target } from "lucide-react"

const stats = [
  { label: "Total Users", value: "12,450", icon: Users, color: "bg-blue-100 text-blue-700", change: "+12%" },
  { label: "Active Jobs", value: "5,230", icon: Briefcase, color: "bg-green-100 text-green-700", change: "+8%" },
  { label: "Applications", value: "34,890", icon: FileText, color: "bg-purple-100 text-purple-700", change: "+15%" },
  { label: "Employers", value: "204", icon: Building2, color: "bg-orange-100 text-orange-700", change: "+5%" },
  { label: "Blog Views", value: "45,600", icon: Eye, color: "bg-cyan-100 text-cyan-700", change: "+22%" },
  { label: "Leads", value: "89", icon: Target, color: "bg-pink-100 text-pink-700", change: "+3%" },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-3d border border-gray-100 card-3d">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}><s.icon className="w-5 h-5" /></div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{s.change}</span>
            </div>
            <div className="text-2xl font-bold text-navy">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100"><h2 className="text-lg font-bold text-navy mb-4">Jobs by Industry</h2><div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div></div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100"><h2 className="text-lg font-bold text-navy mb-4">Applications Trend</h2><div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div></div>
      </div>
    </div>
  )
}
