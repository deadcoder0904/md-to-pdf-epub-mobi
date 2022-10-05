import React from 'react'
import { getMDXExport } from 'mdx-bundler/client'

import { MDXLayoutRenderer } from '@/components/mdx/index'

import type { Post as TPost } from '@/types/index'

export const Post = ({ code }: TPost) => {
  const getmx = getMDXExport(code)
  console.log({ getmx, code })
  return (
    <>
      <div className="wrapper lg:grid px-8 lg:grid-cols-[1fr,70px,min(70ch,calc(100%-64px)),70px,1fr] gap-8 mb-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* {frontmatter && <img className="col-[1/-1]" src={frontmatter} alt="" />} */}
        <div className="mdx-wrapper prose dark:prose-light col-[2/5] lg:grid lg:grid-cols-[70px_1fr_70px] max-w-full">
          <MDXLayoutRenderer mdxSource={code} />
        </div>
      </div>
    </>
  )
}
