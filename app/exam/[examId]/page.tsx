import { BookOpen, Users, Award, TrendingUp, Clock, Star, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { examCategories, topPlatforms } from "@/lib/course-data"

export default function ExamPage({ params }: { params: { examId: string } }) {
  const exam = examCategories.find((e) => e.id === params.examId)

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Exam not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const getIconComponent = (iconName: string) => {
    const icons = { BookOpen, Users, Award, TrendingUp, Clock, Star }
    return icons[iconName as keyof typeof icons] || BookOpen
  }

  const IconComponent = getIconComponent(exam.icon)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Utkal ExamHub</h1>
          <p className="text-lg text-blue-700 mb-8">Find Exams, Institutes & Prices – All in One Place.</p>
        </div>

        {/* Selected Exam */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 bg-white rounded-lg p-4 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">{exam.name}</h2>
          </div>
        </div>

        {/* Top Platforms Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-blue-900 text-center mb-8">Top Platforms</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {topPlatforms.map((platform) => (
              <Link key={platform.id} href={`/exam/${params.examId}/${platform.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors text-2xl">
                        {platform.logo}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700">{platform.name}</h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
