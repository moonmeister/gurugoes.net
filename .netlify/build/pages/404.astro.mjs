import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cs1_6WaH.mjs';
import { $ as $$Base } from '../chunks/base_C7VT7Vsi.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <title>Not found</title> <h1>Page not found</h1> <p>
Sorry${" "} <span role="img" aria-label="Pensive emoji"> 😔 </span>${" "}
we couldn’t find what you were looking for.
</p> </main> ` })}`;
}, "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/404.astro", void 0);

const $$file = "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
