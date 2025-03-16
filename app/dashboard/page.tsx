"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HealthMetrics from "@/components/health-metrics"
import ProductRecommendations from "@/components/product-recommendations"
import ConsultationBooking from "@/components/consultation-booking"
import AIChatbot from "@/components/ai-chatbot"
import DashboardHeader from "@/components/dashboard-header"

export default function Dashboard() {
  const [selectedDosha, setSelectedDosha] = useState("vata-pitta")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-slate-800/60 border-slate-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Dosha Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Vata-Pitta</div>
                <p className="text-xs text-slate-400 mt-1">Primary: Vata (60%), Secondary: Pitta (30%), Kapha (10%)</p>
                <div className="mt-4 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <div className="mt-1 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <div className="mt-1 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-400">76/100</div>
                <p className="text-xs text-slate-400 mt-1">+5 points from last month</p>
                <div className="mt-4 h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-emerald-500 h-4 rounded-full"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Activity Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Moderate</div>
                <p className="text-xs text-slate-400 mt-1">130 min/week of moderate exercise</p>
                <div className="mt-4 grid grid-cols-7 gap-1">
                  {[60, 0, 30, 0, 40, 0, 0].map((value, i) => (
                    <div key={i} className="space-y-1">
                      <div className="h-10 bg-slate-700 rounded-md overflow-hidden flex flex-col-reverse">
                        <div className="bg-teal-500" style={{ height: `${(value / 60) * 100}%` }}></div>
                      </div>
                      <div className="text-center text-xs text-slate-500">{["M", "T", "W", "T", "F", "S", "S"][i]}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Sleep Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Fair</div>
                <p className="text-xs text-slate-400 mt-1">6.4 hrs/night avg, 82% efficiency</p>
                <div className="mt-4 relative h-[60px]">
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 200 60">
                      <path
                        d="M0,30 Q20,10 40,25 T80,35 T120,25 T160,30 T200,20"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="health" className="space-y-4">
            <TabsList className="bg-slate-800 text-slate-400 border border-slate-700">
              <TabsTrigger value="health" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                Health Metrics
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="consultations"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                Consultations
              </TabsTrigger>
              <TabsTrigger
                value="assistant"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="health" className="border-none p-0">
              <HealthMetrics doshaType={selectedDosha} />
            </TabsContent>

            <TabsContent value="recommendations" className="border-none p-0">
              <ProductRecommendations doshaType={selectedDosha} />
            </TabsContent>

            <TabsContent value="consultations" className="border-none p-0">
              <ConsultationBooking />
            </TabsContent>

            <TabsContent value="assistant" className="border-none p-0">
              <AIChatbot />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

