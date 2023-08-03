import {
  AiFillEdit,
  AiOutlineLock,
  AiOutlineBgColors,
  AiOutlineGlobal,
  AiOutlineQuestionCircle,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineDelete,
} from 'react-icons/ai'

import Avatar from '@/components/Avatar'

export default function Profile() {
  return (
    <main className='max-w-7xl self-center px-4 py-16'>
      <div className='flex flex-col items-center'>
        <div className='mb-2'>
          <Avatar width={80} height={80} />
        </div>
        <h1 className='text-2xl font-bold'>John Doe</h1>
        <p className='text-gray-500'>Rank: Diamond (1850)</p>
        <button className='mt-2 flex items-center text-blue-500'>
          <AiFillEdit className='mr-1 text-lg' />
          Edit Profile
        </button>
      </div>
      <div className='mt-8 border-t border-gray-300 pt-8'>
        <h2 className='mb-4 text-lg font-semibold'>Setting</h2>
        <ul className='space-y-2'>
          <li className='flex items-center'>
            <AiOutlineLock className='mr-2' />
            Change Password
          </li>
          <li className='flex items-center'>
            <AiOutlineBgColors className='mr-2' />
            Theme
          </li>
          <li className='flex items-center'>
            <AiOutlineGlobal className='mr-2' />
            Language
          </li>
          <li className='flex items-center text-red-500'>
            {/* Logout */}
            <AiOutlineLogout className='mr-2' />
            <span>Logout</span>
          </li>
          <li className='flex items-center text-red-500'>
            {/* Terminate Account */}
            <AiOutlineDelete className='mr-2' />
            <span>Terminate Account</span>
          </li>
        </ul>
      </div>
      <div className='mt-8 border-t border-gray-300 pt-8'>
        <h2 className='mb-4 text-lg font-semibold'>Support</h2>
        <ul className='space-y-2'>
          <li className='flex items-center'>
            <AiOutlineQuestionCircle className='mr-2' />
            Help Center
          </li>
          <li className='flex items-center'>
            <AiOutlineInfoCircle className='mr-2' />
            About Us
          </li>
        </ul>
      </div>
    </main>
  )
}
