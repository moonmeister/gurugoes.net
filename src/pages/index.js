import * as React from "react"

import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { ArchiveView } from "../components/post/Archive"
import SEO from "../components/seo"

import { useCategoryContext } from "../hooks/CategoryContext"

export default function IndexPage({ data: { allWpPost: { posts, pageInfo }, wpPage } }) {

  const { title, content } = wpPage

  const { setCurrentCategory } = useCategoryContext()
  setCurrentCategory('all')
  return (
    <>
      <SEO data={wpPage} />
      <section class="sm:grid items-center grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 lg:gap-16 md:gap-8 gap-4">
        <div class="p-8 sm:p-4 sm:col-start-1 sm:col-end-2">
          <StaticImage
            src="../images/headshot.jpg"
            layout="fluid"
            placeholder="blurred"
            maxWidth={250}
            alt="Guru Selfie while hiking PCT"

            className="rounded-full"
          />
        </div>
        <div class="text-center sm:col-start-2 sm:col-end-4">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">{title}</span>
            {/* <span class="block text-indigo-600 xl:inline">hiking / backpacking / traveling / etcetera</span> */}
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl" dangerouslySetInnerHTML={{
            __html: content
          }} />
        </div>
      </section>
      <section>
        <ArchiveView posts={posts} pageInfo={pageInfo} />
      </section>
    </>

  )
}

export const query = graphql`
  {
    wpPage(isFrontPage: {eq: true}) {
      title
      content
      ...PageSeo
    }

    allWpPost(sort: {order: DESC, fields: dateGmt}) {
      pageInfo {
        ...ArchivePostPageInfo
      }
      posts: nodes {
        ...ArchivePost
      }
    }
  }
`