import * as React from "react"
import { graphql } from "gatsby"


export default function PostPage({ data }) {
  const { wpPost: { content, title, databaseId } } = data

  return (
    <>
      <div class="relative py-16 bg-white overflow-hidden">
        <article class="relative px-4 sm:px-6 lg:px-8">
          <header class="text-lg max-w-prose mx-auto">
            <h1>
              {/* <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">Introducing</span> */}
              <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</span>
            </h1>
            {/* <p class="mt-8 text-xl text-gray-500 leading-8">Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.</p> */}
          </header>
          <div class="mt-6 prose prose-green prose-lg text-gray-500 mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
          <section>

          </section>
        </article>

      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}

export const query = graphql`
  query blogPostQuery($uri: String!) {
    wpPost(uri: { eq: $uri }) {
      title
      content
      dateGmt
      tags {
        nodes {
          # ...WpTag
          id
        }
      }
    }
  }
`;
