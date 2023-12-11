import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserCharactersThunk, updateCharacterThunk } from "../../store/characters";
import DeleteCharacterModal from "../DeleteCharacterModal";
import OpenModalButton from "../OpenModalButton";

import "./UpdateCharacterNameModal.css";

function UpdateCharacterModal() {
	// const user_id = useSelector((state) => state.session.user.id);
	const userCharacters = useSelector((state) => state.characters.userCharacters);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const oldCharacterName = selectedCharacter.character_name;

	const dispatch = useDispatch();
	const [newCharacterName, setNewCharacterName] = useState(oldCharacterName);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!Object.values(errors).length) {
			const updatedCharacter = await dispatch(updateCharacterThunk(oldCharacterName, newCharacterName));
			localStorage.removeItem("character_name");
			localStorage.setItem("character_name", newCharacterName);
			dispatch(getUserCharactersThunk());
			closeModal();
			return updatedCharacter;
		} else return;
	};

	function validateInput() {
		const errorsObj = {};
		const forbiddenSymbols = "/|-!?)(*&^%$#><:~`'@=+";

		function forbiddenLoop(name) {
			for (let i = 0; i < name.length; i++) {
				const char = name[i];

				if (forbiddenSymbols.includes(char)) {
					return true;
				}
			}
			return false;
		}

		if (!newCharacterName || !newCharacterName.trim().length)
			errorsObj.characterName = "Please give your character a Name!";

		if (forbiddenLoop(newCharacterName))
			errorsObj.characterName = "Names are not allowed to include any Symbols or Special Characters!";

		userCharacters.forEach((character) => {
			if (character.character_name === newCharacterName)
				errorsObj.characterName = "You already have a character with that name!";
		});

		setErrors(errorsObj);
		return;
	}

	return (
		<div className="update-character-container">
			<h1>Update Your Character's Name!</h1>
			<form className="update-char-container" onSubmit={handleSubmit}>
				<div className="update-char-form">
					{errors.characterName && <p className="errors characterNameError">{errors.characterName}</p>}
					<label>
						New Name
						<input type="text" value={newCharacterName} onChange={(e) => setNewCharacterName(e.target.value)} />
					</label>
					<button className="update-button" type="submit" onClick={validateInput}>
						Update
					</button>
					<button className="cancel-update-button">Cancel</button>
				</div>
				<div className="delete-button-container">
					<OpenModalButton
						className="delete-button"
						buttonText="Delete Character"
						modalComponent={
							<DeleteCharacterModal className="delete-character-modal" character_id={selectedCharacter.id} />
						}
					></OpenModalButton>
				</div>
			</form>
		</div>
	);
}

export default UpdateCharacterModal;
