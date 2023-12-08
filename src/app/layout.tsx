import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AuthProvider from '@/context/AuthProvider'
import LayoutProvider from '@/context/LayoutProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
