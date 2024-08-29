'use client'

import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export default function MotionSection({ className, children }: any) {
  return (
    <motion.div className={className} variants={variants} initial="hidden" animate="enter">
      {children}
    </motion.div>
  )
}
