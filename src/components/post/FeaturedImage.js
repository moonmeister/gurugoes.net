import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { classNames } from '../../libs/strings';

export default function FeaturedImage({ data, className, children }) {
  const featuredImage = data?.node?.gatsbyImage
  return (
    <>
      { featuredImage ? (
        <GatsbyImage
          className={classNames('w-full object-cover', className)}
          image={featuredImage}
          alt={data.node.altText}
        >
          {children}
        </GatsbyImage>
      ) : (
        <div className={classNames('bg-green-600', className)}>{children}</div>
      )}
    </>
  );
}

export const fragments = graphql`
  fragment PostFeaturedImage on WpPost {
    featuredImage {
      node {
        altText
        gatsbyImage(
          width: 1250
          layout: FULL_WIDTH
          placeholder: DOMINANT_COLOR
        )
      }
    }
  }
`;
