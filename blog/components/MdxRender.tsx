import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from '@/components/Image'

const components = {
  Image,
}
function MdxRender({ source, options = {} }: any) {
  return <MDXRemote source={source} options={options} components={components} />
}

export default MdxRender
