import type { Metadata } from "next"

export const metadata: Metadata = { title: "Terms of Service", description: "TalentTie terms and conditions for using our recruitment platform." }

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4"><div className="max-w-4xl mx-auto"><h1 className="text-4xl font-bold text-white">Terms of Service</h1><p className="text-gray-400 mt-2">Last Updated: 01-Mar-2026</p></div></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-3d border border-gray-100 prose prose-gray max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using TalentTie (talenttie.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
          <h2>2. User Accounts</h2>
          <p>You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old to use our services.</p>
          <h2>3. Candidate Terms</h2>
          <p>Candidates agree to: provide truthful information in profiles and resumes; not misrepresent qualifications or experience; use the platform only for legitimate job-seeking purposes; respect employer communications and interview commitments.</p>
          <h2>4. Employer Terms</h2>
          <p>Employers agree to: post only genuine job openings; not discriminate based on caste, religion, gender, or other protected characteristics; handle candidate data responsibly; comply with applicable labour laws.</p>
          <h2>5. Prohibited Activities</h2>
          <p>Users must not: post fraudulent job listings; harvest candidate data for unauthorized purposes; use automated tools to scrape the platform; impersonate other users; upload malicious content; violate any applicable laws.</p>
          <h2>6. Intellectual Property</h2>
          <p>All content, design, and functionality of TalentTie are owned by TalentTie Services. Users retain ownership of their uploaded content but grant us a license to use it for platform operations.</p>
          <h2>7. Disclaimer</h2>
          <p>TalentTie is a platform connecting job seekers and employers. We do not guarantee employment or the quality of candidates. We are not responsible for the conduct of users on or off the platform.</p>
          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, TalentTie shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
          <h2>9. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Surat, Gujarat, India.</p>
          <h2>10. Contact</h2>
          <p>Questions about these Terms? Contact us at <strong>recruitment@talenttie.com</strong> or <strong>+91 9913677622</strong>.</p>
        </div>
      </div>
    </div>
  )
}
