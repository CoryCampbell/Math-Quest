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
	const maleAppearance1 = require("../../static/appearances/MALE1.PNG");
	const maleAppearance2 = require("../../static/appearances/MALE2.PNG");
	const maleAppearance3 = require("../../static/appearances/MALE3.PNG");
	const maleAppearance4 = require("../../static/appearances/MALE4.PNG");
	const maleAppearance5 = require("../../static/appearances/MALE5.PNG");
	const maleAppearance6 = require("../../static/appearances/MALE6.PNG");
	const maleAppearance7 = require("../../static/appearances/MALE7.PNG");
	const maleAppearance8 = require("../../static/appearances/MALE8.PNG");

	const femaleAppearance1 = require("../../static/appearances/FEMALE1.PNG");
	const femaleAppearance2 = require("../../static/appearances/FEMALE2.PNG");
	const femaleAppearance3 = require("../../static/appearances/FEMALE3.PNG");
	const femaleAppearance4 = require("../../static/appearances/FEMALE4.PNG");
	const femaleAppearance5 = require("../../static/appearances/FEMALE5.PNG");
	const femaleAppearance6 = require("../../static/appearances/FEMALE6.PNG");
	const femaleAppearance7 = require("../../static/appearances/FEMALE7.PNG");
	const femaleAppearance8 = require("../../static/appearances/FEMALE8.PNG");

	const appearanceUnselected = require("../../static/appearances/unselected.PNG");

	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const userCharacters = useSelector((state) => state.characters.userCharacters);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const currentAdventure = localStorage.getItem("currentAdventure") || {};

	let selectedCharacterName = localStorage.getItem("character_name");

	const appearance = selectedCharacter?.appearance;
	console.log("appearance--------> ", appearance);

	let imagePreview;

	if (appearance === 1) {
		imagePreview = maleAppearance1;
	} else if (appearance === 2) {
		imagePreview = femaleAppearance1;
	} else if (appearance === 3) {
		imagePreview = maleAppearance2;
	} else if (appearance === 4) {
		imagePreview = femaleAppearance2;
	} else if (appearance === 5) {
		imagePreview = maleAppearance3;
	} else if (appearance === 6) {
		imagePreview = femaleAppearance3;
	} else if (appearance === 7) {
		imagePreview = maleAppearance4;
	} else if (appearance === 8) {
		imagePreview = femaleAppearance4;
	} else if (appearance === 9) {
		imagePreview = maleAppearance5;
	} else if (appearance === 10) {
		imagePreview = femaleAppearance5;
	} else if (appearance === 11) {
		imagePreview = maleAppearance6;
	} else if (appearance === 12) {
		imagePreview = femaleAppearance6;
	} else if (appearance === 13) {
		imagePreview = maleAppearance7;
	} else if (appearance === 14) {
		imagePreview = femaleAppearance7;
	} else if (appearance === 15) {
		imagePreview = maleAppearance8;
	} else if (appearance === 16) {
		imagePreview = femaleAppearance8;
	} else {
		imagePreview = appearanceUnselected;
	}

	console.log("imagePreview", imagePreview);

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
	}, [dispatch, selectedCharacterName]);

	function selectCharacter(e) {
		e.preventDefault();
		if (Object.keys(currentAdventure).length !== 0) {
			return alert("Adventure started, please end your adventure before switching Characters!");
		}

		selectedCharacterName = e.target.innerText;
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
							modalComponent={<NewCharacterModal className="new-character-button" disabled />}
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
										<div className="info-character-title">{selectedCharacterName}</div>
										<div className="update-name-modal-container">
											<OpenModalButton
												buttonText="Edit"
												modalComponent={<UpdateCharacterModal className="update-name-modal" />}
											></OpenModalButton>
										</div>
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
								<div className="selected-character-gear">
									<img src={imagePreview.default} alt="appearance-preview" className="image-preview"></img>
									<div className="gear-preview">gear</div>
								</div>
							</div>
							<div className="inventory-container">Inventory</div>
						</>
					) : (
						<>
							<div className="character-info-stats-container">
								<div className="info-stats-top">
									<div className="character-name-options-container">
										<div className="info-character-title">{selectedCharacterName}</div>
										<div className="update-name-modal-container"></div>
									</div>
									<div>Coins</div>
								</div>
								<div className="info-stats-bottom">
									Health
									<div className="xp-info">
										<div className="char-level-div">Level </div>
										<div className="char-xp-div"> XP </div>
									</div>
								</div>
								<div className="selected-character-gear">
									<img src={imagePreview.default} alt="appearance-preview" className="image-preview"></img>
									<div className="gear-preview"></div>
								</div>
							</div>
							<div className="inventory-container-unselected">
								Select A Character
								<p>Or</p>
								Make A New One
							</div>
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
