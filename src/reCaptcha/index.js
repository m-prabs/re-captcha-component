import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import utils from "./utils";
import styles from "./styles.scss";
import view from "./view";

let closeModal;

const responseCallback = (cb, { updateState }, status) => r => {
	updateState({ status });
	cb(r);
	setTimeout(() => {
		closeModal();
	}, 1000);
};

const showModal = coeff => {
	let {
		action: { payload }
	} = coeff;
	if (payload.retrigger) {
		window.grecaptcha.reset();
		utils.reRenderCaptcha(coeff);
	}
	closeModal = window.openCaptchaModal();
	coeff.dispatch("RENDER_CAPTCHA");
};

const renderCaptcha = coeff => {
	window.grecaptcha.render(coeff.state.captchaId, {
		sitekey: coeff.state.properties.captchaSiteKey,
		callback: responseCallback(
			coeff.state.properties.successCallback,
			coeff,
			"success"
		),
		"expired-callback": responseCallback(
			coeff.state.properties.expireCallBack,
			coeff,
			"expire"
		),
		"error-callback": responseCallback(
			coeff.state.properties.errorCallBack,
			coeff,
			"error"
		)
	});
};

createCustomElement("sn-re-captcha", {
	renderer: { type: snabbdom },
	view,
	styles,
	properties: {
		captchaSiteKey: {
			default: "6LcQ9dkUAAAAAAoEsUOafr0NKTtS8_6_rjr1k0hB"
		},
		successCallback: {
			default: a => console.log(a)
		},
		expireCallBack: {
			default: () => console.warn("Captcha Expired!")
		},
		errorCallBack: {
			default: () => console.error("Captcha Error!")
		}
	},
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: utils.initCaptcha,
		["NOW_BUTTON_BARE#CLICKED"]: showModal,
		["RENDER_CAPTCHA"]: renderCaptcha
	}
});
