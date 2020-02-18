export default () =>
	`
	  .captcha-modal.is-hidden {
		display: none;
	  }
	  
	  .captcha-modal .close-box {
		margin-left: 30px;
	  }
	  .captcha-modal .close {
		cursor:pointer;
		font-size: 31px;
		opacity: 0.5;
		float: left;
    	margin-top: -20px;
	  }
	  .captcha-modal .close:before {
		content: "×";
	  }

	  .captcha-modal.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999
	  }
	  
	  .captcha-modal .modal {
		padding: 20px 30px;
		max-height: calc(100% - 150px);
		overflow-y: scroll;
		position: relative;
		margin: 5% auto 0;
		z-index: 9999;
		display: flex;
		justify-content: center;
	  }	  

	  .captcha-modal .modal-body {
		padding: 30px;
		background: #fff;
		border-radius: 4px;
		display: flex;
    	flex-flow: row nowrap;
	  }
	  `;
