"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Branch Manager",
    company: "National Trust Bank",
    city: "Jaipur",
    initials: "RK",
    rating: 5,
    text: "TalentTie connected me with the right opportunity at the right time. The process was smooth, and I got placed within 2 weeks of registering. Highly recommended for banking professionals.",
  },
  {
    name: "Priya Sharma",
    role: "Insurance Advisor",
    company: "SecureLife Insurance",
    city: "Lucknow",
    initials: "PS",
    rating: 5,
    text: "I was looking for a career switch into insurance, and TalentTie made it effortless. The team guided me through every step, from profile creation to final interview preparation.",
  },
  {
    name: "Amit Patel",
    role: "Area Sales Manager",
    company: "HUL",
    city: "Vadodara",
    initials: "AP",
    rating: 5,
    text: "The quality of job listings on TalentTie is outstanding. I found multiple FMCG roles in my city and landed a great position. The platform truly understands Tier 2 city hiring.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Candidates Say
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Thousands of professionals have found their dream jobs through TalentTie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">
                    {t.role}, {t.company} &middot; {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
