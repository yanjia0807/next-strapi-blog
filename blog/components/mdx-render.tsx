import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from './image'

const components = {
  img: (props) => {
    return (
      <Image
        width={0}
        height={0}
        unoptimized={true}
        className="h-auto w-full object-contain"
        {...props}
      />
    )
  },
}

function MdxRender(props) {
  return <MDXRemote {...props} components={components} />
}

export default MdxRender
