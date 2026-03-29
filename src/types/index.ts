import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: "CANDIDATE" | "EMPLOYER" | "ADMIN"
      image?: string
    }
  }
  interface User {
    id: string
    role: "CANDIDATE" | "EMPLOYER" | "ADMIN"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "CANDIDATE" | "EMPLOYER" | "ADMIN"
  }
}

export type JobFilters = {
  search?: string
  city?: string
  state?: string
  industry?: string
  jobType?: string
  experienceMin?: number
  experienceMax?: number
  salaryMin?: number
  salaryMax?: number
  isRemote?: boolean
}

export type PaginationParams = {
  page: number
  limit: number
}

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}
