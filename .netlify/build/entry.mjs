import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BqlCQyGO.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/wp-templates/archive.astro.mjs');
const _page3 = () => import('./pages/wp-templates/front-page.astro.mjs');
const _page4 = () => import('./pages/wp-templates/single.astro.mjs');
const _page5 = () => import('./pages/_---uri_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.5.6_@netlify+blobs@8.1.2_jiti@2.4.2_lightningcss@1.29.2_rollup@4.39.0_typescript@5.8.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/wp-templates/archive.astro", _page2],
    ["src/pages/wp-templates/front-page.astro", _page3],
    ["src/pages/wp-templates/single.astro", _page4],
    ["src/pages/[...uri].astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "557738fd-354f-4d50-ac59-14f7506521e1"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
