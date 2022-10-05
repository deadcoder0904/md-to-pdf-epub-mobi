import type { NextPage, GetStaticProps } from 'next'

import { generatePDF } from '@/lib/generate-pdf'
import { Post } from '@/layouts/index'
import { Post as PostType, Meta } from '@/types/index'
import { getBook } from '@/utils/mdx'

const Home: NextPage = (props: any) => {
  return (
    <div className="">
      <h1>md to pdf</h1>
      <Post {...props} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostType> = async ({ params }) => {
  const book = await getBook()

  return { props: book }
}

export default Home
