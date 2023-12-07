import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import { useEffect } from "react";
import { addNewAdventureThunk } from "../../store/adventures";

import "./AdventurePage.css";

function AdventurePage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	let currentAdventure = useSelector((state) => state.adventure);

	let adventure = localStorage.getItem("adventure") || {};
	console.log("adventure before parse: ", adventure);

	if (Object.values(adventure) === 0) {
		console.log("no adventure chosen");
		currentAdventure = {};
	} else {
		try {
			console.log("parsing!!!", adventure);
			currentAdventure = JSON.parse(adventure);
		} catch {
			console.log("not able to parse!!!");
			currentAdventure = {};
		}
	}

	console.log("adventure after grab from local storage start first load/re-render: ", currentAdventure);

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

		localStorage.setItem("adventure", JSON.stringify(adventureObject));
		adventure = JSON.parse(localStorage.getItem("adventure"));
		currentAdventure = adventure;
		console.log("adventure after grab from local storage start adventure click: ", currentAdventure);
		dispatch(addNewAdventureThunk(selectedCharacter?.id, currentAdventure.adventure_type));
	}

	console.log("adventure progress: ", currentAdventure);

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
										<div>Score: {currentAdventure["score"]}</div>
										<div className="separator-div"></div>
										<div>Stage: {currentAdventure["score"]} / 10</div>
									</div>
									<div className="bottom-game-container">Game CONTAINER</div>
								</div>
							</div>
							<div className="spacer-div"></div>
						</>
					)}
				</>
			)}
		</>
	);
}

export default AdventurePage;
