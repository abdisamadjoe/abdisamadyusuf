import React from "react"

export type ImageProps = React.ComponentProps<"img"> & {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  priority?: boolean
  quality?: number
  unoptimized?: boolean
}

export default function Image({
  priority,
  unoptimized,
  ...props
}: ImageProps) {
  return <img {...props} />
}
