import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export type DataApiType<T> = { success: boolean, data?: T, error?: string };
type JsonResponseOptions<T> = DataApiType<T> & { status?: number };
export type ErrorType = Error | Prisma.PrismaClientKnownRequestError

export function jsonResponse<T = any>({success, data, error, status = 200}: JsonResponseOptions<T>) {
  const response: DataApiType<T> = {
    success,
    data: data as T,
    ...(error && { error }),
  };
  return NextResponse.json(response, { status });
}

export function errorResponse(error: ErrorType) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return jsonResponse({
      success: false,
      error: 'Prisma database error: ' + error.message,
      status: 500
    });
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  return jsonResponse({
    success: false,
    error: 'Internal Server Error: ' + errorMessage,
    status: 500
  });
}
