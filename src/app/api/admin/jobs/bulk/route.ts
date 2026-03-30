export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import * as XLSX from "xlsx"

function generateSlug(title: string, city: string): string {
  const base = `${title}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
  const rand = Math.random().toString(36).substring(2, 7)
  return `${base}-${rand}`
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as Record<string, unknown>[]

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Excel file is empty or unreadable" }, { status: 400 })
    }

    // Find or create admin employer
    let employer = await prisma.employer.findFirst({
      where: { user: { email: session.user.email! } },
    })
    if (!employer) {
      const adminUser = await prisma.user.findUnique({ where: { email: session.user.email! } })
      if (!adminUser) return NextResponse.json({ error: "Admin user not found" }, { status: 404 })
      employer = await prisma.employer.create({
        data: { userId: adminUser.id, companyName: "TalentTie", industry: "Recruitment", verified: true },
      })
    }

    const created: string[] = []
    const errors: string[] = []

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const rowNum = i + 2

      const title = String(row["Job Title"] || row["title"] || "").trim()
      const city = String(row["City"] || row["city"] || "").trim()
      const state = String(row["State"] || row["state"] || "").trim()
      const description = String(row["Description"] || row["description"] || row["Job Description"] || "").trim()

      if (!title || !city || !state || !description) {
        errors.push(`Row ${rowNum}: Missing required fields (Job Title, City, State, Description)`)
        continue
      }

      const skillsRaw = String(row["Skills"] || row["skills"] || "")
      const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()).filter(Boolean) : []

      try {
        const job = await prisma.job.create({
          data: {
            employerId: employer.id,
            title,
            slug: generateSlug(title, city),
            description,
            requirements: String(row["Requirements"] || row["requirements"] || "") || null,
            industry: String(row["Industry"] || row["industry"] || "") || null,
            jobType: (String(row["Job Type"] || row["jobType"] || "FULL_TIME").toUpperCase().replace(" ", "_") as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP") || "FULL_TIME",
            experienceMin: Number(row["Experience Min"] || row["experienceMin"] || 0),
            experienceMax: Number(row["Experience Max"] || row["experienceMax"] || 0),
            salaryMin: Number(row["Salary Min"] || row["salaryMin"] || 0) || null,
            salaryMax: Number(row["Salary Max"] || row["salaryMax"] || 0) || null,
            salaryHidden: String(row["Salary Hidden"] || row["salaryHidden"] || "").toLowerCase() === "true",
            location: String(row["Location"] || row["location"] || `${city}, ${state}`),
            city,
            state,
            skills,
            vacancies: Number(row["Vacancies"] || row["vacancies"] || 1),
            status: "ACTIVE",
            featured: String(row["Featured"] || row["featured"] || "").toLowerCase() === "true",
            approvedByAdmin: true,
            workMode: String(row["Work Mode"] || row["workMode"] || "OFFICE"),
            functionalArea: String(row["Functional Area"] || row["functionalArea"] || "") || null,
            roleCategory: String(row["Role Category"] || row["roleCategory"] || "") || null,
            education: String(row["Education"] || row["education"] || "") || null,
          },
        })
        created.push(job.title)
      } catch (err) {
        errors.push(`Row ${rowNum} (${title}): ${err instanceof Error ? err.message : "DB error"}`)
      }
    }

    return NextResponse.json({
      success: true,
      created: created.length,
      errors: errors.length,
      errorDetails: errors,
      message: `Created ${created.length} jobs${errors.length > 0 ? `, ${errors.length} failed` : ""}`,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}

export async function GET() {
  // Return Excel template
  const wb = XLSX.utils.book_new()
  const headers = [
    "Job Title", "Description", "Requirements", "Industry", "Job Type",
    "City", "State", "Location", "Experience Min", "Experience Max",
    "Salary Min", "Salary Max", "Salary Hidden", "Skills", "Vacancies",
    "Work Mode", "Functional Area", "Role Category", "Education", "Featured",
  ]
  const sampleRow = [
    "Sales Manager", "We are looking for a Sales Manager...", "3+ years experience in BFSI", "Banking", "FULL_TIME",
    "Mumbai", "Maharashtra", "Mumbai, Maharashtra", "3", "7",
    "600000", "1200000", "false", "Sales, BFSI, Relationship Management", "2",
    "OFFICE", "Sales / Business Development", "Sales Manager", "ANY", "false",
  ]
  const ws = XLSX.utils.aoa_to_sheet([headers, sampleRow])
  ws["!cols"] = headers.map(() => ({ wch: 25 }))
  XLSX.utils.book_append_sheet(wb, ws, "Jobs")
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="talenttie-jobs-template.xlsx"',
    },
  })
}
