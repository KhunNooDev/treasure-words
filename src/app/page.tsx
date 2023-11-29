"use client"
import { apiUtils } from "@/utils/apiUtils"
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState<any>(null);
  const testapi = () => {
    // apiUtils.getData('testapi',{
    //   txt:"is text",
    //   num:123
    // }).then((data) => {
    //   debugger;
    //   setState(data)
    // })
    apiUtils.postData('testapi', {
      txt:"is text",
      num:123
    }).then((data) => {
      debugger;
      // Handle the data, e.g., update state
      setState(data);
    })
  }
  return (
    <main className='container mx-auto pt-16'>
      <h1 className='text-4xl font-bold'>Welcome to Treasure Words</h1>
      <p className='mt-4 text-lg'>Explore the world of treasures through words!</p>
      <button onClick={() => testapi()}>test api</button>
    </main>
  )
}
