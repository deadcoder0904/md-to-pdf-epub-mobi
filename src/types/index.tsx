import type { IReadTimeResults } from 'reading-time'

export type Post = {
  code?: any
}

export type Meta = {
  banner: string
  title: string
  date: Date
  slug: string // uses folder name as a slug
  lastmod?: Date
  draft?: Boolean
  description?: string
  image?: string
  authors: string[]
  readingTime: IReadTimeResults
}
