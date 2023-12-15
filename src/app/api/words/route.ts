import { NextRequest } from 'next/server';
import { Word } from '@prisma/client';

import prisma from '@/database/prismadb'
import { getSession, handleNotLoggedInResponse } from '@/database/utils/sessionHandling';
import { DataApiType, ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse';
import { closePrismaClient, create, selectAll } from '@/database/actions';
import { apiUtils } from '@/utils/apiUtils';
import { dataUtils } from '@/utils/dataUtils';
import { WordData } from '@/types';
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
      const words = await selectAll('word') as Word[];
    
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
  try {
    const session = await getSession()
    if (!session) return handleNotLoggedInResponse()
    const userId = session.user?.id
    const { word, partsOfSpeech, meaning, example, synonyms, antonyms, image, categories, level, phonetics } = await apiUtils.getParams(req);
    
    let imageData = null;
    if (image && dataUtils.isBlob(image)) {
      const buffer = Buffer.from(await image.arrayBuffer());
      imageData = buffer;
    }
    
    const wordData = {
      word,
      partsOfSpeech,
      meaning,
      example,
      image: imageData,
      categories,
      level,
      phonetics,
      language: 'en',
      // synonyms,
      // antonyms,
      createdById: userId, // Set the createdById field to the user ID
    }
    const result = await create('word', wordData)

    return jsonResponse({
      success: true,
      data: result,
    });
  } catch (error) {
    return errorResponse(error as ErrorType)
  } finally {
    await closePrismaClient();
  }
}