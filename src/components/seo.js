import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { useCategoryContext } from "../hooks/CategoryContext"

export default function SEO({ description = '', lang = "en", type = "website", meta = [], title, data = {} }) {
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

  let ogCard = [
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
      content: type,
    },
  ]

  let twitterCard = [
    {
      name: `twitter:card`,
      content: `summary_large_image`,
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

  const jsonLd = [];

  const featuredImage = data?.featuredImage?.node

  if (featuredImage) {
    const { altText, localFile } = featuredImage

    const imageUrl = `https://gurugoes.net${localFile?.childImageSharp.resize.src}`

    twitterCard = twitterCard.concat([{
      name: `twitter:image:alt`,
      content: altText,
    },
    {
      name: `twitter:image`,
      content: imageUrl
    }])

    ogCard = ogCard.concat([{
      name: `og:image:alt`,
      content: altText
    }, {
      name: `og:image`,
      content: imageUrl
    }])
  }

  if (type === "article") {
    if (data?.modified) ogCard.push({ name: `og:article:modified_time `, content: data.modified })
    if (data?.published) ogCard.push({ name: `og:article:published_time`, content: data.published })

    const jsonLdImage = data?.featuredImage?.node.localFile.childImageSharp.original.src

    jsonLd.push({
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": metaTitle,
        "abstract": metaDescription,
        "dateModified": data?.modified,
        "datePublished": data?.published,
        "image": [`https://gurugoes.net${jsonLdImage}`],
      })
    })
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
      script={jsonLd}
      title={metaTitle}
      titleTemplate={`${siteTitle} · ${currentCategory && currentCategory !== 'all' && currentCategory !== metaTitle ? `${currentCategory} · ` : ''} ${siteTitle === metaTitle ? 'Home' : '%s'}`}
    />
  );
}

export const fragments = graphql`
  fragment OgSeoFeaturedImage on WpMediaItem {
    altText
    localFile {
      childImageSharp {
        resize(cropFocus: CENTER, fit: COVER, height: 2048, width: 4096) {
          src
        }
      }
    }
  }

  fragment JsonLdSeoFeaturedImage on WpMediaItem {
    altText
    localFile {
      childImageSharp {
        original {
          src
        }
      }
    }
  }

  fragment PostSeo on WpPost {
    title
    description: excerpt
    modified: modifiedGmt(formatString: "YYYY-MM-DDTHH:mm:ss[Z]")
    published: dateGmt(formatString: "YYYY-MM-DDTHH:mm:ss[Z]")
    featuredImage {
      node {
        ...OgSeoFeaturedImage
        ...JsonLdSeoFeaturedImage
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
          ...OgSeoFeaturedImage
        }
      }
  }
`