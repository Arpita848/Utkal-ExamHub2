import { BookOpen, Users, Award, TrendingUp, Clock, Star, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FavoriteButton } from "@/components/favorites/favorite-button"
import Link from "next/link"
import { courseData, examCategories } from "@/lib/course-data"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  )
}

export default function CoursePage({
  params,
}: {
  params: { examId: string; platformId: string }
}) {
  const exam = examCategories.find((e) => e.id === params.examId)
  const course =
    courseData[params.examId as keyof typeof courseData]?.[
      params.platformId as keyof (typeof courseData)[keyof typeof courseData]
    ]

  if (!exam || !course) {
    return <div>Course not found</div>
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
          <Link
            href={`/exam/${params.examId}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {exam.name}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Utkal ExamHub</h1>
          <p className="text-lg text-blue-700 mb-8">Find Exams, Institutes & Prices – All in One Place.</p>
        </div>

        {/* Course Details */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-2 border-blue-200">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                  {course.logo}
                </div>
              </div>
              <CardTitle className="text-2xl text-blue-900 mb-2">{course.name}</CardTitle>
              <Badge variant="secondary" className="text-lg px-4 py-1">
                {course.platform}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Pricing */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-4">
                  {course.offer ? (
                    <>
                      <span className="text-3xl font-bold text-green-600">{course.offer}</span>
                      <span className="text-xl text-gray-500 line-through">{course.price}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-blue-600">{course.price}</span>
                  )}
                </div>
                {course.offer && <p className="text-sm text-green-600 mt-1">Special Offer!</p>}
              </div>

              {/* Rating */}
              <div className="flex justify-center">
                <StarRating rating={course.rating} />
              </div>

              {/* Favorite Button */}
              <div className="flex justify-center">
                <FavoriteButton examId={params.examId} platformId={params.platformId} courseName={course.name} />
              </div>

              {/* Enroll Button */}
              <div className="text-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Enroll Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              {/* Exam Category */}
              <div className="flex items-center justify-center gap-2 pt-4 border-t">
                <IconComponent className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-medium">{exam.name}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
