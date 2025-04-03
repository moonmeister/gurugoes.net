import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Cs1_6WaH.mjs';
import { $ as $$Base } from '../../chunks/base_C7VT7Vsi.mjs';
import { c as client } from '../../chunks/client_C-YDzuhU.mjs';
import { F as FRAGMENT, A as ArchiveView } from '../../chunks/Archive_DRO5N3ZD.mjs';
import { gql } from '@urql/core';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Archive = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Archive;
  if (!Astro2.locals.uri) {
    return Astro2.rewrite("/404");
  }
  const categoryResults = await client.query(
    gql`
		query getCategoryInfo($uri: ID!) {
			category(id: $uri, idType: URI) {
				name
				description
				contentNodes {
					nodes {
						...PostExcerpt
					}
				}
			}
		}
		${FRAGMENT}
	`,
    { uri: Astro2.locals.uri }
  );
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "currentUri": Astro2.locals.uri }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class=""> <div class="text-center"> <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"> <span class="block xl:inline">${categoryResults.data.category.name}</span> </h1> <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"> ${categoryResults.data.category.description} </p> </div> </section> <section> ${renderComponent($$result2, "ArchiveView", ArchiveView, { "posts": categoryResults.data.category.contentNodes.nodes })} </section> ` })}`;
}, "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/wp-templates/archive.astro", void 0);

const $$file = "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/wp-templates/archive.astro";
const $$url = "/wp-templates/archive";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Archive,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
