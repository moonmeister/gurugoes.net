import * as React from 'react';
import { graphql } from 'gatsby';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import loadableVisibility from 'react-loadable-visibility/loadable-components';
import { ReactQueryDevtools } from '@tanstack/react-query/devtools';

import Loading from '../loading';

const LazyComments = loadableVisibility(() => import('./list'), {
  fallback: <Loading />,
});

const LazyCommentSubmit = loadableVisibility(() => import('./submit'), {
  fallback: <Loading />,
});

const queryClient = new QueryClient();

export function CommentSection({ data }) {
  const { commentStatus, postId } = data;

  return (
    <section className="bg-green-700 p-8">
      <h1 className="text-lg font-bold py-4">Comments</h1>
      <QueryClientProvider client={queryClient}>

        <LazyComments postId={postId} />

        {commentStatus === 'closed' ? (
          <div>Comments are disabled for this post</div>
        ) : (
          <LazyCommentSubmit data={data} />
        )}

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </section>
  );
}

export const fragments = graphql`
  fragment PostComments on WpPost {
    databaseId
    commentStatus
  }
`;

export function getCommentData(post) {
  return {
    commentStatus: post?.commentStatus,
    postId: post?.databaseId,
  };
}
