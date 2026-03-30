"use client"
import { useEffect, useState } from "react"
import {
  Users, Crown, Trash2, Loader2, Plus, X,
  AlertCircle, CheckCircle2, Phone, Mail, Calendar,
  UserPlus, ChevronDown,
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  memberRole: "OWNER" | "MANAGER" | "RECRUITER"
  memberId: string
  emailVerified: boolean
  createdAt: string
}

const ROLE_OPTIONS = [
  { value: "MANAGER", label: "Manager" },
  { value: "RECRUITER", label: "Recruiter" },
]

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  OWNER: { label: "Owner", color: "bg-amber-100 text-amber-700" },
  MANAGER: { label: "Manager", color: "bg-blue-100 text-blue-700" },
  RECRUITER: { label: "Recruiter", color: "bg-teal-100 text-teal-700" },
}

type AddTab = "existing" | "new"

interface ExistingUserForm {
  email: string
  role: string
}

interface NewUserForm {
  name: string
  email: string
  phone: string
  password: string
  role: string
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  } catch {
    return iso
  }
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [tab, setTab] = useState<AddTab>("existing")
  const [submitting, setSubmitting] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [changingRole, setChangingRole] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [existingForm, setExistingForm] = useState<ExistingUserForm>({ email: "", role: "RECRUITER" })
  const [newForm, setNewForm] = useState<NewUserForm>({ name: "", email: "", phone: "", password: "", role: "RECRUITER" })

  function clearAlert() {
    setSuccess(null)
    setError(null)
  }

  function showSuccess(msg: string) {
    setSuccess(msg)
    setError(null)
    setTimeout(() => setSuccess(null), 4000)
  }

  function showError(msg: string) {
    setError(msg)
    setSuccess(null)
  }

  async function fetchTeam() {
    setLoading(true)
    try {
      const res = await fetch("/api/employer/team")
      const data = await res.json()
      if (data.team) setTeam(data.team)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTeam() }, [])

  async function handleAddMember(e: React.FormEvent) {
    e.preventDefault()
    clearAlert()
    setSubmitting(true)
    try {
      const body = tab === "existing"
        ? { type: "existing", email: existingForm.email, role: existingForm.role }
        : { type: "new", ...newForm }

      const res = await fetch("/api/employer/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to add member")
      setModalOpen(false)
      setExistingForm({ email: "", role: "RECRUITER" })
      setNewForm({ name: "", email: "", phone: "", password: "", role: "RECRUITER" })
      showSuccess("Team member added successfully.")
      fetchTeam()
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to add team member.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRoleChange(memberId: string, newRole: string) {
    clearAlert()
    setChangingRole(memberId)
    try {
      const res = await fetch(`/api/employer/team/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to update role")
      setTeam(prev => prev.map(m => m.memberId === memberId ? { ...m, memberRole: newRole as TeamMember["memberRole"] } : m))
      showSuccess("Role updated.")
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to update role.")
    } finally {
      setChangingRole(null)
    }
  }

  async function handleRemove(memberId: string, name: string) {
    if (!confirm(`Remove ${name} from the team? This cannot be undone.`)) return
    clearAlert()
    setRemovingId(memberId)
    try {
      const res = await fetch(`/api/employer/team/${memberId}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to remove member")
      setTeam(prev => prev.filter(m => m.memberId !== memberId))
      showSuccess(`${name} has been removed from the team.`)
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to remove member.")
    } finally {
      setRemovingId(null)
    }
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 text-sm text-navy placeholder-gray-400 transition"
  const labelClass = "block text-sm font-medium text-navy mb-1.5"

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Team Members</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {loading ? "Loading..." : `${team.length} member${team.length !== 1 ? "s" : ""} in your team`}
          </p>
        </div>
        <button
          onClick={() => { clearAlert(); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl btn-3d text-sm font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Alerts */}
      {success && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="flex-1">{success}</span>
          <button onClick={() => setSuccess(null)}><X className="w-4 h-4" /></button>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Team Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
          </div>
        ) : team.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <Users className="w-12 h-12 mb-3 opacity-25" />
            <p className="text-base font-medium text-gray-500">No team members yet</p>
            <p className="text-sm mt-1 mb-4">Add recruiters and managers to collaborate</p>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition"
            >
              <Plus className="w-4 h-4" />Add First Member
            </button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {team.map(member => {
                    const isOwner = member.memberRole === "OWNER"
                    const roleInfo = ROLE_LABELS[member.memberRole] ?? { label: member.memberRole, color: "bg-gray-100 text-gray-600" }
                    const isRoleChanging = changingRole === member.memberId
                    const isRemoving = removingId === member.memberId
                    return (
                      <tr key={member.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isOwner ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary"
                            }`}>
                              {member.name?.[0]?.toUpperCase() ?? "?"}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-navy">{member.name}</span>
                                {isOwner && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-600 text-sm">{member.email}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-500 text-sm">{member.phone || "—"}</span>
                        </td>
                        <td className="px-4 py-4">
                          {isOwner ? (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
                              <Crown className="w-3 h-3" />{roleInfo.label}
                            </span>
                          ) : (
                            <div className="relative inline-block">
                              <select
                                value={member.memberRole}
                                onChange={e => handleRoleChange(member.memberId, e.target.value)}
                                disabled={isRoleChanging}
                                className={`appearance-none pl-2.5 pr-7 py-1.5 rounded-full text-xs font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ${roleInfo.color} disabled:opacity-60`}
                              >
                                {ROLE_OPTIONS.map(r => (
                                  <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                              </select>
                              {isRoleChanging ? (
                                <Loader2 className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 animate-spin" />
                              ) : (
                                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.emailVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}>
                            {member.emailVerified ? "Active" : "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-400 text-xs">{formatDate(member.createdAt)}</span>
                        </td>
                        <td className="px-4 py-4">
                          {!isOwner && (
                            <button
                              onClick={() => handleRemove(member.memberId, member.name)}
                              disabled={isRemoving}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Remove member"
                            >
                              {isRemoving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {team.map(member => {
                const isOwner = member.memberRole === "OWNER"
                const roleInfo = ROLE_LABELS[member.memberRole] ?? { label: member.memberRole, color: "bg-gray-100 text-gray-600" }
                const isRemoving = removingId === member.memberId
                const isRoleChanging = changingRole === member.memberId
                return (
                  <div key={member.id} className="px-5 py-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          isOwner ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary"
                        }`}>
                          {member.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-navy text-sm">{member.name}</span>
                            {isOwner && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-0.5 ${roleInfo.color}`}>
                            {roleInfo.label}
                          </span>
                        </div>
                      </div>
                      {!isOwner && (
                        <button
                          onClick={() => handleRemove(member.memberId, member.name)}
                          disabled={isRemoving}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          {isRemoving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                    <div className="space-y-1.5 pl-11">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />{member.email}
                      </div>
                      {member.phone && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />{member.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />Joined {formatDate(member.createdAt)}
                      </div>
                      {!isOwner && (
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-xs text-gray-400">Change role:</span>
                          <select
                            value={member.memberRole}
                            onChange={e => handleRoleChange(member.memberId, e.target.value)}
                            disabled={isRoleChanging}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                          >
                            {ROLE_OPTIONS.map(r => (
                              <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                          </select>
                          {isRoleChanging && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Add Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-navy">Add Team Member</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6 pt-3">
              <button
                onClick={() => setTab("existing")}
                className={`pb-3 mr-6 text-sm font-medium border-b-2 transition-colors ${
                  tab === "existing"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Existing User
              </button>
              <button
                onClick={() => setTab("new")}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === "new"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                New User
              </button>
            </div>

            <form onSubmit={handleAddMember} className="px-6 py-5 space-y-4">
              {tab === "existing" ? (
                <>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="user@example.com"
                      required
                      value={existingForm.email}
                      onChange={e => setExistingForm(p => ({ ...p, email: e.target.value }))}
                      className={inputClass}
                    />
                    <p className="text-xs text-gray-400 mt-1.5">The user must already have a TalentTie account.</p>
                  </div>
                  <div>
                    <label className={labelClass}>Role *</label>
                    <select
                      value={existingForm.role}
                      onChange={e => setExistingForm(p => ({ ...p, role: e.target.value }))}
                      className={inputClass}
                    >
                      {ROLE_OPTIONS.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={newForm.name}
                      onChange={e => setNewForm(p => ({ ...p, name: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={newForm.email}
                      onChange={e => setNewForm(p => ({ ...p, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={newForm.phone}
                        onChange={e => setNewForm(p => ({ ...p, phone: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Role *</label>
                      <select
                        value={newForm.role}
                        onChange={e => setNewForm(p => ({ ...p, role: e.target.value }))}
                        className={inputClass}
                      >
                        {ROLE_OPTIONS.map(r => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Password *</label>
                    <input
                      type="password"
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      value={newForm.password}
                      onChange={e => setNewForm(p => ({ ...p, password: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-semibold text-sm btn-3d disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />Adding...</>
                  ) : (
                    <><Plus className="w-4 h-4" />Add Member</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
