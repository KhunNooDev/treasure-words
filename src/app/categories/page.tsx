import Image from '@/components/Image'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`)

export default function Categories() {
  return (
    <main className='p-5'>
      <div className='my-2 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='text-2xl font-bold'>Categories</div>
          <div className='text-sm text-gray-500'>View All</div>
        </div>
        <div className='sml:grid-cols-2 grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9'>
          {items.map((item, index) => (
            <div key={index} className='rounded-md bg-gray-200 p-2 text-center shadow-md'>
              <div className='h-32'>
                <Image
                  src='/vercel.svg'
                  alt='Vercel Logo'
                  className='h-full w-full rounded-md' //object-cover
                  width={32}
                  height={32}
                />
              </div>
              <div className='text-sm text-black'>{item}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='my-2 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='text-xl	font-bold'>Popular Items</div>
          <div className='text-sm text-gray-500'>
            <div className='flex gap-2'>
              <RiArrowLeftSLine />
              <RiArrowRightSLine />
            </div>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='h-64 w-48 rounded-xl border p-2'>1</div>
          <div className='h-64 w-48 rounded-xl border p-2'>2</div>
          <div className='h-64 w-48 rounded-xl border p-2'>3</div>
          <div className='h-64 w-48 rounded-xl border p-2'>4</div>
          <div className='h-64 w-48 rounded-xl border p-2'>5</div>
          <div className='h-64 w-48 rounded-xl border p-2'>6</div>
        </div>
      </div>
    </main>
  )
}
