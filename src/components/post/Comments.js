import * as React from "react"
import { graphql } from "gatsby"
import { useQuery } from 'react-query'

import { request, gql } from "../libs/api"

export default function Comments() {

  const {
    data: comments,
  } = useQuery(
    ['post-comments', databaseId],
    async () => {
      return await request((data) => {
        return data.comments.nodes
      }, gql`
      query PostComments($parent: Int!){
        comments(where: {parent: $parent}) {
          nodes {
            approved
            content
            replies {
              nodes {
                content
              }
            }
          }
        }
      }
    `)
    },
    {
      parent: databaseId
    }
  )

  return (
    <>
      <h1>Comments: </h1>
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </>
  )
}