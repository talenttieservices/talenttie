import { notFound } from "next/navigation"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import JobDetailClient from "@/components/jobs/JobDetailClient"

async function getJob(slug: string) {
  try {
    return await prisma.job.findFirst({
      where: { slug, status: "ACTIVE" },
      include: { employer: { select: { companyName: true, website: true, industry: true, description: true, logo: true } } },
    })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJob(params.slug)
  if (!job) return { title: "Job Not Found" }

  const title = `${job.title} in ${job.city}, ${job.state} — ${job.experienceMin}-${job.experienceMax} Yrs`
  const salaryText = job.salaryMin && job.salaryMax
    ? `INR ${(job.salaryMin / 100000).toFixed(1)}L–${(job.salaryMax / 100000).toFixed(1)}L PA`
    : ""
  const description = `Hiring ${job.title} in ${job.city}, ${job.state}. ${job.experienceMin}–${job.experienceMax} years experience required. ${salaryText}. Industry: ${job.industry}. Apply now on TalentTie — takes 30 seconds.`
  const canonical = `https://talenttie.com/jobs/${job.slug}`

  return {
    title,
    description,
    keywords: [job.title, job.city, job.state, job.industry || "", ...(job.skills || []), "jobs india", `${job.industry} jobs`].filter(Boolean),
    alternates: { canonical },
    openGraph: {
      title: `${job.title} — ${job.city} | TalentTie`,
      description,
      url: canonical,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${job.title} job at TalentTie` }],
    },
    twitter: {
      card: "summary",
      title: `${job.title} — ${job.city}`,
      description: `${salaryText} | ${job.experienceMin}–${job.experienceMax} yrs exp | Apply free`,
    },
  }
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug)
  if (!job) notFound()

  const expiresAt = job.expiresAt
    ? job.expiresAt.toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  const salaryText = job.salaryMin && job.salaryMax
    ? `INR ${(job.salaryMin / 100000).toFixed(1)}L–${(job.salaryMax / 100000).toFixed(1)}L per annum`
    : "As per industry standards"

  // Google Jobs JSON-LD (JobPosting schema)
  const jobPostingSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.description}</p>${job.requirements ? `<p><strong>Requirements:</strong> ${job.requirements}</p>` : ""}`,
    datePosted: job.createdAt.toISOString().split("T")[0],
    validThrough: expiresAt.split("T")[0],
    employmentType: job.jobType === "FULL_TIME" ? "FULL_TIME" : job.jobType === "PART_TIME" ? "PART_TIME" : job.jobType === "CONTRACT" ? "CONTRACTOR" : "INTERN",
    hiringOrganization: {
      "@type": "Organization",
      name: job.employer?.companyName || "TalentTie Services",
      sameAs: job.employer?.website || "https://talenttie.com",
      logo: "https://talenttie.com/logo.png",
    },
    directApply: true,
    identifier: { "@type": "PropertyValue", name: "TalentTie", value: job.id },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressRegion: job.state,
        postalCode: job.pincode || "",
        addressCountry: "IN",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "YEAR",
      },
    },
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.experienceMin * 12,
    },
    occupationalCategory: job.industry,
    skills: (job.skills || []).join(", "),
    totalJobOpenings: job.vacancies || 1,
    url: `https://talenttie.com/jobs/${job.slug}`,
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://talenttie.com" },
      { "@type": "ListItem", position: 2, name: "Jobs", item: "https://talenttie.com/jobs" },
      { "@type": "ListItem", position: 3, name: job.title, item: `https://talenttie.com/jobs/${job.slug}` },
    ],
  }

  // FAQ schema — common job application questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How to apply for ${job.title} job in ${job.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Click the "Quick Apply" button on this page. Fill in your name, phone, email, upload your resume (optional), and submit. No account needed. Our team will contact you within 1–2 business days.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the salary for ${job.title} in ${job.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The salary for this ${job.title} position is ${salaryText}. The exact offer depends on experience and interview performance.`,
        },
      },
      {
        "@type": "Question",
        name: `What experience is required for this ${job.title} role?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `This role requires ${job.experienceMin === 0 ? "freshers or candidates with up to" : `${job.experienceMin}–`}${job.experienceMax} years of experience in ${job.industry || "the relevant field"}.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JobDetailClient job={{
        ...job,
        createdAt: job.createdAt.toISOString(),
        walkInDate: job.walkInDate ? job.walkInDate.toISOString() : null,
        employer: job.employer || undefined,
      }} />
    </>
  )
}
