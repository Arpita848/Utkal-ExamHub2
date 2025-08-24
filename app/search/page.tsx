"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search/search-bar"

interface SearchResult {
  type: "exam" | "course"
  id?: string
  examId?: string
  platformId?: string
  name?: string
  examName?: string
  courseName?: string
  platform?: string
  logo?: string
  price?: string
  offer?: string | null
  rating?: number
  icon?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data)
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Search Results</h1>
          <p className="text-lg text-blue-700 mb-8">Find your perfect course or exam</p>

          {/* Search Bar */}
          <SearchBar />
        </div>

        {/* Results */}
        {query && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Results for "{query}" ({results.length} found)
            </h2>

            {isLoading ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
                <p className="text-blue-600">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500 mb-8">
                  Try searching with different keywords or browse our exam categories.
                </p>
                <Link href="/">
                  <Button className="bg-blue-600 hover:bg-blue-700">Browse All Exams</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, index) => (
                  <div key={index}>
                    {result.type === "exam" ? (
                      <Link href={`/exam/${result.id}`}>
                        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-300">
                          <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-2xl text-blue-600 font-bold">E</span>
                            </div>
                            <CardTitle className="text-xl text-blue-900">{result.name}</CardTitle>
                            <Badge variant="secondary">Exam Category</Badge>
                          </CardHeader>
                        </Card>
                      </Link>
                    ) : (
                      <Card className="h-full shadow-lg border-2 border-blue-200">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                              {result.logo}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {result.examName}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg text-blue-900 line-clamp-2">{result.courseName}</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{result.platform}</Badge>
                            <div className="text-right">
                              {result.offer ? (
                                <div>
                                  <span className="text-lg font-bold text-green-600">{result.offer}</span>
                                  <span className="text-sm text-gray-500 line-through ml-2">{result.price}</span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold text-blue-600">{result.price}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Link href={`/exam/${result.examId}/${result.platformId}`}>View Details</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
