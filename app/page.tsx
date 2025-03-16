import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThreeDHero from "@/components/hero-3d"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="h-screen relative">
        <ThreeDHero />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-slate-900/80 to-transparent">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
            Ayurveda X
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            The future of healthcare: AI-powered personalized Ayurvedic wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/dashboard">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emerald-500 text-emerald-400">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="bg-emerald-500/20 p-3 rounded-lg w-fit mb-4">
                <feature.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Stethoscope, ShoppingBag, MessageSquare, CalendarClock } from "lucide-react"

const features = [
  {
    title: "Advanced Diagnostics",
    description: "AI-powered health analysis using sensor data and personalized reports",
    icon: Stethoscope,
  },
  {
    title: "Ayurvedic E-Commerce",
    description: "Personalized product recommendations based on your unique constitution",
    icon: ShoppingBag,
  },
  {
    title: "AI Health Assistant",
    description: "24/7 guidance powered by advanced language models",
    icon: MessageSquare,
  },
  {
    title: "Expert Consultations",
    description: "Connect with certified Ayurvedic practitioners for personalized care",
    icon: CalendarClock,
  },
]

