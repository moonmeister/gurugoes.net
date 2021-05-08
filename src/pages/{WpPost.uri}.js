import * as React from "react"
import { graphql } from "gatsby"

import { useCategoryContext } from "../hooks/CategoryContext"
import { ProvideAuth } from "../hooks/use-auth"

import PostContent from "../components/post/Content"
import { CommentSection, getCommentData } from "../components/comments/"
import Seo from "../components/seo"


export default function PostPage({ data: { wpPost } }) {
  const { setCurrentCategory } = useCategoryContext()
  setCurrentCategory("show-all")

  return (
    <ProvideAuth>
      <Seo type="article" data={wpPost} />
      <div className="relative bg-white rounded-3xl overflow-hidden">
        <PostContent data={wpPost} />
        <CommentSection data={getCommentData(wpPost)} />
      </div>
    </ProvideAuth>
  )
}

export const query = graphql`
  query blogPostQuery($uri: String!) {
    wpPost(uri: { eq: $uri }) {
      ...PostContent
      ...PostSeo
      ...PostComments
    }
  }
`;
