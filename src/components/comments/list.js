import * as React from "react";
import { useMemo } from "react";
import { useIsFetching } from "react-query";


import { useComments } from '../../hooks/comments'

import Loading from '../loading'
import Comment from './comment'

export default function CommentList({ postId }) {
  const { data: comments = [], error, isFetching } = useComments(postId);

  const depthCalcs = useMemo(() => {
    if (comments.length <= 0) return null

    const sortedComments = comments.sort(({ parentDatabaseId, databaseId }) => databaseId - parentDatabaseId)

    const depthStore = new Map()

    for (const comment of sortedComments) {
      const { databaseId, parentDatabaseId } = comment

      if (parentDatabaseId === 0) {
        depthStore.set(databaseId, 0)
      } else if (depthStore.has(parentDatabaseId)) {
        depthStore.set(databaseId, depthStore.get(parentDatabaseId) + 1)
      } else {
        console.error("Parent DatabaseId not found :/", comment)
      }
    }
    return depthStore

  }, [comments])

  return (
    <>
      { error ? <p>ERROR: {error.message}</p> : (
        isFetching ? <Loading /> :
          <ul className="flex flex-col gap-2">
            {comments.map((comment) => {
              const { databaseId } = comment
              return (
                <Comment key={databaseId} comment={comment} depth={depthCalcs.get(databaseId)} />
              )
            })}
          </ul>
      )
      }
    </>
  )
}

