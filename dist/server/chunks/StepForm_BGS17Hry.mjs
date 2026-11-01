import { A as renderTemplate, D as renderSlot, N as addAttribute, V as createAstro, j as maybeRenderHead } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript } from "./Icon_CAVYTX4O.mjs";
//#region src/components/StepForm.astro
createAstro("https://virnobyte.com");
var $$StepForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StepForm;
	const { action, id, submitLabel, draftKey } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<form class="stepform" method="post"${addAttribute(action, "action")}${addAttribute(id, "id")} data-stepform${addAttribute(draftKey, "data-draft")} novalidate data-astro-cid-u5ipmuwy> <div class="progress" aria-hidden="true" hidden data-astro-cid-u5ipmuwy> <div class="progress-meta" data-astro-cid-u5ipmuwy> <span data-step-label data-astro-cid-u5ipmuwy></span> <span data-step-count data-astro-cid-u5ipmuwy></span> </div> <div class="bar" data-astro-cid-u5ipmuwy><span data-bar data-astro-cid-u5ipmuwy></span></div> </div> <p class="sr-only" aria-live="polite" data-announce data-astro-cid-u5ipmuwy></p> <div class="hp" aria-hidden="true" data-astro-cid-u5ipmuwy> <label data-astro-cid-u5ipmuwy>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off" data-astro-cid-u5ipmuwy></label> </div> ${renderSlot($$result, $$slots["default"])} <div class="nav" data-astro-cid-u5ipmuwy> <button type="button" class="btn btn--ghost" data-prev hidden data-astro-cid-u5ipmuwy>Back</button> <button type="button" class="btn" data-next hidden data-astro-cid-u5ipmuwy>Continue</button> <button type="submit" class="btn" data-submit data-astro-cid-u5ipmuwy>${submitLabel}</button> </div> <p class="small muted draft-note" data-draft-note hidden data-astro-cid-u5ipmuwy>Your answers are saved on this device until you send them.</p> </form>${renderScript($$result, "C:/Programming section/virnobyte/src/components/StepForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/components/StepForm.astro", void 0);
//#endregion
export { $$StepForm as t };
