import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { a as $$Picture } from "./_astro_assets_DgDUkxWr.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
//#region src/components/Photo.astro
createAstro("https://virnobyte.com");
var $$Photo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Photo;
	const { image, alt, sizes = "(min-width: 1024px) 50vw, 100vw", widths = [
		480,
		768,
		1080,
		1440,
		1920
	], eager = false, class: cls, position } = Astro.props;
	const img = resolveImage(image);
	const style = position ? `object-position:${position}` : void 0;
	return renderTemplate`${img.kind === "asset" ? renderTemplate`${renderComponent($$result, "Picture", $$Picture, {
		"src": img.meta,
		"alt": alt,
		"formats": ["avif", "webp"],
		"widths": widths.filter((w) => w <= img.meta.width),
		"sizes": sizes,
		"loading": eager ? "eager" : "lazy",
		"decoding": eager ? "sync" : "async",
		"fetchpriority": eager ? "high" : "auto",
		"class": cls,
		"style": style
	})}` : renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(img.src, "src")}${addAttribute(alt, "alt")}${addAttribute(img.width, "width")}${addAttribute(img.height, "height")}${addAttribute(eager ? "eager" : "lazy", "loading")} decoding="async"${addAttribute(eager ? "high" : "auto", "fetchpriority")}${addAttribute(cls, "class")}${addAttribute(style, "style")}>`}`;
}, "C:/Programming section/virnobyte/src/components/Photo.astro", void 0);
//#endregion
export { $$Photo as t };
