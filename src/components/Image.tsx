import NextImage, { ImageProps } from 'next/image'

export default function Image(props: ImageProps) {
  return (
    <NextImage
      layout='responsive'
      width={props.width}
      height={props.height}
      style={{
        width: props.width,
        maxWidth: props.width,
        height: props.height,
        maxHeight: props.height,
        ...props.style,
      }}
      priority
      {...props}
    />
  )
}
