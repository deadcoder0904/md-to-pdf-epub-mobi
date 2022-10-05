import fs from 'fs/promises'
import path from 'path'
import glob from 'fast-glob'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import readingTime from 'reading-time'
// import remarkGfm from 'remark-gfm'
// import rehypeSlug from 'rehype-slug'
// import rehypePrismPlus from 'rehype-prism-plus'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'

// import { rehypeMetaAttribute } from '../../rehype/meta-attribute'
// import { rehypeHighlightCode } from '../../rehype/highlight-code'
// import { remarkTocHeadings } from '../../remark/toc'
import { remarkCover } from '../../remark/cover'

// import { dateSortDesc, kebabCase } from '@/utils/index'

import type { Meta } from '@/types/index'

const ROOT_PATH = process.cwd()

export const BOOK_PATH = path.join(ROOT_PATH, 'src/_book/index.mdx')

const PUBLIC_PATH = path.join(ROOT_PATH, 'public')

// const CHAPTER_PATH = glob.sync(`${POSTS_PATH}/**/*.mdx`.replace(/\\/g, '/'))

// export const getAllPosts = async (posts: string[], tags?: Meta['tags']) => {
//   const source = await fs.readFile(path.join(BOOK_PATH), 'utf8')

//   const split = BOOK_PATH.split('/')
//   const slug = split[split.length - 2]

//   const { content, data } = matter(source)
//   const frontmatter = data as Meta

//   const post = {
//     ...frontmatter,
//     slug,
//     readingTime: readingTime(content),
//   }

//   const postsFiltered = allPosts
//     .filter((post) => post?.draft === false)
//     .filter((post) => (tags ? post.tags === tags : true))
//   const postsSorted = postsFiltered.sort((a, b) => dateSortDesc(a.date, b.date))

//   return postsSorted
// }

// export const getBook = async () => {

//   const split = BOOK_PATH.split('/')
//   const slug = split[split.length - 2]

//   const { content, data } = matter(source)
//   const frontmatter = data as Meta

//   const post = {
//     ...frontmatter,
//     slug,
//     readingTime: readingTime(content),
//   }

//   return post
// }

export const getBook = async () => {
  const source = await fs.readFile(path.join(BOOK_PATH), 'utf8')

  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const cwd = path.join(BOOK_PATH)

  const { code, frontmatter } = await bundleMDX({
    source,
    cwd,
    mdxOptions: (options, frontmatter) => {
      options.rehypePlugins = [...(options.rehypePlugins ?? [])]
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        [remarkCover, { name: `cover`, from: frontmatter.cover }],
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.outdir = path.join(BOOK_PATH)
      options.loader = {
        ...options.loader,
        '.webp': 'file',
        '.jpeg': 'file',
        '.jpg': 'file',
        '.png': 'file',
        '.gif': 'file',
      }
      // options.publicPath = slug

      options.write = true

      return options
    },
  })

  const meta = {
    ...frontmatter,
  } as Meta

  return {
    meta,
    code,
    folderPath: cwd,
  }
}
