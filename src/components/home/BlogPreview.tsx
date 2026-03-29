"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const blogs = [
  {
    title: "How to Create a Winning Resume for Tier 2 City Jobs",
    excerpt:
      "Learn the essential tips and tricks to craft a resume that stands out to recruiters in Banking, Insurance, FMCG, and IT sectors across India.",
    category: "Career Tips",
    date: "25-Mar-2026",
    readTime: "5 min read",
    gradient: "from-blue-500 to-blue-700",
    slug: "winning-resume-tips",
  },
  {
    title: "Top Self-Introduction Questions for Freshers",
    excerpt:
      "Master the art of self-introduction in job interviews with these proven templates and examples tailored for Indian job seekers.",
    category: "Interview Prep",
    date: "20-Mar-2026",
    readTime: "4 min read",
    gradient: "from-purple-500 to-purple-700",
    slug: "self-introduction-questions",
  },
  {
    title: "Banking & Insurance Career Guide 2026",
    excerpt:
      "A comprehensive guide to building a career in banking, financial services, and insurance. Explore roles from Branch Manager to VP.",
    category: "Industry Guide",
    date: "15-Mar-2026",
    readTime: "7 min read",
    gradient: "from-orange-500 to-orange-700",
    slug: "bfsi-career-guide",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Career Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice and guides to help you land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Gradient Header */}
                <div
                  className={`h-40 bg-gradient-to-br ${blog.gradient} flex items-center justify-center p-6`}
                >
                  <h3 className="text-white text-lg font-bold text-center leading-snug">
                    {blog.title}
                  </h3>
                </div>

                <div className="p-5">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-3">
                    {blog.category}
                  </span>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {blog.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span>{blog.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
