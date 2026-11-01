import { A as renderTemplate, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { r as formatDate } from "./format_B1bSNQa_.mjs";
//#region src/components/ProjectList.astro
createAstro("https://virnobyte.com");
var $$ProjectList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProjectList;
	const { items } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<ul class="projects" data-astro-cid-pf5okai3> ${items.map((p) => renderTemplate`<li class="proj" data-reveal data-astro-cid-pf5okai3> ${renderComponent($$result, "Photo", $$Photo, {
		"image": p.image,
		"alt": `${p.title}${p.location ? ` in ${p.location}` : ""}`,
		"sizes": "(min-width: 1024px) 45vw, 100vw",
		"widths": [
			480,
			768,
			1080,
			1440
		],
		"data-astro-cid-pf5okai3": true
	})} <div class="pb" data-astro-cid-pf5okai3> <p class="small muted" data-astro-cid-pf5okai3> ${[
		p.client_type,
		p.location,
		p.completed_on && formatDate(p.completed_on, {
			month: "short",
			year: "numeric"
		})
	].filter(Boolean).join(" · ")} </p> <h3 data-astro-cid-pf5okai3>${p.title}</h3> <p data-astro-cid-pf5okai3>${p.summary}</p> ${p.scope.length > 0 && renderTemplate`<ul class="ticks small" data-astro-cid-pf5okai3> ${p.scope.map((x) => renderTemplate`<li data-astro-cid-pf5okai3>${x}</li>`)} </ul>`} </div> </li>`)} </ul>`;
}, "C:/Programming section/virnobyte/src/components/ProjectList.astro", void 0);
//#endregion
export { $$ProjectList as t };
