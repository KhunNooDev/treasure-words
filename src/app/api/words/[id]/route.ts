import { NextRequest, NextResponse } from 'next/server';
import { apiUtils } from '@/utils/apiUtils';
import prisma from '@/database/prismadb'
import { dataUtils } from '@/utils/dataUtils';

// [id] For getting data
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  // const {   } = await apiUtils.getParams(req);
  let data = {};

  if (id) {
    data = {
      success: true,
      data: await selectById(id),
    };
  } else {
    data = {
      success: true,
      data: await selectAllItem(),
    };
  }

  return NextResponse.json(data);
}

// For updating data (insert or edit)
export async function POST(req: NextRequest) {
  const { id, wordData } = await apiUtils.getParams(req);
  let data = {};
  
  if (id) { //edit
    try {
      await updateDataById(String(id), wordData);
      data = {
        success: true,
      };
    } catch (error) {
      console.error('Error updating data:', error);
      data = {
        success: false,
        error: 'Failed to update data.',
      };
    }
  } else { //insert 
    try {
      const createdWord = await insertData(wordData);
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
  }

  return NextResponse.json(data);
}

// For deleting data
export async function DELETE(req: NextRequest) {
  const { id } = await apiUtils.getParams(req);
  let data = {};

  if (id) {
    try {
      await deleteDataById(String(id));
      data = {
        success: true,
      };
    } catch (error) {
      console.error('Error deleting data:', error);
      data = {
        success: false,
        error: 'Failed to delete data.',
      };
    }
  } else {
    data = {
      success: false,
      error: 'Invalid or missing ID for deletion.',
    };
  }

  return NextResponse.json(data);
}

// Prisma functions for database operations
async function selectAllItem() {
  return prisma.word.findMany();
}

async function selectById(id: string) {
  return prisma.word.findUnique({
    where: {
      id: String(id),
    },
  });
}

async function insertData(wordData: any) {
  return prisma.word.create({
    data: wordData,
  });
}

async function updateDataById(id: string, newData: any) {
  return prisma.word.update({
    where: {
      id: String(id),
    },
    data: newData,
  });
}

async function deleteDataById(id: string) {
  return prisma.word.delete({
    where: {
      id: String(id),
    },
  });
}