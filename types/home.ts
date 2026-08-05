import type {Image} from 'sanity'

export interface Barber {
  _id: string
  name: string
  bio?: string | null
  image?: Image | null
  specialties?: string[] | null
}

export interface Service {
  _id: string
  name: string
  description?: string | null
  price: number
  duration: number
  image?: Image | null
}

export interface GalleryItem {
  _id: string
  title?: string | null
  beforeImage?: Image | null
  afterImage?: Image | null
}

export interface LookbookItem {
  _id: string
  styleName?: string | null
  description?: string | null
  gender?: 'masculine' | 'feminine' | null
  images?: (Image | null | undefined)[] | null
  isDefault?: boolean | null
}

export interface Review {
  _id: string
  author: string
  text: string
  rating: number
}

export interface QuizOption {
  label: string
  value: string
  styleMatchId?: string | null
  nextQuestionId?: string | null
}

export interface QuizQuestion {
  id: string
  questionText: string
  options: QuizOption[]
}

export interface Quiz {
  _id: string
  title: string
  startingQuestionId: string
  questions: QuizQuestion[]
}
