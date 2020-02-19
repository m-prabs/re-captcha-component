import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import "@servicenow/now-button";
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import utils from "./utils";
import styles from "./styles.scss";

const view = state => {
	return (
		<div className="now-g-captcha">
			<div className="ngc-container">
				<div className="ngc-status ngc-item">
					<div className="ngc-icon-box">
						{state.status ? null : (
							<div className="ngc-icon --not-verified"></div>
						)}
						{state.status == "success" ? (
							<div className="ngc-icon --verified">
								<span>&#10003;</span>
							</div>
						) : null}
						{state.status && state.status != "success" ? (
							<div className="ngc-icon --expired --errored">
								<span>&#10540;</span>
							</div>
						) : null}
					</div>
				</div>
				<div className="ngc-trigger ngc-item">
					<now-button-bare
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
