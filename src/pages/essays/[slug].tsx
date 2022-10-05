import React from 'react'
import { GetStaticProps } from 'next'

import { Post as PostLayout } from '@/layouts/index'

import { getAllEssays, getEssayBySlug } from '@/utils/mdx'

import type { Post } from '@/types/index'

const Essay = (props: Post) => <PostLayout postType="essay" {...props} />

export const getStaticPaths = async () => {
  const essays = await getAllEssays()
  const paths = essays.map(({ slug }) => ({ params: { slug } }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Post> = async ({ params }) => {
  const slug = params?.slug as string
  const essay = await getEssayBySlug(slug)

  return { props: essay }
}

export default Essay
