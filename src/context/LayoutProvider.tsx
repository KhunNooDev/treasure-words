'use client'

import { useEffect } from 'react'
import { useRouter, usePathname, redirect } from 'next/navigation'
import { useSession, getSession } from 'next-auth/react'

import NavigationBar from '@/components/NavigationBar'
import { SafeUser } from '@/types'
import useUserLogin from '@/hooks/useUserLogin'

interface ILayoutProvider {
  children: React.ReactNode
  currentUser?: SafeUser | null
}
export default function LayoutProvider({ children, currentUser }: ILayoutProvider) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const protectedPages = ['/login', '/register'] // Pages that require authentication
  const setCurrentUser = useUserLogin((state) => state.setCurrentUser)

  useEffect(() => {
    // session
    setCurrentUser(currentUser as SafeUser)
  }, [])

  useEffect(() => {
    // Ensure session on the server side
    getSession().then((serverSession) => {
      // Redirect to the login page if trying to access a protected page without authentication
      if (!protectedPages.includes(pathname) && !serverSession) {
        router.push('/login')
      }
      // Redirect to the home page if authenticated user tries to access login or register pages
      else if (protectedPages.includes(pathname) && serverSession) {
        router.push('/')
      }
    })
  }, [pathname])

  return (
    <>
      {status === 'loading' ? null : protectedPages.includes(pathname) ? (
        // Render the children wrapped with NavigationBar for pages that require authentication
        <>{children}</>
      ) : (
        // Render the children directly for login and register pages
        <NavigationBar>{children}</NavigationBar>
      )}
    </>
  )
}
