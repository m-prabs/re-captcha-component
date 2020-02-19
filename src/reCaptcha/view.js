import "@servicenow/now-button";

const getIconClassName = status => {
	let classes = "";
	switch (status) {
		case "success":
			classes += "--verified";
			break;
		case "expire":
			classes += "--expired";
			break;
		case "error":
			classes += "--errored";
			break;
		default:
			classes += "--not-verified";
	}
	return classes;
};

export default state => {
	return (
		<div className="now-g-captcha">
			<div className="ngc-container">
				<div className="ngc-status ngc-item">
					<div className={"ngc-icon-box " + getIconClassName(state.status)}>
						<div className="ngc-icon">
							{state.status ? (
								state.status == "success" ? (
									<span>&#10003;</span>
								) : (
									<span>&#10540;</span>
								)
							) : null}
						</div>
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
