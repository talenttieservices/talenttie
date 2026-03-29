"use client";

import Link from "next/link";
import { Landmark, Shield, TrendingUp, BarChart3, Pill, ShoppingBag, Monitor, Factory, GraduationCap, Stethoscope } from "lucide-react";

const industries = [
  {
    name: "Banking",
    fullName: "Banking & Retail Banking",
    icon: Landmark,
    gradient: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    jobs: 320,
    roles: ["Branch Manager", "Relationship Manager", "Sales Officer"],
  },
  {
    name: "Insurance",
    fullName: "Life & General Insurance",
    icon: Shield,
    gradient: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    jobs: 280,
    roles: ["Insurance Advisor", "Agency Development Manager", "Cluster Manager"],
  },
  {
    name: "Financial Services",
    fullName: "Loans, NBFC & Microfinance",
    icon: TrendingUp,
    gradient: "from-sky-500 to-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    jobs: 215,
    roles: ["Credit Manager", "Field Officer", "Area Sales Manager"],
  },
  {
    name: "Securities & Investments",
    fullName: "Mutual Funds, Equity & Wealth",
    icon: BarChart3,
    gradient: "from-violet-500 to-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    jobs: 160,
    roles: ["Wealth Manager", "Sub-Broker", "Research Analyst"],
  },
  {
    name: "Pharma",
    fullName: "Pharmaceutical & MedTech",
    icon: Pill,
    gradient: "from-purple-500 to-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    jobs: 280,
    roles: ["Medical Representative", "Area Manager", "Quality Analyst"],
  },
  {
    name: "FMCG",
    fullName: "Fast Moving Consumer Goods",
    icon: ShoppingBag,
    gradient: "from-orange-500 to-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    jobs: 320,
    roles: ["Area Sales Manager", "Territory Officer", "Key Account Manager"],
  },
  {
    name: "IT",
    fullName: "Information Technology",
    icon: Monitor,
    gradient: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    jobs: 510,
    roles: ["Software Developer", "DevOps Engineer", "Data Analyst"],
  },
  {
    name: "Manufacturing",
    fullName: "Manufacturing & Engineering",
    icon: Factory,
    gradient: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    jobs: 190,
    roles: ["Plant Manager", "Quality Engineer", "Production Supervisor"],
  },
  {
    name: "Healthcare",
    fullName: "Hospitals & Clinical Care",
    icon: Stethoscope,
    gradient: "from-rose-500 to-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    jobs: 145,
    roles: ["Hospital Administrator", "Lab Technician", "Nurse Manager"],
  },
  {
    name: "Education",
    fullName: "Education & Training",
    icon: GraduationCap,
    gradient: "from-pink-500 to-pink-700",
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    jobs: 150,
    roles: ["Academic Counselor", "Trainer", "Center Head"],
  },
];

export default function IndustryCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Jobs by Industry
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find opportunities across India&apos;s fastest-growing sectors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.name}
                href={`/jobs?industry=${encodeURIComponent(industry.name)}`}
                className="group"
              >
                <div
                  className={`card-3d relative bg-white rounded-2xl border ${industry.border} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                        {industry.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                        {industry.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${industry.bg} ${industry.text}`}
                    >
                      {industry.jobs}+ Jobs
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    {industry.roles.map((role) => (
                      <div
                        key={role}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${industry.gradient} mr-2 flex-shrink-0`} />
                        {role}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-primary group-hover:underline">
                      View Jobs
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
