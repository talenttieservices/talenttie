"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const cities = [
  { name: "Surat", state: "Gujarat", jobs: 340 },
  { name: "Jaipur", state: "Rajasthan", jobs: 280 },
  { name: "Lucknow", state: "Uttar Pradesh", jobs: 310 },
  { name: "Indore", state: "Madhya Pradesh", jobs: 190 },
  { name: "Nagpur", state: "Maharashtra", jobs: 220 },
  { name: "Patna", state: "Bihar", jobs: 150 },
  { name: "Bhopal", state: "Madhya Pradesh", jobs: 170 },
  { name: "Vadodara", state: "Gujarat", jobs: 200 },
  { name: "Rajkot", state: "Gujarat", jobs: 130 },
  { name: "Nashik", state: "Maharashtra", jobs: 160 },
  { name: "Coimbatore", state: "Tamil Nadu", jobs: 210 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", jobs: 140 },
];

export default function TopCities() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Top Hiring Cities
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore job opportunities in India&apos;s fastest-growing Tier 2 and Tier 3 cities
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/jobs?city=${city.name.toLowerCase()}`}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{city.state}</p>
                <p className="text-xs font-semibold text-primary mt-2">
                  {city.jobs}+ Jobs
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
