"use client";

import Link from "next/link";
import { Users, Target, Zap, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "15,000+ Candidates",
    description: "Access a vast pool of pre-screened talent across India",
  },
  {
    icon: Target,
    title: "Targeted Hiring",
    description: "Industry and city-specific recruitment for precise matches",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Fill positions within days, not months",
  },
  {
    icon: ShieldCheck,
    title: "Verified Profiles",
    description: "Every candidate is background-checked and skill-verified",
  },
];

export default function EmployerCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - CTA */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              For Employers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Hire the Best Talent
              <br />
              <span className="text-primary">Across India</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-md">
              Partner with TalentTie to find skilled professionals in Tier 2 and
              Tier 3 cities. Fast, reliable, and cost-effective recruitment
              solutions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/employer/register"
                className="btn-3d inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Hiring Now
              </Link>
              <a
                href="tel:9913677622"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call: 9913677622
              </a>
            </div>
          </div>

          {/* Right - Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-gray-50 rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
