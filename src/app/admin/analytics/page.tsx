import { BarChart3, TrendingUp, Users, Briefcase } from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />User Growth</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" />Job Postings</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary" />Applications by Source</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-3d border border-gray-100">
          <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" />Industry Distribution</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">Chart coming soon</div>
        </div>
      </div>
    </div>
  )
}
