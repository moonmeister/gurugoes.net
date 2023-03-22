import * as React from 'react';
import { graphql } from 'gatsby';

import { useCategoryContext } from '../hooks/CategoryContext';

import { ArchiveView } from '../components/post/Archive';
import Seo from '../components/seo';

export default function CategoryPage({ data }) {
  const {
    wpCategory: { name, description },
    allWpPost: { posts, pageInfo },
  } = data;
  const { setCurrentCategory } = useCategoryContext();

  setCurrentCategory(name);
  return (
    <>
      <Seo data={data.wpCategory} />
      <section className="">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">{name}</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {description}
          </p>
        </div>
      </section>
      <section>
        <ArchiveView posts={posts} pageInfo={pageInfo} />
      </section>
    </>
  );
}

export const query = graphql`query WpCategory($id: String!) {
  wpCategory(id: {eq: $id}) {
    name
    description
    ...CategorySeo
  }
  allWpPost(
    filter: {categories: {nodes: {elemMatch: {id: {eq: $id}}}}}
    sort: {dateGmt: DESC}
  ) {
    posts: nodes {
      ...ArchivePost
    }
  }
}`;
