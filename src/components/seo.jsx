import { gql } from "urql";
import React from "react";

export function SEO({ data = {}, siteData = {} }) {
	const { title: siteTitle, description: siteDescription } = siteData;

	const metaDescription =
		data?.description?.replace(/<[^>]+>/g, "") || siteDescription;
	const metaTitle = data?.title || siteTitle;
	const type = data?.isFrontPage
		? "website"
		: data?.isContentNode
			? "article"
			: "website";

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
		const { altText, sourceUrl: imageUrl } = featuredImage;

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

		const jsonLdImage = featuredImage.sourceUrl;

		jsonLd.push({
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: metaTitle,
				abstract: metaDescription,
				dateModified: data?.modified,
				datePublished: data?.published,
				image: [jsonLdImage],
			}),
		});
	}

	return (
		<>
			<title>{`${siteTitle === metaTitle ? "Home" : metaTitle} · ${siteTitle}`}</title>

			{buildHtmlTags("script", jsonLd)}
			{buildHtmlTags("meta", [
				{
					name: `description`,
					content: metaDescription,
				},
				...ogCard,
				...twitterCard,
			])}
		</>
	);
}

SEO.fragment = gql`
	fragment SEO on UniformResourceIdentifiable {
		isContentNode
		isFrontPage
		... on Category {
			title: name
			description
		}
		... on Post {
			title
			description: excerpt
			modified: modifiedGmt
			published: dateGmt
		}
		... on Page {
			title
		}
		... on NodeWithFeaturedImage {
			featuredImage {
				node {
					altText
					sourceUrl
				}
			}
		}
	}
`;

// build an html component from an array of objects where the key/value pairs are attributes
function buildHtmlTags(tag, attributes) {
	return attributes.map((attr) => {
		const { innerHTML, ...rest } = attr;
		const tagName = tag || "meta";

		if (innerHTML) {
			return React.createElement(tagName, {
				key: rest,
				dangerouslySetInnerHTML: { __html: innerHTML },
				...rest,
			});
		}

		return React.createElement(tagName, {
			key: rest,
			...rest,
		});
	});
}
