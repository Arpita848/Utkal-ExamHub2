import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(favorites)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { examId, platformId, courseName } = await request.json()

    if (!examId || !platformId || !courseName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        examId,
        platformId,
        courseName,
      },
    })

    return NextResponse.json(favorite)
  } catch (error) {
    console.error("Error creating favorite:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
