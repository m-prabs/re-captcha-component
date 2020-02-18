import getTemplate from "./modalHtml";
import initModal from "./modal";

const generateCaptcha = captchaId => {
	let el = document.createElement("DIV");
	el.setAttribute("class", "captcha-box");
	el.innerHTML = `<div id=` + captchaId + ` class="g-recaptcha"></div>`;
	document.body.appendChild(getTemplate(el));
	//if (!window.openCaptchaModal)
	initModal();
};

const loadRecaptchaGlobally = captchaId => {
	window.onloadReCaptacha = () => generateCaptcha(captchaId);
	let head = window.document.getElementsByTagName("head")[0],
		script = window.document.createElement("script");
	script.src =
		"https://www.google.com/recaptcha/api.js?onload=onloadReCaptacha&render=explicit";
	script.setAttribute("async", "");
	script.setAttribute("defer", "");
	head.appendChild(script);
};

const initCaptcha = ({ updateState }) => {
	let captchaId = "g-recaptcha-id-" + Math.round(Math.random() * 1000);
	updateState({ captchaId });
	if (!window.grecaptcha) loadRecaptchaGlobally(captchaId);
	else generateCaptcha(captchaId);
};

const reRenderCaptcha = ({ updateState }) => {
	let captchaId = "g-recaptcha-id-" + Math.round(Math.random() * 1000),
		captchaModal = document.getElementsByClassName("captcha-modal")[0];
	updateState({ captchaId });
	captchaModal.parentNode.removeChild(captchaModal);
	generateCaptcha(captchaId);
};

export default {
	initCaptcha,
	reRenderCaptcha
};
