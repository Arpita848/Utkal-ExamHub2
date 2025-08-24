"use client"

import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"

export function AuthButton() {
  const { user, isLoading, signIn, signOut } = useAuth()

  if (isLoading) {
    return <Button disabled>Loading...</Button>
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4" />
          <span className="hidden md:inline">{user.name}</span>
        </div>
        <Button onClick={signOut} variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Sign Out</span>
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={signIn} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
      <LogIn className="w-4 h-4" />
      Sign In (Demo)
    </Button>
  )
}
