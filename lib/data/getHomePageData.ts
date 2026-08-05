import {client} from '@/sanity/lib/client'
import {readToken} from '@/sanity/env'
import type {Barber, GalleryItem, LookbookItem, Review, Service, Quiz} from '@/types/home'
import {
  BARBER_QUERY,
  GALLERY_QUERY,
  LOOKBOOK_QUERY,
  REVIEWS_QUERY,
  QUIZ_QUERY,
  SCOPED_BARBER_QUERY,
  SCOPED_GALLERY_QUERY,
  SCOPED_LOOKBOOK_QUERY,
  SCOPED_REVIEWS_QUERY,
  SCOPED_SERVICES_QUERY,
  SCOPED_QUIZ_QUERY,
  SERVICES_QUERY,
} from '@/sanity/queries/home'

interface HomePageData {
  services: Service[]
  gallery: GalleryItem[]
  lookbook: LookbookItem[]
  reviews: Review[]
  barber: Barber | null
  quiz: Quiz | null
}

function safeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function normalizeDocumentId(value: string) {
  return value.replace(/^drafts\./, '')
}

export async function getHomePageData(siteId?: string): Promise<HomePageData> {
  const useScopedQueries = Boolean(siteId)
  const previewClient =
    process.env.NODE_ENV !== 'production' && readToken
      ? client.withConfig({token: readToken, perspective: 'previewDrafts'})
      : client

  const servicesQuery = useScopedQueries ? SCOPED_SERVICES_QUERY : SERVICES_QUERY
  const galleryQuery = useScopedQueries ? SCOPED_GALLERY_QUERY : GALLERY_QUERY
  const lookbookQuery = useScopedQueries ? SCOPED_LOOKBOOK_QUERY : LOOKBOOK_QUERY
  const reviewsQuery = useScopedQueries ? SCOPED_REVIEWS_QUERY : REVIEWS_QUERY
  const barberQuery = useScopedQueries ? SCOPED_BARBER_QUERY : BARBER_QUERY
  const quizQuery = useScopedQueries ? SCOPED_QUIZ_QUERY : QUIZ_QUERY
  const normalizedSiteId = siteId ? normalizeDocumentId(siteId) : undefined
  const params =
    useScopedQueries && normalizedSiteId
      ? {
          siteId: normalizedSiteId,
          draftSiteId: `drafts.${normalizedSiteId}`,
        }
      : {}

  try {
    const [services, gallery, lookbook, reviews, barber, quiz] = await Promise.all([
      previewClient.fetch<Service[]>(servicesQuery, params),
      previewClient.fetch<GalleryItem[]>(galleryQuery, params),
      previewClient.fetch<LookbookItem[]>(lookbookQuery, params),
      previewClient.fetch<Review[]>(reviewsQuery, params),
      previewClient.fetch<Barber | null>(barberQuery, params),
      previewClient.fetch<Quiz | null>(quizQuery, params),
    ])

    const scopedResult: HomePageData = {
      services: safeArray<Service>(services),
      gallery: safeArray<GalleryItem>(gallery),
      lookbook: safeArray<LookbookItem>(lookbook),
      reviews: safeArray<Review>(reviews),
      barber: barber ?? null,
      quiz: quiz ?? null,
    }

    const hasScopedContent =
      scopedResult.services.length > 0 ||
      scopedResult.gallery.length > 0 ||
      scopedResult.lookbook.length > 0 ||
      scopedResult.reviews.length > 0 ||
      Boolean(scopedResult.barber) ||
      Boolean(scopedResult.quiz)

    if (!useScopedQueries || hasScopedContent) {
      return scopedResult
    }

    const [fallbackServices, fallbackGallery, fallbackLookbook, fallbackReviews, fallbackBarber, fallbackQuiz] = await Promise.all([
      previewClient.fetch<Service[]>(SERVICES_QUERY),
      previewClient.fetch<GalleryItem[]>(GALLERY_QUERY),
      previewClient.fetch<LookbookItem[]>(LOOKBOOK_QUERY),
      previewClient.fetch<Review[]>(REVIEWS_QUERY),
      previewClient.fetch<Barber | null>(BARBER_QUERY),
      previewClient.fetch<Quiz | null>(QUIZ_QUERY),
    ])

    return {
      services: safeArray<Service>(fallbackServices),
      gallery: safeArray<GalleryItem>(fallbackGallery),
      lookbook: safeArray<LookbookItem>(fallbackLookbook),
      reviews: safeArray<Review>(fallbackReviews),
      barber: fallbackBarber ?? null,
      quiz: fallbackQuiz ?? null,
    }
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to fetch homepage content. Returning empty defaults.')
    }
    return {
      services: [],
      gallery: [],
      lookbook: [],
      reviews: [],
      barber: null,
      quiz: null,
    }
  }
}
