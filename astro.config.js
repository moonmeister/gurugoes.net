// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

import icon from "astro-icon";

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
		react(),
		icon({
			include: {
				"simple-icons": ["instagram", "x", "bluesky"],
			},
		}),
	],
	adapter: netlify(),
});
