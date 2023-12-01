import { NextRequest, NextResponse } from 'next/server';
import { apiUtils } from '@/utils/apiUtils';
import prisma from '@/libs/prismadb'
/*
api/words/[id]/route.ts:
  GET: Fetch a specific word by id.
  PUT: Edit/update a specific word by id.
  DELETE: Delete a specific word by id.

api/words/route.ts:
  GET: Fetch all words.
  POST: Create a new word.
  Other operations as needed. (Pagination,Sorting,Search)
*/


// For getting data (filter)
export async function GET(req: NextRequest) {
  const { id } = await apiUtils.getParams(req);
  let data = {};

  if (id) {
    data = {
      success: true,
      data: await prisma.word.findUnique({
        where: {
          id: String(id), //ex id is filter
        },
      })
    };
  } else {
    data = {
      success: true,
      data: await prisma.word.findMany()
    };
  }

  return NextResponse.json(data);
}

// For updating data (create new)
export async function POST(req: NextRequest) {
  const { wordData } = await apiUtils.getParams(req);
  let data = {};
  try {
    const createdWord = await prisma.word.create({
      data: wordData as any,
    });
    data = {
      success: true,
      data: createdWord,
    };
  } catch (error) {
    console.error('Error inserting data:', error);
    data = {
      success: false,
      error: 'Failed to insert data.',
    };
  }

  return NextResponse.json(data);
}