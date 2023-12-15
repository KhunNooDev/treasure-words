import { NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

import { apiUtils } from '@/utils/apiUtils';
import { ErrorType, errorResponse, jsonResponse } from '@/database/utils/apiResponse'
import { closePrismaClient, create } from '@/database/actions';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await apiUtils.getParams(req) as {
      name: string
      email: string
      password: string
    };

    const hashedPassword = await bcrypt.hash(password, 12)

    const data = { email: email.toLowerCase(), name, hashedPassword }
    await create('user', data)

    return jsonResponse({
      success: true,
    });
  } catch (error) {
    return errorResponse(error as ErrorType)
  } finally {
    await closePrismaClient();
  }
}
