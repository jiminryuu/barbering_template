'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import {ChevronDown} from 'lucide-react'
import {cn} from '@/lib/utils/cn'
import StackedCarousel from './StackedCarousel'
import StyleViewer360 from './StyleViewer360'
import type {LookbookItem} from '@/types/home'

interface Lookbook360SectionProps {
  items: LookbookItem[]
}

interface LookbookCardProps {
  item: LookbookItem
  isActive?: boolean
}

function LookbookCard({item, isActive = false}: Readonly<LookbookCardProps>) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-3xl p-4 sm:gap-4 sm:p-6 lg:p-4"
    >
      
      <div className="w-full max-w-lg mx-auto">
        <StyleViewer360 
          images={item.images ?? []} 
          name={item.styleName ?? 'Style'} 
          isActive={isActive} 
        />
      </div>

      <div className={cn("transition-opacity duration-300", isActive ? "opacity-100" : "opacity-0")}>
        {item.description ? (
          <p className="max-w-md px-2 text-center text-[10px] text-[color:var(--color-muted)] sm:text-xs">
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default function Lookbook360Section({items}: Readonly<Lookbook360SectionProps>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeGender, setActiveGender] = useState<'masculine' | 'feminine'>('masculine')
  
  const validItems = Array.isArray(items)
    ? items.filter(
        (item) =>
          item &&
          Array.isArray(item.images) &&
          item.images.some((img) => img != null)
      )
    : []

  const filteredItems = validItems.filter(item => item.gender === activeGender)

  // Reset selected index when gender changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [activeGender])

  if (validItems.length === 0) {
    return (
      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="mx-auto max-w-md text-sm text-[color:var(--color-muted)]">
          Add lookbook entries with 360 images in Sanity Studio to see them here.
        </p>
      </div>
    )
  }

  const currentStyleName = filteredItems[selectedIndex]?.styleName ?? 'Select Style'

  return (
    <div className="flex flex-col items-center w-full">
      {/* Gender Toggle Buttons */}
      <div className="flex gap-4 mb-12">
        <button
          onClick={() => setActiveGender('masculine')}
          className={cn(
            "group relative flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 sm:h-24 sm:w-24",
            activeGender === 'masculine'
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)]"
              : "border-[color:var(--color-border)] bg-transparent hover:border-[color:var(--color-muted)]"
          )}
          aria-label="Masculine Styles"
        >
          <div 
            className={cn(
              "relative h-10 w-10 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12",
              activeGender === 'masculine' ? "opacity-100" : "opacity-40 grayscale"
            )}
            style={{ filter: 'var(--icon-filter)' }}
          >
            <Image
              src="/images/man-hair-hair-cut-svgrepo-com.svg"
              alt="Masculine Icon"
              fill
              className="object-contain"
            />
          </div>
          <span className={cn(
            "mt-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs",
            activeGender === 'masculine' ? "text-[var(--color-accent)]" : "text-[color:var(--color-muted)]"
          )}>
            MEN
          </span>
        </button>

        <button
          onClick={() => setActiveGender('feminine')}
          className={cn(
            "group relative flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 sm:h-24 sm:w-24",
            activeGender === 'feminine'
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)]"
              : "border-[color:var(--color-border)] bg-transparent hover:border-[color:var(--color-muted)]"
          )}
          aria-label="Feminine Styles"
        >
          <div 
            className={cn(
              "relative h-10 w-10 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12",
              activeGender === 'feminine' ? "opacity-100" : "opacity-40 grayscale"
            )}
            style={{ filter: 'var(--icon-filter)' }}
          >
            <Image
              src="/images/woman-hair-svgrepo-com.svg"
              alt="Feminine Icon"
              fill
              className="object-contain"
            />
          </div>
          <span className={cn(
            "mt-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs",
            activeGender === 'feminine' ? "text-[var(--color-accent)]" : "text-[color:var(--color-muted)]"
          )}>
            WOMEN
          </span>
        </button>
      </div>

      {filteredItems.length > 0 ? (
        <>
          {/* Dropdown Title */}
          <div className="relative mb-8 z-30">
            <div className="group relative inline-block text-center">
              <button className="flex items-center justify-center gap-2 font-display text-3xl uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-7xl hover:text-[var(--color-accent)] transition-colors">
                {currentStyleName}
                <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 opacity-50" />
              </button>
              
              <select
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0 text-black rounded-2xl"
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                aria-label="Select a style"
              >
                {filteredItems.map((item, index) => (
                  <option key={item._id ?? index} value={index}>
                    {item.styleName ?? `Style ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
              Interactive Lookbook
            </p>
          </div>

          <StackedCarousel 
            className="border border-[color:var(--color-border)] rounded-2xl p-8 mb-8 mt-8"
            selectedIndex={selectedIndex}
            onIndexChange={setSelectedIndex}
          >
            {filteredItems.map((item) => (
              <LookbookCard 
                key={item._id ?? item.styleName ?? 'fallback'} 
                item={item} 
              />
            ))}
          </StackedCarousel>
        </>
      ) : (
        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-12 text-center w-full max-w-2xl">
          <p className="mx-auto max-w-md text-lg font-medium text-[color:var(--color-muted)]">
            No {activeGender} styles found in the lookbook.
          </p>
          <p className="mt-2 text-sm text-[color:var(--color-muted)] opacity-60">
            Check back later or explore other options.
          </p>
        </div>
      )}
    </div>
  )
}

