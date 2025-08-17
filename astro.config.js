// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import icon from "astro-icon";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	env: {
		schema: {
			WP_URL: envField.string({
				context: "client",
				access: "public",
				optional: false,
			}),
		},
	},

	integrations: [
		icon({
			include: {
				"simple-icons": ["instagram", "x", "bluesky"],
				heroicons: ["x-mark", "bars-3"],
			},
		}),
		svelte(),
	],
	adapter: netlify(),
});
