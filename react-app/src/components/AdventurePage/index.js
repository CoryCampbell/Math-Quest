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
	let currentAdventure = useSelector((state) => state.adventure);

	let adventure = localStorage.getItem("adventure");

	if (!adventure) {
		console.log("no adventure chosen");
		adventure = {};
	} else currentAdventure = adventure;
	console.log("cur adv state: ", currentAdventure);
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
						<>
							<div className="current-adventure-container">
								<div className="adventure-info-container">
									<div className="adv-top-left">
										<div>{selectedCharacter.character_name}</div>
										<div>
											<div>
												❤{selectedCharacter.current_health} / {selectedCharacter.max_health}
											</div>
										</div>
									</div>
									<div className="adv-top-right">
										<div>Coins: {selectedCharacter.coins}</div>
										<div>
											level {selectedCharacter.level} - {selectedCharacter.experience_points}
										</div>
									</div>
								</div>
								<div className="full-game-container">
									<div className="stage-time-container">
										<div>Score: {adventure.score}?</div>
										<div className="separator-div"></div>
										<div>Stage: ?{adventure.progress} / 10</div>
									</div>
									<div className="bottom-game-container">Game CONTAINER</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
}

export default AdventurePage;
