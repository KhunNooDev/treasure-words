'use client'
import Image from '@/components/Image';

interface AvatarProps {
  src?: string | null | undefined
  width?: number
  height?: number
}
export default function Avatar({ src, width, height }: AvatarProps) {
  return (
    <Image
      className='rounded-full'
      width={width || 30}
      height={height || 30}
      alt='Avatar'
      src={src || '/images/placeholder.jpg'}
    />
  )
}
