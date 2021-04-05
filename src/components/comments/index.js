import * as React from "react"

import { graphql } from "gatsby"
import LazyLoadComponent from "react-intersection-observer-lazy-load"
import SubmitComment from "./submit"

export function CommentSection({ data }) {
  const { commentCount, commentStatus, comments } = data


  return (
    <section className="bg-green-600 p-8">
      {
        <LazyLoadComponent>
          <h1 className="text-lg font-bold p-4">Comments</h1>
          {commentCount === 0 ?
            <p>There are no comments.</p> :
            <ul className="flex flex-col gap-2">
              {comments.map(({ content }, i) => (
                <li className="p-2 list-none bg-gray-200 rounded-sm">
                  <div class="" dangerouslySetInnerHTML={{ __html: content }} />
                </li>
              ))}
            </ul>
          }
          <SubmitComment commentStatus={commentStatus} />
        </LazyLoadComponent>
      }
    </section >
  )
}

export const fragments = graphql`
  fragment PostComments on WpPost {
    comments {
      nodes {
        content
      }
    }
    commentCount
    commentStatus
  }

`

export function getCommentData(post) {
  return { commentCount: post?.commentCount, commentStatus: post?.commentStatus, comments: post?.comments?.nodes }
}