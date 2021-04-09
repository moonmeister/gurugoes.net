import { gql, GraphQLClient } from 'graphql-request'
import { useQuery, useMutation } from "react-query"

const client = new GraphQLClient("https://gurugoes.api.moonmeister.net/graphql", {
  headers: {}
})

export function useComments(postId) {
  return useQuery(`comments-${postId}`, async () => {
    const { post: { comments: { nodes } } } = await client.request(gql`
      query postComments($postId: ID!){
        post(id: $postId, idType: DATABASE_ID) {
          comments {
            nodes {
              content
              databaseId
              parentDatabaseId
              author {
                node {
                  name
                }
              }
              dateGmt
            }
          }
        }
      }`, { postId })


    return nodes
  }, { staleTime: 1000 * 60 * 2, cacheTime: 1000 * 60 * 30 })
}

export function useAddComment() {
  return useMutation(async (data) => {
    return client.request(gql`mutation postComment($name: String!, $email: String!, $comment: String!, $commentOn: Int!) {
      createComment(input: {author: $name, authorEmail: $email, content: $comment, commentOn: $commentOn}) {
        success
        comment {
          approved
        }
      }
    }`, data)
  }, {
    onError(error) {
      console.error(error.response.errors[0].message)
    },
    onSuccess(data) {
      console.log("Success!")
    }
  })



}