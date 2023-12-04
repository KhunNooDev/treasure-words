import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { email: email.toLowerCase(), name, hashedPassword },
    })

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
