import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import "@servicenow/now-button";
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import utils from "./utils";

const view = state => {
	return (
		<div>
			<div className="re-captcha-status">
				Status: <span>{state.status || "Not Verified"}</span>
			</div>
			<div className="re-captcha-trigger">
				<now-button-bare
					icon-start="checkbox-indeterminate-outline"
					label={
						!state.status
							? "Click to verify captcha"
							: "Re-trigger Verification"
					}
					size="md"
					variant="primary"
					append-to-payload={{ retrigger: !!state.status }}
				></now-button-bare>
			</div>
		</div>
	);
};

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
		//coeff.updateState({ status: null });
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
