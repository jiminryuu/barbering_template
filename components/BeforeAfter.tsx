'use client'

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { urlForImage } from '@/sanity/lib/image'
import type { Image } from 'sanity'

/** Props for a single before/after gallery item from Sanity (gallery schema). */
interface BeforeAfterProps {
  readonly beforeImage: Image | null | undefined
  readonly afterImage: Image | null | undefined
}

/**
 * Renders a before/after comparison slider for gallery items.
 * Removed title to be handled by the parent/carousel.
 */
export default function BeforeAfter({ beforeImage, afterImage }: Readonly<BeforeAfterProps>) {
  if (!beforeImage || !afterImage) {
    return null
  }

  const beforeUrl = urlForImage(beforeImage).url()
  const afterUrl = urlForImage(afterImage).url()
  if (!beforeUrl || !afterUrl) return null

  return (
    <div className="w-full max-w-md mx-auto shadow-2xl bg-black aspect-[1/1] md:aspect-[4/5] border border-[color:var(--color-border)] rounded-3xl overflow-hidden">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeUrl}
            alt="Before"
            
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterUrl}
            alt="After"
          />
        }
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}