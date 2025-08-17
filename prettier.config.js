/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	semi: true,
	plugins: [
		"prettier-plugin-astro",
		"prettier-plugin-svelte",
		"prettier-plugin-tailwindcss",
	],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
};

export default config;
