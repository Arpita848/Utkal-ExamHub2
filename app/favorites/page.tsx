"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { courseData, examCategories } from "@/lib/course-data"

interface Favorite {
  id: string
  examId: string
  platformId: string
  courseName: string
  createdAt: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedFavorites = localStorage.getItem("utkal-favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    setIsLoading(false)
  }, [])

  const removeFavorite = (favoriteId: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== favoriteId)
    setFavorites(updatedFavorites)
    localStorage.setItem("utkal-favorites", JSON.stringify(updatedFavorites))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">My Favorites</h1>
          <p className="text-lg text-blue-700">Your saved courses and programs</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-8">Start exploring courses and add them to your favorites!</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Explore Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => {
              const exam = examCategories.find((e) => e.id === favorite.examId)
              const course =
                courseData[favorite.examId as keyof typeof courseData]?.[
                  favorite.platformId as keyof (typeof courseData)[keyof typeof courseData]
                ]

              if (!exam || !course) return null

              return (
                <Card key={favorite.id} className="shadow-lg border-2 border-blue-200">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                          {course.logo}
                        </div>
                        <div>
                          <Badge variant="secondary" className="text-xs">
                            {exam.name}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeFavorite(favorite.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg text-blue-900 line-clamp-2">{course.name}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{course.platform}</Badge>
                      <div className="text-right">
                        {course.offer ? (
                          <div>
                            <span className="text-lg font-bold text-green-600">{course.offer}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">{course.price}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-blue-600">{course.price}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Link href={`/exam/${favorite.examId}/${favorite.platformId}`}>View Details</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={course.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
