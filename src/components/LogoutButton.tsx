'use client'
import { AiOutlineLogout } from 'react-icons/ai'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <button onClick={handleLogout} className='flex items-center text-red-500'>
      <AiOutlineLogout className='mr-2' />
      <span>Logout</span>
    </button>
  )
}
