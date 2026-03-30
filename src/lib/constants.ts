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
  "Noida", "Gurgaon", "Chandigarh", "Bhubaneswar", "Mysore", "Mangalore", "Kochi",
  "Trivandrum", "Kozhikode", "Vijayawada", "Warangal", "Rajkot", "Bhavnagar",
  "Anand", "Gandhinagar", "Aurangabad", "Solapur", "Kolhapur", "Thane", "Navi Mumbai",
  "Faridabad", "Meerut", "Allahabad", "Bareilly", "Aligarh", "Moradabad", "Amritsar",
  "Jalandhar", "Jodhpur", "Bikaner", "Udaipur", "Ajmer", "Gwalior", "Jabalpur",
]

export const CITY_STATE_MAP: Record<string, string> = {
  // Maharashtra
  "Mumbai": "Maharashtra", "Pune": "Maharashtra", "Nagpur": "Maharashtra",
  "Nashik": "Maharashtra", "Aurangabad": "Maharashtra", "Solapur": "Maharashtra",
  "Kolhapur": "Maharashtra", "Thane": "Maharashtra", "Navi Mumbai": "Maharashtra",
  "Amravati": "Maharashtra",
  // Gujarat
  "Ahmedabad": "Gujarat", "Surat": "Gujarat", "Vadodara": "Gujarat",
  "Rajkot": "Gujarat", "Bhavnagar": "Gujarat", "Anand": "Gujarat",
  "Gandhinagar": "Gujarat", "Junagadh": "Gujarat",
  // Karnataka
  "Bangalore": "Karnataka", "Mysore": "Karnataka", "Mangalore": "Karnataka",
  "Hubli": "Karnataka", "Dharwad": "Karnataka", "Belagavi": "Karnataka",
  // Telangana
  "Hyderabad": "Telangana", "Warangal": "Telangana", "Nizamabad": "Telangana",
  // Andhra Pradesh
  "Visakhapatnam": "Andhra Pradesh", "Vijayawada": "Andhra Pradesh",
  "Tirupati": "Andhra Pradesh", "Guntur": "Andhra Pradesh",
  // Tamil Nadu
  "Chennai": "Tamil Nadu", "Coimbatore": "Tamil Nadu", "Madurai": "Tamil Nadu",
  "Tiruchirappalli": "Tamil Nadu", "Salem": "Tamil Nadu",
  // Kerala
  "Kochi": "Kerala", "Trivandrum": "Kerala", "Kozhikode": "Kerala",
  "Thrissur": "Kerala",
  // West Bengal
  "Kolkata": "West Bengal", "Howrah": "West Bengal", "Durgapur": "West Bengal",
  "Asansol": "West Bengal",
  // Delhi NCR
  "Delhi": "Delhi", "Noida": "Uttar Pradesh", "Gurgaon": "Haryana",
  "Faridabad": "Haryana", "Ghaziabad": "Uttar Pradesh",
  // Rajasthan
  "Jaipur": "Rajasthan", "Jodhpur": "Rajasthan", "Udaipur": "Rajasthan",
  "Kota": "Rajasthan", "Bikaner": "Rajasthan", "Ajmer": "Rajasthan",
  // Uttar Pradesh
  "Lucknow": "Uttar Pradesh", "Kanpur": "Uttar Pradesh", "Agra": "Uttar Pradesh",
  "Varanasi": "Uttar Pradesh", "Meerut": "Uttar Pradesh", "Allahabad": "Uttar Pradesh",
  "Bareilly": "Uttar Pradesh", "Aligarh": "Uttar Pradesh", "Moradabad": "Uttar Pradesh",
  // Madhya Pradesh
  "Indore": "Madhya Pradesh", "Bhopal": "Madhya Pradesh", "Gwalior": "Madhya Pradesh",
  "Jabalpur": "Madhya Pradesh",
  // Punjab
  "Ludhiana": "Punjab", "Amritsar": "Punjab", "Jalandhar": "Punjab",
  "Chandigarh": "Punjab",
  // Bihar / Jharkhand
  "Patna": "Bihar", "Ranchi": "Jharkhand",
  // Odisha
  "Bhubaneswar": "Odisha",
  // Assam
  "Guwahati": "Assam",
  // Chhattisgarh
  "Raipur": "Chhattisgarh",
  // Uttarakhand
  "Dehradun": "Uttarakhand",
}

