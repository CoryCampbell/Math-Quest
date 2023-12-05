import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import OpenModalButton from "../OpenModalButton";
import NewCharacterModal from "../NewCharacterModal";

import "./CharacterPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CharacterPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const userCharacters = useSelector((state) => state.characters.userCharacters);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);

	let selectedCharacterName = localStorage.getItem("character_name");
	console.log("selectedCharacterName: ", selectedCharacterName);

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk(selectedCharacterName));
	}, [dispatch, selectedCharacterName, userCharacters?.length]);

	function selectCharacter(e) {
		selectedCharacterName = e.target.innerHTML;
		localStorage.setItem("character_name", selectedCharacterName);
		dispatch(getSelectedCharacterThunk(selectedCharacterName));
	}

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="character-page-container">
				<div className="left-char-page">
					<OpenModalButton
						className=""
						buttonText="Create New Character"
						modalComponent={<NewCharacterModal />}
					></OpenModalButton>
					<div className="all-chars-container">
						{userCharacters &&
							userCharacters?.map((character) => (
								<button key={character.id} className="character-select-option" onClick={selectCharacter}>
									{character.character_name}
								</button>
							))}
					</div>
				</div>
				<div className="right-char-page">
					{selectedCharacter ? (
						<>
							<div>{selectedCharacterName}</div>
							<div>Level: {selectedCharacter.level}</div>
							<div> XP: {selectedCharacter.experience_points}</div>
							<div>Coins: {selectedCharacter.coins}</div>
							<div>
								Health: {selectedCharacter.current_health}/{selectedCharacter.max_health}
							</div>
						</>
					) : (
						<>
							<div>unselected</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default CharacterPage;

/* <button className="character-select-option">Select A Character</button>
					<button className="character-select-gear">Gear</button> */
