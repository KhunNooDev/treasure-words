'use client'
import Link from 'next/link' // Import Link from Next.js for routing

const games = [
  {
    name: 'game1',
    path: '/game1', // Specify the path for each game
    image: 'game1-image.jpg', // Add the path to the image for each game
  },
  {
    name: 'game2',
    path: '/game2',
    image: 'game2-image.jpg',
  },
]
export default function LearnPlay() {
  return (
    <main className='container mx-auto pt-16'>
      <h1 className='text-4xl font-bold'>LearnPlay</h1>

      <div className='flex flex-wrap'>
        {games.map((game, idx) => (
          <Link key={idx} href={game.path} className='relative m-2 w-1/2 rounded-sm border p-4'>
            <div className='mb-2'>
              <img src={game.image} alt={game.name} className='h-auto w-full' />
            </div>
            <div className='absolute bottom-0 left-0 w-full bg-neutral bg-opacity-80 text-blue-500 opacity-0 transition-opacity hover:opacity-100'>
              {game.name}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
