import {createImageUrlBuilder} from '@sanity/image-url'
import type {Image} from 'sanity'
import {client} from './client'

const builder = createImageUrlBuilder(client)

export type ImagePreset = 'hero' | 'compare' | 'lookbook' | 'portrait' | 'thumbnail'

interface ImagePresetConfig {
  width: number
  quality: number
  fit: 'clip' | 'crop' | 'max' | 'fill' | 'scale' | 'min'
}

const IMAGE_PRESET_CONFIGS: Record<ImagePreset, ImagePresetConfig> = {
  hero: {width: 1440, quality: 62, fit: 'crop'},
  compare: {width: 1200, quality: 66, fit: 'crop'},
  lookbook: {width: 680, quality: 60, fit: 'crop'},
  portrait: {width: 900, quality: 68, fit: 'crop'},
  thumbnail: {width: 420, quality: 58, fit: 'crop'},
}

export const urlForImage = (source: Image) => builder.image(source).auto('format').fit('max').dpr(1)

export function optimizedImageUrl(source: Image, preset: ImagePreset) {
  const config = IMAGE_PRESET_CONFIGS[preset]

  return builder
    .image(source)
    .auto('format')
    .fit(config.fit)
    .width(config.width)
    .quality(config.quality)
    .dpr(1)
    .url()
}
