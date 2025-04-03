import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function SEO({
	description = "",
	lang = "en",
	type = "website",
	meta = [],
	title,
	data = {},
}) {
	const {
		wp: {
			generalSettings: { siteTitle, siteDescription },
		},
		site: {
			siteMetadata: { siteUrl },
		},
	} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					siteUrl
				}
			}
			wp {
				generalSettings {
					siteTitle: title
					siteDescription: description
				}
			}
		}
	`);

	const { currentCategory } = useCategoryContext();

	const metaDescription = description || data?.description || siteDescription;
	const metaTitle = title || data?.title;

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
	];

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
	];

	const jsonLd = [];

	const featuredImage = data?.featuredImage?.node;

	if (featuredImage) {
		const { altText, resize: image } = featuredImage;

		const imageUrl = `${siteUrl}${image.src}`;

		twitterCard = twitterCard.concat([
			{
				name: `twitter:image:alt`,
				content: altText,
			},
			{
				name: `twitter:image`,
				content: imageUrl,
			},
		]);

		ogCard = ogCard.concat([
			{
				name: `og:image:alt`,
				content: altText,
			},
			{
				name: `og:image`,
				content: imageUrl,
			},
		]);
	}

	if (type === "article") {
		if (data?.modified)
			ogCard.push({
				name: `og:article:modified_time `,
				content: data.modified,
			});
		if (data?.published)
			ogCard.push({
				name: `og:article:published_time`,
				content: data.published,
			});

		const jsonLdImage = data?.featuredImage?.node.resize.src;

		jsonLd.push({
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: metaTitle,
				abstract: metaDescription,
				dateModified: data?.modified,
				datePublished: data?.published,
				image: [`${siteUrl}${jsonLdImage}`],
			}),
		});
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
				...meta,
			]}
			script={jsonLd}
			title={metaTitle}
			titleTemplate={`${siteTitle} · ${
				currentCategory &&
				currentCategory !== "all" &&
				currentCategory !== metaTitle
					? `${currentCategory} · `
					: ""
			} ${siteTitle === metaTitle ? "Home" : "%s"}`}
		/>
	);
}

export const fragments = graphql`
	fragment OgSeoFeaturedImage on WpMediaItem {
		altText
		resize(cropFocus: CENTER, fit: COVER, height: 2048, width: 4096) {
			src
		}
	}

	fragment JsonLdSeoFeaturedImage on WpMediaItem {
		altText
		sourceUrl
	}

	fragment PostSeo on WpPost {
		title
		description: cleanExcerpt
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
		description: cleanExcerpt
		featuredImage {
			node {
				...OgSeoFeaturedImage
			}
		}
	}
`;
