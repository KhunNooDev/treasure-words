import NextImage, { ImageProps } from 'next/image';

export default function Image(props:ImageProps) {
  return (
    <NextImage 
      width={props.width}
      height={props.height}
      style={{ width: props.width, height: props.height, ...props.style }}
      priority
      {...props}
    />
  )
}
