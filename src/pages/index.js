import * as React from 'react';

import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { ArchiveView } from '../components/post/Archive';
import Seo from '../components/seo';

import { useCategoryContext } from '../hooks/CategoryContext';

export default function IndexPage({
  data: {
    allWpPost: { posts, pageInfo },
    wpPage,
  },
}) {
  const {
    title,
    content,
    featuredImage: { node: featuredImage },
  } = wpPage;

  const { setCurrentCategory } = useCategoryContext();
  setCurrentCategory('all');
  return (
    <>
      <Seo data={wpPage} />
      <section className="sm:grid items-center grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 lg:gap-16 md:gap-8 gap-4">
        <div className="p-8 sm:p-4 sm:col-start-1 sm:col-end-2">
          <GatsbyImage
            image={featuredImage.gatsbyImage}
            alt={featuredImage.altText}
            className="rounded-full"
            loading="eager"
          />
        </div>
        <div className="text-center sm:col-start-2 sm:col-end-4">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">{title}</span>
            {/* <span className="block text-indigo-600 xl:inline">hiking / backpacking / traveling / etcetera</span> */}
          </h1>
          <div
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </section>
      <section>
        <ArchiveView posts={posts} pageInfo={pageInfo} />
      </section>
    </>
  );
}

export const query = graphql`{
  wpPage(isFrontPage: {eq: true}) {
    title
    content
    featuredImage {
      node {
        altText
        gatsbyImage(width: 350, layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
      }
    }
    ...PageSeo
  }
  allWpPost(sort: {dateGmt: DESC}) {
    posts: nodes {
      ...ArchivePost
    }
  }
}`;
