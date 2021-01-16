import * as React from "react"


import { graphql } from "gatsby"

import { useCategoryContext } from "../hooks/CategoryContext"

import { ArchiveView } from "../components/post/Archive"
import SEO from "../components/seo"

export default function CategoryPage({ data }) {
  const { wpCategory: { name, description, }, allWpPost: { posts, pageInfo } } = data
  const { setCurrentCategory } = useCategoryContext()

  setCurrentCategory(name)
  return (
    <>
      <SEO data={data.wpCategory} />
      <section class="">
        <div class="text-center">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">{name}</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {description}
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
query($uri: String) {
  wpCategory(uri: {eq: $uri}) {
    name
    description
    ...CategorySeo
  }

  allWpPost(filter: {categories: {nodes: {elemMatch: {uri: {eq: $uri}}}}}, sort: {fields: dateGmt, order: DESC}) {
    posts: nodes {
      ...ArchivePost
    }
    pageInfo{
      ...ArchivePostPageInfo
    }
  }
}
`