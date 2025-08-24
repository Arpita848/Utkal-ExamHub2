"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Home, User } from "lucide-react"

export function Header() {
  const isLoggedIn = false // Simple frontend-only state

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UE</span>
            </div>
            <span className="text-xl font-bold text-blue-900">Utkal ExamHub</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Home</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link href="/favorites" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden md:inline">Favorites</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Account</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
