// const { default: Archive } = await import("./archive.astro");
// const { default: FrontPage } = await import("./front-page.astro");
// const { default: Single } = await import("./single.astro");
import Archive from "./archive.astro";
import FrontPage from "./front-page.astro";
import Single from "./single.astro";

const templates = {
	archive: Archive,
	"front-page": FrontPage,
	single: Single,
};

export default templates;
