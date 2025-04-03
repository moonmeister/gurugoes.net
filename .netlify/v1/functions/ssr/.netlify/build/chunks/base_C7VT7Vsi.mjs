import { c as createComponent, b as createAstro, d as addAttribute, e as renderHead, r as renderComponent, f as renderSlot, a as renderTemplate } from './astro/server_Cs1_6WaH.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { gql } from '@urql/core';
import { c as client } from './client_C-YDzuhU.mjs';
/* empty css                           */

function append(acc, arg) {
	return acc + arg + " ";
}

function classNames(...args) {
	let classes = "";

	for (const arg of args) {
		if (!arg) continue;
		const argType = typeof arg;
		if (argType === "string" || argType === "number") {
			classes = append(classes, arg);
		} else if (Array.isArray(arg) && arg.length) {
			const inner = classNames(...arg);
			if (inner) classes = append(classes, inner);
		} else if (argType === "object") {
			for (const [key, value] of Object.entries(arg)) {
				if (value) classes = append(classes, key);
			}
		}
	}

	return classes;
}

function formatDate(dateString, locale) {
	const date = new Date(dateString);

	return date.toLocaleDateString(locale, {
		month: "long",
		year: "numeric",
		day: "numeric",
	});
}

const SECONDS_IN_UNIT = [
	[604800, "W"],
	[86400, "D"],
	[3600, "H"],
	[60, "M"],
	[1, "S"],
];

function durationFromTime(time = 0, convFact = 1000) {
	const seconds = Math.round(time / convFact);

	if (seconds < 0.5) return "PT0S";
	const { duration: result } = SECONDS_IN_UNIT.reduce(
		(prev, [unit, letter]) => {
			let { duration, remainder } = prev;

			if (remainder < unit) {
				return prev;
			}

			return {
				duration: duration + Math.floor(remainder / unit) + letter,
				remainder: (remainder %= unit),
			};
		},
		{ duration: "PT", remainder: Math.round(time / convFact) },
	);

	return result;
}

const buttonClasses = "font-medium text-green-700 rounded-full bg-gray-50 p-3 border-green-700 hover:text-green-900 focus:border-2";
function Button({ children, ...props }) {
  return /* @__PURE__ */ jsx("button", { ...props, type: "button", className: buttonClasses, children });
}
function Link({ children, className = "", override = false, ...rest }) {
  return /* @__PURE__ */ jsx("a", { ...rest, className: classNames({ [buttonClasses]: !override }, className), children });
}
function ExtLink({
  to,
  href,
  children,
  override = false,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      ...rest,
      href: href || to,
      rel: "noopener",
      className: classNames({ [buttonClasses]: !override }, className),
      children
    }
  );
}

const MobileMenuItem = ({ href, children, ...rest }) => /* @__PURE__ */ jsx("div", { className: "px-2 pt-2 pb-3", role: "none", children: /* @__PURE__ */ jsx(
  Link,
  {
    href,
    className: "block px-3 py-2 hover:bg-gray-50",
    role: "menuitem",
    ...rest,
    children
  }
) });
const QUERY = gql`
	query get_menu {
		categories(where: { hideEmpty: true }) {
			nodes {
				name
				uri
			}
		}
	}
`;
function Header({ categories = [], currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const allCategories = [{ name: "All", uri: "/" }, ...categories];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxs(
      "nav",
      {
        className: "relative flex items-center justify-between sm:h-10 md:justify-center",
        "aria-label": "Global",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center flex-1 md:absolute md:inset-y-0 md:left-0", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between w-full md:w-auto", children: /* @__PURE__ */ jsx("div", { className: "-mr-2 flex items-center md:hidden", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setIsOpen(!isOpen),
              className: "bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
              id: "main-menu",
              "aria-haspopup": "true",
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "h-6 w-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M4 6h16M4 12h16M4 18h16"
                      }
                    )
                  }
                )
              ]
            }
          ) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex md:space-x-10", children: allCategories?.map(
            ({ name, uri }) => currentPage !== uri ? /* @__PURE__ */ jsx(Link, { href: uri, role: "menuitem", children: name }, uri) : null
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      Transition,
      {
        show: isOpen,
        enter: "duration-150 ease-out",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "duration-100 ease-in",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
        children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 inset-x-0 p-2 transition origin-top-right md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "px-5 pt-4 flex items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: "mr-2", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setIsOpen(!isOpen),
              className: "bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close menu" }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "h-6 w-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              role: "menu",
              "aria-orientation": "vertical",
              "aria-labelledby": "main-menu",
              children: allCategories?.map(
                ({ name, uri }) => currentPage === uri ? null : /* @__PURE__ */ jsx(
                  MobileMenuItem,
                  {
                    href: uri,
                    onClick: () => setIsOpen(!isOpen),
                    children: name
                  },
                  uri
                )
              )
            }
          )
        ] }) })
      }
    )
  ] });
}

const Instagram = () => /* @__PURE__ */ jsx(
  "svg",
  {
    className: "h-6 w-6",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
        clipRule: "evenodd"
      }
    )
  }
);
const Twitter = () => /* @__PURE__ */ jsx(
  "svg",
  {
    className: "h-6 w-6",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("path", { d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" })
  }
);

const Socials = [
  {
    name: "Instagram",
    handle: "@moon_meister",
    link: "https://www.instagram.com/moon_meister/",
    Icon: Instagram
  },
  {
    name: "Twitter",
    handle: "@moon_meister",
    link: "https://twitter.com/moon_meister",
    Icon: Twitter
  }
];
function Footer() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-6 md:order-2", children: Socials.map(({ name, handle, link, Icon }) => /* @__PURE__ */ jsxs(
      ExtLink,
      {
        href: link,
        title: `${name} - ${handle}`,
        override: false,
        children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: name }),
          /* @__PURE__ */ jsx(Icon, {})
        ]
      },
      link
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 md:mt-0 md:order-1", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-base text-gray-500", children: [
      "©",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Alex Moon. All rights reserved."
    ] }) })
  ] }) });
}

const $$Astro = createAstro();
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const headerResults = await client.query(QUERY, {});
  const { currentUri } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="stylesheet preload" href="https://rsms.me/inter/inter.css"><link rel="stylesheet preload" href="https://rsms.me/inter/inter.css"><title>GuruGoes</title>${renderHead()}</head> </html> <body> <div class="grid auto-cols-auto grid-cols-1"> <header class="row-start-1 row-end-2 col-start-1 col-end-2 z-10 p-4"> ${renderComponent($$result, "Header", Header, { "client:load": true, "categories": headerResults.data?.categories?.nodes, "currentPage": currentUri, "client:component-hydration": "load", "client:component-path": "/Users/alex.moon/code/moonmeister/gurugoes.net/src/components/header.jsx", "client:component-export": "Header" })} </header> <div class="row-start-1 row-end-3 col-start-1 col-end-2"> <div class="relative bg-green-100 overflow-hidden"> <div class="relative pt-6 pb-16 sm:pb-24"> <main class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24"> ${renderSlot($$result, $$slots["default"])} </main> </div> </div> </div> <footer class="row-start-3 row-end-4 col-start-1 col-end-2"> ${renderComponent($$result, "Footer", Footer, {})} </footer> </div> </body>`;
}, "/Users/alex.moon/code/moonmeister/gurugoes.net/src/layouts/base.astro", void 0);

export { $$Base as $, Button as B, Link as L, buttonClasses as b, classNames as c, durationFromTime as d, formatDate as f };
