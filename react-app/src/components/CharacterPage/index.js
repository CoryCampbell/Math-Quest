import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import OpenModalButton from "../OpenModalButton";
import NewCharacterModal from "../NewCharacterModal";
import "./CharacterPage.css";
import UpdateCharacterModal from "../UpdateCharacterNameModal";

//

//

//

function CharacterPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const userCharacters = useSelector((state) => state.characters.userCharacters);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const currentAdventure = useSelector((state) => state.adventure);
	console.log("currentAdventure", currentAdventure);

	let selectedCharacterName = localStorage.getItem("character_name");
	console.log("=====================> selectedCharacterName", selectedCharacterName);

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
	}, [dispatch, selectedCharacterName, userCharacters?.length]);

	function selectCharacter(e) {
		if (Object.keys(currentAdventure).length !== 0) {
			return alert("Adventure started, please end your adventure before switching Characters!");
		}

		selectedCharacterName = e.target.innerHTML;
		localStorage.setItem("character_name", selectedCharacterName);
		dispatch(getSelectedCharacterThunk());
	}

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="character-page-container">
				<div className="left-char-page">
					<div className="characters-title-container">
						<div className="char-title">CHARACTERS</div>
						<OpenModalButton
							buttonText="Create New Character"
							modalComponent={<NewCharacterModal className="new-character-button" />}
						></OpenModalButton>
					</div>
					<div className="all-chars-container">
						{userCharacters &&
							userCharacters?.map((character) => (
								<div key={character.id} className="character-select-container">
									<button className="character-select-option" onClick={selectCharacter}>
										{character.character_name}
									</button>
									<div className="level-preview">Level {character.level}</div>
								</div>
							))}
					</div>
				</div>
				<div className="right-char-page">
					{selectedCharacter ? (
						<>
							<div className="character-info-stats-container">
								<div className="info-stats-top">
									<div className="character-name-options-container">
										<div className="info-character-title">{selectedCharacter.character_name}</div>
										<div className="update-name-modal-container">
											<OpenModalButton
												buttonText="Edit/Delete"
												modalComponent={<UpdateCharacterModal className="update-name-modal" />}
											></OpenModalButton>
										</div>
										<div className="delete-character-modal-container"></div>
									</div>
									<div>Coins: {selectedCharacter.coins}</div>
								</div>
								<div className="info-stats-bottom">
									Health: {selectedCharacter.current_health}/{selectedCharacter.max_health}
									<div className="xp-info">
										<div className="char-level-div">Level: {selectedCharacter.level}</div>
										<div className="char-xp-div"> XP: {selectedCharacter.experience_points}</div>
									</div>
								</div>
								<div></div>
							</div>
							<div className="inventory-container">Inventory</div>
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
