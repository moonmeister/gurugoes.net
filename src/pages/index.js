import * as React from "react"

import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { ArchiveView } from "../components/post/Archive"
import { useCategoryContext } from "../hooks/CategoryContext"

export default function IndexPage({ data: { allWpPost: { posts, pageInfo } } }) {

  const { setCurrentCategory } = useCategoryContext()
  setCurrentCategory('all')
  return (
    <>
      <section class="grid items-center grid-cols-3 gap-16">
        <div class="col-start-1 col-end-2">
          <StaticImage
            src="../images/headshot.jpg"
            layout="fluid"
            placeholder="blurred"
            maxWidth={250}
            alt="Guru Selfie while hiking PCT"

            className="rounded-full"
          />
        </div>
        <div class="text-center col-start-2 col-end-4">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Guru Goes</span>
            {/* <span class="block text-indigo-600 xl:inline">hiking / backpacking / traveling / etcetera</span> */}
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            I do a lot of things, hiking, backpacking, traveling, etcetera. My family and friends like keeping up with me (Hello! <span role="img" aria-label="waving hand">👋🏻</span>). I hope you enjoy too!
          </p>
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
    allWpPost(limit: 6, sort: {order: DESC, fields: dateGmt}) {
      pageInfo {
        ...ArchivePostPageInfo
      }
      posts: nodes {
        ...ArchivePost
      }
    }
  }
`