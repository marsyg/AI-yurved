"use client"

import DashboardHeader from "@/components/dashboard-header"
import AIChatbot from "@/components/ai-chatbot"

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Health Assistant</h1>
          <p className="text-slate-400">Get personalized Ayurvedic guidance powered by advanced AI</p>
        </div>

        <AIChatbot />
      </div>
    </div>
  )
}

