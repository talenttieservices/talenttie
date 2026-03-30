import { prisma } from "@/lib/prisma"

/**
 * Get the Employer record for a user — works for both owners and team members.
 * Returns null if the user has no employer access.
 */
export async function getEmployerForUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      employer: true,
      employerMembers: {
        include: { employer: true },
        orderBy: { addedAt: "asc" },
      },
    },
  })
  if (!user) return null
  // Owner takes priority; otherwise use first team membership
  return user.employer ?? user.employerMembers[0]?.employer ?? null
}

export type EmployerMemberRole = "OWNER" | "MANAGER" | "RECRUITER"

export const MEMBER_ROLES: { value: EmployerMemberRole; label: string }[] = [
  { value: "OWNER", label: "Owner" },
  { value: "MANAGER", label: "Manager" },
  { value: "RECRUITER", label: "Recruiter" },
]
