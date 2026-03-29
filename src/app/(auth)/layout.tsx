import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 iso-grid opacity-20" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[15%] right-[15%] w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-float" style={{ animationDelay: "1s", transform: "perspective(500px) rotateY(-15deg) rotateX(10deg)" }} />
        <div className="relative text-center px-12 max-w-lg">
          <Image src="/logo.png" alt="TalentTie" width={120} height={120} className="mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">Your Career Journey <span className="text-primary">Starts Here</span></h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of job seekers who found their dream careers through TalentTie. Opportunities in 500+ cities across India.</p>
          <div className="flex justify-center gap-8">
            <div className="text-center"><div className="text-2xl font-bold text-primary">5000+</div><div className="text-sm text-gray-400">Active Jobs</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-primary">200+</div><div className="text-sm text-gray-400">Companies</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-primary">500+</div><div className="text-sm text-gray-400">Cities</div></div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center"><Link href="/"><Image src="/logo-symbol.png" alt="TalentTie" width={140} height={48} className="h-12 w-auto mx-auto" /></Link></div>
          {children}
        </div>
      </div>
    </div>
  )
}
