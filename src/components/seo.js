import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { useCategoryContext } from "../hooks/CategoryContext"

export default function SEO({ description = '', lang = "en", meta = [], title, data = {} }) {
  const { wp: { generalSettings: { siteTitle, siteDescription } } } = useStaticQuery(
    graphql`
      query {
        wp{
          generalSettings {
            siteTitle: title
            siteDescription: description
          }
        }
      }
    `
  );

  const { currentCategory } = useCategoryContext()

  const metaDescription = description || data?.description || siteDescription;
  const metaTitle = title || data?.title

  const ogCard = [
    {
      property: `og:title`,
      content: metaTitle,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
  ]

  const twitterCard = [
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:site`,
      content: `@moon_meister`,
    },
    {
      name: `twitter:title`,
      content: metaTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  const featuredImage = data?.featuredImage?.node

  if (featuredImage) {
    const { altText, localFile } = featuredImage

    const imageUrl = `https://gurugoes.net${localFile?.childImageSharp.resize.src}`

    twitterCard.append([{
      name: `twitter:image:alt`,
      content: altText,
    },
    {
      name: `twitter:image`,
      content: imageUrl
    }])

    ogCard.append([{
      name: `og:image:alt`,
      content: altText
    }, {
      name: `og:image`,
      content: imageUrl
    }])
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        ...ogCard,
        ...twitterCard,
        ...meta
      ]}
      title={metaTitle}
      titleTemplate={`${siteTitle} · ${currentCategory && currentCategory !== 'all' && currentCategory !== metaTitle ? `${currentCategory} · ` : ''} ${siteTitle === metaTitle ? 'Home' : '%s'}`}

    />
  );
}

export const fragments = graphql`
  fragment SeoFeaturedImage on WpMediaItem {
    altText
    localFile {
      childImageSharp {
        resize(cropFocus: CENTER, fit: COVER, height: 2048, width: 4096) {
          src
        }
      }
    }
  }

  fragment PostSeo on WpPost {
    title
    description: excerpt
    featuredImage {
        node {
          ...SeoFeaturedImage
        }
      }
  }

  fragment CategorySeo on WpCategory {
    title: name
    description
  }

  fragment PageSeo on WpPage {
    title
    description: excerpt
    featuredImage {
        node {
          ...SeoFeaturedImage
        }
      }
  }
`