"use client"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Clock, Star, ChevronRight, Play, Download } from "lucide-react"

// Mock learning content
const learningContent = {
  courses: [
    {
      id: 1,
      title: "Foundations of Ayurveda",
      description: "Learn the core principles and philosophy of Ayurvedic medicine",
      level: "Beginner",
      duration: "4 hours",
      lessons: 12,
      rating: 4.9,
      students: 1245,
      image: "/placeholder.svg?height=200&width=350",
      instructor: "Dr. Anjali Sharma",
    },
    {
      id: 2,
      title: "Understanding Your Dosha",
      description: "Discover your unique constitution and how to balance it",
      level: "Beginner",
      duration: "3 hours",
      lessons: 8,
      rating: 4.8,
      students: 987,
      image: "/placeholder.svg?height=200&width=350",
      instructor: "Dr. Rajesh Patel",
    },
    {
      id: 3,
      title: "Ayurvedic Nutrition",
      description: "Learn how to eat according to your dosha for optimal health",
      level: "Intermediate",
      duration: "5 hours",
      lessons: 15,
      rating: 4.7,
      students: 756,
      image: "/placeholder.svg?height=200&width=350",
      instructor: "Dr. Meera Singh",
    },
    {
      id: 4,
      title: "Ayurvedic Daily Routines",
      description: "Establish healthy daily practices based on Ayurvedic principles",
      level: "Intermediate",
      duration: "3.5 hours",
      lessons: 10,
      rating: 4.9,
      students: 632,
      image: "/placeholder.svg?height=200&width=350",
      instructor: "Dr. Vikram Joshi",
    },
  ],
  articles: [
    {
      id: 1,
      title: "The Three Doshas: Vata, Pitta, and Kapha",
      description: "An in-depth exploration of the three fundamental energies in Ayurveda",
      readTime: "8 min read",
      date: "Mar 10, 2025",
      image: "/placeholder.svg?height=150&width=250",
      author: "Dr. Anjali Sharma",
    },
    {
      id: 2,
      title: "Seasonal Routines in Ayurveda",
      description: "How to adjust your lifestyle according to the changing seasons",
      readTime: "6 min read",
      date: "Mar 5, 2025",
      image: "/placeholder.svg?height=150&width=250",
      author: "Dr. Rajesh Patel",
    },
    {
      id: 3,
      title: "Ayurvedic Approach to Digestive Health",
      description: "Understanding the importance of digestion in Ayurvedic medicine",
      readTime: "10 min read",
      date: "Feb 28, 2025",
      image: "/placeholder.svg?height=150&width=250",
      author: "Dr. Meera Singh",
    },
    {
      id: 4,
      title: "Herbs and Spices in Ayurvedic Cooking",
      description: "How to use common kitchen herbs for medicinal benefits",
      readTime: "7 min read",
      date: "Feb 20, 2025",
      image: "/placeholder.svg?height=150&width=250",
      author: "Dr. Vikram Joshi",
    },
    {
      id: 5,
      title: "Ayurvedic Self-Care Practices",
      description: "Simple daily rituals for maintaining balance and wellness",
      readTime: "5 min read",
      date: "Feb 15, 2025",
      image: "/placeholder.svg?height=150&width=250",
      author: "Dr. Anjali Sharma",
    },
    {
      id: 6,
      title: "Understanding Ayurvedic Pulse Diagnosis",
      description: "The ancient art of diagnosis through pulse examination",
      readTime: "9 min read",
      date: "Feb 8, 2025",
      image: "/placeholder.svg?height=150&width=250",
      author: "Dr. Rajesh Patel",
    },
  ],
  resources: [
    {
      id: 1,
      title: "Dosha Assessment Guide",
      description: "Comprehensive guide to determine your dominant dosha",
      type: "PDF",
      size: "2.4 MB",
      downloads: 3245,
    },
    {
      id: 2,
      title: "Ayurvedic Cooking Recipes",
      description: "Collection of dosha-specific recipes for balanced nutrition",
      type: "PDF",
      size: "4.1 MB",
      downloads: 2876,
    },
    {
      id: 3,
      title: "Meditation for Dosha Balance",
      description: "Audio guides for meditation practices tailored to each dosha",
      type: "Audio",
      size: "18.5 MB",
      downloads: 1987,
    },
    {
      id: 4,
      title: "Ayurvedic Herbs Reference",
      description: "Detailed information on common Ayurvedic herbs and their uses",
      type: "PDF",
      size: "3.8 MB",
      downloads: 2543,
    },
  ],
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Learn Ayurveda</h1>
          <p className="text-slate-400">Expand your knowledge with courses, articles, and resources</p>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="courses" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="articles" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <Download className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningContent.courses.map((course) => (
                <Card key={course.id} className="overflow-hidden bg-slate-800/60 border-slate-700 text-white">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-4">
                      <div className="text-xs font-medium bg-emerald-500 text-white px-2 py-1 rounded">
                        {course.level}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-xs text-slate-400 ml-1">({course.students})</span>
                      </div>
                      <div className="text-sm text-slate-400">By {course.instructor}</div>
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Start Learning
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-slate-700 hover:bg-slate-700">
                View All Courses
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningContent.articles.map((article) => (
                <Card key={article.id} className="overflow-hidden bg-slate-800/60 border-slate-700 text-white">
                  <div className="relative">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">By {article.author}</div>
                      <Button variant="link" className="text-emerald-400 hover:text-emerald-300 p-0">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-slate-700 hover:bg-slate-700">
                View All Articles
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningContent.resources.map((resource) => (
                <Card key={resource.id} className="bg-slate-800/60 border-slate-700 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        {resource.type === "PDF" ? <FileText className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span>
                              {resource.type} • {resource.size}
                            </span>
                            <span>{resource.downloads} downloads</span>
                          </div>
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

