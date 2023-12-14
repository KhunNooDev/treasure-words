import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/database/prismadb'
import { apiUtils } from '@/utils/apiUtils';
import { ErrorType, errorResponse } from '@/database/utils/apiResponse'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await apiUtils.getParams(req) as {
      name: string
      email: string
      password: string
    };

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { email: email.toLowerCase(), name, hashedPassword },
    })

    // return NextResponse.json({
    //   user: {
    //     name: user.name,
    //     email: user.email,
    //   },
    // })
  } catch (error: any) {
    return errorResponse(error as ErrorType)
  }
}
