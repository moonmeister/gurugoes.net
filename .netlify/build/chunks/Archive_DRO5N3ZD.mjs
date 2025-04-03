import { jsx, jsxs } from 'react/jsx-runtime';
import { gql } from '@urql/core';
import { L as Link } from './base_C7VT7Vsi.mjs';
import { T as Time, R as ReadingTime } from './time_DkhPcr9K.mjs';

function ArchiveView({ posts }) {
  return /* @__PURE__ */ jsx("div", { className: "relative pt-4 m:pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "mt-12 mx-auto grid gap-5 max-w-lg md:max-w-xl md:grid-cols-2 lg:grid-cols-3 lg:max-w-none", children: Array.isArray(posts) && posts?.map((post) => {
    const {
      title,
      excerpt,
      uri,
      dateGmt,
      categories,
      content,
      featuredImage: { node: featuredImage }
    } = post;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col rounded-lg shadow-lg overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: featuredImage?.sourceUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              className: "h-48 w-full object-cover",
              src: featuredImage.sourceUrl,
              srcSet: featuredImage.srcSet,
              loading: "lazy",
              alt: featuredImage.altText
            }
          ) : /* @__PURE__ */ jsx("div", { className: "h-48 bg-green-600" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white p-6 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-indigo-600", children: categories.nodes?.map(({ name, uri: uri2 }) => /* @__PURE__ */ jsx(
                Link,
                {
                  href: uri2,
                  className: "hover:underline",
                  override: true,
                  children: name
                },
                uri2
              )) }),
              /* @__PURE__ */ jsxs(Link, { href: uri, className: "block mt-4", override: true, children: [
                /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-gray-900", children: title }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-base text-gray-500", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: excerpt } }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-1 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx(Time, { dateTime: dateGmt }),
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(ReadingTime, { content }) })
            ] }) }) })
          ] })
        ]
      },
      uri
    );
  }) }) }) });
}
const FRAGMENT = gql`
	fragment PostExcerpt on Post {
		title
		title
		excerpt
		content
		dateGmt
		uri
		featuredImage {
			node {
				altText
				srcSet
				sourceUrl
			}
		}
		categories {
			nodes {
				name
				uri
			}
		}
	}
`;

export { ArchiveView as A, FRAGMENT as F };
