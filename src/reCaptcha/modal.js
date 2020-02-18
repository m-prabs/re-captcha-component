const init = () => {
	class Modal {
		constructor(overlay) {
			this.overlay = overlay;
			const closeButton = overlay.querySelector(".close");
			closeButton.addEventListener("click", this.close.bind(this));
		}
		open() {
			this.overlay.classList.remove("is-hidden");
			return this.close.bind(this);
		}

		close() {
			this.overlay.classList.add("is-hidden");
		}
	}
	const modal = new Modal(document.querySelector(".modal-overlay"));
	window.openCaptchaModal = modal.open.bind(modal);
};

export default init;
