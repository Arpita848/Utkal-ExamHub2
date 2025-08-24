"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface FavoriteButtonProps {
  examId: string
  platformId: string
  courseName: string
  className?: string
}

export function FavoriteButton({ examId, platformId, courseName, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkFavoriteStatus()
  }, [examId, platformId])

  const checkFavoriteStatus = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      const exists = favorites.some((fav: any) => fav.examId === examId && fav.platformId === platformId)
      setIsFavorite(exists)
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }

  const toggleFavorite = () => {
    setIsLoading(true)

    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

      if (isFavorite) {
        // Remove from favorites
        const updatedFavorites = favorites.filter(
          (fav: any) => !(fav.examId === examId && fav.platformId === platformId),
        )
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
        setIsFavorite(false)
      } else {
        // Add to favorites
        const newFavorite = {
          id: Date.now().toString(),
          examId,
          platformId,
          courseName,
          createdAt: new Date().toISOString(),
        }
        favorites.push(newFavorite)
        localStorage.setItem("favorites", JSON.stringify(favorites))
        setIsFavorite(true)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={toggleFavorite}
      disabled={isLoading}
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      className={className}
    >
      <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </Button>
  )
}
