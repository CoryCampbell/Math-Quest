import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./AdventurePage.css";

function AdventurePage() {
	let sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;
	return (
		<>
			<div className="adventure-page-container">
				<div className="page-title">Adventures Page</div>
				<div className="adventure-options-container">
					<div className="adventure-option">Addition</div>
					<div className="adventure-option">Subtraction</div>
					<div className="adventure-option">Multiplication</div>
					<div className="adventure-option">Division</div>
				</div>
			</div>
		</>
	);
}

export default AdventurePage;
