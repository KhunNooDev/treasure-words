'use client'
import React, { useState, useEffect, useRef, FC } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Image from '@/components/Image'

import { WordData } from '@/types'
import { useAxiosSWR } from '@/utils/useAxiosSWR'
import { exportToExcel, parseExcelFile } from '@/utils/excelUtils'
import { RiMore2Line, RiPlayLine } from 'react-icons/ri'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`)

export default function Words() {
  const router = useRouter()

  const { data: dataList, error, isLoading } = useAxiosSWR<WordData[]>('words')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      let filename = file.name
      let re = /(?:\.([^.]+))?$/
      let match = re.exec(filename)
      if (match && match[0] === '.xlsx') {
        parseExcelFile(file)
          .then((jsonData) => {
            debugger
            // setExcelData(jsonData);
          })
          .catch((error) => {
            console.error('Error reading Excel file:', error)
          })
      }
    }
  }

  const handleButtonClick = () => {
    // Trigger the file input when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleExport = () => {
    const exportData = dataList.map(
      ({ id, image, dataUrl, createdAt, createdById, updatedAt, updatedById, ...rest }, idx) => ({
        No: idx + 1,
        ...rest,
      }),
    )
    exportToExcel(exportData, 'exported_data.xlsx', 'Sheet1')
  }

  const openGame = (word: string) => {
    // router.push(`/learnplay/word_grid_puzzle?word=${word}`);
    router.push(`/learnplay/word_grid_puzzle/?word=${word}`)
  }

  return (
    <main className='p-5'>
      <div className='flex items-center justify-between'>
        <div className='hidden text-2xl font-bold md:flex'>Words</div>
        <div className='flex gap-2'>
          <Link href='/words/new' className='btn btn-primary'>
            New Word
          </Link>
          <input ref={fileInputRef} type='file' className='hidden' accept='.xlsx' onChange={addFile} />
          <button className='btn' onClick={handleButtonClick}>
            Upload File
          </button>
          {dataList && (
            <button className='btn' onClick={handleExport}>
              Export to Excel
            </button>
          )}
        </div>
      </div>
      <CardGroup />
    </main>
  )
}

const cardData: CardData[] = [
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    title: 'Shoes!',
    imageUrl: '/images/placeholder.jpg',
  },
]

interface CardData {
  title: string
  imageUrl: string
}

const Card: React.FC<CardData> = ({ title, imageUrl }) => (
  <div className='card bg-blue-500 p-3 shadow-xl'>
    <div className='flex justify-center'>
      <Image src={imageUrl} alt={title} width={150} height={150} className='rounded-xl' />
    </div>
    <div className='card-body'>
      <h2 className='card-title'>{title}</h2>
      <div className='card-actions justify-end'>
        <button className='btn btn-primary'>Buy Now</button>
      </div>
    </div>
  </div>
)

const CardGroup: React.FC = () => {
  const cardGroupRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (cardGroupRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardGroupRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth)
    }
  }

  useEffect(() => {
    // Add event listener for scroll
    if (cardGroupRef.current) {
      cardGroupRef.current.addEventListener('scroll', handleScroll)
    }

    // Clean up event listener on component unmount
    return () => {
      if (cardGroupRef.current) {
        cardGroupRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scroll = (scrollAmount: number) => {
    if (cardGroupRef.current) {
      cardGroupRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className='my-2 flex flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold'>Categories</div>
        <div className='text-sm text-gray-500'>View All</div>
      </div>
      <div className='relative flex items-center space-x-4'>
        <div ref={cardGroupRef} className='hide-scrollbar flex space-x-4 overflow-x-auto'>
          {cardData.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </div>
        {showLeftArrow && (
          <button
            onClick={() => scroll(-1200)}
            className='absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 text-black'
            aria-label='Scroll Left'
          >
            <RiArrowLeftSLine size={24} />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll(1200)}
            className='absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 text-black'
            aria-label='Scroll Right'
          >
            <RiArrowRightSLine size={24} />
          </button>
        )}
      </div>
    </div>
  )
}
