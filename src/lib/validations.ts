import { z } from "zod"

const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid Indian phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CANDIDATE", "EMPLOYER"]).default("CANDIDATE"),
})

export const jobSchema = z.object({
  title: z.string().min(3, "Job title is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
  experienceMin: z.number().min(0).default(0),
  experienceMax: z.number().min(0).default(0),
  salaryMin: z.number().nullable().optional(),
  salaryMax: z.number().nullable().optional(),
  salaryHidden: z.boolean().default(false),
  location: z.string().min(1, "Location is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit pincode").optional(),
  isRemote: z.boolean().default(false),
  skills: z.array(z.string()).default([]),
  vacancies: z.number().min(1).default(1),
})

export const profileSchema = z.object({
  headline: z.string().optional(),
  summary: z.string().optional(),
  currentLocation: z.string().optional(),
  expectedSalary: z.number().nullable().optional(),
  currentSalary: z.number().nullable().optional(),
  noticePeriod: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(phoneRegex, "Invalid phone number").optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const blogSchema = z.object({
  title: z.string().min(5, "Title is required"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type JobInput = z.infer<typeof jobSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type BlogInput = z.infer<typeof blogSchema>
