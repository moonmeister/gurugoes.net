import { useQuery, useMutation } from "react-query"

import { listCommentsByPostId, createComment } from "../libs/wpGraphqlClient"

export function useComments(postId) {
  return useQuery(`comments-${postId}`, async () => {
    const { post: { comments: { nodes } } } = await listCommentsByPostId(postId)
    return nodes
  }, { staleTime: 1000 * 60 * 2, cacheTime: 1000 * 60 * 30 })
}

export function useAddComment() {
  return useMutation(async (data) => createComment(data), {
    onError(error) {
      console.error(error.response.errors[0].message)
    },
    onSuccess(data) {
      console.log("Success!")
    }
  })



}