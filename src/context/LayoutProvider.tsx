'use client'
import { useLayoutEffect } from 'react'
import { useRouter, usePathname, redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import NavigationBar from '@/components/NavigationBar'
import useUserLogin from '@/hooks/useUserLogin'

interface ILayoutProvider {
  children: React.ReactNode
}

const protectedPages = ['/login', '/register'] // Pages that require authentication

export default function LayoutProvider({ children }: ILayoutProvider) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const setCurrentUser = useUserLogin((state) => state.setCurrentUser)

  useLayoutEffect(() => {
    // Redirect to the login page if trying to access a protected page without authentication
    if (!protectedPages.includes(pathname) && !session) {
      router.push('/login')
      setCurrentUser(null)
    }
    // Redirect to the home page if authenticated user tries to access login or register pages
    if (protectedPages.includes(pathname) && session) {
      router.push('/')
      setCurrentUser(session?.user)
    }
  }, [pathname, session])
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
