import { NextRequest } from 'next/server'

import prisma from '@/database/prismadb'
import { getSession, handleNotLoggedInResponse } from '@/database/utils/sessionHandling'
import { jsonResponse, errorResponse, ErrorType} from '@/database/utils/apiResponse'

export async function GET(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) return handleNotLoggedInResponse()
    
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

    return jsonResponse({
      success: true,
      data: dropdownData,
    });
  } catch (error) {
    return errorResponse(error as ErrorType)
  } finally {
    await prisma.$disconnect() // Close the Prisma client
  }
}
