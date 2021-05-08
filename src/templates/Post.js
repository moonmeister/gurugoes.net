import * as React from 'react';
import { graphql } from 'gatsby';

import { useCategoryContext } from '../hooks/CategoryContext';
import PostContent from '../components/post/Content';
import Seo from '../components/seo';

export default function PostPage({ data: { wpPost } }) {
  const { setCurrentCategory } = useCategoryContext();
  setCurrentCategory('show-all');

  return (
    <>
      <Seo type="article" data={wpPost} />
      <div className="relative bg-white rounded-3xl overflow-hidden">
        <PostContent data={wpPost} />
      </div>
    </>
  );
}

export const query = graphql`
  query blogPostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      ...PostContent
      ...PostSeo

      categories {
        nodes {
          name
        }
      }
    }
  }
`;
