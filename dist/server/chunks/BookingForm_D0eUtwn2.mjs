import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as getSettings } from "./settings_DMNw6G8Y.mjs";
import { w as services } from "./data_Bq_0n-xJ.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
import { t as $$StepForm } from "./StepForm_XPy36f-D.mjs";
//#region src/components/BookingForm.astro
createAstro("https://virnobyte.com");
var $$BookingForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BookingForm;
	const { preset, source = Astro.url.pathname } = Astro.props;
	const svc = services();
	const areas = [...getSettings().business.serviceAreas, "Other nearby area"];
	const PHONE = String.raw`\+?[0-9 \(\)\-]{10,16}`;
	return renderTemplate`${renderComponent($$result, "StepForm", $$StepForm, {
		"action": "/api/enquiry",
		"id": "booking-form",
		"submitLabel": "Book the service",
		"draftKey": "booking"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<input type="hidden" name="source"${addAttribute(source, "value")}> <fieldset data-step data-title="What needs fixing"> <legend>What do you need help with?</legend> ${renderComponent($$result, "Field", $$Field, {
		"label": "Service",
		"name": "topic",
		"type": "select",
		"required": true,
		"value": preset,
		"msgRequired": "Choose the service closest to your problem.",
		"options": [
			...svc.map((s) => s.name),
			"Membership card",
			"Something else"
		]
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Describe the problem",
		"name": "message",
		"type": "textarea",
		"rows": 4,
		"hint": "Device brand and model, what happens, and since when.",
		"placeholder": "e.g. HP laptop shuts down after 10 minutes and gets very hot."
	})} </fieldset> <fieldset data-step data-title="Where and when"> <legend>Where should we help you?</legend> ${renderComponent($$result, "Field", $$Field, {
		"label": "Area",
		"name": "area",
		"type": "select",
		"required": true,
		"options": areas,
		"msgRequired": "Choose your area so we can plan the visit."
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Preferred option",
		"name": "preferred",
		"type": "select",
		"required": true,
		"msgRequired": "Choose doorstep visit, workshop drop-off or a call back.",
		"options": [
			"Doorstep visit",
			"I will bring it to the Chikhali workshop",
			"Call me first"
		]
	})} </fieldset> <fieldset data-step data-title="Your details"> <legend>How can we reach you?</legend> <div class="two"> ${renderComponent($$result, "Field", $$Field, {
		"label": "Your name",
		"name": "name",
		"required": true,
		"autocomplete": "name",
		"msgRequired": "Enter your name."
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Mobile number",
		"name": "phone",
		"type": "tel",
		"required": true,
		"autocomplete": "tel",
		"inputmode": "tel",
		"pattern": PHONE,
		"msgRequired": "Enter a mobile number so we can call you back.",
		"msgPattern": "Enter a 10-digit mobile number, e.g. 98765 43210."
	})} </div> ${renderComponent($$result, "Field", $$Field, {
		"label": "Email",
		"name": "email",
		"type": "email",
		"autocomplete": "email"
	})} <p class="small muted">We use these details only to respond to this request. See our <a href="/privacy-policy">privacy policy</a>.</p> </fieldset> ` })}`;
}, "C:/Programming section/virnobyte/src/components/BookingForm.astro", void 0);
//#endregion
export { $$BookingForm as t };
