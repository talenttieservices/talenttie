"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-[#0a1628]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Ready to Find Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Perfect Job?
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
          Join thousands of professionals who found their dream careers through
          TalentTie. Register today and get matched with top employers.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="btn-3d inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 text-lg"
          >
            Register Now
          </Link>
          <a
            href="https://api.whatsapp.com/message/KFWGL6ROBVVGM1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Us
          </a>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          Need help? Call us at{" "}
          <a
            href="tel:9913677622"
            className="text-gray-300 hover:text-white transition-colors"
          >
            9913677622
          </a>{" "}
          (Mon-Sat, 10 AM - 7 PM)
        </p>
      </div>
    </section>
  );
}
