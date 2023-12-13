import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export type ErrorType = Error | Prisma.PrismaClientKnownRequestError

export function handleErrorResponse(error: ErrorType) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Prisma database error: ' + error.message,
      },
      { status: 500 },
    )
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  return NextResponse.json(
    {
      success: false,
      error: 'Internal Server Error: ' + errorMessage,
    },
    { status: 500 },
  )
}
