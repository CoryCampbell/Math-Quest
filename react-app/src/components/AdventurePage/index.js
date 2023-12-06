import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./AdventurePage.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function AdventurePage() {
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);

	if (!sessionUser) return <Redirect to="/" />;

	function startAdditionAdventure() {
		console.log("addition adventure started!");
	}

	return (
		<>
			{selectedCharacter ? (
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
			) : (
				<div className="no-character-adv-page">
					<div>Please Select A Character To Start A New Adventure!</div>
					<NavLink to="/characters">Characters</NavLink>
				</div>
			)}
		</>
	);
}

export default AdventurePage;
