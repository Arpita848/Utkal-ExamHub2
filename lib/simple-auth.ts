export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

// Simple mock authentication for demo purposes
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
]

export const signIn = async (): Promise<User> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockUsers[0]
}

export const signOut = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
}
