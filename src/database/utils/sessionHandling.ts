import { getServerSession } from 'next-auth'
import { authOptions } from '@/database/auth'
import { jsonResponse } from './apiResponse';

export async function getSession() {
  return await getServerSession(authOptions)
}

export function handleNotLoggedInResponse() {
  return jsonResponse({
    success: false,
    error: 'You are not logged in',
    status: 401
  });
}
