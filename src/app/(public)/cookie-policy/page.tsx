import type { Metadata } from "next"

export const metadata: Metadata = { title: "Cookie Policy", description: "How TalentTie uses cookies on our platform." }

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy via-navy-dark to-navy pt-28 pb-12 px-4"><div className="max-w-4xl mx-auto"><h1 className="text-4xl font-bold text-white">Cookie Policy</h1><p className="text-gray-400 mt-2">Last Updated: 01-Mar-2026</p></div></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-3d border border-gray-100 prose prose-gray max-w-none">
          <h2>1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.</p>
          <h2>2. Types of Cookies We Use</h2>
          <p><strong>Essential Cookies:</strong> Required for the platform to function. These include session cookies for authentication and security cookies.</p>
          <p><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our platform, including which pages are most popular and how users navigate the site.</p>
          <p><strong>Functional Cookies:</strong> Remember your preferences such as language settings, search filters, and display preferences.</p>
          <h2>3. Managing Cookies</h2>
          <p>You can manage cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling essential cookies may affect platform functionality.</p>
          <h2>4. Third-Party Cookies</h2>
          <p>We may use third-party services like Google Analytics that set their own cookies. These are governed by the respective third-party privacy policies.</p>
          <h2>5. Contact</h2>
          <p>For questions about our cookie practices, contact <strong>recruitment@talenttie.com</strong>.</p>
        </div>
      </div>
    </div>
  )
}
