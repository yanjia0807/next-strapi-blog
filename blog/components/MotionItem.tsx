'use client'

import { motion } from 'framer-motion'

const item = {
  hidden: { opacity: 0, x: -25, y: 0 },
  show: { opacity: 1, x: 0, y: 0 },
}

export default function MotionItem({ children, className }: any) {
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  )
}
