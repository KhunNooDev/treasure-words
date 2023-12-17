'use client'
import { IconType } from 'react-icons'
import {
  AiOutlineHome,
  AiOutlineRocket,
  AiOutlineAppstore,
  AiOutlineUser,
  AiOutlineBell,
  AiOutlineArrowLeft,
  AiOutlineFontColors,
} from 'react-icons/ai'
import { useRouter, usePathname } from 'next/navigation'

interface INavigationBar {
  children: React.ReactNode
}

const webTitle = 'Treasure Words'
const navigationItems = [
  { name: 'Home', icon: AiOutlineHome, path: '/' },
  { name: 'Words', icon: AiOutlineFontColors, path: '/words' },
  { name: 'Learn & Play', icon: AiOutlineRocket, path: '/learnplay' },
  { name: 'Categories', icon: AiOutlineAppstore, path: '/categories' },
  { name: 'Profile', icon: AiOutlineUser, path: '/profile' },
]

export default function NavigationBar({ children }: INavigationBar) {
  const router = useRouter()
  const currentPage = usePathname()
  const pageTitle = navigationItems.find((x) => x.path === currentPage)?.name
  return (
    <>
      <div className='fixed left-0 right-0 top-0 z-[99] bg-neutral shadow-md'>
        <div className='flex h-14 items-center justify-between px-4 py-2 md:hidden'>
          {/* Back Icon to Home Page */}
          {currentPage !== '/' && (
            <button onClick={() => router.back()} className='flex items-center text-blue-500 focus:outline-none'>
              <AiOutlineArrowLeft className='text-xl' />
            </button>
          )}

          {/* Page Title */}
          <span className='text-xl font-semibold'>{pageTitle}</span>

          {/* Bell Icon for Notifications */}
          <button className='text-gray-500 focus:outline-none'>
            <AiOutlineBell className='text-xl' />
          </button>
        </div>
        <div className='hidden h-14 items-center justify-between px-4 py-2 md:flex'>
          {/* Web Title */}
          <span className='text-xl font-semibold'>{webTitle}</span>
          {/* Right menu */}
          <div className='flex gap-3'>
            <nav className='flex gap-3'>
              <ul className='flex justify-around gap-3 py-2'>
                {navigationItems.map(({ name, icon: Icon, path }) => (
                  <li
                    key={name}
                    onClick={() => router.push(path)}
                    className={`flex flex-auto cursor-pointer items-center justify-between gap-1 ${
                      currentPage === path ? 'text-blue-500' : 'text-gray-500'
                    }`}
                  >
                    <Icon className='text-2xl' />
                    <span className='block text-xs'>{name}</span>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Bell Icon for Notifications */}
            <button className='text-gray-500 focus:outline-none'>
              <AiOutlineBell className='text-xl' />
            </button>
          </div>
        </div>
      </div>

      {/* Children Content */}
      {children}

      <nav className='fixed bottom-0 left-0 right-0 z-[99] h-14 bg-neutral shadow-md md:hidden'>
        <ul className='flex justify-around py-2'>
          {navigationItems.map(({ name, icon: Icon, path }) => (
            <li
              key={name}
              onClick={() => router.push(path)}
              className={`flex flex-auto cursor-pointer flex-col items-center ${
                currentPage === path ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <Icon className='text-2xl' />
              <span className='block text-xs'>{name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