export const WORK_MODES = [
  { value: "OFFICE", label: "Work from Office" },
  { value: "WFH", label: "Work from Home" },
  { value: "HYBRID", label: "Hybrid" },
]

export const FUNCTIONAL_AREAS = [
  "Sales / Business Development",
  "Marketing & Communications",
  "Banking / Financial Services",
  "Insurance",
  "IT / Software Development",
  "IT Infrastructure / Tech Support",
  "HR / Recruitment",
  "Operations / Back Office",
  "Finance & Accounts",
  "Customer Service / Support",
  "Pharma / Medical",
  "Manufacturing / Production",
  "Supply Chain / Logistics",
  "Retail / Store Operations",
  "Admin / Secretarial",
  "Legal & Compliance",
  "Audit & Taxation",
  "Teaching & Training",
  "Research & Development",
  "Engineering",
]

export const ROLE_CATEGORIES = [
  { area: "Sales / Business Development", roles: ["Sales Executive", "Business Development Executive", "Area Sales Manager", "Regional Sales Manager", "Relationship Manager", "Key Account Manager", "Field Sales Officer", "Sales Manager"] },
  { area: "Banking / Financial Services", roles: ["Loan Officer", "Credit Analyst", "Branch Manager", "Bank Teller", "Financial Advisor", "Investment Banker", "Relationship Manager - Banking", "Operations Executive - Banking"] },
  { area: "Insurance", roles: ["Insurance Advisor", "Sales Manager - Insurance", "Underwriter", "Claims Executive", "Agency Manager", "Channel Sales Manager"] },
  { area: "IT / Software Development", roles: ["Software Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer", "Mobile Developer", "DevOps Engineer", "QA Engineer", "Data Analyst", "Data Engineer", "Project Manager - IT"] },
  { area: "HR / Recruitment", roles: ["HR Executive", "HR Manager", "Recruiter", "Talent Acquisition Specialist", "HRBP", "Payroll Executive"] },
  { area: "Customer Service / Support", roles: ["Customer Service Executive", "Customer Support Representative", "BPO Executive", "Call Center Agent", "Technical Support Engineer"] },
  { area: "Finance & Accounts", roles: ["Accountant", "Senior Accountant", "Finance Manager", "CA / Chartered Accountant", "Tax Executive", "Audit Executive"] },
]

export const EDUCATION_LEVELS = [
  { value: "ANY", label: "Any Graduate" },
  { value: "10TH", label: "10th Pass" },
  { value: "12TH", label: "12th Pass" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "UG", label: "UG (Any Graduation)" },
  { value: "UG_BCOM", label: "B.Com" },
  { value: "UG_BBA", label: "BBA" },
  { value: "UG_BSC", label: "B.Sc" },
  { value: "UG_BE_BTECH", label: "B.E / B.Tech" },
  { value: "PG", label: "PG (Any Post Graduation)" },
  { value: "PG_MBA", label: "MBA / PGDM" },
  { value: "PG_MCA", label: "MCA" },
  { value: "PG_MCOM", label: "M.Com" },
  { value: "PG_MSC", label: "M.Sc" },
  { value: "PHD", label: "Ph.D" },
]

export const GUEST_APP_STATUS = [
  { value: "NEW", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "REVIEWED", label: "Reviewed", color: "bg-yellow-100 text-yellow-700" },
  { value: "SHORTLISTED", label: "Shortlisted", color: "bg-green-100 text-green-700" },
  { value: "INTERVIEW", label: "Interview", color: "bg-orange-100 text-orange-700" },
  { value: "OFFERED", label: "Offered", color: "bg-emerald-100 text-emerald-700" },
  { value: "HIRED", label: "Hired", color: "bg-purple-100 text-purple-700" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-100 text-red-700" },
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
