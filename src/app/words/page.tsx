'use client'
import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown} from 'react-icons/hi'
import Link from 'next/link';
import { useRouter } from 'next/navigation'

import Image from '@/components/Image';

import { WordData } from '@/types';
import { useAxiosSWR } from '@/utils/useAxiosSWR';
import { exportToExcel, parseExcelFile } from '@/utils/excelUtils';

export default function Words() {
  const router = useRouter()

  const { data:dataList, error, isLoading } = useAxiosSWR<WordData[]>('words');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let filename = file.name;
      let re = /(?:\.([^.]+))?$/;
      let match = re.exec(filename);
      if (match && match[0] === '.xlsx') {
        parseExcelFile(file)
          .then((jsonData) => {
            debugger;
            // setExcelData(jsonData);
          })
          .catch((error) => {
            console.error('Error reading Excel file:', error);
          });
      }
    }
  }
  
  const handleButtonClick = () => {
    // Trigger the file input when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleExport = () => {
    const exportData = dataList.map(({ 
        id, image, dataUrl, createdAt, createdById, updatedAt, updatedById, 
        ...rest 
      }, idx) => ({ 
        No: idx + 1,...rest 
      })
    );
    exportToExcel(exportData, 'exported_data.xlsx', 'Sheet1');
  };

  const openGame = (word:string) => {
    // router.push(`/learnplay/word_grid_puzzle?word=${word}`);
    router.push(`/learnplay/word_grid_puzzle/?word=${word}`)

  }
  
  return (
    <main className="container mx-auto pt-16">
      <Link href='/words/new' className='btn btn-primary mx-4'>New Word</Link>
      <input ref={fileInputRef} type="file" className="hidden" accept=".xlsx" onChange={addFile} />
      <button className='btn' onClick={handleButtonClick}>Upload File</button>      
      {dataList && <button className='btn' onClick={handleExport}>Export to Excel</button>}     
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
                  src={word.dataUrl || '/images/placeholder.jpg'}
                  alt={word.word}
                  width={64}
                  height={64}
                  className='rounded'
                />
                <div>{word.word}</div>
              </div>
              <div className='right flex gap-2'>
                <button className='btn btn-accent rounded-full' onClick={() => openGame(word.word)}>play</button>
                <button className='btn btn-accent rounded-full'>other</button>
              </div>
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
