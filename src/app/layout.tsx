import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const BASE_URL = "https://talenttie.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TalentTie — Jobs in Banking, Insurance, Pharma & FMCG Across India",
    template: "%s | TalentTie",
  },
  description: "TalentTie connects job seekers with top employers across 500+ cities in India. Find jobs in Banking, Insurance, Pharma, FMCG, and IT. Apply free — no registration required.",
  keywords: [
    "jobs in India", "banking jobs India", "insurance jobs India", "BFSI jobs",
    "pharma jobs India", "FMCG sales jobs India", "tier 2 city jobs",
    "fresher jobs India", "job portal India", "recruitment India",
    "relationship manager jobs", "area sales manager jobs",
    "jobs in Gujarat", "jobs in Maharashtra", "jobs in Rajasthan",
    "TalentTie", "find jobs near me India", "private sector jobs India",
  ],
  authors: [{ name: "TalentTie Services", url: BASE_URL }],
  creator: "TalentTie Services",
  publisher: "TalentTie Services",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "TalentTie",
    title: "TalentTie — Jobs in Banking, Insurance, Pharma & FMCG Across India",
    description: "Connect with top employers across 500+ cities in India. Jobs in Banking, Insurance, Pharma, FMCG, IT — apply free.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TalentTie — India Job Portal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentTie — Find Your Next Job in India",
    description: "Jobs in Banking, Insurance, Pharma, FMCG across 500+ cities. Apply free.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  // Uncomment and add your Google Search Console verification token:
  // verification: { google: "YOUR_GSC_VERIFICATION_TOKEN" },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "TalentTie Services",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png`, width: 200, height: 60 },
      image: `${BASE_URL}/og-image.png`,
      description: "India's recruitment platform connecting job seekers with top employers in Banking, Insurance, Pharma, FMCG & IT across Tier 2 & Tier 3 cities.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9913677622",
        contactType: "customer service",
        email: "recruitment@talenttie.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
      sameAs: ["https://www.linkedin.com/company/talenttie-services"],
      foundingDate: "2022",
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "TalentTie",
      url: BASE_URL,
      description: "India's job portal for Tier 2 & Tier 3 cities",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/jobs?search={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true,linker:{domains:['talenttie.com']}});`
            }} />
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
