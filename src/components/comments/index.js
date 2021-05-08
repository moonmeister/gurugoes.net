import * as React from "react";
import { graphql } from "gatsby";

import { Transition } from "@headlessui/react"
import { QueryClientProvider, QueryClient } from "react-query"
import loadableVisibility from "react-loadable-visibility/loadable-components";
import { ReactQueryDevtools } from "react-query/devtools";

import { useAuth } from "../../hooks/use-auth"
// import LoginForm from "./login"
import Loading from "../loading"

const LazyComments = loadableVisibility(() => import("./list"), {
  fallback: <Loading />
});


const LazyCommentSubmit = loadableVisibility(() => import("./submit"), {
  fallback: <Loading />
});

const LazyLoginForm = loadableVisibility(() => import("./login"), {
  fallback: <Loading />
});


const queryClient = new QueryClient()

export function CommentSection({ data }) {
  const { commentStatus, commentCount, databaseId: postId } = data

  const { user } = useAuth()
  console.log("user", user)

  return (
    <section className="bg-green-600 p-8">
      <h1 className="text-lg font-bold p-4">Comments</h1>
      <QueryClientProvider client={queryClient}>

        {commentCount === 0 ?
          <p>There are no comments.</p> :
          <LazyComments postId={postId} />}

        {commentStatus === 'closed' ?
          <div>Comments are disabled for this post</div> :

          (user ? <LazyCommentSubmit data={data} /> : <LazyLoginForm />)
        }

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </section >
  )
}

export const fragments = graphql`
  fragment PostComments on WpPost {
    databaseId
    commentCount
    commentStatus
  }

`

export function getCommentData(post) {
  return { commentCount: post?.commentCount, commentStatus: post?.commentStatus, databaseId: post?.databaseId }
}