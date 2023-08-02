'use client'
import { IconType } from 'react-icons'
import { AiOutlineHome, AiOutlineAppstore, AiOutlineUser, AiOutlineBell, AiOutlineArrowLeft } from 'react-icons/ai'
import { useRouter, usePathname } from 'next/navigation'

interface INavigationBar {
  children: React.ReactNode
}

const webTitle = 'Treasure Words'
const navigationItems = [
  { name: 'Home', icon: AiOutlineHome, path: '/' },
  { name: 'Categories', icon: AiOutlineAppstore, path: '/categories' },
  { name: 'Profile', icon: AiOutlineUser, path: '/profile' },
]

const getPageTitle = (path: string) => {
  switch (path) {
    case '/':
      return webTitle
    default:
      if (path.startsWith('/')) {
        const title = path.slice(1)
        return title.charAt(0).toUpperCase() + title.slice(1)
      }
      return 'Page Title'
  }
}

export default function NavigationBar({ children }: INavigationBar) {
  const router = useRouter()
  const currentPage = usePathname()
  const pageTitle = getPageTitle(currentPage)

  return (
    <>
      <div className='fixed left-0 right-0 top-0 bg-white shadow-md'>
        <div className='flex items-center justify-between px-4 py-2 md:hidden'>
          {/* Back Icon to Home Page */}
          {currentPage !== '/' && (
            <button onClick={() => router.push('/')} className='flex items-center text-blue-500 focus:outline-none'>
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
        <div className='hidden items-center justify-between px-4 py-2 md:flex'>
          {/* Web Title */}
          <span className='text-xl font-semibold'>{webTitle}</span>

          {/* NavigationItems only name */}
          <></>

          {/* Bell Icon for Notifications */}
          <button className='text-gray-500 focus:outline-none'>
            <AiOutlineBell className='text-xl' />
          </button>
        </div>
      </div>

      {/* Children Content */}
      {children}

      <nav className='fixed bottom-0 left-0 right-0 bg-white shadow-md md:hidden'>
        <ul className='flex justify-around py-2'>
          {navigationItems.map(({ name, icon: Icon, path }) => (
            <li
              key={name}
              onClick={() => router.push(path)}
              className={`flex cursor-pointer flex-col items-center ${
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
