'use client'
import React, { useState, useEffect } from 'react';
import { HiChevronDown} from 'react-icons/hi'
import Link from 'next/link';
import Image from 'next/image';

import { apiUtils, useAxiosSWR } from '@/utils/apiUtils';
import { WordData } from '@/types/word.type';

export default function Words() {
  const { data:dataList, error, isLoading } = useAxiosSWR<WordData[]>('words');

  return (
    <main className="container mx-auto pt-16">
      <Link href='/words/new' className='btn btn-primary mx-4'>New Word</Link>
      <div className='border rounded-lg m-2 p-2'>
        <div className='flex justify-between'>
          <div className='font-bold'>All</div>
          <div>Sort <HiChevronDown className='inline'/></div>
        </div>
        <div className='border rounded-md my-2'>
          {dataList?.length > 0 && dataList.map((word) =>(
            <div key={word.word} className='flex items-center justify-between p-2 gap-2'>
              <div className='flex items-center gap-2'>
                <Image 
                  src='/images/placeholder.jpg' //{word.image}
                  alt={word.word}
                  width={64}
                  height={64}
                  className='rounded'
                />
                <div>{word.word}</div>
              </div>
              <div className='right'>action</div>
            </div>
          ))}
        </div>
        <div>
          <div className="join">
            <button className="join-item btn btn-xs btn-active">1</button>
            <button className="join-item btn btn-xs">2</button>
            <button className="join-item btn btn-xs">3</button>
            <button className="join-item btn btn-xs">4</button>
          </div>
        </div>
      </div>
    </main>
  );
}
