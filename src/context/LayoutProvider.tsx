'use client'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import NavigationBar from '@/components/NavigationBar'

interface ILayoutProvider {
  children: React.ReactNode
}

const protectedPages = ['/login', '/register'] // Pages that require authentication

export default function LayoutProvider({ children }: ILayoutProvider) {
  const pathname = usePathname()
  const { data: session, status } = useSession()

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
