import { BookOpen, Users, Award, TrendingUp, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "@/components/search/search-bar"
import Link from "next/link"

const examCategories = [
  { id: "opsc-oas", name: "OPSC OAS", icon: BookOpen },
  { id: "opsc-aso", name: "OPSC ASO", icon: Users },
  { id: "ossc-cgl", name: "OSSC CGL", icon: Award },
  { id: "ossc-chsl", name: "OSSC CHSL", icon: TrendingUp },
  { id: "osssc-ri", name: "OSSSC RI", icon: Clock },
  { id: "odisha-aao", name: "Odisha AAO", icon: Star },
]

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
            Welcome to <span className="text-blue-600">Utkal ExamHub</span>
          </h1>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            Your one-stop destination for competitive exam preparation in Odisha. Find the best courses, compare prices,
            and start your journey to success.
          </p>

          <SearchBar />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
            <div className="text-blue-900 font-medium">Exam Categories</div>
          </div>
          <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">24+</div>
            <div className="text-blue-900 font-medium">Course Options</div>
          </div>
          <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
            <div className="text-blue-900 font-medium">Top Platforms</div>
          </div>
        </div>

        {/* All Competitive Exams Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">All Competitive Exams</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {examCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/exam/${category.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
