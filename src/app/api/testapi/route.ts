import { NextRequest, NextResponse } from 'next/server';
import { apiUtils } from '@/utils/apiUtils';

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

// Mock functions for illustration purposes
async function findDataById(id: string | number) {
  // Replace this with your actual logic to find data by id
  // For example, querying a database
  return { id, /* other data properties */ };
}

async function updateDataById(id: string | number, newData: any) {
  // Replace this with your actual logic to update data by id
  // For example, updating a database record
  console.log(`Updating data with id ${id} to:`, newData);
  // Throw an error if the update fails
  // throw new Error('Update failed');
}

function getDefaultData() {
  // Replace this with your default data structure
  return { default: true };
}
