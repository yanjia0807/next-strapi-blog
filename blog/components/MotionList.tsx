'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function MotionList({ children, className }: any) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show" className={className}>
      {children}
    </motion.ul>
  )
}
