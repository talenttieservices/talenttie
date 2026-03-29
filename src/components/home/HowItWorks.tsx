"use client";

import { UserPlus, Search, Send, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Profile",
    description:
      "Sign up and build your professional profile with your skills, experience, and career preferences.",
    icon: UserPlus,
    gradient: "from-primary to-primary/80",
    shadow: "shadow-primary/25",
  },
  {
    number: "02",
    title: "Search Jobs",
    description:
      "Browse thousands of verified job openings across industries and cities matching your profile.",
    icon: Search,
    gradient: "from-blue-500 to-blue-700",
    shadow: "shadow-blue-500/25",
  },
  {
    number: "03",
    title: "Apply",
    description:
      "Apply to jobs with one click. Our recruiters will review and shortlist your application.",
    icon: Send,
    gradient: "from-purple-500 to-purple-700",
    shadow: "shadow-purple-500/25",
  },
  {
    number: "04",
    title: "Get Hired",
    description:
      "Clear interviews with our guidance and get placed at top companies across India.",
    icon: CheckCircle2,
    gradient: "from-orange-500 to-orange-700",
    shadow: "shadow-orange-500/25",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey from job search to placement in 4 simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-purple-500 to-orange-500 opacity-20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center group">
                  {/* 3D Icon Box */}
                  <div className="inline-block mb-6" style={{ perspective: "600px" }}>
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.shadow} transition-transform duration-500 group-hover:[transform:rotateY(12deg)_rotateX(-8deg)]`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                  </div>

                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 lg:static lg:mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
