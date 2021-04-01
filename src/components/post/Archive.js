import * as React from "react"

import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Link } from '../button'
import { Time, ReadingTime } from '../time'

export function ArchiveView({ posts: staticPosts, pageInfo }) {

  return (
    < div className="relative pt-4 m:pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8" >
      <div className="relative max-w-7xl mx-auto">
        <div className="mt-12 mx-auto grid gap-5 max-w-lg md:max-w-xl md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
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
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    {featuredImage?.node?.localFile ? <GatsbyImage
                      className="h-48 w-full object-cover"
                      image={getImage(featuredImage.node.localFile)}
                      alt={featuredImage.node.altText}
                    /> : <div className="h-48 bg-green-600" />}
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        {
                          categories.nodes?.map(({ name, uri }) =>
                          (<Link to={uri} className="hover:underline" override>
                            {name}
                          </Link>))
                        }
                      </p>
                      <Link to={uri} className="block mt-4" override>
                        <p className="text-xl font-semibold text-gray-900">
                          {title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                        </p>
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center">
                      {/* <div className="flex-shrink-0">
                        <a href="#">
                          <span className="sr-only">Roel Aufderehar</span>
                          <StaticImage
                            className="h-10 w-10 rounded-full"
                            src="../../images/icon.png"
                            alt=""
                            layout="fixed"
                            placeholder="dominantColor"
                            width={40}
                          />
                        </a>
                      </div> */}
                      <div className="">
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <Time dateTime={dateGmt} />
                          <span aria-hidden="true">
                            &middot;
                          </span>
                          <span>
                            <ReadingTime {...readingTime} />
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
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
    readingTime {
      ...ReadingTime
    }
    categories {
      nodes {
        ...PostCategory
      }
    }
  }
`

