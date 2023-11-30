import { NextRequest, NextResponse } from 'next/server';
import { apiUtils } from '@/utils/apiUtils';
import prisma from '@/libs/prismadb'

// For getting simple data or open data already
export async function GET(req: NextRequest) {
  const { id } = await apiUtils.getParams(req);
  let data = {};

  if (id) {
    const foundData = await findDataById(id);
    data = {
      success: true,
      data: foundData,
    };
  } else {
    const defaultData = getDefaultData();
    data = {
      success: true,
      data: defaultData,
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
      await updateDataById(id, wordData);
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
      const createdWord = await insertWord(wordData);
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
      await deleteDataById(id);
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

// Prisma function for deleting data
async function deleteDataById(id: string | number) {
  return prisma.word.delete({
    where: {
      id: String(id),
    },
  });
}

// Prisma functions for database operations
async function findDataById(id: string | number) {
  return prisma.word.findUnique({
    where: {
      id: String(id),
    },
  });
}

async function insertWord(wordData: any) {
  return prisma.word.create({
    data: wordData,
  });
}

async function updateDataById(id: string | number, newData: any) {
  return prisma.word.update({
    where: {
      id: String(id),
    },
    data: {
      // Update your data fields here based on newData
    },
  });
}

function getDefaultData() {
  // Replace this with your default data structure
  return { default: true };
}