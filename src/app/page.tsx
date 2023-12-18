"use client"

import Submarine from "@/components/Animations/Submarine";
import TreasureBox from "@/components/Animations/TreasureChest";
import Typewriter from "@/components/Animations/Typewriter";

export default function Home() {
  return (
    <main className='container mx-auto py-16 flex flex-col items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to Treasure Words</h1>
        <p className='text-lg'>
          Explore the world of treasures through words!
        </p>
        <button className='btn mt-8'>Let's Begin</button>
      </div>
      {/* <Typewriter /> */}
      <TreasureBox />
      <Submarine />
    </main>
  );
}
