'use client'

import {Children, cloneElement, isValidElement, type ReactNode, useCallback, useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {cn} from '@/lib/utils/cn'

interface StackedCarouselProps {
  children: ReactNode[] | ReactNode
  className?: string
  selectedIndex?: number
  onIndexChange?: (index: number) => void
}

export default function StackedCarousel({
  children,
  className = '',
  selectedIndex,
  onIndexChange,
}: Readonly<StackedCarouselProps>) {
  const [internalIndex, setInternalIndex] = useState(0)
  const isControlled = selectedIndex !== undefined
  const currentIndex = isControlled ? selectedIndex : internalIndex

  const items = Children.toArray(children)
  const total = items.length

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      if (!isControlled) {
        setInternalIndex(newIndex)
      }
      onIndexChange?.(newIndex)
    },
    [isControlled, onIndexChange]
  )

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      handleIndexChange(currentIndex + 1)
    }
  }, [currentIndex, total, handleIndexChange])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      handleIndexChange(currentIndex - 1)
    }
  }, [currentIndex, handleIndexChange])

  if (total === 0) return null

  const visibleItems = items.slice(currentIndex, currentIndex + 4)

  return (
    <div className={cn('relative flex w-full flex-col items-center', className)}>
      <div className="relative flex w-full items-center justify-center">
        {/* Ghost item for layout sizing - Always render as active for correct height */}
        <div
          className="invisible relative w-full max-w-5xl px-4 pointer-events-none"
          aria-hidden="true"
        >
          <div className="relative overflow-hidden">
            {isValidElement(items[currentIndex])
              ? cloneElement(items[currentIndex] as React.ReactElement, {isActive: true} as any)
              : items[currentIndex]}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {[...visibleItems].reverse().map((item, index) => {
            const visualIndex = visibleItems.length - 1 - index
            const direction = visualIndex % 2 === 0 ? 1 : -1
            const itemIndex = currentIndex + visualIndex
            const key =
              (typeof item === 'object' && item && 'key' in item && item.key) ||
              `carousel-item-${itemIndex}`
            const isActive = visualIndex === 0

            return (
              <motion.div
                key={String(key)}
                style={{zIndex: 20 - visualIndex, position: 'absolute'}}
                initial={{opacity: 0, scale: 0.82, x: 60}}
                animate={{
                  scale: 1 - visualIndex * 0.08,
                  y: visualIndex * -60,
                  x: visualIndex === 0 ? 0 : direction * visualIndex * -120,
                  rotate: visualIndex === 0 ? 0 : direction * visualIndex * 1.5,
                  opacity: 1 - visualIndex * 0.2,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  x: -110,
                  transition: {duration: 0.2},
                }}
                transition={{type: 'spring', stiffness: 240, damping: 22}}
                className={cn(
                  'w-full max-w-5xl px-4 transition-all',
                  isActive ? 'pointer-events-auto' : 'pointer-events-none'
                )}
              >
                <div className="relative overflow-hidden">
                  {isValidElement(item)
                    ? cloneElement(item as React.ReactElement, {isActive} as any)
                    : item}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 pt-6">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={cn(
            'rounded-full border border-[color:var(--color-border)] p-2 transition-all sm:p-3',
            currentIndex === 0
              ? 'cursor-not-allowed opacity-20'
              : 'opacity-100 hover:scale-125 hover:bg-[var(--color-surface)] active:scale-95'
          )}
          aria-label="Previous item"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>

        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
          <span className="font-bold text-[var(--color-accent)]">{currentIndex + 1}</span> / {total}
        </div>

        <button
          onClick={goNext}
          disabled={currentIndex === total - 1}
          className={cn(
            'rounded-full border border-[color:var(--color-border)] p-2 transition-all sm:p-3',
            currentIndex === total - 1
              ? 'cursor-not-allowed opacity-20'
              : 'opacity-100 hover:scale-125 hover:bg-[var(--color-surface)] active:scale-95'
          )}
          aria-label="Next item"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  )
}