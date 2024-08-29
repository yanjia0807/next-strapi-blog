import Image from '@/components/image'

export default function Logo({
  src,
  children,
}: {
  src: string | null
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center">
      {src && <Image src={src} alt="logo" width={45} height={45} className="max-w-none" />}
      <div className="ml-2">{children}</div>
    </div>
  )
}
