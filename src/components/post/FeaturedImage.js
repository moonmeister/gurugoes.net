import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { classNames } from '../../libs/strings';

export default function FeaturedImage({ data, className, children }) {
  return (
    <>
      {data?.node?.localFile ? (
        <GatsbyImage
          className={classNames('w-full object-cover', className)}
          image={getImage(data.node.localFile)}
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
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;
