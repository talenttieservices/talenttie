"use client"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import HeroSearch from "@/components/home/HeroSearch"
import FeaturedJobs from "@/components/home/FeaturedJobs"
import IndustryCards from "@/components/home/IndustryCards"
import HowItWorks from "@/components/home/HowItWorks"
import TopCities from "@/components/home/TopCities"
import Testimonials from "@/components/home/Testimonials"
import EmployerCTA from "@/components/home/EmployerCTA"
import BlogPreview from "@/components/home/BlogPreview"
import CallToAction from "@/components/home/CallToAction"

export default function HomePageClient() {
  useScrollReveal()
  return (
    <>
      <HeroSearch />
      <FeaturedJobs />
      <IndustryCards />
      <HowItWorks />
      <TopCities />
      <Testimonials />
      <EmployerCTA />
      <BlogPreview />
      <CallToAction />
    </>
  )
}
