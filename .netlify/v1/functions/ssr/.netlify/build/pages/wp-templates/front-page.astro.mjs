import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_Cs1_6WaH.mjs';
import { $ as $$Base } from '../../chunks/base_C7VT7Vsi.mjs';
import { c as client } from '../../chunks/client_C-YDzuhU.mjs';
import { F as FRAGMENT, A as ArchiveView } from '../../chunks/Archive_DRO5N3ZD.mjs';
import { gql } from '@urql/core';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$FrontPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FrontPage;
  if (!Astro2.locals.uri) {
    return Astro2.rewrite("/404");
  }
  const archivePromise = client.query(
    gql`
		query getPostData($first: Int = 10, $after: String = null) {
			posts(first: $first, after: $after) {
				nodes {
					...PostExcerpt
				}
				pageInfo {
					endCursor
					hasNextPage
				}
			}
		}

		${FRAGMENT}
	`,
    {
      after: null
    }
  );
  const pagePromise = client.query(
    gql`
		query getFrontPage {
			page(id: "/", idType: URI) {
				title
				content
				featuredImage {
					node {
						altText
						srcSet
						sourceUrl
					}
				}
			}
		}
	`,
    {}
  );
  const [archiveResults, pageResults] = await Promise.all([
    archivePromise,
    pagePromise
  ]);
  const {
    data: { page }
  } = pageResults;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "currentUri": Astro2.locals.uri }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="sm:grid items-center grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 lg:gap-16 md:gap-8 gap-4"> <div class="p-8 sm:p-4 sm:col-start-1 sm:col-end-2"> <img${addAttribute(page.featuredImage.node.sourceUrl, "src")}${addAttribute(page.featuredImage.node.srcSet, "srcset")}${addAttribute(page.featuredImage.altText, "alt")} class="rounded-full" loading="eager"> </div> <div class="text-center sm:col-start-2 sm:col-end-4"> <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"> <span class="block xl:inline">${page.title}</span> </h1> <div class="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">${unescapeHTML(page.content)}</div> </div> </section> <section> ${renderComponent($$result2, "ArchiveView", ArchiveView, { "posts": archiveResults.data.posts.nodes })} </section> ` })}`;
}, "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/wp-templates/front-page.astro", void 0);

const $$file = "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/wp-templates/front-page.astro";
const $$url = "/wp-templates/front-page";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$FrontPage,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
