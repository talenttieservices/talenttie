import { Users, Search } from "lucide-react"

const users = [
  { name: "Rahul Sharma", email: "rahul@gmail.com", role: "CANDIDATE", joined: "15-Mar-2026", status: "Active" },
  { name: "Priya Patel", email: "priya@company.com", role: "EMPLOYER", joined: "12-Mar-2026", status: "Active" },
  { name: "Amit Kumar", email: "amit@gmail.com", role: "CANDIDATE", joined: "10-Mar-2026", status: "Inactive" },
  { name: "Neha Singh", email: "neha@firm.com", role: "EMPLOYER", joined: "08-Mar-2026", status: "Active" },
  { name: "Vikram Joshi", email: "vikram@gmail.com", role: "CANDIDATE", joined: "05-Mar-2026", status: "Active" },
]

const roleBadge: Record<string, string> = { CANDIDATE: "bg-blue-100 text-blue-700", EMPLOYER: "bg-purple-100 text-purple-700", ADMIN: "bg-red-100 text-red-700" }

export default function AdminUsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Users</h1>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-64" /></div>
      </div>
      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50"><th className="text-left px-5 py-3 font-medium text-gray-500">Name</th><th className="text-left px-5 py-3 font-medium text-gray-500">Email</th><th className="text-left px-5 py-3 font-medium text-gray-500">Role</th><th className="text-left px-5 py-3 font-medium text-gray-500">Joined</th><th className="text-left px-5 py-3 font-medium text-gray-500">Status</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.email} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-navy">{u.name}</td>
                <td className="px-5 py-3 text-gray-500">{u.email}</td>
                <td className="px-5 py-3"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge[u.role] || "bg-gray-100 text-gray-700"}`}>{u.role}</span></td>
                <td className="px-5 py-3 text-gray-500">{u.joined}</td>
                <td className="px-5 py-3"><span className={`text-xs font-medium ${u.status === "Active" ? "text-green-600" : "text-gray-400"}`}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
