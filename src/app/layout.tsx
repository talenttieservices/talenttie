import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL("https://talenttie.com"),
  title: { default: "TalentTie - Find Your Dream Job | Jobs in Tier 2 & Tier 3 Cities India", template: "%s | TalentTie" },
  description: "TalentTie connects job seekers with top employers across India. Find jobs in Banking, Insurance, Pharma, FMCG, IT sectors in Tier 2, Tier 3 cities and rural areas. Register free and apply now!",
  keywords: ["jobs in India", "tier 2 city jobs", "tier 3 city jobs", "village jobs India", "banking jobs India", "insurance jobs", "financial services jobs", "pharma jobs", "FMCG jobs near me", "jobs in small cities", "rural employment India", "fresher jobs India", "job portal India", "TalentTie", "recruitment India", "PAN India jobs", "career opportunities India"],
  authors: [{ name: "TalentTie", url: "https://talenttie.com" }],
  creator: "TalentTie Services",
  openGraph: { type: "website", locale: "en_IN", url: "https://talenttie.com", siteName: "TalentTie", title: "TalentTie - Find Your Dream Job | Jobs in Tier 2 & Tier 3 Cities India", description: "Connect with top employers across India. Jobs in Banking, Insurance, Pharma, FMCG, IT sectors.", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TalentTie Job Portal" }] },
  twitter: { card: "summary_large_image", title: "TalentTie - Find Your Dream Job", description: "Jobs in Tier 2, Tier 3 cities and rural India.", images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "TalentTie", url: "https://talenttie.com", logo: "https://talenttie.com/logo.png", description: "India's recruitment platform for Tier 2, Tier 3 cities and rural areas", contactPoint: { "@type": "ContactPoint", telephone: "+91-9913677622", contactType: "customer service", email: "recruitment@talenttie.com", areaServed: "IN", availableLanguage: ["English", "Hindi"] }, sameAs: ["https://www.linkedin.com/company/talenttie-services"] }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "TalentTie", url: "https://talenttie.com", potentialAction: { "@type": "SearchAction", target: "https://talenttie.com/jobs?search={search_term_string}", "query-input": "required name=search_term_string" } }) }} />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{page_path:window.location.pathname});` }} />
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
