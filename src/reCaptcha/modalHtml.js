import getStyles from "./modalStyles";

const getModalRootNode = content => {
	let root = document.createElement("DIV"),
		child1 = document.createElement("DIV"),
		child2 = document.createElement("DIV"),
		child3 = document.createElement("DIV"),
		close = document.createElement("SPAN"),
		style = document.createElement("style");

	style.type = "text/css";
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(getStyles()));
	}
	root.setAttribute("class", "captcha-modal is-hidden modal-overlay");
	child1.setAttribute("class", "modal");
	child2.setAttribute("class", "modal-body");
	child3.setAttribute("class", "close-box");
	close.setAttribute("class", "close");

	child3.appendChild(close);
	child2.appendChild(content);
	child2.appendChild(child3);
	child1.appendChild(child2);
	root.appendChild(style);
	root.appendChild(child1);
	return root;
};

export default getModalRootNode;
