'use client'
import { AiOutlineLogout } from 'react-icons/ai'
import { signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation' // Auto Redirect to the login page by LayoutProvider.tsx

export default function LogoutButton() {
  // const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    // router.push('/login')
  }

  return (
    <button onClick={handleLogout} className='flex items-center text-red-500'>
      <AiOutlineLogout className='mr-2' />
      <span>Logout</span>
    </button>
  )
}
