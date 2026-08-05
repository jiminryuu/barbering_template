'use client'

import type {ReactNode} from 'react'
import {motion} from 'framer-motion'
import {cn} from '@/lib/utils/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function Reveal({children, className, delay = 0, y = 18}: Readonly<RevealProps>) {
  return (
    <motion.div
      initial={{opacity: 0, y}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.25}}
      transition={{duration: 0.55, delay, ease: 'easeOut'}}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
