'use client'

import { useState, useEffect } from 'react'
import { urlForImage } from '@/sanity/lib/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Image as SanityImage } from 'sanity'

/** Props for the 360° style viewer (used by lookbook items). */
interface StyleViewer360Props {
  readonly images: (SanityImage | null | undefined)[]
  readonly name: string
  readonly isActive?: boolean
}

/**
 * Interactive 360° viewer.
 * Bandwidth Optimized: Uses tighter image constraints for rotation sequences.
 * Hydration Optimized: Stable state and suppressHydrationWarning.
 */
export default function StyleViewer360({ images, name, isActive = true }: Readonly<StyleViewer360Props>) {
  const [index, setIndex] = useState(0)
  const [isPreloaded, setIsPreloaded] = useState(false)

  const validImages = Array.isArray(images)
    ? images.filter((img): img is SanityImage => img != null)
    : []

  useEffect(() => {
    if (validImages.length === 0) return

    let loadedCount = 0
    // Optimize rotation images: 600px is plenty for the square viewer, quality 75 saves significant bandwidth for large sequences
    const imageUrls = validImages.map(img => 
      urlForImage(img).width(600).auto('format').quality(75).url()
    )
    
    imageUrls.forEach(url => {
      const img = new globalThis.Image()
      img.src = url
      img.onload = () => {
        loadedCount++
        if (loadedCount === imageUrls.length) {
          setIsPreloaded(true)
        }
      }
    })
  }, [validImages])

  if (validImages.length === 0) return null

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(parseInt(e.target.value, 10))
  }

  const currentImage = validImages[index]
  const imageUrl = currentImage 
    ? urlForImage(currentImage).width(600).auto('format').quality(75).url() 
    : null

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl mx-auto rounded p-2 sm:p-4" suppressHydrationWarning>
      <div className="relative w-full aspect-square overflow-hidden rounded-xl border border-white/5 bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={imageUrl || ''}
            alt={`${name} perspective ${index + 1}`}
            className={`w-full h-full object-cover ${isPreloaded ? 'opacity-100' : 'opacity-50'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0}}
            draggable={false}
            loading="lazy"
          />
        </AnimatePresence>

        {!isPreloaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className={cn("w-full px-2 flex flex-col gap-3 transition-opacity duration-300", isActive ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-white/40">
          <span>Slider to Rotate</span>
          <span className="text-blue-500 font-bold font-mono">{index + 1} / {validImages.length}</span>
        </div>
        
        <div className="relative h-8 flex items-center">
          <input
            type="range"
            min="0"
            max={validImages.length - 1}
            value={index}
            onChange={handleSliderChange}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
            suppressHydrationWarning
            disabled={!isActive}
          />
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}