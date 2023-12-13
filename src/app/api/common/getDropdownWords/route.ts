import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import prisma from '@/libs/prismadb';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You are not logged in",
      },{ status: 401 });
    }
    const wordsWithIdAndWord = await prisma.word.findMany({
      select: {
        id: true,
        word: true,
      },
    });

    const dropdownData = wordsWithIdAndWord.map((word) => ({
      value: word.id,
      label: word.word,
    }));

    // console.log(dropdownData);

    return NextResponse.json({
      success: true,
      data: dropdownData,
    });
  } catch (error) {
    console.error('Error in your API endpoint:', error);
  
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors
      return NextResponse.json({
        success: false,
        error: 'Prisma database error',
      }, { status: 500 });
    }
  
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, { status: 500 });
  }
  finally {
    // Close the Prisma client
    await prisma.$disconnect();
  }
}
