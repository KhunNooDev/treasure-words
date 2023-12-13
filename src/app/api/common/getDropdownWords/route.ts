import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import prisma from '@/libs/prismadb'
import { Prisma } from '@prisma/client'
import { ErrorType, handleErrorResponse } from '../../errorHandling'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: 'You are not logged in',
        },
        { status: 401 },
      )
    }
    const wordsWithIdAndWord = await prisma.word.findMany({
      select: {
        id: true,
        word: true,
      },
    })

    const dropdownData = wordsWithIdAndWord.map((word) => ({
      value: word.id,
      label: word.word,
    }))

    return NextResponse.json({
      success: true,
      data: dropdownData,
    })
  } catch (error) {
    return handleErrorResponse(error as ErrorType)
  } finally {
    // Close the Prisma client
    await prisma.$disconnect()
  }
}
