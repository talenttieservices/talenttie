export const INDUSTRIES = [
  "Banking", "Insurance", "Financial Services", "Securities & Investments",
  "Pharma", "FMCG", "IT", "Manufacturing",
  "Education", "Healthcare", "Retail", "Telecom", "Automotive",
]

export const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
]

export const EXPERIENCE_RANGES = [
  { value: "0-1", label: "Fresher (0-1 yr)" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
]

export const SALARY_RANGES = [
  { value: "0-300000", label: "Up to 3 LPA" },
  { value: "300000-500000", label: "3-5 LPA" },
  { value: "500000-1000000", label: "5-10 LPA" },
  { value: "1000000-2000000", label: "10-20 LPA" },
  { value: "2000000+", label: "20+ LPA" },
]

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
]

export const POPULAR_CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune",
  "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Vadodara", "Bhopal",
  "Coimbatore", "Visakhapatnam", "Patna", "Rajkot", "Nashik", "Ludhiana", "Agra",
  "Varanasi", "Jodhpur", "Guwahati", "Ranchi", "Raipur", "Kota", "Dehradun",
]

export const APPLICATION_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  APPLIED: { label: "Applied", color: "bg-blue-100 text-blue-700" },
  VIEWED: { label: "Viewed", color: "bg-purple-100 text-purple-700" },
  SHORTLISTED: { label: "Shortlisted", color: "bg-green-100 text-green-700" },
  INTERVIEW: { label: "Interview", color: "bg-orange-100 text-orange-700" },
  OFFERED: { label: "Offered", color: "bg-emerald-100 text-emerald-700" },
  HIRED: { label: "Hired", color: "bg-primary/10 text-primary" },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700" },
}

export const SITE_CONFIG = {
  name: "TalentTie",
  tagline: "Find Your Dream Job Anywhere in India",
  email: "recruitment@talenttie.com",
  phone: "9913677622",
  phoneFormatted: "+91 9913677622",
  whatsappUrl: "https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0",
  whatsappMessage: "Hi, I'm looking for a job. Please help me.",
  domain: "talenttie.com",
  url: "https://talenttie.com",
  linkedin: "https://www.linkedin.com/company/talenttie-services",
}
