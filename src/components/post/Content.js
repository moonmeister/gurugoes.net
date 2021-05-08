import * as React from 'react';
import { graphql } from 'gatsby';

import FeaturedImage from './FeaturedImage';

import { Time, ReadingTime } from '../../components/time';

import '../../styles/wpBlocks.css';

export default function PostContent({ data }) {
  const { content, title, dateGmt, readingTime, featuredImage } = data;
  return (
    <article className="relative">
      <header className="static text-lg mx-auto w-full">
        <div
          className="grid w-full"
          style={{
            'grid-template-columns': '1fr auto 1fr',
            'grid-template-rows': '1fr auto 1fr',
            gap: '1em',
          }}
        >
          <div className="row-span-full col-span-full">
            <FeaturedImage data={featuredImage} className="max-h-96" />
          </div>
          <h1 className="z-10 row-start-2 row-end-3 col-start-2 col-end-3">
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl bg-green-600 bg-opacity-50 p-2 rounded-lg">
              {title}
            </span>
          </h1>
        </div>
        <div className="text-center text-sm text-gray-500 leading-8">
          <Time dateTime={dateGmt} />
          <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
          <ReadingTime {...readingTime} />
        </div>
      </header>
      <div className="my-16 px-4 sm:px-6 lg:px-8">
        <div
          className="wp-blocks mt-6 prose max-w-prose prose-green prose-lg text-gray-500 mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}

export const fragment = graphql`
  fragment PostContent on WpPost {
    title
    content
    dateGmt
    readingTime {
      ...ReadingTime
    }
    ...PostFeaturedImage
  }
`;
