import * as React from "react"

import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { useQuery } from 'react-query'

import { Link } from '../button'
import { Time } from '../time'

// import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import { request, gql } from "../../libs/api"

export function ArchiveView({ posts: staticPosts, pageInfo }) {

  const {
    data: posts,
  } = useQuery(
    'posts',
    async () => {
      return await request((data) => {
        return data.posts.nodes
      }, gql`
      {
        posts(first: 4) {
          nodes {
            title
            excerpt
            dateGmt
            uri
            featuredImage {
              node {
                id
              }
            }
            categories {
              nodes {
                name
                uri
              }
            }
          }
        }
      }`)
    },
    {
      initialData: staticPosts,
    }
  )

  return (
    < div class="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8" >
      <div class="relative max-w-7xl mx-auto">
        <div class="mt-12 mx-auto grid gap-5 max-w-lg md:max-w-xl md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
          {/* <pre>
            {JSON.stringify(posts, null, 2)}
          </pre> */}
          {
            staticPosts?.map((post) => {
              const {
                title,
                excerpt,
                uri,
                dateGmt,
                categories,
                readingTime,
                featuredImage
              } = post

              return (
                <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div class="flex-shrink-0">
                    {featuredImage?.node?.localFile ? <GatsbyImage
                      class="h-48 w-full object-cover"
                      image={getImage(featuredImage.node.localFile)}
                      alt=""
                    /> : <div className="h-48 bg-green-600" />}
                  </div>
                  <div class="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div class="flex-1">
                      <p class="text-sm font-medium text-indigo-600">
                        {
                          categories.nodes?.map(({ name, uri }) =>
                          (<Link to={uri} class="hover:underline" override>
                            {name}
                          </Link>))
                        }
                      </p>
                      <Link to={uri} className="block mt-2" override>
                        <p class="text-xl font-semibold text-gray-900">
                          {title}
                        </p>
                        <p class="mt-3 text-base text-gray-500">
                          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                        </p>
                      </Link>
                    </div>
                    <div class="mt-6 flex items-center">
                      {/* <div class="flex-shrink-0">
                        <a href="#">
                          <span class="sr-only">Roel Aufderehar</span>
                          <StaticImage
                            class="h-10 w-10 rounded-full"
                            src="../../images/icon.png"
                            alt=""
                            layout="fixed"
                            placeholder="dominantColor"
                            width={40}
                          />
                        </a>
                      </div> */}
                      <div class="">
                        <div class="flex space-x-1 text-sm text-gray-500">
                          <Time dateTime={dateGmt} />
                          <span aria-hidden="true">
                            &middot;
                        </span>
                          <span>
                            {readingTime?.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div >
  )
}

export const fragment = graphql`
  fragment ArchivePostPageInfo on PageInfo {
    hasNextPage
    perPage
  }

  fragment ArchivePost on WpPost {
    title
    excerpt
    dateGmt
    uri
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FLUID, maxWidth: 250, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
    readingTime {
      text
    }
    categories {
      nodes {
        ...PostCategory
      }
    }
  }
`

