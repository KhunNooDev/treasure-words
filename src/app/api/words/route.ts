import { NextRequest, NextResponse } from 'next/server';
import { apiUtils } from '@/utils/apiUtils';
import prisma from '@/libs/prismadb'
import { dataUtils } from '@/utils/dataUtils';
import { WordData } from '@/types/word.type';
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
    const words = await prisma.word.findMany()
    // Convert each image buffer to base64, include imageType, and create data URL
    const _words: WordData[] = words.map((word) => {
      const base64Image = word.image.toString('base64');
      const imageType = dataUtils.getImageType(word.image);
      const dataUrl = imageType === 'unknown' ? null : `data:${imageType};base64,${base64Image}`;

      return {
        ...word,
        dataUrl,
      };
    });

    data = {
      success: true,
      data: _words
    };
  }

  return NextResponse.json(data);
}

// For updating data (create new)
export async function POST(req: NextRequest) {
  let data = {};
    
  try {
    const { word, partsOfSpeech, meaning, example, synonyms, antonyms, image, categories, level, phonetics } = await apiUtils.getParams(req);

    // if (!word || !partsOfSpeech || !meaning || !example || !categories || !level || !phonetics) {
    //   return NextResponse.json({ success: false, error: 'Invalid request parameters' });
    // }

    let imageData = null;
    if (image && dataUtils.isBlob(image)) {
      const buffer = Buffer.from(await image.arrayBuffer());
      imageData = buffer;
    }
    
    const wordData:any = {
      word,
      partsOfSpeech,
      meaning: ["meaning1", "meaning2"],
      example: "Example sentence",
      synonyms: ["synonym1", "synonym2"],
      antonyms: ["antonym1", "antonym2"],
      image: imageData,
      categories: ["category1", "category2"],
      level: "Intermediate",
      phonetics: "faʊnd",
    }
    const result = await prisma.word.create({
      data: wordData,
    });
    // const createdWord = await prisma.word.create({
    //   data: wordData as any,
    // });
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