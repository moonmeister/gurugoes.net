import { useQuery, useMutation, useQueryClient } from 'react-query';
import { listCommentsByPostId, createComment } from '../libs/wpGraphqlClient';

export function useComments(postId) {
  return useQuery(
    `comments-${postId}`,
    async () => {
      const {
        post: {
          comments: { nodes },
        },
      } = await listCommentsByPostId(postId);
      return nodes;
    },
    { staleTime: 1000 * 60 * 2, cacheTime: 1000 * 60 * 30 }
  );
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation(async (data) => createComment(data), {
    onSuccess: ({ createComment }, { commentOn }) => {
      if (createComment.comment) {
        queryClient.invalidateQueries(`comments-${commentOn}`);
      }
    },
  });
}
