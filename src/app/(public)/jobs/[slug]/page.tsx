import { notFound } from "next/navigation"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import JobDetailClient from "@/components/jobs/JobDetailClient"

async function getJob(slug: string) {
  try {
    return await prisma.job.findFirst({
      where: { slug, status: "ACTIVE" },
    })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJob(params.slug)
  if (!job) return { title: "Job Not Found" }
  return {
    title: `${job.title} - ${job.city}, ${job.state} | TalentTie`,
    description: `${job.title} job in ${job.city}, ${job.state}. ${job.experienceMin}-${job.experienceMax} years experience. INR ${(job.salaryMin / 100000).toFixed(1)}L-${(job.salaryMax / 100000).toFixed(1)}L PA. Apply now on TalentTie.`,
    openGraph: {
      title: `${job.title} - ${job.city} | TalentTie`,
      description: job.description.slice(0, 160),
      url: `https://talenttie.com/jobs/${job.slug}`,
    },
  }
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug)
  if (!job) notFound()

  const expiresAt = job.expiresAt ? job.expiresAt.toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt.toISOString().split("T")[0],
    validThrough: expiresAt.split("T")[0],
    employmentType: job.jobType === "FULL_TIME" ? "FULL_TIME" : job.jobType === "PART_TIME" ? "PART_TIME" : job.jobType === "CONTRACT" ? "CONTRACTOR" : "INTERN",
    hiringOrganization: {
      "@type": "Organization",
      name: "TalentTie Services",
      sameAs: "https://talenttie.com",
      logo: "https://talenttie.com/logo.png",
    },
    directApply: true,
    identifier: {
      "@type": "PropertyValue",
      name: "TalentTie",
      value: job.id,
    },
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
    skills: job.skills.join(", "),
    totalJobOpenings: job.vacancies,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JobDetailClient job={{ ...job, createdAt: job.createdAt.toISOString() }} />
    </>
  )
}
