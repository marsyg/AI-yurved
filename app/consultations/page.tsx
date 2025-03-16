"use client"

import DashboardHeader from "@/components/dashboard-header"
import ConsultationBooking from "@/components/consultation-booking"

export default function ConsultationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Ayurvedic Consultations</h1>
          <p className="text-slate-400">Connect with certified Ayurvedic practitioners for personalized care</p>
        </div>

        <ConsultationBooking />
      </div>
    </div>
  )
}

