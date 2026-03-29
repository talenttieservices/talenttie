import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding TalentTie database...")

  // ── Admin User ────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin@talenttie2026", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@talenttie.com" },
    update: {},
    create: {
      name: "TalentTie Admin",
      email: "admin@talenttie.com",
      phone: "+919913677622",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: true,
    },
  })
  console.log("✅ Admin user created:", admin.email)

  // ── Employer (internal employer account for posting jobs) ─────
  const employerPassword = await bcrypt.hash("recruiter@2026", 10)
  const employerUser = await prisma.user.upsert({
    where: { email: "recruiter@talenttie.com" },
    update: {},
    create: {
      name: "TalentTie Recruiter",
      email: "recruiter@talenttie.com",
      phone: "+919913677622",
      password: employerPassword,
      role: "EMPLOYER",
      emailVerified: true,
    },
  })

  const employer = await prisma.employer.upsert({
    where: { userId: employerUser.id },
    update: {},
    create: {
      userId: employerUser.id,
      companyName: "TalentTie Services",
      industry: "Recruitment",
      website: "https://talenttie.com",
      description: "TalentTie is a recruitment platform specializing in Banking, Insurance, Pharma, FMCG, and IT sectors across Tier 2 & Tier 3 cities of India.",
      size: "11-50",
      locations: ["Surat", "Ahmedabad", "Mumbai", "PAN India"],
      verified: true,
    },
  })
  console.log("✅ Employer created:", employer.companyName)

  // ── Sample Jobs ───────────────────────────────────────────────
  const jobs = [
    // Banking
    {
      title: "Relationship Manager - Banking",
      slug: "relationship-manager-national-trust-bank-surat",
      description: "We are looking for a dynamic Relationship Manager to manage a portfolio of 150-200 clients.\n\nKey Responsibilities:\n- Manage portfolio of assigned clients\n- Achieve monthly targets for deposits, loans, insurance\n- Cross-sell bank products (FD, RD, Savings, Loans)\n- Conduct regular client meetings and reviews\n- Ensure high level of customer satisfaction",
      requirements: "- Bachelor's degree in Commerce / Business Administration\n- 1-3 years experience in banking / financial services\n- Strong communication in English, Hindi, Gujarati\n- Knowledge of banking products and regulatory norms\n- Own vehicle preferred for client visits",
      industry: "Banking",
      jobType: "FULL_TIME" as const,
      experienceMin: 1,
      experienceMax: 3,
      salaryMin: 300000,
      salaryMax: 500000,
      location: "Surat, Gujarat",
      city: "Surat",
      state: "Gujarat",
      pincode: "395007",
      skills: ["Sales", "Banking", "Customer Service", "Relationship Management", "Cross-selling"],
      vacancies: 5,
      featured: true,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
    // Insurance
    {
      title: "Insurance Advisor - Life Insurance",
      slug: "insurance-advisor-securelife-ahmedabad",
      description: "Join our growing insurance team and help clients secure their financial future.\n\nKey Responsibilities:\n- Recruit and train insurance agents\n- Achieve monthly premium targets\n- Conduct financial need analysis for clients\n- Cross-sell insurance products\n- Manage renewal and retention of policies",
      requirements: "- Any graduate\n- 0-2 years experience (freshers welcome)\n- Strong communication and convincing skills\n- Knowledge of life insurance products preferred\n- IRDA license or willingness to obtain",
      industry: "Insurance",
      jobType: "FULL_TIME" as const,
      experienceMin: 0,
      experienceMax: 2,
      salaryMin: 250000,
      salaryMax: 400000,
      location: "Ahmedabad, Gujarat",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
      skills: ["Insurance Sales", "Team Building", "Agency Development", "Financial Planning"],
      vacancies: 8,
      featured: true,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
    // Securities
    {
      title: "Wealth Management Executive",
      slug: "wealth-management-executive-nashik",
      description: "Drive wealth management solutions and equity sales for our expanding client base.\n\nKey Responsibilities:\n- Acquire and manage HNI / retail clients\n- Sell mutual funds, PMS, insurance products\n- Conduct financial planning sessions\n- Achieve monthly AUM and revenue targets\n- Build long-term client relationships",
      requirements: "- Graduate in Commerce / Finance / Economics\n- 1-3 years in stock broking / wealth management\n- NISM certifications preferred (Series V-A, VIII)\n- Strong financial product knowledge\n- Excellent communication and presentation skills",
      industry: "Securities & Investments",
      jobType: "FULL_TIME" as const,
      experienceMin: 1,
      experienceMax: 3,
      salaryMin: 300000,
      salaryMax: 550000,
      location: "Nashik, Maharashtra",
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422001",
      skills: ["Equity Sales", "Mutual Funds", "Wealth Management", "Client Acquisition", "NISM"],
      vacancies: 4,
      featured: false,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
    // Financial Services
    {
      title: "Credit Officer - Home Loans",
      slug: "credit-officer-home-loans-indore",
      description: "Evaluate and process home loan applications for our NBFC partner.\n\nKey Responsibilities:\n- Credit appraisal of home loan applications\n- Site visits and property evaluation\n- Liaise with legal and technical teams\n- Achieve monthly disbursement targets\n- Maintain portfolio quality",
      requirements: "- Graduate in Finance / Commerce\n- 2-4 years in home loans / LAP / mortgage\n- Knowledge of credit bureau reports\n- Proficiency in loan origination software\n- Strong analytical skills",
      industry: "Financial Services",
      jobType: "FULL_TIME" as const,
      experienceMin: 2,
      experienceMax: 4,
      salaryMin: 350000,
      salaryMax: 600000,
      location: "Indore, Madhya Pradesh",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452001",
      skills: ["Home Loans", "Credit Analysis", "LAP", "Property Evaluation", "CIBIL"],
      vacancies: 3,
      featured: false,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
    // Pharma
    {
      title: "Medical Representative",
      slug: "medical-representative-medcure-rajkot",
      description: "Promote pharmaceutical products to doctors and healthcare institutions.\n\nKey Responsibilities:\n- Daily doctor calls and detailing\n- Achieve monthly sales targets\n- Conduct CME and product awareness programs\n- Build relationships with key opinion leaders\n- Manage territory and ensure product availability",
      requirements: "- B.Pharma / BSc (Life Sciences) / BBA\n- 1-4 years pharma sales experience\n- Knowledge of therapeutic segments\n- Own two-wheeler with valid driving license\n- Good command of local language",
      industry: "Pharma",
      jobType: "FULL_TIME" as const,
      experienceMin: 1,
      experienceMax: 4,
      salaryMin: 350000,
      salaryMax: 600000,
      location: "Rajkot, Gujarat",
      city: "Rajkot",
      state: "Gujarat",
      pincode: "360001",
      skills: ["Pharma Sales", "Doctor Detailing", "Territory Management", "Product Knowledge"],
      vacancies: 6,
      featured: false,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
    // FMCG
    {
      title: "Area Sales Manager - FMCG",
      slug: "area-sales-manager-fastmove-vadodara",
      description: "Lead FMCG sales operations for an assigned territory in Gujarat.\n\nKey Responsibilities:\n- Manage 4-6 distributors and 200+ retail outlets\n- Achieve volume and value targets\n- Execute trade promotions and activations\n- Lead and motivate a team of 5-8 Sales Representatives\n- Monthly MIS reporting and market intelligence",
      requirements: "- MBA / Graduate in Sales / Marketing\n- 3-6 years FMCG field sales experience\n- Strong distributor management skills\n- Proficiency in MS Excel and sales reporting tools\n- Own vehicle with valid license",
      industry: "FMCG",
      jobType: "FULL_TIME" as const,
      experienceMin: 3,
      experienceMax: 6,
      salaryMin: 500000,
      salaryMax: 800000,
      location: "Vadodara, Gujarat",
      city: "Vadodara",
      state: "Gujarat",
      pincode: "390001",
      skills: ["FMCG Sales", "Distributor Management", "Team Leadership", "Territory Planning", "Trade Marketing"],
      vacancies: 2,
      featured: true,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
    // IT
    {
      title: "Java Developer - Spring Boot",
      slug: "java-developer-techbridge-pune",
      description: "Build scalable backend applications using Java and Spring Boot.\n\nKey Responsibilities:\n- Develop RESTful APIs and microservices\n- Code review and technical documentation\n- Work with cross-functional agile teams\n- Performance optimization and bug fixing\n- Participate in sprint planning and retrospectives",
      requirements: "- B.Tech / MCA / BCA\n- 2-5 years Java development experience\n- Strong expertise in Spring Boot, Hibernate, REST APIs\n- Knowledge of PostgreSQL / MySQL\n- Experience with Git, Maven, Docker preferred",
      industry: "IT",
      jobType: "FULL_TIME" as const,
      experienceMin: 2,
      experienceMax: 5,
      salaryMin: 600000,
      salaryMax: 1200000,
      location: "Pune, Maharashtra",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      skills: ["Java", "Spring Boot", "Microservices", "REST API", "PostgreSQL", "Git"],
      vacancies: 3,
      featured: false,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
    // Branch Manager
    {
      title: "Branch Manager - Banking",
      slug: "branch-manager-premier-finance-jaipur",
      description: "Lead a full-service bank branch to achieve business targets.\n\nKey Responsibilities:\n- P&L responsibility for the branch\n- Manage team of 10-15 staff\n- Business development — deposits, loans, investments\n- Ensure compliance with RBI guidelines\n- Customer grievance resolution",
      requirements: "- MBA Finance / Post Graduate in Commerce\n- 5-8 years banking experience with 2+ years as BM\n- Strong knowledge of retail banking products\n- Excellent leadership and people management skills\n- JAIIB / CAIIB preferred",
      industry: "Banking",
      jobType: "FULL_TIME" as const,
      experienceMin: 5,
      experienceMax: 8,
      salaryMin: 600000,
      salaryMax: 1000000,
      location: "Jaipur, Rajasthan",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      skills: ["Branch Management", "Banking", "P&L", "Leadership", "Retail Banking", "Compliance"],
      vacancies: 1,
      featured: true,
      approvedByAdmin: true,
      status: "ACTIVE" as const,
    },
  ]

  for (const jobData of jobs) {
    await prisma.job.upsert({
      where: { slug: jobData.slug },
      update: {},
      create: {
        ...jobData,
        employerId: employer.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })
    console.log(`✅ Job: ${jobData.title} — ${jobData.city}`)
  }

  // ── Blog Posts ────────────────────────────────────────────────
  const blogs = [
    {
      title: "How to Create a Winning Resume in 2026",
      slug: "how-to-create-a-winning-resume",
      excerpt: "A well-crafted resume is your ticket to landing interviews. Here's how to build one that stands out.",
      category: "Resume Help",
      tags: ["resume", "career tips", "job search", "freshers"],
      published: true,
      publishedAt: new Date("2026-03-10"),
      metaTitle: "How to Create a Winning Resume in 2026 | TalentTie",
      metaDescription: "Learn the essential tips and tricks to craft a resume that stands out to recruiters in Banking, Insurance, FMCG, and IT sectors.",
      content: `# How to Create a Winning Resume in 2026

Your resume is your first impression. In India's competitive job market — especially in Banking, Insurance, Pharma, and FMCG sectors — a well-structured resume can make the difference between getting shortlisted and being ignored.

## 1. Start with a Strong Summary
Write 3-4 sentences describing who you are, your experience, and what value you bring. Be specific — mention your industry and years of experience.

**Example:**
*"Results-driven Relationship Manager with 3 years in retail banking. Managed a portfolio of 180+ HNI clients and consistently achieved 120% of monthly targets. Expertise in cross-selling deposits, loans, and insurance products."*

## 2. Use a Clean, One-Page Format
- Use standard fonts (Arial, Calibri, Times New Roman)
- Font size: 10-12pt for body, 14-16pt for name
- Margins: 0.5–1 inch
- No photos, no colored backgrounds (for traditional industries like Banking)

## 3. Quantify Your Achievements
Don't just list duties — show results.

❌ *"Handled customer queries"*
✅ *"Resolved 95% of customer queries within 24 hours, improving NPS score by 12 points"*

## 4. Key Sections to Include
- **Contact Details** — Phone, Email, City (no full address needed)
- **Professional Summary** — 3-4 lines
- **Work Experience** — Reverse chronological order
- **Education** — Degree, Institution, Year, Percentage/CGPA
- **Skills** — Both technical and soft skills
- **Certifications** — IRDA, NISM, JAIIB, etc. (very important in Banking/Insurance)

## 5. Tailor for Each Application
Don't send the same resume everywhere. Read the job description and include relevant keywords. If applying for an insurance role, highlight your IRDA certification and premium targets.

## 6. Common Mistakes to Avoid
- Spelling and grammar errors (proofread 3 times)
- Unprofessional email addresses
- Listing age, caste, religion
- Using generic objectives like "seeking a challenging role"

## Final Tip
Save as PDF. Name the file: **FirstName_LastName_Resume.pdf**

Need help? WhatsApp us at +91 9913677622 and our team will review your resume for free.`,
    },
    {
      title: "Banking & Insurance Career Guide 2026",
      slug: "banking-insurance-career-guide-2026",
      excerpt: "Everything you need to know about building a career in Banking, Insurance, and Financial Services in India.",
      category: "Industry Guide",
      tags: ["banking careers", "insurance jobs", "financial services", "career guide"],
      published: true,
      publishedAt: new Date("2026-03-15"),
      metaTitle: "Banking & Insurance Career Guide 2026 | TalentTie",
      metaDescription: "Complete guide to careers in Banking, Insurance, and Financial Services. Roles, salaries, and growth paths in India.",
      content: `# Banking & Insurance Career Guide 2026

India's Banking, Insurance, and Financial Services sector employs over 7 million people and is growing at 12% annually. This guide covers everything you need to know to build a successful career in this sector.

## Banking Sector Careers

### Entry-Level Roles (0-2 years)
- **Sales Officer / CSO** — INR 2.5L-4L PA
- **Field Sales Executive** — INR 2L-3.5L PA
- **Relationship Executive** — INR 2.5L-4L PA

### Mid-Level Roles (2-5 years)
- **Relationship Manager** — INR 4L-8L PA
- **Area Sales Manager** — INR 5L-10L PA
- **Credit Officer** — INR 4L-7L PA

### Senior Roles (5+ years)
- **Branch Manager** — INR 8L-15L PA
- **Regional Manager** — INR 12L-25L PA
- **Zonal Head** — INR 20L-40L PA

## Insurance Sector Careers

The life insurance sector has seen explosive growth with 25+ companies operating in India.

### Key Roles
- **Insurance Advisor / Agent** — Commission-based + fixed
- **Development Manager** — INR 3L-6L PA
- **Branch Manager** — INR 5L-10L PA
- **Agency Development Manager** — INR 4L-8L PA

### Required Certifications
- IRDA (Insurance Regulatory and Development Authority) license — mandatory for agents
- IC-33 (Life Insurance) — for agents and development managers
- IC-38 (General Insurance) — for general insurance roles

## How to Get Started

1. **Apply online** — Use TalentTie to find openings in your city
2. **WhatsApp Apply** — Send your resume to +91 9913677622
3. **Fresher? No problem** — Many roles accept graduates with good communication

Ready to start your Banking or Insurance career? [Browse Jobs](/jobs?industry=Banking)`,
    },
    {
      title: "How to Prepare for Your First Job Interview",
      slug: "how-to-prepare-for-your-first-job-interview",
      excerpt: "Your first interview can be nerve-wracking. Here's a step-by-step guide to walk in confident and walk out with an offer.",
      category: "Interview Prep",
      tags: ["interview tips", "freshers", "job interview", "preparation"],
      published: true,
      publishedAt: new Date("2026-03-20"),
      metaTitle: "How to Prepare for Your First Job Interview | TalentTie",
      metaDescription: "Step-by-step guide for freshers to prepare for job interviews in Banking, Insurance, FMCG, and Pharma sectors.",
      content: `# How to Prepare for Your First Job Interview

Congratulations on landing your first interview! Here's everything you need to do to prepare effectively.

## 7 Days Before the Interview

### Day 7: Research the Company
- Visit the company website, read the "About" page
- Google recent news about the company
- Understand their products and services
- Know their competitors

### Day 5: Prepare Your Answers
Practice these common questions:
1. **"Tell me about yourself"** — 2-minute structured answer: education → past experience → why this role
2. **"Why do you want to join us?"** — Link company's product/mission to your goals
3. **"What are your strengths?"** — Give 2-3 with examples
4. **"What are your weaknesses?"** — Give 1 real weakness + what you're doing to improve
5. **"Where do you see yourself in 5 years?"** — Show ambition aligned with the company's growth

### Day 3: Dress Rehearsal
- Decide and iron your outfit (formal — no jeans)
- Plan your route — know exactly where to go
- Set 2 alarms for the day

## On Interview Day

### Dos ✅
- Arrive 10-15 minutes early
- Carry 2 printed copies of your resume
- Bring original + photocopy of certificates
- Switch your phone to silent
- Make eye contact and smile
- Ask at least one thoughtful question at the end

### Don'ts ❌
- Don't badmouth previous employer or college
- Don't lie about your experience or skills
- Don't mention salary in the first round (wait to be asked)
- Don't use casual language

## After the Interview
Send a thank-you message or email within 24 hours. This shows professionalism and keeps you top of mind.

**Good luck!** If you need help finding interview opportunities, [browse our latest jobs](/jobs) or WhatsApp us at +91 9913677622.`,
    },
    {
      title: "Top Jobs in Tier 2 Cities India 2026",
      slug: "top-jobs-tier-2-cities-india-2026",
      excerpt: "Discover the best job opportunities in Surat, Jaipur, Nashik, Indore, and other tier 2 cities across India.",
      category: "Industry Guide",
      tags: ["tier 2 cities", "jobs in surat", "jobs in jaipur", "jobs in nashik", "jobs in indore"],
      published: true,
      publishedAt: new Date("2026-03-22"),
      metaTitle: "Top Jobs in Tier 2 Cities India 2026 | TalentTie",
      metaDescription: "Find the best job opportunities in Surat, Jaipur, Nashik, Indore, Rajkot and other tier 2 cities across India.",
      content: `# Top Jobs in Tier 2 Cities India 2026

While metros like Mumbai and Bangalore dominate headlines, India's tier 2 cities are where the real growth is happening. Here's your guide to job opportunities across these growing cities.

## Why Tier 2 Cities?
- **Lower cost of living** — Same salary goes further
- **Less competition** — Fewer applicants per opening
- **Career growth** — Be a big fish in a growing pond
- **Work-life balance** — Shorter commutes, better quality of life

## Top Cities & Opportunities

### Surat, Gujarat
India's fastest-growing city. Strong in:
- Banking (major private banks expanding)
- Insurance (high insurance penetration)
- Diamond & textile industry (manufacturing roles)
- IT (emerging tech hub)

**Average salaries:** INR 3L-8L PA for mid-level roles

### Jaipur, Rajasthan
Rajasthan's commercial capital. Strong in:
- Banking (state has 400+ branches of major banks)
- Pharma (major pharma companies expanding)
- Tourism & hospitality
- IT / BPO (growing sector)

### Nashik, Maharashtra
The wine city is also an industrial hub:
- FMCG (major companies have distribution centres)
- Manufacturing (auto components, food processing)
- Pharma (several pharmaceutical plants)
- Financial services (growing urban population)

### Indore, Madhya Pradesh
MP's fastest-growing city:
- Banking (highest branch density in central India)
- IT (IndoreIT Park has 50+ companies)
- FMCG (hub for western and central India distribution)
- Education sector

### Rajkot, Gujarat
Saurashtra's commercial hub:
- Pharma (major MR opportunities)
- Banking (strong cooperative banking sector)
- Engineering & manufacturing
- FMCG distribution

## How TalentTie Helps
We specialize in tier 2 and tier 3 cities. Our team has local knowledge and strong relationships with employers in each of these cities.

[Find Jobs in Your City →](/jobs)`,
    },
    {
      title: "How to Apply for Jobs Online - Step by Step Guide",
      slug: "how-to-apply-for-jobs-online-guide",
      excerpt: "New to online job applications? This step-by-step guide walks you through the entire process from registration to interview call.",
      category: "Career Tips",
      tags: ["job application", "online jobs", "beginners guide", "job search tips"],
      published: true,
      publishedAt: new Date("2026-03-25"),
      metaTitle: "How to Apply for Jobs Online - Step by Step Guide | TalentTie",
      metaDescription: "Complete step-by-step guide to applying for jobs online in India. From creating your profile to getting interview calls.",
      content: `# How to Apply for Jobs Online - Step by Step Guide

Applying for jobs online can seem complicated at first, but it's actually quite simple. This guide will walk you through every step.

## Step 1: Prepare Your Documents
Before you start applying, have these ready:
- **Updated Resume** (PDF format, max 2 pages)
- **Passport-sized photo** (recent, formal)
- **Education certificates** (scanned copies)
- **Experience letters** (if applicable)
- **Aadhar card** (for verification)

## Step 2: Create Your Profile on TalentTie
1. Go to [talenttie.com/register](/register)
2. Enter your name, email, and phone number
3. Set a strong password
4. Verify your email

## Step 3: Complete Your Profile
A complete profile gets 5x more responses:
- Add your photo
- Write a professional summary (3-4 lines)
- Add work experience (company, role, dates, key achievements)
- Add education details
- Upload your resume (PDF)
- Add skills relevant to your target industry

## Step 4: Search for Jobs
Use filters to find the right jobs:
- **Industry** — Banking, Insurance, Pharma, FMCG
- **Location** — Your city or nearby cities
- **Experience** — Match your experience level
- **Salary** — Set your expected range

## Step 5: Apply (No Login Needed!)
On TalentTie, you can **apply without creating an account**:
1. Click "Apply Now" on any job
2. Enter your name, phone, email
3. Share years of experience and expected salary
4. Paste your Google Drive resume link
5. Submit!

Our team will contact you within 1-2 business days.

## Step 6: WhatsApp Alternative
If you prefer, WhatsApp your resume to **+91 9913677622** with the job title and location you're applying for. Our recruiters respond within 24 hours.

## Tips for Success
- Apply to 3-5 jobs per day
- Customize your message for each application
- Keep your phone available during business hours
- Respond quickly to recruiter calls

[Start Your Job Search →](/jobs)`,
    },
  ]

  for (const blogData of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: blogData.slug },
      update: {},
      create: {
        ...blogData,
        authorId: admin.id,
      },
    })
    console.log(`✅ Blog: ${blogData.title}`)
  }

  // ── Site Settings ─────────────────────────────────────────────
  const settings = [
    { key: "site_name", value: "TalentTie" },
    { key: "site_tagline", value: "Find Your Dream Job Anywhere in India" },
    { key: "contact_email", value: "recruitment@talenttie.com" },
    { key: "contact_phone", value: "9913677622" },
    { key: "whatsapp_number", value: "919913677622" },
    { key: "jobs_count", value: "1200" },
    { key: "candidates_placed", value: "850" },
    { key: "cities_covered", value: "500" },
    { key: "employers_count", value: "120" },
  ]

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }
  console.log("✅ Site settings seeded")

  console.log("\n🎉 Seeding complete!")
  console.log("   Admin: admin@talenttie.com / admin@talenttie2026")
  console.log("   Recruiter: recruiter@talenttie.com / recruiter@2026")
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
