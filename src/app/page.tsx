"use client"

export default function Home() {
  return (
    <main className='container mx-auto flex flex-col items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to Treasure Words</h1>
        <p className='text-lg'>
          Explore the world of treasures through words!
        </p>
        <button className='btn mt-8'>Let's Begin</button>
      </div>
    </main>
  );
}
