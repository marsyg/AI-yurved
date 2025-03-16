import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Check } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
            About Ayurveda X
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Reimagining healthcare through the fusion of ancient Ayurvedic wisdom and cutting-edge AI technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/dashboard">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emerald-500 text-emerald-400">
              <Link href="/learn">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-brain"
                >
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Diagnostics</h3>
              <p className="text-slate-400 mb-4">
                Our advanced AI analyzes your health data to provide personalized Ayurvedic insights and
                recommendations.
              </p>
              <ul className="space-y-2">
                {["Real-time health monitoring", "Personalized dosha analysis", "Secure data encryption"].map(
                  (item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-400 mr-2 shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-leaf"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ayurvedic Wisdom</h3>
              <p className="text-slate-400 mb-4">
                We combine ancient Ayurvedic principles with modern science to create a holistic approach to health.
              </p>
              <ul className="space-y-2">
                {["Personalized dosha balancing", "Traditional herbal remedies", "Lifestyle optimization"].map(
                  (item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-400 mr-2 shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-bag"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Products</h3>
              <p className="text-slate-400 mb-4">
                Discover Ayurvedic products tailored to your unique constitution and health needs.
              </p>
              <ul className="space-y-2">
                {["Dosha-specific supplements", "Authentic Ayurvedic herbs", "Custom formulations"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-400 mr-2 shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-slate-300 mb-6">
            At Ayurveda X, we're on a mission to revolutionize healthcare by bridging the gap between ancient Ayurvedic
            wisdom and modern technology. We believe that true health comes from understanding your unique constitution
            and living in harmony with nature's principles.
          </p>
          <p className="text-lg text-slate-300">
            Our AI-powered platform makes personalized Ayurvedic healthcare accessible to everyone, providing insights,
            recommendations, and products tailored to your individual needs. We're committed to empowering you on your
            journey to optimal health and wellbeing.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to transform your health?</h2>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            <Link href="/dashboard">
              Get Started Today <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

