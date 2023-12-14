import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/database/auth";
import { apiUtils } from '@/utils/apiUtils';
import prisma from '@/database/prismadb'
import { dataUtils } from '@/utils/dataUtils';
import { WordData } from '@/types';
import { getSession, handleNotLoggedInResponse } from '@/database/utils/sessionHandling';
import { DataApiType, ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse';
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
  try {
    const session = await getSession()
    if (!session) return handleNotLoggedInResponse()
    
    const { id } = await apiUtils.getParams(req) as {
      id:string
    };
    let data:DataApiType<any>;

    if (id) {
      data = {
        success: true,
        data: await prisma.word.findUnique({
          where: {
            id: id, //ex id is filter
          },
        })
      };
    } else {
      const words = await prisma.word.findMany()    
      // Convert each image buffer to base64, include imageType, and create data URL
      const _words: WordData[] = words.map((word) => {
        let dataUrl: string | null = null
        if(word.image){
          const base64Image = Buffer.from(word.image).toString('base64'); //word.image.toString('base64');
          const imageType = dataUtils.getImageType(word.image);
          dataUrl = imageType === 'unknown' ? null : `data:${imageType};base64,${base64Image}`;
        }
        return { ...word, dataUrl };
      });

      data = {
        success: true,
        data: _words
      };
    }

    return jsonResponse(data);
  } catch (error) {
    return errorResponse(error as ErrorType)
  } finally {
    await prisma.$disconnect() // Close the Prisma client
  }
}

// For updating data (create new)
export async function POST(req: NextRequest) {
  let data = {};
    
  try {
    const { word, partsOfSpeech, meaning, example, synonyms, antonyms, image, categories, level, phonetics } = await apiUtils.getParams(req);
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    console.log(userId);
    
    let imageData = null;
    if (image && dataUtils.isBlob(image)) {
      const buffer = Buffer.from(await image.arrayBuffer());
      imageData = buffer;
    }
    
    const wordData:any = {
      word,
      partsOfSpeech,
      meaning,
      example,
      image: imageData,
      categories,
      level,
      phonetics,
      // synonyms,
      // antonyms,
      createdById: userId, // Set the createdById field to the user ID
    }
    const result = await prisma.word.create({
      data: wordData,
    });
    data = {
      success: true,
      data: result,
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