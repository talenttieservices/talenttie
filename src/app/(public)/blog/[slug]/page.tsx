import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MessageCircle } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> { return { title: "Career Tips & Advice - TalentTie Blog" } }

export default function BlogPostPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4"><div className="max-w-4xl mx-auto"><Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6"><ArrowLeft className="w-4 h-4" />Back to Blog</Link><span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Career Tips</span><h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">How to Create a Winning Resume in 2026</h1><div className="flex items-center gap-4 text-sm text-gray-400"><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />25-Mar-2026</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" />5 min read</span></div></div></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-3d border border-gray-100 prose prose-gray max-w-none">
          <p>Creating a standout resume is crucial for landing your dream job. Here are the essential tips that will help you craft a resume that gets noticed by recruiters and passes through Applicant Tracking Systems (ATS).</p>
          <h2>1. Choose the Right Format</h2>
          <p>For most job seekers, a reverse-chronological format works best. Start with your most recent experience and work backwards. Keep the layout clean and professional with consistent formatting.</p>
          <h2>2. Write a Strong Summary</h2>
          <p>Your professional summary should be 2-3 sentences highlighting your experience, key skills, and what you bring to the role. Tailor this for each application.</p>
          <h2>3. Quantify Your Achievements</h2>
          <p>Instead of listing duties, focus on measurable results. Use numbers and percentages to demonstrate impact in your previous roles.</p>
          <h2>4. Include Relevant Keywords</h2>
          <p>Many companies use ATS to screen resumes. Include keywords from the job description naturally throughout your resume to increase your chances of getting through.</p>
          <h2>5. Keep It Concise</h2>
          <p>For most candidates, a one-page resume is ideal. Focus on the most relevant information and remove anything that does not add value to your application.</p>
        </div>
        <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
          <p className="text-navy font-medium mb-3">Need help with your resume? Our team can guide you!</p>
          <a href="https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium"><MessageCircle className="w-4 h-4" />Chat on WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
