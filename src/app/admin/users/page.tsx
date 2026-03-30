"use client"
import { useEffect, useState, useCallback } from "react"
import { Search, PlusCircle, X, Loader2, CheckCircle2, XCircle, Pencil, Trash2, Eye, EyeOff } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string | null
  role: string
  emailVerified: boolean
  createdAt: string
  employer?: { companyName: string; verified: boolean } | null
}

const ROLES = ["CANDIDATE", "EMPLOYER", "ADMIN"]
const roleBadge: Record<string, string> = {
  CANDIDATE: "bg-blue-100 text-blue-700",
  EMPLOYER: "bg-purple-100 text-purple-700",
  ADMIN: "bg-red-100 text-red-700",
}

const emptyForm = { name: "", email: "", phone: "", role: "CANDIDATE", password: "", emailVerified: true }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showPass, setShowPass] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (roleFilter) params.set("role", roleFilter)
    fetch(`/api/admin/users?${params}`)
      .then(r => r.json())
      .then(d => setUsers(d.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [search, roleFilter])

  useEffect(() => { load() }, [load])

  function openAdd() {
    setEditUser(null)
    setForm(emptyForm)
    setError("")
    setShowPass(false)
    setShowModal(true)
  }

  function openEdit(u: User) {
    setEditUser(u)
    setForm({ name: u.name, email: u.email, phone: u.phone || "", role: u.role, password: "", emailVerified: u.emailVerified })
    setError("")
    setShowPass(false)
    setShowModal(true)
  }

  async function handleSave() {
    setSaving(true)
    setError("")
    try {
      let res
      if (editUser) {
        // Edit existing user
        const body: Record<string, unknown> = { name: form.name, phone: form.phone, role: form.role, emailVerified: form.emailVerified }
        if (form.password) body.password = form.password
        res = await fetch(`/api/admin/users/${editUser.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      } else {
        // Create new user
        res = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      }
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Failed"); return }
      setShowModal(false)
      load()
    } catch { setError("Network error") }
    finally { setSaving(false) }
  }

  async function toggleStatus(u: User) {
    await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailVerified: !u.emailVerified }),
    })
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user? This cannot be undone.")) return
    setDeleting(id)
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
    setDeleting(null)
    load()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-navy">Users <span className="text-base font-normal text-gray-400 ml-1">({users.length})</span></h1>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-52" />
          </div>
          {/* Role filter */}
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">All Roles</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {/* Add button */}
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium">
            <PlusCircle className="w-4 h-4" />Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-3d border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Email</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Phone</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Role</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Company</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Joined</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-navy">{u.name}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{u.email}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{u.phone || "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge[u.role] || "bg-gray-100 text-gray-700"}`}>{u.role}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{u.employer?.companyName || "—"}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => toggleStatus(u)}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                          u.emailVerified ? "bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                        }`}
                        title="Click to toggle status">
                        {u.emailVerified ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {u.emailVerified ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(u)} title="Edit user"
                          className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-gray-400 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(u.id)} title="Delete user" disabled={deleting === u.id}
                          className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors disabled:opacity-40">
                          {deleting === u.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-3d-lg w-full max-w-md p-6">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-navy mb-5">{editUser ? "Edit User" : "Add New User"}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email *</label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  type="email" placeholder="email@example.com" disabled={!!editUser}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-gray-50 disabled:text-gray-400" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Role *</label>
                  <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                  <select value={form.emailVerified ? "active" : "inactive"} onChange={e => setForm(f => ({ ...f, emailVerified: e.target.value === "active" }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  {editUser ? "New Password (leave blank to keep current)" : "Password *"}
                </label>
                <div className="relative">
                  <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    type={showPass ? "text" : "password"} placeholder={editUser ? "Enter new password" : "Minimum 8 characters"}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold btn-3d flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {saving ? "Saving..." : editUser ? "Update User" : "Create User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
