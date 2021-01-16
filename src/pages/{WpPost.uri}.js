import * as React from "react"
import { graphql } from "gatsby"

import { useCategoryContext } from "../hooks/CategoryContext"


import { Time, ReadingTime } from "../components/time"
import SEO from "../components/seo"

export default function PostPage({ data }) {
  const { wpPost: { content, title, dateGmt, readingTime, categories: { nodes: [category] } } } = data
  const { setCurrentCategory } = useCategoryContext()
  setCurrentCategory(category.name)
  return (
    <>
      <SEO data={data.wpPost} />
      <div class="relative py-16 bg-white rounded-3xl overflow-hidden">
        <article class="relative px-4 sm:px-6 lg:px-8">
          <header class="text-lg max-w-prose mx-auto">
            <h1>
              <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</span>
            </h1>
            <div class="text-center text-sm text-gray-500 leading-8">
              <Time dateTime={dateGmt} />
              <span aria-hidden="true">
                &nbsp;&middot;&nbsp;
              </span>
              <ReadingTime {...readingTime} />
            </div>
          </header>
          <div class="mt-6 prose prose-green prose-lg text-gray-500 mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </>
  )
}

export const query = graphql`
  query blogPostQuery($uri: String!) {
    wpPost(uri: { eq: $uri }) {
      title
      content
      dateGmt
      readingTime {
        ...ReadingTime
      }
      ...PostSeo
      
      categories {
        nodes {
          name
        }
      }
    }
  }
`;
