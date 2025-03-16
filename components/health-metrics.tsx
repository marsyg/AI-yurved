"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockHealthData = {
  vitals: [
    { name: "Jan", heartRate: 72, bloodPressure: 115, respiration: 16 },
    { name: "Feb", heartRate: 74, bloodPressure: 118, respiration: 15 },
    { name: "Mar", heartRate: 71, bloodPressure: 120, respiration: 14 },
    { name: "Apr", heartRate: 69, bloodPressure: 116, respiration: 15 },
    { name: "May", heartRate: 68, bloodPressure: 112, respiration: 14 },
    { name: "Jun", heartRate: 70, bloodPressure: 110, respiration: 15 },
    { name: "Jul", heartRate: 71, bloodPressure: 114, respiration: 16 },
  ],
  sleep: [
    { name: "Mon", deep: 2.1, light: 3.2, rem: 1.5 },
    { name: "Tue", deep: 1.8, light: 3.5, rem: 1.2 },
    { name: "Wed", deep: 2.3, light: 3.0, rem: 1.4 },
    { name: "Thu", deep: 1.9, light: 3.3, rem: 1.3 },
    { name: "Fri", deep: 2.0, light: 3.1, rem: 1.5 },
    { name: "Sat", deep: 2.5, light: 3.5, rem: 1.7 },
    { name: "Sun", deep: 2.4, light: 3.4, rem: 1.6 },
  ],
  nutrition: [
    { name: "Carbs", value: 45 },
    { name: "Protein", value: 25 },
    { name: "Fats", value: 20 },
    { name: "Fiber", value: 10 },
  ],
  stress: [
    { name: "6AM", value: 20 },
    { name: "9AM", value: 35 },
    { name: "12PM", value: 50 },
    { name: "3PM", value: 40 },
    { name: "6PM", value: 30 },
    { name: "9PM", value: 15 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function HealthMetrics({ doshaType }: { doshaType: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 text-white">
      <Card className="bg-slate-800/60 border-slate-700">
        <CardHeader>
          <CardTitle>Vital Signs</CardTitle>
          <CardDescription className="text-slate-400">Heart rate, blood pressure trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="heart-rate">
            <TabsList className="bg-slate-900 border border-slate-700">
              <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
              <TabsTrigger value="blood-pressure">Blood Pressure</TabsTrigger>
              <TabsTrigger value="respiration">Respiration</TabsTrigger>
            </TabsList>
            <TabsContent value="heart-rate" className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHealthData.vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[60, 80]} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f9fafb" }} />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="blood-pressure" className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHealthData.vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[100, 130]} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f9fafb" }} />
                  <Line
                    type="monotone"
                    dataKey="bloodPressure"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="respiration" className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHealthData.vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[10, 20]} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f9fafb" }} />
                  <Line
                    type="monotone"
                    dataKey="respiration"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/60 border-slate-700">
        <CardHeader>
          <CardTitle>Sleep Analysis</CardTitle>
          <CardDescription className="text-slate-400">Sleep stages and quality metrics</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockHealthData.sleep}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f9fafb" }} />
              <Area type="monotone" dataKey="deep" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              <Area type="monotone" dataKey="light" stackId="1" stroke="#10b981" fill="#10b981" />
              <Area type="monotone" dataKey="rem" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/60 border-slate-700">
        <CardHeader>
          <CardTitle>Nutritional Balance</CardTitle>
          <CardDescription className="text-slate-400">
            Macronutrient distribution based on your dosha type
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockHealthData.nutrition}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockHealthData.nutrition.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f9fafb" }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/60 border-slate-700">
        <CardHeader>
          <CardTitle>Stress Level Patterns</CardTitle>
          <CardDescription className="text-slate-400">Daily stress variations based on your activities</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockHealthData.stress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f9fafb" }} />
              <Bar dataKey="value" name="Stress Level" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

