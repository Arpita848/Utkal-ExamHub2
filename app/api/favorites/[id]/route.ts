import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorite = await prisma.favorite.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!favorite) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 })
    }

    await prisma.favorite.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Favorite removed" })
  } catch (error) {
    console.error("Error deleting favorite:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
