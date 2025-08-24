"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const searchCourses = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data)
          setShowResults(true)
        }
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchCourses, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
  }

  return (
    <div ref={searchRef} className="relative max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search exam name or course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowResults(true)}
            className="pr-8"
          />
          {query && (
            <Button
              onClick={clearSearch}
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Results */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-2">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No results found</div>
            ) : (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index}>
                    {result.type === "exam" ? (
                      <Link
                        href={`/exam/${result.id}`}
                        onClick={() => setShowResults(false)}
                        className="block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-semibold">E</span>
                          </div>
                          <div>
                            <div className="font-medium text-blue-900">{result.name}</div>
                            <Badge variant="secondary" className="text-xs">
                              Exam Category
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        href={`/exam/${result.examId}/${result.platformId}`}
                        onClick={() => setShowResults(false)}
                        className="block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                            {result.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-blue-900 truncate">{result.courseName}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Badge variant="outline" className="text-xs">
                                {result.examName}
                              </Badge>
                              <span>•</span>
                              <span>{result.platform}</span>
                              {result.offer ? (
                                <span className="text-green-600 font-medium">{result.offer}</span>
                              ) : (
                                <span className="text-blue-600 font-medium">{result.price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
