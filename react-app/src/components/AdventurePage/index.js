import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import { useEffect } from "react";
// import { addNewAdventureThunk } from "../../store/adventures";

import "./AdventurePage.css";
import { addNewAdventureThunk } from "../../store/adventures";

function AdventurePage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const currentAdventure = useSelector((state) => state.adventure);
	console.log("cur adv: ", currentAdventure);

	let adventure = localStorage.getItem("adventure");

	if (!adventure) {
		console.log("no adventure chosen");
		adventure = {};
	}

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
	}, [dispatch]);

	if (!sessionUser) return <Redirect to="/" />;

	function startAdventure(e) {
		let adventureObject = {};
		adventureObject.character_id = selectedCharacter.id;
		adventureObject.score = 0;
		adventureObject.progress = 0;
		adventureObject.adventure_type = e.target.value;
		adventureObject.completed = false;
		console.log("adventureObject", adventureObject);

		localStorage.setItem("adventure", adventureObject);
		dispatch(addNewAdventureThunk(selectedCharacter.id, e.target.value));

		//re render page to show adventure status/progress/etc
	}

	// THREE STATES YOU CAN BE IN:
	// 1: NO SELECTED CHARACTER
	// 2: SELECTED CHARACTER BUT NO ADVENTURE STARTED
	// 3: SELECTED CHARACTER ***AND*** ADVENTURE STARTED

	return (
		<>
			{!selectedCharacter ? (
				<div className="no-character-adv-page">
					<div>Please Select A Character To Start A New Adventure!</div>
					<NavLink to="/characters">Characters</NavLink>
				</div>
			) : (
				<>
					{selectedCharacter && Object.keys(adventure).length === 0 ? (
						<div className="adventure-page-container">
							<div className="page-title">Select Your Adventure!</div>
							<div className="adventure-options-container">
								<button className="adventure-option add" value="addition" onClick={startAdventure}>
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
						<div>adventure started!</div>
					)}
				</>
			)}
		</>
	);
}

export default AdventurePage;
