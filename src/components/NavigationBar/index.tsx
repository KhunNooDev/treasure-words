'use client'
import { AiOutlineBell, AiOutlineFontColors } from 'react-icons/ai'
import {
  RiHome3Line,
  RiSettings6Line,
  RiGamepadLine,
  RiApps2Line,
  RiBox3Line,
  RiCustomerServiceFill,
  RiUserLine,
  RiArrowLeftSLine,
} from 'react-icons/ri'
import { useRouter, usePathname } from 'next/navigation'

interface INavigationBar {
  children: React.ReactNode
}

const webTitle = 'Treasure Words'
const navigationItems = [
  { name: 'Home', icon: RiHome3Line, path: '/' },
  { name: 'Words', icon: AiOutlineFontColors, path: '/words' },
  { name: 'Learn & Play', icon: RiGamepadLine, path: '/learnplay' },
  { name: 'Categories', icon: RiApps2Line, path: '/categories' },
  { name: 'Profile', icon: RiUserLine, path: '/profile' },
]

const navigationOtherItems = [
  { name: 'CustomerService', icon: RiCustomerServiceFill, path: '/customerService' },
  { name: 'Settings', icon: RiSettings6Line, path: '/Settings' },
]

export default function NavigationBar({ children }: INavigationBar) {
  const router = useRouter()
  const currentPage = usePathname()
  const pageTitle = navigationItems.find((x) => x.path === currentPage)?.name
  return (
    <>
      {/* sidenav */}
      <div className='fixed hidden h-full w-16 flex-col items-center justify-between border py-5 md:flex'>
        <div>
          <div className='cursor-pointer p-2 hover:rounded-full hover:bg-blue-50 hover:text-gray-500'>
            <RiBox3Line />
          </div>
        </div>
        <ul className='flex flex-col gap-5 rounded-full border p-1'>
          {navigationItems.map(({ name, icon: Icon, path }) => (
            <li
              key={name}
              onClick={() => router.push(path)}
              className={`cursor-pointer rounded-full p-2 hover:bg-blue-50 hover:text-blue-500 ${
                currentPage === path ? 'bg-blue-50 text-blue-500' : 'text-gray-500'
              }`}
            >
              <Icon />
            </li>
          ))}
        </ul>
        <ul className='flex flex-col gap-5 p-3'>
          <li>
            <RiCustomerServiceFill />
          </li>
          <li>
            <RiSettings6Line />
          </li>
        </ul>
      </div>

      {/* topnav */}
      <div className='fixed left-0 right-0 top-0 z-[99] bg-neutral shadow-md md:hidden'>
        <div className='flex h-14 items-center justify-between px-4 py-2 '>
          {currentPage !== '/' && (
            <button onClick={() => router.back()} className='flex items-center text-blue-500 focus:outline-none'>
              <RiArrowLeftSLine className='text-xl' />
            </button>
          )}

          <span className='text-xl font-semibold'>{pageTitle}</span>

          <button className='text-gray-500 focus:outline-none'>
            <AiOutlineBell className='text-xl' />
          </button>
        </div>
      </div>

      {/* Children Content :Adjust the margin to match the navbar width */}
      <div className='ml-0 mt-14 md:ml-16 md:mt-0'>{children}</div>

      {/* bottomnav */}
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
