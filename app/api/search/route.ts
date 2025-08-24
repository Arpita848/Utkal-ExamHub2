import { type NextRequest, NextResponse } from "next/server"
import { courseData, examCategories } from "@/lib/course-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""

    if (!query) {
      return NextResponse.json([])
    }

    const results = []

    // Search through exam categories
    for (const exam of examCategories) {
      if (exam.name.toLowerCase().includes(query)) {
        results.push({
          type: "exam",
          id: exam.id,
          name: exam.name,
          icon: exam.icon,
        })
      }
    }

    // Search through courses
    for (const [examId, platforms] of Object.entries(courseData)) {
      for (const [platformId, course] of Object.entries(platforms)) {
        if (course.name.toLowerCase().includes(query) || course.platform.toLowerCase().includes(query)) {
          const exam = examCategories.find((e) => e.id === examId)
          results.push({
            type: "course",
            examId,
            platformId,
            examName: exam?.name || "",
            courseName: course.name,
            platform: course.platform,
            logo: course.logo,
            price: course.price,
            offer: course.offer,
            rating: course.rating,
          })
        }
      }
    }

    return NextResponse.json(results.slice(0, 10)) // Limit to 10 results
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
