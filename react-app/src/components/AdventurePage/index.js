import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import "./AdventurePage.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import { useEffect } from "react";
import { addNewAdventureThunk } from "../../store/adventures";

function AdventurePage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const currentAdventure = useSelector((state) => state.adventure);

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
	}, [dispatch]);

	if (!sessionUser) return <Redirect to="/" />;

	function startAdventure(e) {
		console.log("Adventure started!");
		console.log("e.value", e.target.value);
		dispatch(addNewAdventureThunk(selectedCharacter.id, e.target.value));
		//create new adventure

		//re render page to show adventure status/progress/etc
	}

	return (
		<>
			{selectedCharacter ? (
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
				<div className="no-character-adv-page">
					<div>Please Select A Character To Start A New Adventure!</div>
					<NavLink to="/characters">Characters</NavLink>
				</div>
			)}
			{/* {selectedCharacter && currentAdventure && (
				<div>
					<div>adventure started</div>
				</div>
			)} */}
		</>
	);
}

export default AdventurePage;
