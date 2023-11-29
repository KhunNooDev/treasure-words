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

// For updating data (edit or delete)
export async function POST(req: NextRequest) {
  const { id, some_data } = await apiUtils.getParams(req);
  let data = {};

  if (id) {
    try {
      await updateDataById(id, some_data);
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
  } else {
    data = {
      success: false,
      error: 'Invalid or missing ID.',
    };
  }

  return NextResponse.json(data);
}


// Prisma functions for database operations
async function findDataById(id: string | number) {
  return prisma.listing.findUnique({
    where: {
      id: String(id),
    },
  });
}

async function updateDataById(id: string | number, newData: any) {
  return prisma.listing.update({
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