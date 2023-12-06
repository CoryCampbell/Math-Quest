import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./AdventurePage.css";

function AdventurePage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	function startAdditionAdventure() {
		console.log("addition adventure started!");
	}

	return (
		<>
			<div className="adventure-page-container">
				<div className="page-title">Select Your Adventure!</div>
				<div className="adventure-options-container">
					<button className="adventure-option add" onClick={startAdditionAdventure}>
						Addition Adventure
					</button>
					<button className="adventure-option sub" disabled>
						Subtraction Adventure Coming Soon!
					</button>
					<button className="adventure-option mult" disabled>
						Multiplication Adventure Coming Soon!
					</button>
					<button className="adventure-option division" disabled>
						Division Adventure Coming Soon!
					</button>
				</div>
			</div>
		</>
	);
}

export default AdventurePage;
